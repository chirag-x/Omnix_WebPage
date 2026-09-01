import { Section } from "@/components/primitives/Section";
import { changelog } from "@/data/changelog";
import { Plus, RefreshCw, Wrench, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const typeIcon: Record<"added" | "changed" | "fixed" | "removed", LucideIcon> = {
  added: Plus,
  changed: RefreshCw,
  fixed: Wrench,
  removed: Trash2,
};

const typeStyle: Record<"added" | "changed" | "fixed" | "removed", string> = {
  added: "text-accent-300 border-accent-400/30 bg-accent-400/10",
  changed: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  fixed: "text-amber-300 border-amber-300/30 bg-amber-300/10",
  removed: "text-rose-300 border-rose-400/30 bg-rose-400/10",
};

export function ChangelogPanel() {
  return (
    <Section
      id="changelog"
      eyebrow="Changelog"
      title="Every release, every change."
      description="Public, written like an engineering changelog — not a marketing post."
    >
      <div className="glass relative overflow-hidden rounded-2xl">
        <ul className="divide-y divide-white/[0.05]">
          {changelog.map((entry) => (
            <li key={entry.id} className="p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="mono rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/75">
                  {entry.version}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {entry.date}
                </span>
                <h3 className="ml-auto text-base font-semibold tracking-tight text-white">
                  {entry.title}
                </h3>
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                {entry.changes.map((c, i) => {
                  const Icon = typeIcon[c.type];
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
                    >
                      <span
                        className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${typeStyle[c.type]}`}
                      >
                        <Icon className="h-3 w-3" />
                      </span>
                      <div className="min-w-0">
                        <span className="mono mr-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
                          {c.type}
                        </span>
                        <span className="text-sm text-white/80">{c.text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
