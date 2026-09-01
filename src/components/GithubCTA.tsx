import { ArrowUpRight, Github, BookOpen, Cpu } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { GridBackground } from "@/components/primitives/GridBackground";
import { Glow } from "@/components/primitives/Glow";
import { config } from "@/config";

export function GithubCTA() {
  return (
    <Section
      id="github"
      eyebrow="Open source"
      title={
        <>
          Built in the <span className="gradient-text-accent">open</span>.
        </>
      }
      description="Omnix is an evolving experiment in building an AI agent that can move beyond conversation and interact with the computer itself."
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 sm:p-12">
        <GridBackground className="opacity-50" />
        <Glow size="lg" className="-top-20 left-1/2 -translate-x-1/2" />
        <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Most agents live behind a wall.
              <br />
              <span className="text-white/55">Omnix lives in a repository.</span>
            </h3>
            <p className="mt-4 max-w-xl text-sm text-white/65 sm:text-base">
              Read the source, follow the engineering, open issues, suggest
              skills. The architecture you just walked through is the same one
              you’ll see in the code.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={config.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink-950 transition hover:bg-accent-300"
              >
                <Github className="h-4 w-4" />
                View on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Button
                size="lg"
                variant="secondary"
                leadingIcon={<BookOpen className="h-4 w-4" />}
                onClick={() => {
                  const el = document.querySelector("#architecture");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore the Architecture
              </Button>
            </div>
            <p className="mono mt-5 text-[10px] uppercase tracking-[0.2em] text-white/40">
              placeholder repository · update <code>config.githubUrl</code> to point to the real one
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="glass relative overflow-hidden rounded-2xl p-5">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                repository preview
              </div>
              <pre className="mono mt-3 overflow-x-auto rounded-lg border border-white/5 bg-black/40 p-4 text-[12.5px] leading-relaxed text-white/75">
{`omnix/
├─ engine/        # orchestration runtime
├─ planner/       # action graphs
├─ perception/    # vision grounding
├─ control/       # desktop input
├─ voice/         # speech loop
├─ skills/        # reusable capabilities
└─ web/           # ← you are here`}
              </pre>
              <div className="mt-3 flex items-center gap-2 text-xs text-white/55">
                <Cpu className="h-3.5 w-3.5 text-accent-300" />
                Active development
                <span className="text-white/30">·</span>
                <span className="mono">v{config.version}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
