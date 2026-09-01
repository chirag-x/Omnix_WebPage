import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Layers, Cpu, Eye, MousePointerClick, ShieldCheck, MessageSquare, Globe, AppWindow, Monitor, User } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { architecture, type ArchitectureNode } from "@/data/architecture";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  user: User,
  engine: Cpu,
  reason: Layers,
  plan: Layers,
  perceive: Eye,
  action: MousePointerClick,
  browser: Globe,
  apps: AppWindow,
  desktop: Monitor,
  verification: ShieldCheck,
  result: MessageSquare,
};

const groupLabels: Record<ArchitectureNode["group"], string> = {
  input: "Input",
  core: "Omnix Engine",
  action: "Action Layer",
  environment: "Environment",
  verification: "Verify & Report",
};

function findNode(id: string) {
  return architecture.find((n) => n.id === id) ?? null;
}

export function Architecture() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<string>("engine");

  const user = findNode("user")!;
  const engine = findNode("engine")!;
  const reason = findNode("reason")!;
  const plan = findNode("plan")!;
  const perceive = findNode("perceive")!;
  const action = findNode("action")!;
  const browser = findNode("browser")!;
  const apps = findNode("apps")!;
  const desktop = findNode("desktop")!;
  const verification = findNode("verification")!;
  const result = findNode("result")!;

  const selectedNode = findNode(selected)!;

  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="An engine that closes the loop."
      description="Hover or tap a node to see what it does. Omnix reasons, plans, perceives, acts, verifies, and reports — through a single orchestrated engine."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Diagram */}
        <div className="lg:col-span-8">
          <div className="glass relative overflow-hidden rounded-2xl p-4 sm:p-6">
            <div className="absolute inset-0 grid-bg-fine pointer-events-none opacity-50" />
            <div className="relative">
              {/* User */}
              <NodeBlock
                node={user}
                onClick={setSelected}
                icon={iconMap[user.id]}
                accent="user"
              />
              <Connector />
              {/* Engine */}
              <NodeBlock
                node={engine}
                onClick={setSelected}
                icon={iconMap[engine.id]}
                accent="engine"
              />
              <Connector />

              {/* Reason / Plan / Perceive trio */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <NodeBlock
                  node={reason}
                  onClick={setSelected}
                  icon={iconMap[reason.id]}
                  accent="core"
                />
                <NodeBlock
                  node={plan}
                  onClick={setSelected}
                  icon={iconMap[plan.id]}
                  accent="core"
                />
                <NodeBlock
                  node={perceive}
                  onClick={setSelected}
                  icon={iconMap[perceive.id]}
                  accent="core"
                />
              </div>
              <Connector />

              {/* Action */}
              <NodeBlock
                node={action}
                onClick={setSelected}
                icon={iconMap[action.id]}
                accent="action"
              />
              <Connector />

              {/* Environment trio */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <NodeBlock
                  node={browser}
                  onClick={setSelected}
                  icon={iconMap[browser.id]}
                  accent="env"
                />
                <NodeBlock
                  node={apps}
                  onClick={setSelected}
                  icon={iconMap[apps.id]}
                  accent="env"
                />
                <NodeBlock
                  node={desktop}
                  onClick={setSelected}
                  icon={iconMap[desktop.id]}
                  accent="env"
                />
              </div>
              <Connector />

              {/* Verification */}
              <NodeBlock
                node={verification}
                onClick={setSelected}
                icon={iconMap[verification.id]}
                accent="verify"
              />
              <Connector />

              {/* Result */}
              <NodeBlock
                node={result}
                onClick={setSelected}
                icon={iconMap[result.id]}
                accent="result"
              />
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-4">
          <div className="glass sticky top-24 overflow-hidden rounded-2xl p-6">
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {groupLabels[selectedNode.group]}
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent-400/30 bg-accent-400/10 text-accent-300">
                {(() => {
                  const Icon = iconMap[selectedNode.id] ?? Cpu;
                  return <Icon className="h-5 w-5" />;
                })()}
              </span>
              <h3 className="text-xl font-semibold tracking-tight text-white">
                {selectedNode.label}
              </h3>
            </div>
            <p className="mt-3 text-sm text-white/75">
              {selectedNode.description}
            </p>
            <p className="mt-3 text-sm text-white/55">
              {selectedNode.longDescription}
            </p>

            <div className="divider my-6" />

            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Pipeline
            </div>
            <ol className="mt-3 space-y-2 text-sm text-white/70">
              {[
                "Input",
                "Reason",
                "Plan",
                "Perceive",
                "Act",
                "Verify",
                "Result",
              ].map((stage, i) => (
                <li
                  key={stage}
                  className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2"
                >
                  <span className="mono text-[10px] text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{stage}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );

  function NodeBlock({
    node,
    onClick,
    icon: Icon,
    accent,
  }: {
    node: ArchitectureNode;
    onClick: (id: string) => void;
    icon: LucideIcon;
    accent: "user" | "engine" | "core" | "action" | "env" | "verify" | "result";
  }) {
    const isActive = selected === node.id;
    const accentClass = {
      user: "border-white/15",
      engine:
        "border-accent-400/30 bg-accent-400/[0.06] shadow-[0_0_40px_-18px_rgba(43,227,158,0.6)]",
      core: "border-white/10",
      action: "border-cyan-400/20 bg-cyan-400/[0.04]",
      env: "border-white/10",
      verify: "border-accent-400/20",
      result: "border-white/15",
    }[accent];
    return (
      <motion.button
        type="button"
        onClick={() => onClick(node.id)}
        whileHover={reduced ? undefined : { y: -2 }}
        transition={{ duration: 0.2 }}
        className={`group relative w-full overflow-hidden rounded-xl border bg-white/[0.02] p-4 text-left transition ${
          isActive
            ? "ring-1 ring-accent-400/40 " + accentClass
            : accentClass
        } hover:bg-white/[0.04]`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] ${
              isActive ? "text-accent-300" : "text-white/70"
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white">{node.label}</div>
            <div className="truncate text-xs text-white/50">
              {node.description}
            </div>
          </div>
        </div>
        {isActive && (
          <motion.span
            layoutId="arch-active"
            className="absolute inset-0 -z-10 rounded-xl ring-1 ring-accent-400/40"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.button>
    );
  }

  function Connector() {
    return (
      <div className="flex justify-center py-3" aria-hidden>
        <div className="relative flex h-6 w-6 items-center justify-center text-white/30">
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    );
  }
}
