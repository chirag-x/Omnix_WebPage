export interface VocabTerm {
  id: string;
  term: string;
  short: string;
  long: string;
  related: string[];
}

export const vocabulary: VocabTerm[] = [
  {
    id: "skill",
    term: "Skill",
    short: "A reusable procedure Omnix can invoke.",
    long: "A skill is a typed, addressable capability (web.search, app.launch, file.find). The planner composes skills into plans; the action layer executes them. Skills have explicit preconditions, postconditions, and failure modes.",
    related: ["plan", "postcondition", "skill-runtime"],
  },
  {
    id: "plan",
    term: "Plan",
    short: "A directed graph of steps that solves a request.",
    long: "A plan is more than a list. It is a graph where each node has preconditions, an action, and postconditions. The planner can re-plan when an action's postcondition is not observed.",
    related: ["skill", "postcondition", "verification"],
  },
  {
    id: "postcondition",
    term: "Postcondition",
    short: "The expected state after an action runs.",
    long: "Every action declares a postcondition — what should be true if it succeeded. Verification checks postconditions against the actual environment state.",
    related: ["plan", "verification", "perception"],
  },
  {
    id: "perception",
    term: "Perception",
    short: "Reading the current state of the computer.",
    long: "Perception is Omnix's eyes. It combines screen capture, vision grounding, and accessibility metadata to identify elements, read their state, and produce structured observations for the planner.",
    related: ["postcondition", "grounding", "verification"],
  },
  {
    id: "grounding",
    term: "Grounding",
    short: "Linking a description to a specific on-screen element.",
    long: "Grounding is the bridge between language and pixels. Given a description like 'the search field', grounding returns a bounding box and an accessibility handle.",
    related: ["perception"],
  },
  {
    id: "verification",
    term: "Verification",
    short: "Checking that an action actually worked.",
    long: "After every action, verification re-reads the environment and compares the observed state to the action's postcondition. Failures trigger re-planning.",
    related: ["postcondition", "plan", "re-plan"],
  },
  {
    id: "re-plan",
    term: "Re-plan",
    short: "Rebuilding a plan after a failed step.",
    long: "When verification reports a failure, the engine asks the planner for a new plan that incorporates what was learned — typically by trying an alternative skill or adjusting the target.",
    related: ["plan", "verification"],
  },
  {
    id: "skill-runtime",
    term: "Skill runtime",
    short: "The execution environment for skills.",
    long: "Skills are loaded into the runtime, validated against the available environment, and dispatched. The runtime enforces timeouts, retries, and isolation between skills.",
    related: ["skill", "plan"],
  },
];
