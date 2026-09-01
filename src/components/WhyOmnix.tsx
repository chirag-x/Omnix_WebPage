import { Check, Minus } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";

const traditional = [
  "Generates responses",
  "Gives instructions",
  "Waits for the user",
  "Mostly lives inside a chat window",
];

const omnix = [
  "Understands intent",
  "Plans actions",
  "Perceives the computer",
  "Interacts with applications",
  "Executes multi-step workflows",
  "Verifies results",
  "Communicates progress",
];

export function WhyOmnix() {
  return (
    <Section
      id="why"
      eyebrow="The difference"
      title={
        <>
          Most assistants answer.
          <br />
          <span className="gradient-text-accent">Omnix</span> acts.
        </>
      }
      description="The architectural difference is not a tone. It is a loop. Omnix reasons about a request, acts on the computer, and verifies the result before reporting back."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Traditional */}
        <Reveal>
          <div className="glass relative h-full overflow-hidden rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                Traditional AI
              </div>
              <span className="mono rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/55">
                Reactive
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white/85 md:text-3xl">
              Helpful — once asked.
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/55">
              Most assistants wait for a prompt, generate text, and stop. The
              user remains the one who actually does the work.
            </p>
            <ul className="mt-6 space-y-3">
              {traditional.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3"
                >
                  <Minus className="mt-0.5 h-4 w-4 text-white/40" />
                  <span className="text-sm text-white/70">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Omnix */}
        <Reveal delay={0.08}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-accent-400/20 bg-gradient-to-b from-accent-400/[0.06] to-transparent p-6 md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent-400/20 blur-3xl"
            />
            <div className="flex items-center justify-between">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-accent-300">
                Omnix
              </div>
              <span className="mono inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-accent-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-soft" />
                Agent loop
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Helpful — even when you’re not typing.
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/65">
              Omnix closes the loop between intent and outcome. It plans,
              perceives, acts, and verifies — then reports what happened.
            </p>
            <ul className="mt-6 space-y-2">
              {omnix.map((line, i) => (
                <li
                  key={line}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5"
                >
                  <span className="mono text-[10px] text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Check className="h-4 w-4 text-accent-400" />
                  <span className="text-sm text-white/85">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
