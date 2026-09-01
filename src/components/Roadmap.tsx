import { Check, Clock, Sparkles, Circle } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { roadmap, type RoadmapItemStatus } from "@/data/roadmap";

const styles: Record<
  RoadmapItemStatus,
  { icon: typeof Check; color: string; ring: string; label: string }
> = {
  done: {
    icon: Check,
    color: "text-accent-300",
    ring: "border-accent-400/30 bg-accent-400/10",
    label: "Done",
  },
  "in-progress": {
    icon: Clock,
    color: "text-cyan-300",
    ring: "border-cyan-400/30 bg-cyan-400/10",
    label: "In progress",
  },
  planned: {
    icon: Circle,
    color: "text-white/60",
    ring: "border-white/10 bg-white/[0.02]",
    label: "Planned",
  },
};

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      eyebrow="Roadmap"
      title="Where Omnix is going."
      description="Updated as the project moves. Items are configurable in a single data file so the site stays honest about progress."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {roadmap.map((track) => (
          <div
            key={track.id}
            className="glass relative overflow-hidden rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {track.title}
              </h3>
              <Sparkles className="h-4 w-4 text-accent-300" />
            </div>
            <p className="mt-1 text-sm text-white/55">{track.description}</p>
            <ul className="mt-5 space-y-2">
              {track.items.map((item) => {
                const s = styles[item.status];
                const Icon = s.icon;
                return (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
                  >
                    <span
                      className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${s.ring}`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/85">
                          {item.label}
                        </span>
                        <span
                          className={`mono text-[10px] uppercase tracking-[0.18em] ${s.color}`}
                        >
                          · {s.label}
                        </span>
                      </div>
                      {item.note && (
                        <p className="mt-1 text-xs text-white/45">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
