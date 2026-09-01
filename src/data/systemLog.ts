export interface LogEvent {
  id: string;
  ts: string;
  module: "engine" | "planner" | "perception" | "voice" | "control" | "skills" | "verify" | "system";
  level: "info" | "ok" | "warn" | "err";
  text: string;
}

const modules: LogEvent["module"][] = [
  "engine",
  "planner",
  "perception",
  "voice",
  "control",
  "skills",
  "verify",
  "system",
];

const verbs: Record<LogEvent["module"], string[]> = {
  engine: ["spin_up", "dispatch", "yield", "await_ctx", "route_message"],
  planner: ["compile", "refine", "emit_graph", "bind_skill", "rollback"],
  perception: ["scan", "ground", "label", "read_state", "crop_region"],
  voice: ["capture", "transcribe", "synthesize", "stream_chunk", "vad_cut"],
  control: ["move", "click", "type", "scroll", "drag", "key_combo"],
  skills: ["load", "validate", "dispatch", "timeout", "retry"],
  verify: ["read_post", "compare", "fail", "replan", "pass"],
  system: ["heartbeat", "config_reload", "gc", "metrics_flush", "watchdog"],
};

const targets = [
  "skill:web.search",
  "skill:app.launch",
  "skill:file.find",
  "graph:nodes=4",
  "target:search-input",
  "target:url-bar",
  "window:chrome",
  "window:spotify",
  "view:viewport[612,248]",
  "agent:replan=2",
  "context:user-pref",
  "audio:chunk=120ms",
  "exec:click@612,248",
  "exec:type='AI agents'",
  "verify:results=10",
];

function now(offsetMs: number) {
  const d = new Date(Date.now() + offsetMs);
  return d.toISOString().slice(11, 19);
}

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

export function generateLogEvents(count: number = 60, seed: number = Date.now()): LogEvent[] {
  const events: LogEvent[] = [];
  for (let i = 0; i < count; i++) {
    const m = pick(modules, seed + i * 7);
    const v = pick(verbs[m], seed + i * 11);
    const t = pick(targets, seed + i * 13);
    const ts = now(-i * 1300);
    const r = (seed + i * 17) % 17;
    const level: LogEvent["level"] =
      r === 0 ? "warn" : r === 1 ? "err" : r % 3 === 0 ? "ok" : "info";
    events.push({
      id: `e-${i}`,
      ts,
      module: m,
      level,
      text: `${v} ${t}`,
    });
  }
  return events;
}
