// Netlify Function: /api/waitlist
// Accepts an email and "saves" it to a waitlist.

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
      }
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { email } = body;
  
  if (!email || !email.includes("@")) {
    return { statusCode: 400, body: JSON.stringify({ error: "Valid email is required" }) };
  }

  // TODO: Connect to a real database (Supabase, Resend, etc.)
  console.log(`[Waitlist] New signup: ${email}`);

  // Simulated delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    statusCode: 200,
    headers: {
      "access-control-allow-origin": "*",
      "content-type": "application/json",
    },
    body: JSON.stringify({ success: true, message: "Added to waitlist!" }),
  };
};
