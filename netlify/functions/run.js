// Netlify Function: /api/run
// Streams agent thoughts back to the client in NDJSON format.
// Powered by OpenRouter — set OPENROUTER_API_KEY and OPENROUTER_MODEL in
// the Netlify dashboard (or your local .env) to enable live responses.

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// We ask the model to emit a strict JSON-Lines stream so the UI can render
// each event as it arrives. Anything off-format is ignored client-side.
const SYSTEM_PROMPT = `You are Omnix, a desktop AI agent.

You will receive a user request. Respond with a single stream of JSON Lines
(one JSON object per line, no prose, no markdown). Allowed types:

  {"type":"thought","text":"..."}                            // reasoning step
  {"type":"stage","stage":"UNDERSTAND|PLAN|PERCEIVE|ACT|VERIFY","text":"..."}
  {"type":"outcome","text":"..."}                            // result shown to the user
  {"type":"done"}                                            // stream terminator

Rules:
- 4–6 thoughts, then 1–3 outcomes, then {"type":"done"}.
- Be concise (≤ 14 words per text field).
- Never write prose outside the JSON Lines.`;

function cannedEvents(request) {
  const safe = (request || "").slice(0, 80);
  return [
    { type: "thought", text: "Parsing user request…" },
    { type: "thought", text: `Intent: ${safe || "perform a desktop task"}` },
    { type: "thought", text: "Selecting skills…" },
    { type: "thought", text: "Composing plan with verification" },
    { type: "stage", stage: "UNDERSTAND", text: "Intent classified" },
    { type: "stage", stage: "PLAN", text: "Plan compiled (4 steps, 1 graph)" },
    { type: "stage", stage: "PERCEIVE", text: "Reading current desktop state" },
    { type: "stage", stage: "ACT", text: "Dispatching skills" },
    { type: "stage", stage: "VERIFY", text: "Postcondition satisfied" },
    { type: "outcome", text: "Task complete." },
    { type: "done" },
  ];
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders() };
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }
  const request = String(body.request || "").trim();

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openrouter/auto";

  // No key configured → return canned demo so the UI still works.
  if (!apiKey) {
    return ndjson(cannedEvents(request));
  }

  // Key present → ask OpenRouter for a streaming completion.
  // Netlify Functions (Lambda) buffer responses, so we collect the chunks,
  // parse the JSON-Lines content, and return a single NDJSON response.
  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
        // Recommended by OpenRouter for analytics on their dashboard.
        "HTTP-Referer":
          process.env.OPENROUTER_REFERER ||
          "https://omnix.dev",
        "X-Title": process.env.OPENROUTER_TITLE || "Omnix",
      },
      body: JSON.stringify({
        model,
        stream: true,
        // Some free models on OpenRouter don't support response_format;
        // we rely on the system prompt instead.
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: request || "Hello" },
        ],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const err = await safeText(upstream);
      return json(upstream.status || 502, {
        error: "OpenRouter error",
        status: upstream.status,
        detail: err.slice(0, 400),
      });
    }

    const events = [];
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // OpenRouter streams Server-Sent Events: lines beginning with "data: ".
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || !line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (payload === "[DONE]") continue;
        let parsed;
        try {
          parsed = JSON.parse(payload);
        } catch {
          continue;
        }
        const delta = parsed?.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta.length) {
          // Buffer the model text — we'll split into JSON lines below.
          events.push({ __delta: true, text: delta });
        }
      }
    }

    // Reconstruct the full text, then split into per-line JSON objects.
    const full = events
      .filter((e) => e.__delta)
      .map((e) => e.text)
      .join("");

    const finalEvents = parseModelStream(full, request);
    return ndjson(finalEvents);
  } catch (err) {
    // Fall back to the canned stream on any network failure so the UI
    // never shows a hard error during a demo.
    return ndjson([
      ...cannedEvents(request),
      { type: "thought", text: `(live model unavailable: ${(err && err.message) || "unknown"})` },
      { type: "done" },
    ]);
  }
};

/**
 * The model is asked to emit strict JSON Lines. We split its full text
 * response on newlines, attempt to JSON-parse each line, and keep only the
 * valid events. Anything we can't parse is surfaced as a "thought" so the
 * reasoning pane still feels alive.
 */
function parseModelStream(full, request) {
  const out = [];
  const lines = full.split(/\r?\n/);
  let sawDone = false;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    try {
      const obj = JSON.parse(t);
      if (obj && typeof obj === "object" && typeof obj.type === "string") {
        if (obj.type === "done") sawDone = true;
        out.push(obj);
      } else {
        out.push({ type: "thought", text: t });
      }
    } catch {
      // Not JSON — treat as a free-form thought.
      out.push({ type: "thought", text: t });
    }
  }
  if (out.length === 0) {
    return cannedEvents(request);
  }
  if (!sawDone) out.push({ type: "done" });
  return out;
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };
}

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { ...corsHeaders(), "content-type": "application/json" },
    body: JSON.stringify(payload),
  };
}

function ndjson(events) {
  return {
    statusCode: 200,
    headers: {
      ...corsHeaders(),
      "content-type": "application/x-ndjson",
      "cache-control": "no-store",
    },
    body: events.map((e) => JSON.stringify(e)).join("\n"),
  };
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}
