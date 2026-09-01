import { useEffect, useRef, useState } from "react";

/**
 * Hook that returns a 0..1 level sampled from the user's microphone
 * (with user gesture), or a synthesized fallback if mic is unavailable.
 */
export function useSpeechOrb() {
  const [level, setLevel] = useState(0);
  const [active, setActive] = useState(false);
  const rafRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);
  const fallbackStartRef = useRef<number>(0);

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => undefined);
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    setActive(false);
  };

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      dataRef.current = new Uint8Array(analyser.frequencyBinCount);
      setActive(true);
      const loop = () => {
        const a = analyserRef.current;
        const d = dataRef.current;
        if (!a || !d) return;
        a.getByteTimeDomainData(d as unknown as Uint8Array<ArrayBuffer>);
        let sum = 0;
        for (let i = 0; i < d.length; i++) {
          const v = (d[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / d.length);
        setLevel(Math.min(1, rms * 2.5));
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch {
      // Fallback: synthetic pulse
      fallbackStartRef.current = performance.now();
      setActive(true);
      const loop = () => {
        const t = (performance.now() - fallbackStartRef.current) / 1000;
        const v = 0.5 + 0.5 * Math.sin(t * 1.6) * Math.sin(t * 0.7);
        setLevel(0.3 + v * 0.4);
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    }
  };

  useEffect(() => () => stop(), []);

  return { level, active, start, stop };
}
