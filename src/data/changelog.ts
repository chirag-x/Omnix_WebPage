export interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  changes: { type: "added" | "changed" | "fixed" | "removed"; text: string }[];
}

export const changelog: ChangelogEntry[] = [
  {
    id: "v0.6.0",
    version: "v0.6.0",
    date: "2026-08-22",
    title: "Perception rework",
    changes: [
      {
        type: "added",
        text: "Vision grounding now combines accessibility metadata with pixel-level hints.",
      },
      {
        type: "changed",
        text: "Verification re-reads the environment after every action.",
      },
      {
        type: "fixed",
        text: "Crash when targeting offscreen elements.",
      },
    ],
  },
  {
    id: "v0.5.0",
    version: "v0.5.0",
    date: "2026-07-09",
    title: "Voice loop beta",
    changes: [
      { type: "added", text: "Streaming speech-to-intent." },
      { type: "added", text: "Narration of in-flight actions." },
      { type: "changed", text: "Lower-latency text-to-speech." },
    ],
  },
  {
    id: "v0.4.0",
    version: "v0.4.0",
    date: "2026-05-30",
    title: "Planner v2",
    changes: [
      {
        type: "added",
        text: "Re-planning on verification failure with bounded retries.",
      },
      {
        type: "changed",
        text: "Action graphs now carry preconditions and postconditions.",
      },
    ],
  },
  {
    id: "v0.3.0",
    version: "v0.3.0",
    date: "2026-04-12",
    title: "First end-to-end demo",
    changes: [
      { type: "added", text: "Browser automation for Chrome." },
      { type: "added", text: "Spotlight-style command palette." },
    ],
  },
];
