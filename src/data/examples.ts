export interface AgentStep {
  id: string;
  label: string;
  detail: string;
}

export interface AgentExample {
  id: string;
  label: string;
  request: string;
  steps: AgentStep[];
  outcome: string[];
}

export const examples: AgentExample[] = [
  {
    id: "chrome-search",
    label: "Open Chrome and search for AI agents",
    request: "Open Chrome and search for AI agents.",
    steps: [
      { id: "understand", label: "Understand", detail: "Parsing request…" },
      { id: "plan", label: "Plan", detail: "Launch Chrome → navigate → query" },
      { id: "perceive", label: "Perceive", detail: "Locating browser target" },
      { id: "act", label: "Act", detail: "Opening Chrome · typing query" },
      { id: "verify", label: "Verify", detail: "Confirming results loaded" },
    ],
    outcome: ["Chrome opened", "Search completed"],
  },
  {
    id: "spotify",
    label: "Open Spotify and play music",
    request: "Open Spotify and play some focus music.",
    steps: [
      { id: "understand", label: "Understand", detail: "Parsing request…" },
      { id: "plan", label: "Plan", detail: "Launch app → search → press play" },
      { id: "perceive", label: "Perceive", detail: "Locating Spotify window" },
      { id: "act", label: "Act", detail: "Starting playback" },
      { id: "verify", label: "Verify", detail: "Audio session confirmed" },
    ],
    outcome: ["Spotify opened", "Music playing"],
  },
  {
    id: "find-folder",
    label: "Find my project folder",
    request: "Find my project folder on this machine.",
    steps: [
      { id: "understand", label: "Understand", detail: "Parsing request…" },
      { id: "plan", label: "Plan", detail: "Search filesystem · rank results" },
      { id: "perceive", label: "Perceive", detail: "Reading file index" },
      { id: "act", label: "Act", detail: "Locating folders" },
      { id: "verify", label: "Verify", detail: "Confirming paths exist" },
    ],
    outcome: ["Project folders located"],
  },
  {
    id: "open-website",
    label: "Open a website",
    request: "Open omnix.dev in a new tab.",
    steps: [
      { id: "understand", label: "Understand", detail: "Parsing request…" },
      { id: "plan", label: "Plan", detail: "Open browser · navigate" },
      { id: "perceive", label: "Perceive", detail: "Locating URL bar" },
      { id: "act", label: "Act", detail: "Navigating" },
      { id: "verify", label: "Verify", detail: "Page loaded" },
    ],
    outcome: ["omnix.dev opened"],
  },
  {
    id: "multi-step",
    label: "Perform a multi-step task",
    request: "Find the latest AI agent paper and save the link to my notes.",
    steps: [
      { id: "understand", label: "Understand", detail: "Parsing request…" },
      { id: "plan", label: "Plan", detail: "Search · extract · save" },
      { id: "perceive", label: "Perceive", detail: "Reading search results" },
      { id: "act", label: "Act", detail: "Saving link" },
      { id: "verify", label: "Verify", detail: "Note updated" },
    ],
    outcome: ["Link saved to notes"],
  },
];
