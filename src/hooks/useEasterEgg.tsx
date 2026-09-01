import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";

export function useEasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let buffer = "";
    const target = "omnix --status";
    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      if (e.key.length === 1) {
        buffer = (buffer + e.key).slice(-target.length);
        if (buffer === target) {
          setOpen(true);
          buffer = "";
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { open, setOpen };
}

export function EasterEggPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[60] w-[min(420px,90vw)]"
          role="dialog"
          aria-label="Omnix hidden system panel"
        >
          <div className="glass-strong overflow-hidden rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
                <Terminal className="h-3.5 w-3.5" />
                omnix — hidden panel
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white/70 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-2 p-4 font-mono text-[12.5px] leading-relaxed text-white/75">
              <p>
                <span className="text-accent-300">$</span> omnix --status
              </p>
              <p className="text-white/55">Loading system state…</p>
              <ul className="space-y-1">
                <li>
                  <span className="text-accent-300">[ok]</span> engine online
                </li>
                <li>
                  <span className="text-accent-300">[ok]</span> planner ready
                </li>
                <li>
                  <span className="text-cyan-300">[wip]</span> perception
                  experimental
                </li>
                <li>
                  <span className="text-cyan-300">[wip]</span> computer control
                </li>
                <li>
                  <span className="text-cyan-300">[wip]</span> voice loop
                </li>
              </ul>
              <p className="text-white/55">
                Tip: this panel is wired to a key sequence. Press Esc to close.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}