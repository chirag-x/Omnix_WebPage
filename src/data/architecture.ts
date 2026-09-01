export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  longDescription: string;
  group: "input" | "core" | "action" | "verification" | "environment";
}

export const architecture: ArchitectureNode[] = [
  {
    id: "user",
    label: "User",
    description: "Voice or text request.",
    longDescription:
      "The user expresses intent in their own words. Omnix accepts either voice or text and does not require a specific command syntax.",
    group: "input",
  },
  {
    id: "engine",
    label: "Omnix Engine",
    description: "Central reasoning and orchestration layer.",
    longDescription:
      "The engine coordinates the planner, perception, and action layers. It holds the working state of a task and decides what to do next.",
    group: "core",
  },
  {
    id: "reason",
    label: "Reason",
    description: "Determine the right strategy for the request.",
    longDescription:
      "Reasoning interprets the user intent in context and selects a strategy — for example, that a 'search the web' request should be split into a browser launch, a navigation, and a query.",
    group: "core",
  },
  {
    id: "plan",
    label: "Plan",
    description: "Break the request into executable steps.",
    longDescription:
      "The planner produces a directed graph of actions. Each step has a clear precondition, a target, and an expected postcondition for verification.",
    group: "core",
  },
  {
    id: "perceive",
    label: "Perceive",
    description: "Understand the current state of the environment.",
    longDescription:
      "Perception reads the desktop, identifies windows and elements, and grounds the next action in what is actually visible right now.",
    group: "core",
  },
  {
    id: "action",
    label: "Action layer",
    description: "Perform the actual interaction with the computer.",
    longDescription:
      "The action layer translates intent into concrete input — mouse, keyboard, drag, click, type, scroll, and application-specific commands.",
    group: "action",
  },
  {
    id: "browser",
    label: "Browser",
    description: "Navigate and interact with web content.",
    longDescription:
      "Omnix operates a real browser session to navigate, fill forms, and complete web-based workflows.",
    group: "environment",
  },
  {
    id: "apps",
    label: "Applications",
    description: "Launch and operate supported desktop apps.",
    longDescription:
      "Omnix can launch applications and interact with their primary controls. Coverage expands as more apps are mapped.",
    group: "environment",
  },
  {
    id: "desktop",
    label: "Desktop",
    description: "The operating system environment itself.",
    longDescription:
      "At the deepest level, Omnix interacts with the desktop: windows, files, the system shell, and the underlying operating system.",
    group: "environment",
  },
  {
    id: "verification",
    label: "Verification",
    description: "Check whether an action succeeded.",
    longDescription:
      "After every action, Omnix re-reads the environment and confirms the expected outcome. Failed verifications trigger re-planning.",
    group: "verification",
  },
  {
    id: "result",
    label: "Result",
    description: "Tell the user what happened.",
    longDescription:
      "The result is reported back to the user in their preferred modality — voice, text, or both — along with any relevant context.",
    group: "verification",
  },
];
