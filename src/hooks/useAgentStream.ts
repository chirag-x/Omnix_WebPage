import { useCallback, useRef, useState } from "react";
import { config } from "@/config";

export interface AgentStreamEvent {
  type: "thought" | "stage" | "outcome" | "error" | "done";
  text: string;
  stage?: string;
}

export function useAgentStream() {
  const [events, setEvents] = useState<AgentStreamEvent[]>([]);
  const [running, setRunning] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const run = useCallback(
    async (request: string) => {
      if (!config.liveAgent.enabled) {
        throw new Error("Live agent disabled");
      }
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      setEvents([]);
      setRunning(true);

      try {
        const res = await fetch(config.liveAgent.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ request }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          throw new Error(`Agent responded ${res.status}`);
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const parsed = JSON.parse(line) as AgentStreamEvent;
              setEvents((prev) => [...prev, parsed]);
              if (parsed.type === "done") {
                setRunning(false);
                return;
              }
            } catch {
              // ignore malformed line
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setEvents((prev) => [
          ...prev,
          { type: "error", text: (err as Error).message },
        ]);
      } finally {
        setRunning(false);
      }
    },
    []
  );

  const cancel = () => {
    controllerRef.current?.abort();
    setRunning(false);
  };

  const reset = () => {
    setEvents([]);
    setRunning(false);
  };

  return { events, running, run, cancel, reset };
}
