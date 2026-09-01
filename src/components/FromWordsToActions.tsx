import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Section } from "@/components/primitives/Section";
import { flowStages } from "@/data/flow";
import {
  Brain,
  Lightbulb,
  ListChecks,
  Eye,
  MousePointerClick,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  intent: MessageSquare,
  reason: Brain,
  plan: ListChecks,
  perceive: Eye,
  act: MousePointerClick,
  verify: ShieldCheck,
  result: Lightbulb,
};

export function FromWordsToActions() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <Section
      id="flow"
      eyebrow="From words to actions"
      title="Every request moves through a transparent loop."
      description="Each stage is observable, recoverable, and auditable. You see what Omnix is doing — and why."
    >
      <div ref={ref} className="relative">
        {/* Vertical spine (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block"
        />

        <ol className="flex flex-col gap-10 md:gap-16">
          {flowStages.map((s, i) => {
            const Icon = iconMap[s.id] ?? Brain;
            const left = i % 2 === 0;
            return (
              <li key={s.id} className="relative md:grid md:grid-cols-2">
                {/* Spine dot (desktop) */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-ink-950 ring-1 ring-white/15 md:block"
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-accent-400"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      inView && !reduced
                        ? { scale: [0, 1.2, 1], opacity: 1 }
                        : undefined
                    }
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                  />
                </div>

                <div
                  className={`md:pr-12 ${
                    left ? "" : "md:col-start-2 md:pl-12 md:pr-0"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`glass relative overflow-hidden rounded-2xl p-6 ${
                      left ? "" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                        step {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                        {s.label}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-white/65 md:text-[15px]">
                      {s.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for opposite side on desktop */}
                {i % 2 === 0 ? (
                  <div className="hidden md:block" aria-hidden />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
