import {
  Mic,
  ListChecks,
  Eye,
  MousePointerClick,
  Globe,
  AppWindow,
  Workflow,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CapabilityStatus = "available" | "in-development" | "planned";

export interface Capability {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  status: CapabilityStatus;
  tags: string[];
}

export const capabilities: Capability[] = [
  {
    id: "voice-first",
    title: "Voice-first interaction",
    description: "Talk naturally to Omnix and receive spoken progress updates.",
    longDescription:
      "Omnix is designed to be spoken to like a collaborator. The voice loop captures intent, streams recognition, and surfaces real-time progress so the user knows what is happening at every step.",
    icon: Mic,
    status: "in-development",
    tags: ["audio", "intent"],
  },
  {
    id: "task-planning",
    title: "Task planning",
    description:
      "Convert a high-level request into a sequence of executable steps.",
    longDescription:
      "Given a natural-language command, the planner decomposes it into a directed graph of actions, handles ordering, and re-plans when intermediate steps fail or change context.",
    icon: ListChecks,
    status: "available",
    tags: ["reasoning", "graph"],
  },
  {
    id: "computer-perception",
    title: "Computer perception",
    description:
      "Understand the current state of the desktop, windows, and on-screen content.",
    longDescription:
      "Omnix uses vision grounding and accessibility metadata to find the right element on screen. It locates controls, reads labels, and reasons about what is visible before acting.",
    icon: Eye,
    status: "in-development",
    tags: ["vision", "grounding"],
  },
  {
    id: "computer-interaction",
    title: "Computer interaction",
    description:
      "Interact with desktop applications and interface elements directly.",
    longDescription:
      "Mouse, keyboard, drag, click, type, scroll. Omnix operates the same way a person would, so it can work with software that does not expose an API.",
    icon: MousePointerClick,
    status: "in-development",
    tags: ["input", "desktop"],
  },
  {
    id: "browser-automation",
    title: "Browser automation",
    description: "Navigate the web, fill forms, and complete browser-based tasks.",
    longDescription:
      "Open pages, follow links, type into fields, and complete workflows in a real browser session — the same one a human would use.",
    icon: Globe,
    status: "in-development",
    tags: ["web", "navigation"],
  },
  {
    id: "app-control",
    title: "Application control",
    description: "Launch and operate supported desktop applications.",
    longDescription:
      "Omnix can launch apps, switch between them, and interact with their primary controls. Coverage expands as more applications are mapped.",
    icon: AppWindow,
    status: "planned",
    tags: ["apps", "launch"],
  },
  {
    id: "multi-step",
    title: "Multi-step execution",
    description: "Run workflows that require several coordinated actions.",
    longDescription:
      "Long-running tasks are split into observable steps with clear handoffs. Omnix communicates progress between steps and recovers from transient failures.",
    icon: Workflow,
    status: "in-development",
    tags: ["workflow"],
  },
  {
    id: "verification",
    title: "Verification",
    description:
      "Check whether an action actually succeeded before moving on.",
    longDescription:
      "After every action, Omnix inspects the new state of the environment and confirms the expected outcome. If the action did not land, it re-plans.",
    icon: ShieldCheck,
    status: "in-development",
    tags: ["safety", "loop"],
  },
];
