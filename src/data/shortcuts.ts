export interface Shortcut {
  keys: string[];
  action: string;
  description: string;
  group: "navigation" | "actions" | "ui";
}

export const shortcuts: Shortcut[] = [
  { keys: ["⌘", "K"], action: "openCommandPalette", description: "Open command palette", group: "ui" },
  { keys: ["?"], action: "showShortcuts", description: "Show keyboard shortcuts", group: "ui" },
  { keys: ["Esc"], action: "close", description: "Close any open overlay", group: "ui" },
  { keys: ["G", "H"], action: "goHero", description: "Go to hero", group: "navigation" },
  { keys: ["G", "A"], action: "goArchitecture", description: "Go to architecture", group: "navigation" },
  { keys: ["G", "C"], action: "goCapabilities", description: "Go to capabilities", group: "navigation" },
  { keys: ["G", "D"], action: "goDemo", description: "Go to demo", group: "navigation" },
  { keys: ["G", "R"], action: "goRoadmap", description: "Go to roadmap", group: "navigation" },
  { keys: ["G", "S"], action: "goStatus", description: "Go to system status", group: "navigation" },
  { keys: ["G", "V"], action: "goVision", description: "Go to future vision", group: "navigation" },
  { keys: ["G", "G"], action: "goGitHub", description: "Go to GitHub CTA", group: "navigation" },
  { keys: ["R", "D"], action: "toggleAmbient", description: "Toggle ambient sound", group: "actions" },
  { keys: ["/"], action: "focusCommandPalette", description: "Focus command palette", group: "ui" },
];
