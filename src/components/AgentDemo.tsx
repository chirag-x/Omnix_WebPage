import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, RotateCcw, Sparkles, ChevronRight, Terminal } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { ThinkingStream } from "@/components/ThinkingStream";
import { useAgentStream, type AgentStreamEvent } from "@/hooks/useAgentStream";
import { config } from "@/config";
import { examples, type AgentExample } from "@/data/examples";

type Phase = "idle" | "running" | "done";

export function AgentDemo() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<AgentExample>(examples[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [active, setActive] = useState(0);
  const [streamEvents, setStreamEvents] = useState<AgentStreamEvent[]>([]);
  const stream = useAgentStream();

  useEffect(() => {
    if (phase !== "running") return;
    if (reduced) {
      setActive(selected.steps.length);
      setPhase("done");
      return;
    }
    if (active >= selected.steps.length) {
      setPhase("done");
      return;
    }
    const id = setTimeout(() => setActive((a) => a + 1), 950);
    return () => clearTimeout(id);
  }, [active, phase, reduced, selected]);

  // Try live engine if enabled; fall back to simulation if it fails.
  useEffect(() => {
    if (phase !== "running") return;
    if (!config.liveAgent.enabled) return;
    let cancelled = false;
    setStreamEvents([]);
    stream
      .run(selected.request)
      .then(() => {
        if (!cancelled) setStreamEvents(stream.events);
      })
      .catch(() => {
        /* simulation continues in parallel */
      });
    return () => {
      cancelled = true;
      stream.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, selected]);

  const start = () => {
    window.speechSynthesis.cancel();
    setActive(0);
    setPhase("running");
  };

  const reset = () => {
    window.speechSynthesis.cancel();
    setActive(0);
    setPhase("idle");
    setStreamEvents([]);
    stream.reset();
  };

  // Web Speech API integration
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    
    const speak = (text: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    };

    if (phase === "running" && active < selected.steps.length) {
      const step = selected.steps[active];
      if (step) {
        window.speechSynthesis.cancel();
        speak(step.detail);
      }
    } else if (phase === "done") {
      window.speechSynthesis.cancel();
      speak(selected.outcome.join(". "));
    }
    
    return () => {
      // Don't cancel on unmount here or it will interrupt itself when component rerenders
    }
  }, [active, phase, selected]);

  return (
    <Section
      id="demo"
      eyebrow="Interactive demonstration"
      title="Pick a request. Watch the agent run."
      description="This is a frontend simulation — Omnix is not controlling your computer. It is a faithful representation of the loop the real engine executes."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Command selector + input */}
        <div className="lg:col-span-5">
          <div className="glass relative overflow-hidden rounded-2xl p-5">
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              command playground
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <Terminal className="h-3.5 w-3.5" />
                user input
              </div>
              <p className="mt-2 text-[15px] text-white/85">
                “{selected.request}”
              </p>
            </div>

            <div className="mt-4">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                examples
              </div>
              <ul className="mt-2 flex flex-col gap-1.5">
                {examples.map((ex) => {
                  const isActive = ex.id === selected.id;
                  return (
                    <li key={ex.id}>
                      <button
                        onClick={() => {
                          setSelected(ex);
                          reset();
                        }}
                        className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                          isActive
                            ? "border-accent-400/40 bg-accent-400/[0.06] text-white"
                            : "border-white/[0.06] bg-white/[0.015] text-white/70 hover:border-white/15 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{ex.label}</span>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition ${
                            isActive ? "text-accent-300" : "text-white/30"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {phase !== "running" ? (
                <Button
                  onClick={start}
                  leadingIcon={<Play className="h-4 w-4 fill-current" />}
                >
                  {phase === "done" ? "Run again" : "Run demo"}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={reset}
                  leadingIcon={<RotateCcw className="h-4 w-4" />}
                >
                  Stop
                </Button>
              )}
              <p className="mono ml-auto text-[10px] uppercase tracking-[0.2em] text-white/40">
                simulation
              </p>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="lg:col-span-7">
          <div className="glass relative overflow-hidden rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                omnix pipeline
              </div>
              <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    phase === "running"
                      ? "bg-accent-400 animate-pulse-soft"
                      : phase === "done"
                      ? "bg-accent-300"
                      : "bg-white/30"
                  }`}
                />
                {phase === "running"
                  ? "running"
                  : phase === "done"
                  ? "completed"
                  : "idle"}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {selected.steps.map((s, i) => {
                const isPast = i < active;
                const isNow = i === active && phase === "running";
                const isDone = phase === "done";
                return (
                  <div key={s.id} className="flex flex-col">
                    <div className="relative h-1.5 w-full rounded-full bg-white/10">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-accent-400"
                        initial={{ width: 0 }}
                        animate={{
                          width: isPast || isNow || isDone ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div
                      className={`mono mt-2 text-[10px] uppercase tracking-[0.18em] ${
                        isNow
                          ? "text-white"
                          : isPast || isDone
                          ? "text-accent-300"
                          : "text-white/40"
                      }`}
                    >
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trace */}
            <div className="mono mt-6 overflow-hidden rounded-xl border border-white/5 bg-black/40">
              <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <span>trace.log</span>
                <span>omnix-engine</span>
              </div>
              <ul className="space-y-1.5 p-4 text-[12.5px] leading-relaxed text-white/65">
                {selected.steps.map((s, i) => {
                  const visible = i < active || (phase === "done");
                  if (!visible) return null;
                  return (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-accent-300">
                        [{s.label.toLowerCase()}]
                      </span>
                      <span className="text-white/55">{s.detail}</span>
                    </motion.li>
                  );
                })}
                {phase === "done" && (
                  <AnimatePresence>
                    {selected.outcome.map((line) => (
                      <motion.li
                        key={line}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-white/30">✓</span>
                        <span className="text-accent-300">[result]</span>
                        <span className="text-white/85">{line}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                )}
                {phase === "running" && active < selected.steps.length && (
                  <li className="flex items-center gap-3 text-accent-300">
                    <span className="text-white/30">▍</span>
                    <span>working…</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
              <Sparkles className="h-3.5 w-3.5 text-accent-300" />
              This is a simulated run. Connect a live engine to drive this UI
              with real agent output.
            </div>

            {phase === "running" && (
              <div className="mt-4">
                <ThinkingStream events={streamEvents} running={stream.running || phase === "running"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
