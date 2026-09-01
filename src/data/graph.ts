export interface GraphNode {
  id: string;
  label: string;
  x: number; // 0..1 horizontal
  y: number; // 0..1 vertical
  size: number; // radius
  group: "core" | "io" | "action" | "memory";
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number; // 0..1 thickness
}

export const graphNodes: GraphNode[] = [
  { id: "engine", label: "OmnixEngine", x: 0.5, y: 0.18, size: 22, group: "core" },
  { id: "planner", label: "Planner", x: 0.22, y: 0.42, size: 18, group: "core" },
  { id: "perception", label: "Perception", x: 0.78, y: 0.42, size: 18, group: "io" },
  { id: "voice", label: "Voice", x: 0.5, y: 0.42, size: 14, group: "io" },
  { id: "skills", label: "Skills", x: 0.12, y: 0.72, size: 16, group: "action" },
  { id: "control", label: "Control", x: 0.38, y: 0.72, size: 16, group: "action" },
  { id: "verify", label: "Verify", x: 0.62, y: 0.72, size: 16, group: "action" },
  { id: "memory", label: "Memory", x: 0.88, y: 0.72, size: 14, group: "memory" },
];

export const graphEdges: GraphEdge[] = [
  { from: "engine", to: "planner", weight: 1 },
  { from: "engine", to: "perception", weight: 0.9 },
  { from: "engine", to: "voice", weight: 0.7 },
  { from: "engine", to: "memory", weight: 0.6 },
  { from: "planner", to: "skills", weight: 0.9 },
  { from: "planner", to: "control", weight: 0.6 },
  { from: "perception", to: "control", weight: 0.8 },
  { from: "perception", to: "verify", weight: 0.7 },
  { from: "voice", to: "engine", weight: 0.8 },
  { from: "control", to: "verify", weight: 0.9 },
  { from: "verify", to: "planner", weight: 0.7 },
];
