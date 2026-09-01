export type RoadmapItemStatus = "done" | "in-progress" | "planned";

export interface RoadmapItem {
  id: string;
  label: string;
  status: RoadmapItemStatus;
  note?: string;
}

export interface RoadmapTrack {
  id: string;
  title: string;
  description: string;
  items: RoadmapItem[];
}

export const roadmap: RoadmapTrack[] = [
  {
    id: "foundation",
    title: "Foundation",
    description:
      "The core engine, reasoning layer, and basic task execution loop.",
    items: [
      { id: "core-architecture", label: "Core architecture", status: "done" },
      { id: "omnix-engine", label: "OmnixEngine", status: "done" },
      { id: "task-planner", label: "Task planner", status: "done" },
      { id: "skill-runtime", label: "Skill runtime", status: "in-progress" },
      {
        id: "memory",
        label: "Persistent memory",
        status: "planned",
        note: "Long-term context across sessions.",
      },
    ],
  },
  {
    id: "computer-use",
    title: "Computer use",
    description:
      "Perception, interaction, and verification on real desktop environments.",
    items: [
      { id: "perception", label: "Computer perception", status: "in-progress" },
      { id: "vision-grounding", label: "Vision grounding", status: "in-progress" },
      {
        id: "improved-interaction",
        label: "Improved interaction",
        status: "planned",
      },
      { id: "verification", label: "Better verification", status: "planned" },
      {
        id: "recovery",
        label: "Failure recovery",
        status: "planned",
        note: "Detect and recover from unexpected UI states.",
      },
    ],
  },
  {
    id: "voice",
    title: "Voice-first",
    description:
      "Natural conversation, live updates, and a comfortable spoken interface.",
    items: [
      { id: "voice-input", label: "Voice input", status: "done" },
      {
        id: "execution-updates",
        label: "Natural execution updates",
        status: "in-progress",
      },
      {
        id: "conversational-flow",
        label: "Better conversational flow",
        status: "planned",
      },
    ],
  },
  {
    id: "agent",
    title: "Advanced agent",
    description:
      "Longer-running workflows, autonomy, and a broader set of skills.",
    items: [
      {
        id: "long-running",
        label: "Long-running tasks",
        status: "planned",
      },
      { id: "better-recovery", label: "Better recovery", status: "planned" },
      { id: "autonomy", label: "More autonomous workflows", status: "planned" },
      { id: "skills", label: "Expanded skills", status: "planned" },
    ],
  },
];
