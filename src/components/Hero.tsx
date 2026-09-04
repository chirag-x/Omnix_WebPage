import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/primitives/Button";
import { GridBackground } from "@/components/primitives/GridBackground";
import { Glow } from "@/components/primitives/Glow";
import { SystemLogTicker } from "@/components/SystemLogTicker";
import { config } from "@/config";
import { examples } from "@/data/examples";

const stages = ["UNDERSTAND", "PLAN", "PERCEIVE", "ACT", "VERIFY"] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [exampleIndex, setExampleIndex] = useState(0);
  
  const [email, setEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setWaitlistStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setWaitlistStatus("success");
      setEmail("");
    } catch {
      setWaitlistStatus("error");
    }
  };

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setStage((s) => (s + 1) % (stages.length + 2));
    }, 1100);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setExampleIndex((i) => (i + 1) % examples.length);
    }, 9000);
    return () => clearInterval(id);
  }, [reduced]);

  const current = examples[exampleIndex];
  const stageLabel =
    stage < stages.length
      ? stages[stage]
      : stage === stages.length
      ? "DONE"
      : "RESET";

  return (
    <header
      id="hero"
      className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <GridBackground />
      <Glow size="lg" className="-top-32 left-1/2 -translate-x-1/2" />
      <Glow size="md" color="cyan" className="top-40 -right-20" />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-400 shadow-glow-sm animate-pulse-soft" />
          v{config.version} · {config.status}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 max-w-2xl"
        >
          <SystemLogTicker />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="headline mt-6 text-balance text-[44px] font-semibold leading-[0.95] tracking-tightest sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          <span className="block text-white/55">Most assistants</span>
          <span className="block text-white/85">answer.</span>
          <span className="mt-2 block">
            <span className="gradient-text-accent">Omnix</span>{" "}
            <span className="text-white">acts.</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="mt-6 max-w-2xl text-balance text-base text-white/65 sm:text-lg"
        >
          A voice-first AI agent built to understand your intent, operate your
          computer, and turn natural-language commands into real actions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button
            size="lg"
            leadingIcon={<Play className="h-4 w-4 fill-current" />}
            onClick={() => {
              const el = document.querySelector("#demo");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Try Omnix
          </Button>
          <Button
            size="lg"
            variant="secondary"
            trailingIcon={<ArrowRight className="h-4 w-4" />}
            onClick={() => {
              const el = document.querySelector("#architecture");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore the Architecture
          </Button>
          <a
            href={config.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mono inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-md"
        >
          <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to join the waitlist..."
              className="flex-1 h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder-white/40 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 transition-all"
              required
              disabled={waitlistStatus === "loading" || waitlistStatus === "success"}
            />
            <Button
              type="submit"
              disabled={waitlistStatus === "loading" || waitlistStatus === "success"}
              className="h-12 w-full sm:w-auto px-6 whitespace-nowrap"
            >
              {waitlistStatus === "loading" ? "Joining..." : waitlistStatus === "success" ? "Joined!" : "Join Waitlist"}
            </Button>
          </form>
          {waitlistStatus === "success" && (
            <p className="mt-3 text-sm text-accent-400 font-medium">You're on the list! We'll be in touch soon.</p>
          )}
          {waitlistStatus === "error" && (
            <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again.</p>
          )}
        </motion.div>

        {/* Live pipeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20"
        >
          <div className="glass relative overflow-hidden rounded-2xl p-1 shadow-[0_30px_120px_-30px_rgba(0,0,0,0.8)]">
            <div className="rounded-[14px] border border-white/5 bg-ink-900/40 p-5 sm:p-7">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-400/80" />
                  <span className="mono ml-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
                    omnix — live agent
                  </span>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                    simulation
                  </span>
                  <Sparkles className="h-3.5 w-3.5 text-accent-400" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
                {/* Request column */}
                <div className="lg:col-span-2">
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    user request
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5 }}
                      className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-accent-400 to-cyan-400" />
                        <p className="text-[15px] text-white/85">
                          “{current.request}”
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mono mt-4 text-[10px] uppercase tracking-[0.2em] text-white/40">
                    outcome
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                    {current.outcome.map((line) => (
                      <li key={line} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pipeline column */}
                <div className="lg:col-span-3">
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    omnix pipeline
                  </div>
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {stages.map((s, i) => {
                      const isActive = stage === i;
                      const isPast = stage > i;
                      return (
                        <div key={s} className="flex flex-col items-center">
                          <div className="relative w-full">
                            <div
                              className={`h-1.5 w-full rounded-full transition-colors duration-500 ${
                                isPast
                                  ? "bg-accent-400/70"
                                  : isActive
                                  ? "bg-accent-400/30"
                                  : "bg-white/10"
                              }`}
                            />
                            {isActive && (
                              <motion.div
                                layoutId="pipeline-dot"
                                className="absolute -top-1 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-accent-400 shadow-glow-sm"
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 28,
                                }}
                              />
                            )}
                          </div>
                          <div
                            className={`mono mt-2 text-[10px] uppercase tracking-[0.18em] ${
                              isActive
                                ? "text-white"
                                : isPast
                                ? "text-accent-300"
                                : "text-white/40"
                            }`}
                          >
                            {s}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Active stage card */}
                  <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between">
                      <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                        current stage
                      </div>
                      <div className="mono text-[10px] uppercase tracking-[0.2em] text-accent-300">
                        {stageLabel}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="relative inline-flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400/60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
                      </span>
                      <span className="text-[15px] text-white/90">
                        {stage < stages.length
                          ? stages[stage][0] +
                            stages[stage].slice(1).toLowerCase() +
                            " · " +
                            current.steps.find(
                              (s) => s.label.toUpperCase() === stages[stage]
                            )?.detail
                          : "Task completed."}
                      </span>
                    </div>

                    {/* mini log */}
                    <div className="mono mt-5 space-y-1 rounded-lg border border-white/5 bg-black/40 p-3 text-[12px] text-white/55">
                      {current.steps.slice(0, stage + 1).map((s, i) => (
                        <div key={s.id} className="flex items-center gap-2">
                          <span className="text-white/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-white/55">
                            {s.label.toLowerCase()}
                          </span>
                          <span className="text-white/30">·</span>
                          <span className="text-white/70">{s.detail}</span>
                          {i === Math.min(stage, current.steps.length - 1) && (
                            <span className="ml-auto text-accent-300">▍</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Loop", "Reason · Act · Verify"],
              ["Input", "Voice · Text"],
              ["Target", "Desktop · Browser · Apps"],
              ["Mode", "Interactive simulation"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="glass rounded-xl px-4 py-3"
              >
                <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {k}
                </div>
                <div className="mt-1 text-sm text-white/85">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
