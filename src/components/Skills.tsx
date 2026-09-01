import { Section } from "@/components/primitives/Section";
import { skills, type Skill } from "@/data/skills";
import {
  Globe,
  AppWindow,
  FolderSearch,
  FileText,
  Clipboard,
  Bell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";

const categoryIcon: Record<Skill["category"], LucideIcon> = {
  web: Globe,
  system: AppWindow,
  files: FolderSearch,
  communication: Bell,
};

const categoryLabel: Record<Skill["category"], string> = {
  web: "Web",
  system: "System",
  files: "Files",
  communication: "Communication",
};

const categoryColor: Record<Skill["category"], string> = {
  web: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  system: "text-accent-300 border-accent-400/30 bg-accent-400/10",
  files: "text-amber-300 border-amber-300/30 bg-amber-300/10",
  communication: "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-300/10",
};

export function Skills() {
  const categories: Skill["category"][] = [
    "web",
    "system",
    "files",
    "communication",
  ];
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Small, addressable capabilities."
      description="The agent does its work by composing skills. Each one is a typed, addressable procedure with explicit preconditions and postconditions."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {categories.map((cat) => (
          <CategoryGroup key={cat} category={cat} />
        ))}
      </div>
    </Section>
  );
}

function CategoryGroup({ category }: { category: Skill["category"] }) {
  const Icon = categoryIcon[category];
  const items = skills.filter((s) => s.category === category);
  return (
    <Reveal>
      <div className="glass relative h-full overflow-hidden rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${categoryColor[category]}`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <h3 className="text-base font-semibold tracking-tight text-white">
              {categoryLabel[category]}
            </h3>
          </div>
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            {items.length} skills
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {items.map((s) => {
            const I =
              s.category === "files" ? FileText : s.category === "system" ? Clipboard : Globe;
            return (
              <li
                key={s.id}
                className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
              >
                <div className="flex items-center gap-2">
                  <I className="h-3.5 w-3.5 text-accent-300" />
                  <code className="mono text-[12.5px] text-white/85">
                    {s.name}
                  </code>
                </div>
                <p className="mt-1 text-xs text-white/55">{s.description}</p>
                <pre className="mono mt-2 overflow-x-auto rounded-md border border-white/5 bg-black/40 px-2.5 py-2 text-[11.5px] text-white/65">
                  {s.example}
                </pre>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
