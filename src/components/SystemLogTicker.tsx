import { useEffect, useMemo, useState } from "react";
import { generateLogEvents, type LogEvent } from "@/data/systemLog";
import { Activity } from "lucide-react";

const levelColor: Record<LogEvent["level"], string> = {
  info: "text-white/60",
  ok: "text-accent-300",
  warn: "text-amber-300",
  err: "text-rose-300",
};

const moduleColor: Record<LogEvent["module"], string> = {
  engine: "text-cyan-300",
  planner: "text-fuchsia-300",
  perception: "text-accent-300",
  voice: "text-amber-300",
  control: "text-white/70",
  skills: "text-cyan-200",
  verify: "text-emerald-300",
  system: "text-white/55",
};

export function SystemLogTicker() {
  const [events, setEvents] = useState<LogEvent[]>(() => generateLogEvents(40));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setEvents((prev) => {
        const next = generateLogEvents(1, prev.length + Date.now());
        return [...prev, next[0]].slice(-50);
      });
    }, 900);
    return () => clearInterval(id);
  }, [paused]);

  const line = useMemo(
    () =>
      events
        .map(
          (e) =>
            `[${e.ts}] ${e.module.padEnd(10)} ${e.level.toUpperCase().padEnd(4)} ${e.text}`
        )
        .join("   "),
    [events]
  );

  return (
    <div
      className="glass relative flex items-center gap-3 overflow-hidden rounded-xl border-white/10 px-3 py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="mono flex shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/55">
        <Activity className="h-3.5 w-3.5 text-accent-300" />
        omnix.log
      </span>
      <div className="relative h-5 flex-1 overflow-hidden">
        <div
          className="mono absolute inset-y-0 left-0 flex items-center gap-6 whitespace-nowrap text-[12px]"
          style={{ animation: "ticker 90s linear infinite" }}
        >
          <span className="text-white/75">{line}</span>
          <span className="text-white/30">·</span>
          <span className="text-white/55">{line}</span>
        </div>
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .glass:hover { border-color: rgba(255,255,255,0.15); }
      `}</style>
      <button
        onClick={() => setPaused((p) => !p)}
        className="mono shrink-0 rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/55 hover:text-white"
        aria-label={paused ? "Resume ticker" : "Pause ticker"}
      >
        {paused ? "resume" : "pause"}
      </button>
    </div>
  );
}
