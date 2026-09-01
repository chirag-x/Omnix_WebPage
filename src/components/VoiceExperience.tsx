import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mic, Volume2, Sparkles } from "lucide-react";
import { Section } from "@/components/primitives/Section";

const transcript: { speaker: "user" | "omnix"; text: string }[] = [
  { speaker: "user", text: "Omnix, open Chrome and search for the latest AI agent news." },
  { speaker: "omnix", text: "I'm opening Chrome." },
  { speaker: "omnix", text: "Chrome is open. Searching now." },
  { speaker: "omnix", text: "Done. I found several recent results." },
];

export function VoiceExperience() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % (transcript.length + 1));
    }, 2200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <Section
      id="voice"
      eyebrow="Voice-first"
      title={
        <>
          Don’t talk to a chatbot.
          <br />
          <span className="gradient-text-accent">Talk to your computer.</span>
        </>
      }
      description="Omnix is designed to be spoken to like a collaborator. It narrates what it’s doing, in real time, so you always know what is happening."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Cinematic visual */}
        <div className="lg:col-span-7">
          <div className="glass relative overflow-hidden rounded-2xl p-1">
            <div className="relative overflow-hidden rounded-[14px] border border-white/5 bg-gradient-to-b from-ink-900 to-ink-950 px-6 py-10 sm:px-10 sm:py-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 grid-bg-fine opacity-40"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/15 blur-3xl"
              />

              <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
                <VoiceOrb active={step < transcript.length} reduced={!!reduced} />
                <div className="mt-8 text-[10px] uppercase tracking-[0.24em] text-white/40">
                  omnix voice · live
                </div>
                <div className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {step === 0
                    ? "Listening…"
                    : step <= transcript.length
                    ? "Processing request"
                    : "Standing by"}
                </div>
                <div className="mono mt-1 text-[11px] uppercase tracking-[0.2em] text-accent-300">
                  {step === 0
                    ? "voice channel open"
                    : step <= transcript.length
                    ? `turn ${step} / ${transcript.length}`
                    : "ready"}
                </div>
              </div>

              {/* Decorative meters */}
              <div className="absolute inset-x-6 bottom-6 flex items-center gap-1 sm:inset-x-10">
                {Array.from({ length: 32 }).map((_, i) => {
                  const h = 8 + ((i * 13) % 28);
                  const active = step > 0 && i < step * 6;
                  return (
                    <span
                      key={i}
                      className={`block w-1.5 rounded-full transition-all duration-500 ${
                        active
                          ? "bg-accent-400/80"
                          : "bg-white/10"
                      }`}
                      style={{ height: `${h}px` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="lg:col-span-5">
          <div className="glass relative h-full overflow-hidden rounded-2xl p-6">
            <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <Volume2 className="h-3.5 w-3.5" />
              transcript
            </div>
            <div className="mt-4 space-y-3">
              {transcript.map((line, i) => {
                const visible = step > i;
                return (
                  <AnimatePresence key={i} mode="popLayout">
                    {visible && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className={`flex gap-3 ${
                          line.speaker === "user"
                            ? "items-start"
                            : "items-start"
                        }`}
                      >
                        <span
                          className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                            line.speaker === "user"
                              ? "border-white/15 bg-white/[0.05] text-white/80"
                              : "border-accent-400/30 bg-accent-400/10 text-accent-300"
                          }`}
                          aria-hidden
                        >
                          {line.speaker === "user" ? (
                            <Mic className="h-3 w-3" />
                          ) : (
                            <Sparkles className="h-3 w-3" />
                          )}
                        </span>
                        <div
                          className={`rounded-2xl border px-4 py-2.5 text-sm ${
                            line.speaker === "user"
                              ? "border-white/10 bg-white/[0.04] text-white/85"
                              : "border-accent-400/20 bg-accent-400/[0.06] text-white/90"
                          }`}
                        >
                          <div className="mono mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {line.speaker === "user" ? "You" : "Omnix"}
                          </div>
                          {line.text}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
              {step === 0 && (
                <div className="text-sm text-white/40">Awaiting input…</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function VoiceOrb({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  return (
    <div className="relative h-44 w-44">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-accent-400/30"
          animate={
            !reduced && active
              ? { scale: [1, 1.25 + i * 0.1, 1], opacity: [0.5, 0, 0.5] }
              : { scale: 1, opacity: 0.2 }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent-400/40 to-cyan-400/30 shadow-[0_0_60px_-10px_rgba(43,227,158,0.6)] backdrop-blur" />
      <div className="absolute inset-10 rounded-full bg-ink-950/80 ring-1 ring-white/10 backdrop-blur" />
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
        <Mic className="h-6 w-6 text-accent-300" />
      </div>
    </div>
  );
}
