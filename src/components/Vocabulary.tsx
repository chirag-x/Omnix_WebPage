import { useState } from "react";
import { Section } from "@/components/primitives/Section";
import { vocabulary } from "@/data/vocabulary";
import { BookOpen, Link2 } from "lucide-react";

export function Vocabulary() {
  const [active, setActive] = useState(vocabulary[0].id);
  const term = vocabulary.find((v) => v.id === active) ?? vocabulary[0];
  return (
    <Section
      id="vocabulary"
      eyebrow="Vocabulary"
      title="The terms Omnix uses — and what they mean."
      description="A small, cross-linked dictionary of the concepts you’ll see across this site and the engine."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="glass overflow-hidden rounded-2xl">
            <ul className="divide-y divide-white/[0.05]">
              {vocabulary.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => setActive(v.id)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                      active === v.id
                        ? "bg-white/[0.04] text-white"
                        : "text-white/70 hover:bg-white/[0.02] hover:text-white"
                    }`}
                  >
                    <span className="text-sm">{v.term}</span>
                    <span
                      className={`mono text-[10px] uppercase tracking-[0.18em] ${
                        active === v.id ? "text-accent-300" : "text-white/35"
                      }`}
                    >
                      ›
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:col-span-8">
          <div className="glass h-full overflow-hidden rounded-2xl p-6">
            <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <BookOpen className="h-3.5 w-3.5" />
              term
            </div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {term.term}
            </h3>
            <p className="mt-2 text-sm text-white/75">{term.short}</p>
            <p className="mt-3 text-sm text-white/60">{term.long}</p>
            <div className="divider my-5" />
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              related
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {term.related.map((r) => {
                const other = vocabulary.find((v) => v.id === r);
                if (!other) return null;
                return (
                  <button
                    key={r}
                    onClick={() => setActive(r)}
                    className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/80 transition hover:border-white/20 hover:text-white"
                  >
                    <Link2 className="h-3 w-3" />
                    {other.term}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
