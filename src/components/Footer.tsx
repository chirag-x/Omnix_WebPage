import { Github, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/primitives/Logo";
import { config } from "@/config";
import { navLinks } from "@/data/nav";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size={28} />
            <p className="mt-4 max-w-sm text-balance text-2xl font-semibold tracking-tight text-white/90">
              Most assistants answer.
              <br />
              <span className="gradient-text-accent">Omnix</span> acts.
            </p>
            <p className="mt-3 max-w-sm text-sm text-white/55">
              A voice-first AI desktop agent. Built in the open.
            </p>
            <a
              href={config.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mono mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 text-sm text-white/85 transition hover:border-white/25 hover:text-white"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>

          <div className="md:col-span-4">
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Site
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    className="text-white/70 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={config.docsUrl}
                  className="text-white/70 transition hover:text-white"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Project
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-white/70">v{config.version}</li>
              <li className="text-white/70">{config.status}</li>
              <li className="text-white/70">© {year} Omnix</li>
            </ul>
          </div>
        </div>

        <div className="divider mt-12" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>Built with curiosity, engineering, and a lot of iteration.</p>
          <p className="mono">omnix — v{config.version}</p>
        </div>
      </div>
    </footer>
  );
}
