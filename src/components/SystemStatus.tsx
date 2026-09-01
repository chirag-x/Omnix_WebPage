import { Cpu, Brain, Mic, Eye, MousePointerClick, ShieldCheck } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { systemComponents, type SystemComponent } from "@/data/status";
import type { LucideIcon } from "lucide-react";
import { config } from "@/config";
import { LiveClock } from "@/components/LiveClock";

const iconMap: Record<string, LucideIcon> = {
  engine: Cpu,
  planner: Brain,
  voice: Mic,
  perception: Eye,
  control: MousePointerClick,
  verification: ShieldCheck,
};

const statusStyles: Record<
  SystemComponent["status"],
  { label: string; color: string; dot: string }
> = {
  operational: {
    label: "Operational",
    color: "text-accent-300",
    dot: "bg-accent-400",
  },
  "active-dev": {
    label: "Active dev",
    color: "text-cyan-300",
    dot: "bg-cyan-400",
  },
  experimental: {
    label: "Experimental",
    color: "text-amber-300",
    dot: "bg-amber-300",
  },
  planned: {
    label: "Planned",
    color: "text-white/50",
    dot: "bg-white/40",
  },
};

export function SystemStatus() {
  return (
    <Section
      id="status"
      eyebrow="System status"
      title="A live, honest view of the project."
      description="The site reflects the actual state of the engine, not a marketing ideal."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="glass overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 text-xs text-white/55">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                omnix system status
              </div>
              <div className="mono flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-soft" />
                live
              </div>
              <LiveClock className="ml-3" />
            </div>
            <ul className="divide-y divide-white/[0.05]">
              {systemComponents.map((c) => {
                const s = statusStyles[c.status];
                const Icon = iconMap[c.id] ?? Cpu;
                return (
                  <li
                    key={c.id}
                    className="flex items-center gap-4 px-5 py-4"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/80">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {c.label}
                        </span>
                        <span
                          className={`mono text-[10px] uppercase tracking-[0.18em] ${s.color}`}
                        >
                          · {s.label}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-white/45">
                        {c.detail}
                      </p>
                    </div>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${s.dot} ${
                        c.status !== "planned" ? "animate-pulse-soft" : ""
                      }`}
                      aria-hidden
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass h-full overflow-hidden rounded-2xl p-6">
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              build
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Version" value={config.version} />
              <Stat label="Status" value={config.status} />
              <Stat label="Channel" value="nightly" />
              <Stat label="Visibility" value="open source" />
            </div>
            <div className="divider my-6" />
            <p className="text-sm text-white/65">
              The roadmap, system status, and capabilities are all driven by
              data. Update a single file to refresh the site.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
      <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </div>
      <div className="mt-1 text-sm text-white/85">{value}</div>
    </div>
  );
}
