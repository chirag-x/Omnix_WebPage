export interface SystemComponent {
  id: string;
  label: string;
  status: "operational" | "active-dev" | "experimental" | "planned";
  detail: string;
}

export const systemComponents: SystemComponent[] = [
  {
    id: "engine",
    label: "Core Engine",
    status: "active-dev",
    detail: "Stable orchestration layer for planning and execution.",
  },
  {
    id: "planner",
    label: "Planner",
    status: "active-dev",
    detail: "Decomposes high-level requests into directed action graphs.",
  },
  {
    id: "voice",
    label: "Voice",
    status: "experimental",
    detail: "Capture and spoken progress, with execution narration.",
  },
  {
    id: "perception",
    label: "Perception",
    status: "experimental",
    detail: "Vision grounding and accessibility-aware element detection.",
  },
  {
    id: "control",
    label: "Computer control",
    status: "experimental",
    detail: "Mouse, keyboard, and direct OS-level interaction.",
  },
  {
    id: "verification",
    label: "Verification",
    status: "active-dev",
    detail: "Re-reads environment state to confirm each action succeeded.",
  },
];

export interface BuildInfo {
  version: string;
  status: string;
  buildId: string;
  releasedAt: string;
}
