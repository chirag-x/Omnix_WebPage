export interface FlowStage {
  id: string;
  label: string;
  description: string;
}

export const flowStages: FlowStage[] = [
  {
    id: "intent",
    label: "Intent",
    description: "Understand what the user actually wants.",
  },
  {
    id: "reason",
    label: "Reason",
    description: "Determine the appropriate strategy.",
  },
  {
    id: "plan",
    label: "Plan",
    description: "Break the request into executable steps.",
  },
  {
    id: "perceive",
    label: "Perceive",
    description: "Understand the current computer state.",
  },
  {
    id: "act",
    label: "Act",
    description: "Perform the required interaction.",
  },
  {
    id: "verify",
    label: "Verify",
    description: "Check whether the action succeeded.",
  },
  {
    id: "result",
    label: "Result",
    description: "Tell the user what happened.",
  },
];
