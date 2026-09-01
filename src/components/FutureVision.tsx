import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, Sparkles, Cpu, Bot } from "lucide-react";
import { Section } from "@/components/primitives/Section";

const stages = [
  { id: "chat", label: "Chat", icon: MessageSquare, blurb: "Single turn. One prompt, one response." },
  { id: "assist", label: "Assist", icon: Sparkles, blurb: "Helpful inside a tool. The user still drives." },
  { id: "agent", label: "Agent", icon: Cpu, blurb: "Plans and acts. Closes the loop on its own." },
  { id: "partner", label: "Computer partner", icon: Bot, blurb: "Operates the computer, end to end, with you." },
];

export function FutureVision() {
  const reduced = useReducedMotion();
  return (
    <Section
      id="vision"
      eyebrow="Future vision"
      title={
        <>
          The goal isn’t another chatbot.
          <br />
          <span className="gradient-text-accent">It’s a partner on the computer.</span>
        </>
      }
      description="Conceptual, not a promise. The trajectory Omnix is exploring — chat, assist, agent, partner."
    >
      <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-bg-fine opacity-50"
        />
        <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-2">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.id} className="relative">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    <div
                      className={`relative mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border ${
                        i === stages.length - 1
                          ? "border-accent-400/40 bg-accent-400/10 text-accent-300 shadow-glow-sm"
                          : "border-white/10 bg-white/[0.03] text-white/80"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    {i < stages.length - 1 && (
                      <div
                        aria-hidden
                        className="absolute left-full top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-white/15 to-transparent sm:block"
                      />
                    )}
                  </motion.div>
                  <div className="mono mt-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
                    stage {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-base font-semibold tracking-tight text-white">
                    {s.label}
                  </div>
                  <p className="mt-1 max-w-[180px] text-xs text-white/55">
                    {s.blurb}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="divider my-10" />
        <p className="text-center text-sm text-white/55">
          The goal is an AI that can understand what you want, understand the
          environment it operates in, and take meaningful action on your behalf.
        </p>
      </div>
    </Section>
  );
}
