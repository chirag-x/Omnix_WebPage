import { useMemo, useState } from "react";
import { graphNodes, graphEdges, type GraphNode } from "@/data/graph";
import { Section } from "@/components/primitives/Section";

const groupColor: Record<GraphNode["group"], string> = {
  core: "#2be39e",
  io: "#22d3ee",
  action: "#a78bfa",
  memory: "#fbbf24",
};

const groupLabel: Record<GraphNode["group"], string> = {
  core: "Core",
  io: "I/O",
  action: "Action",
  memory: "Memory",
};

export function DependencyGraph() {
  const [hover, setHover] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const W = 600;
  const H = 380;

  const positioned = useMemo(
    () =>
      graphNodes.map((n) => ({
        ...n,
        px: n.x * W,
        py: n.y * H,
      })),
    []
  );

  const focusId = active ?? hover;
  const isFocused = (id: string) => {
    if (!focusId) return true;
    if (focusId === id) return true;
    const out = graphEdges.some(
      (e) => (e.from === focusId && e.to === id) || (e.to === focusId && e.from === id)
    );
    return out;
  };

  return (
    <Section
      id="dependencies"
      eyebrow="Dependency graph"
      title="How the modules talk to each other."
      description="Hover or tap a node to focus its connections. The graph is illustrative — the runtime can dispatch many more paths."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="glass relative overflow-hidden rounded-2xl p-3">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="block h-auto w-full"
              role="img"
              aria-label="Omnix module dependency graph"
            >
              <defs>
                <radialGradient id="bg-glow" cx="50%" cy="20%" r="60%">
                  <stop offset="0%" stopColor="rgba(43,227,158,0.10)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill="rgba(255,255,255,0.35)" />
                </marker>
              </defs>
              <rect width={W} height={H} fill="url(#bg-glow)" />

              {/* Edges */}
              {graphEdges.map((e) => {
                const a = positioned.find((p) => p.id === e.from);
                const b = positioned.find((p) => p.id === e.to);
                if (!a || !b) return null;
                const dim = !(isFocused(e.from) && isFocused(e.to));
                return (
                  <g key={`${e.from}-${e.to}`} opacity={dim ? 0.18 : 0.9}>
                    <line
                      x1={a.px}
                      y1={a.py}
                      x2={b.px}
                      y2={b.py}
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth={e.weight * 1.6}
                      markerEnd="url(#arrow)"
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {positioned.map((n) => {
                const isActive = focusId === n.id;
                const dim = !isFocused(n.id);
                const color = groupColor[n.group];
                return (
                  <g
                    key={n.id}
                    transform={`translate(${n.px} ${n.py})`}
                    onMouseEnter={() => setHover(n.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setActive((cur) => (cur === n.id ? null : n.id))}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      r={n.size + 8}
                      fill={color}
                      opacity={isActive ? 0.18 : 0.06}
                    />
                    <circle
                      r={n.size}
                      fill="#0a0d12"
                      stroke={color}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      opacity={dim ? 0.45 : 1}
                    />
                    <text
                      y={n.size + 16}
                      textAnchor="middle"
                      className="fill-white/85"
                      style={{
                        fontSize: 11,
                        fontFamily: "JetBrains Mono, monospace",
                        letterSpacing: 0.5,
                        opacity: dim ? 0.5 : 1,
                      }}
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              {(Object.keys(groupColor) as GraphNode["group"][]).map((g) => (
                <span
                  key={g}
                  className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/70"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: groupColor[g] }}
                  />
                  {groupLabel[g]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="glass sticky top-24 h-full overflow-hidden rounded-2xl p-5">
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {focusId ? "focused" : "all modules"}
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              {focusId
                ? graphNodes.find((n) => n.id === focusId)?.label
                : "Module map"}
            </h3>
            <p className="mt-2 text-sm text-white/65">
              {focusId
                ? `${graphEdges.filter((e) => e.from === focusId || e.to === focusId).length} direct connections.`
                : "Hover a node to see its role. Click to pin the focus."}
            </p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {positioned.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 ${
                    focusId === n.id ? "ring-1 ring-accent-400/40" : ""
                  }`}
                >
                  <span className="text-white/85">{n.label}</span>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: groupColor[n.group] }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
