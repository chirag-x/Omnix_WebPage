import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface CursorFollowerProps {
  enabled?: boolean;
}

export function CursorFollower({ enabled = true }: CursorFollowerProps) {
  const reduced = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled || reduced) return;
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        raf = 0;
      });
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a,button,[role='button'],input,textarea,select,label");
      setHovering(!!interactive);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: hovering ? 0.9 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="h-6 w-6 rounded-full border border-accent-400/60 bg-accent-400/10 backdrop-blur-sm"
      />
    </motion.div>
  );
}
