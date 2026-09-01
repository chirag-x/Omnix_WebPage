import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Loader2 } from "lucide-react";
import type { AgentStreamEvent } from "@/hooks/useAgentStream";

interface ThinkingStreamProps {
  events: AgentStreamEvent[];
  running: boolean;
}

const placeholderThoughts: Record<string, string[]> = {
  "Open Chrome and search for AI agents.": [
    "Parsing user request…",
    "Intent: launch browser, run search query",
    "Selecting skills: app.launch, web.search, web.navigate",
    "Building plan: 4 steps, 1 graph",
    "Preconditions: app available · browser available",
  ],
  "Open Spotify and play music.": [
    "Parsing user request…",
    "Intent: launch app, start audio playback",
    "Selecting skills: app.launch, app.control",
    "Building plan: 3 steps",
    "Considering fallback to web player",
  ],
  "Find my project folder.": [
    "Parsing user request…",
    "Intent: locate directory on disk",
    "Selecting skills: file.find",
    "Searching common paths and indexed roots",
    "Ranking candidates by recency",
  ],
  "Open a website.": [
    "Parsing user request…",
    "Intent: navigate to URL",
    "Selecting skills: web.navigate",
    "Resolving 'omnix.dev'",
    "Plan: 1 step",
  ],
  "Perform a multi-step task.": [
    "Parsing user request…",
    "Intent: find resource, extract data, save result",
    "Selecting skills: web.search, web.extract, file.write",
    "Building plan: 5 steps with verification",
    "Allocating retry budget: 2",
  ],
};

function pickThoughts(request: string): string[] {
  return (
    placeholderThoughts[request] ?? [
      "Parsing user request…",
      "Classifying intent",
      "Selecting skills",
      "Composing plan",
      "Validating preconditions",
    ]
  );
}

export function ThinkingStream({
  events,
  running,
}: ThinkingStreamProps) {
  const fallback = useRef<string[]>([]);
  const [placeholder, setPlaceholder] = useState<string[]>([]);

  useEffect(() => {
    fallback.current = [];
    setPlaceholder([]);
  }, [events.length === 0]);

  // If we have real events from the backend, use them; otherwise animate placeholder thoughts.
  useEffect(() => {
    if (events.length > 0) return;
    if (!running) return;
    const thoughts = pickThoughts("__default__");
    let i = 0;
    setPlaceholder([thoughts[0]]);
    const id = setInterval(() => {
      i += 1;
      if (i >= thoughts.length) {
        clearInterval(id);
        return;
      }
      setPlaceholder((p) => [...p, thoughts[i]]);
    }, 700);
    return () => clearInterval(id);
  }, [events.length, running]);

  const thoughts = events
    .filter((e) => e.type === "thought")
    .map((e) => e.text);
  const list = thoughts.length > 0 ? thoughts : placeholder;

  return (
    <div className="mono overflow-hidden rounded-xl border border-white/5 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
        <span className="flex items-center gap-2">
          <Brain className="h-3 w-3 text-accent-300" />
          reasoning
        </span>
        <span className="flex items-center gap-1.5 text-accent-300">
          {running && <Loader2 className="h-3 w-3 animate-spin" />}
          {running ? "thinking" : list.length > 0 ? "ok" : "idle"}
        </span>
      </div>
      <ul className="space-y-1.5 p-4 text-[12.5px] leading-relaxed text-white/65">
        <AnimatePresence initial={false}>
          {list.map((t, i) => (
            <motion.li
              key={`${i}-${t}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-2"
            >
              <span className="text-white/30">›</span>
              <span className="text-white/75">{t}</span>
            </motion.li>
          ))}
        </AnimatePresence>
        {running && list.length > 0 && (
          <li className="flex items-center gap-2 text-accent-300">
            <span>▍</span>
            <span>working…</span>
          </li>
        )}
      </ul>
    </div>
  );
}
