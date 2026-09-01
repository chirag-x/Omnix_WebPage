import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Cpu, Brain, Eye, MousePointerClick, Mic, Database, Boxes, ShieldCheck } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import type { LucideIcon } from "lucide-react";

interface Component {
  id: string;
  name: string;
  purpose: string;
  role: string;
  status: "ready" | "wip" | "planned";
  relations: string[];
  icon: LucideIcon;
}

const components: Component[] = [
  {
    id: "engine",
    name: "OmnixEngine",
    purpose: "The central orchestration runtime.",
    role: "Holds working state, decides what to do next, and routes messages between modules.",
    status: "ready",
    relations: ["planner", "perception", "control", "voice"],
    icon: Cpu,
  },
  {
    id: "planner",
    name: "Task Planner",
    purpose: "Decomposes requests into action graphs.",
    role: "Builds a directed graph of steps with preconditions and postconditions. Re-plans on failure.",
    status: "ready",
    relations: ["engine", "verification"],
    icon: Brain,
  },
  {
    id: "perception",
    name: "Perception",
    purpose: "Reads the current state of the environment.",
    role: "Combines vision grounding with accessibility metadata to find elements reliably.",
    status: "wip",
    relations: ["engine", "control"],
    icon: Eye,
  },
  {
    id: "control",
    name: "Computer Control",
    purpose: "Drives the mouse, keyboard, and OS.",
    role: "Translates intent into concrete input on the actual machine.",
    status: "wip",
    relations: ["perception", "engine"],
    icon: MousePointerClick,
  },
  {
    id: "voice",
    name: "Voice",
    purpose: "Speech in, speech out.",
    role: "Captures intent from voice and narrates progress in natural language.",
    status: "wip",
    relations: ["engine"],
    icon: Mic,
  },
  {
    id: "memory",
    name: "Memory",
    purpose: "Cross-session context.",
    role: "Stores and recalls relevant prior tasks, preferences, and observations.",
    status: "planned",
    relations: ["engine", "planner"],
    icon: Database,
  },
  {
    id: "skills",
    name: "Skills",
    purpose: "Reusable capabilities.",
    role: "Encapsulated procedures the planner can invoke — app launchers, web searches, file ops.",
    status: "wip",
    relations: ["planner", "control"],
    icon: Boxes,
  },
  {
    id: "verification",
    name: "Verification",
    purpose: "Confirms each action succeeded.",
    role: "After every action, re-reads the environment and checks postconditions.",
    status: "wip",
    relations: ["engine", "planner"],
    icon: ShieldCheck,
  },
];

const statusStyles: Record<Component["status"], { label: string; cls: string }> = {
  ready: { label: "Ready", cls: "text-accent-300 border-accent-400/30 bg-accent-400/10" },
  wip: { label: "In progress", cls: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10" },
  planned: { label: "Planned", cls: "text-white/55 border-white/10 bg-white/[0.03]" },
};

export function UnderTheHood() {
  const reduced = useReducedMotion();
  const [openId, setOpenId] = useState<string>("engine");
  const active = components.find((c) => c.id === openId)!;

  return (
    <Section
      id="under-the-hood"
      eyebrow="Under the hood"
      title="Components you can read about — and contribute to."
      description="Click a module to see what it does, how it fits, and where it is today."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="glass overflow-hidden rounded-2xl">
            <ul className="divide-y divide-white/[0.05]">
              {components.map((c) => {
                const isOpen = c.id === openId;
                const Icon = c.icon;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => setOpenId(c.id)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                        isOpen
                          ? "bg-white/[0.04]"
                          : "hover:bg-white/[0.02]"
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                          isOpen
                            ? "border-accent-400/40 bg-accent-400/10 text-accent-300"
                            : "border-white/10 bg-white/[0.03] text-white/70"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-white/90">{c.name}</div>
                        <div className="truncate text-xs text-white/50">
                          {c.purpose}
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 text-white/40 transition ${
                          isOpen ? "rotate-90 text-accent-300" : ""
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="glass relative h-full overflow-hidden rounded-2xl p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      component
                    </div>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                      {active.name}
                    </h3>
                  </div>
                  <span
                    className={`mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${statusStyles[active.status].cls}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active.status === "ready"
                          ? "bg-accent-400"
                          : active.status === "wip"
                          ? "bg-cyan-400"
                          : "bg-white/40"
                      } ${active.status !== "planned" ? "animate-pulse-soft" : ""}`}
                    />
                    {statusStyles[active.status].label}
                  </span>
                </div>
                <p className="mt-4 text-sm text-white/75">{active.purpose}</p>
                <p className="mt-2 text-sm text-white/55">{active.role}</p>

                <div className="divider my-6" />

                <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  talks to
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.relations.map((rel) => {
                    const other = components.find((c) => c.id === rel);
                    if (!other) return null;
                    return (
                      <button
                        key={rel}
                        onClick={() => setOpenId(rel)}
                        className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/80 transition hover:border-white/20 hover:text-white"
                      >
                        {other.name}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
