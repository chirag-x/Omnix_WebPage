import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface AmbientContextValue {
  enabled: boolean;
  toggle: () => void;
}

const AmbientContext = createContext<AmbientContextValue | null>(null);

const STORAGE_KEY = "omnix.ambient";

export function AmbientProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    lfo: OscillatorNode;
    lfoGain: GainNode;
    master: GainNode;
  } | null>(null);

  const stop = useCallback(() => {
    const nodes = nodesRef.current;
    if (nodes) {
      try {
        nodes.osc1.stop();
        nodes.osc2.stop();
        nodes.lfo.stop();
      } catch {
        // already stopped
      }
      nodesRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => undefined);
      ctxRef.current = null;
    }
  }, []);

  const start = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (ctxRef.current) return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = 0.018; // very quiet
      master.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.value = 60;
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.value = 120;

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 6;
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);

      osc1.connect(master);
      osc2.connect(master);

      osc1.start();
      osc2.start();
      lfo.start();

      nodesRef.current = { osc1, osc2, lfo, lfoGain, master };
    } catch {
      // audio unavailable; silently fail
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      start();
    } else {
      stop();
    }
    return () => stop();
  }, [enabled, start, stop]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((v) => !v);
  }, []);

  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle]);

  return <AmbientContext.Provider value={value}>{children}</AmbientContext.Provider>;
}

export function useAmbient() {
  const ctx = useContext(AmbientContext);
  if (!ctx) {
    return { enabled: false, toggle: () => undefined };
  }
  return ctx;
}
