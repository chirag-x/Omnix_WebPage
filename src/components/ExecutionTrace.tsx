import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Section } from "@/components/primitives/Section";

interface TraceEvent {
  time: string;
  label: string;
  detail: string;
  level?: "info" | "ok" | "warn";
}

const trace: TraceEvent[] = [
  { time: "09:41:02", label: "Request received", detail: "user → omnix", level: "info" },
  { time: "09:41:03", label: "Intent understood", detail: "open chrome, search", level: "info" },
  { time: "09:41:03", label: "Plan generated", detail: "4 steps · 1 graph", level: "info" },
  { time: "09:41:04", label: "Chrome launched", detail: "pid 14221", level: "ok" },
  { time: "09:41:05", label: "Search field detected", detail: "grounded at (612, 248)", level: "ok" },
  { time: "09:41:06", label: "Query entered", detail: "‘AI agents’", level: "ok" },
  { time: "09:41:07", label: "Result verified", detail: "10 results visible", level: "ok" },
  { time: "09:41:07", label: "Task completed", detail: "duration 5.4s", level: "ok" },
];

export function ExecutionTrace() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(trace.length);
      return;
    }
    const id = setInterval(() => {
      setCount((c) => (c < trace.length ? c + 1 : c));
    }, 350);
    return () => clearInterval(id);
  }, [inView, reduced]);

  return (
    <Section
      id="trace"
      eyebrow="Execution trace"
      title="A task, step by step."
      description="Every Omnix run produces a verifiable timeline. You can see what it understood, what it did, and how long each step took."
    >
      <div
        ref={ref}
        className="glass relative overflow-hidden rounded-2xl p-1"
      >
        <div className="relative overflow-hidden rounded-[14px] border border-white/5 bg-ink-950/70">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 text-xs text-white/55">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent-400/80" />
              <span className="mono ml-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
                omnix — execution trace
              </span>
            </div>
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              {count}/{trace.length} events
            </div>
          </div>

          <ol className="relative">
            <div
              aria-hidden
              className="absolute left-[68px] top-0 h-full w-px bg-gradient-to-b from-accent-400/40 via-white/10 to-transparent"
            />
            {trace.map((e, i) => {
              const visible = i < count;
              const color =
                e.level === "ok"
                  ? "text-accent-300"
                  : e.level === "warn"
                  ? "text-amber-300"
                  : "text-white/60";
              return (
                <motion.li
                  key={e.time}
                  initial={{ opacity: 0, x: -8 }}
                  animate={visible ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-[64px_1fr] items-center gap-3 px-4 py-2.5 sm:px-6"
                >
                  <span className="mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                    {e.time}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`relative z-10 h-2 w-2 rounded-full ${
                        visible
                          ? "bg-accent-400 shadow-glow-sm"
                          : "bg-white/15"
                      }`}
                      aria-hidden
                    />
                    <span className={`text-sm ${color}`}>{e.label}</span>
                    <span className="mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                      · {e.detail}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
