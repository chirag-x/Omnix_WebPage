import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Chrome, Search, MousePointerClick, Crosshair } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";

const steps = [
  { id: "detect", label: "Target detected", x: 38, y: 38, w: 30, h: 6 },
  { id: "click", label: "Click", x: 53, y: 41, w: 2, h: 2 },
  { id: "type", label: "Type query", x: 38, y: 38, w: 30, h: 6 },
  { id: "submit", label: "Submit", x: 70, y: 41, w: 2, h: 2 },
];

export function ComputerUse() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => (t + 1) % steps.length), 1500);
    return () => clearInterval(id);
  }, [reduced]);

  const active = steps[tick];

  return (
    <Section
      id="computer-use"
      eyebrow="Computer use"
      title="Not just text — real interaction."
      description="Omnix perceives the desktop, finds the right element, and operates it. The same browser, the same apps, the same way a person would."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <div className="glass relative overflow-hidden rounded-2xl p-1">
            <div className="relative overflow-hidden rounded-[14px] border border-white/5 bg-ink-900/60">
              {/* Browser chrome */}
              <div className="flex items-center justify-between border-b border-white/5 bg-ink-950/60 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">
                  <Chrome className="h-3 w-3" />
                  chrome · omnix simulation
                </div>
                <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  omnix · perception overlay
                </div>
              </div>

              {/* Page content */}
              <div className="relative h-[420px] sm:h-[460px]">
                <div className="absolute inset-0 grid-bg-fine opacity-30" />
                {/* Fake page */}
                <div className="absolute inset-6 rounded-xl border border-white/[0.06] bg-white/[0.015] p-6">
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    ai agents · 2026
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-white/85">
                    What’s new in AI agents
                  </div>
                  <div className="mt-1 max-w-sm text-sm text-white/50">
                    Daily briefings, papers, and demos from the agent ecosystem.
                  </div>

                  {/* Search bar */}
                  <div className="relative mt-6 max-w-xl">
                    <div
                      className={`relative flex h-12 items-center gap-3 rounded-xl border bg-white/[0.04] px-4 transition-colors ${
                        active.id === "detect" || active.id === "type"
                          ? "border-accent-400/50"
                          : "border-white/10"
                      }`}
                    >
                      <Search className="h-4 w-4 text-white/55" />
                      <span className="text-sm text-white/70">
                        {active.id === "type" ? "AI agents" : "Search the web"}
                      </span>
                      {active.id === "type" && (
                        <motion.span
                          className="ml-1 inline-block h-4 w-[1.5px] bg-accent-400"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.9, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Target bounding box (animated) */}
                    <motion.div
                      key={active.id + "box"}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="pointer-events-none absolute -inset-1 rounded-xl border-2 border-accent-400 shadow-[0_0_36px_-8px_rgba(43,227,158,0.6)]"
                    >
                      <span className="absolute -top-6 left-0 inline-flex items-center gap-1 rounded-md border border-accent-400/40 bg-accent-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent-300">
                        <Crosshair className="h-3 w-3" />
                        {active.label}
                      </span>
                    </motion.div>
                  </div>

                  {/* Result list */}
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "Autonomous web agents in 2026",
                      "From copilots to coworkers",
                      "Open weights for desktop agents",
                      "Long-running task benchmarks",
                    ].map((t, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                      >
                        <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                          result {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="mt-1 text-sm text-white/80">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cursor */}
                <motion.div
                  key={active.id + "cursor"}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    left: `${active.x + active.w / 2}%`,
                    top: `${active.y + active.h + 4}%`,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute z-10"
                >
                  <div className="relative">
                    <MousePointerClick className="h-5 w-5 -translate-x-1 -translate-y-1 text-accent-300 drop-shadow-[0_0_10px_rgba(43,227,158,0.6)]" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4" delay={0.05}>
          <div className="glass h-full overflow-hidden rounded-2xl p-6">
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              omnix perception
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              The screen, not a prompt.
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Omnix grounds every action in what is actually visible on the
              screen. It identifies the right target, then interacts.
            </p>
            <div className="mt-6 space-y-3">
              {[
                ["Target", "Search input"],
                ["Action", "Click → Type → Submit"],
                ["Confidence", "0.94"],
                ["Verified", "Results loaded"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm"
                >
                  <span className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {k}
                  </span>
                  <span className="text-white/85">{v}</span>
                </div>
              ))}
            </div>
            <div className="divider my-6" />
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              demonstration
            </p>
            <p className="mt-2 text-xs text-white/45">
              The interaction shown is a frontend simulation. It is not
              controlling your machine.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
