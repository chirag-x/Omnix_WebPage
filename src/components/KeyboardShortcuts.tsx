import { AnimatePresence, motion } from "framer-motion";
import { shortcuts } from "@/data/shortcuts";

interface KeyboardShortcutsProps {
  open: boolean;
  onClose: () => void;
}

export function KeyboardShortcuts({ open, onClose }: KeyboardShortcutsProps) {
  const groups: { id: "navigation" | "actions" | "ui"; title: string }[] = [
    { id: "navigation", title: "Navigation" },
    { id: "actions", title: "Actions" },
    { id: "ui", title: "UI" },
  ];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          onClick={onClose}
        >
          <div aria-hidden className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" />
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  keyboard
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  Shortcuts
                </h3>
              </div>
              <button
                onClick={onClose}
                className="mono rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 hover:text-white"
              >
                esc to close
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
              {groups.map((g) => (
                <div key={g.id}>
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {g.title}
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {shortcuts
                      .filter((s) => s.group === g.id)
                      .map((s) => (
                        <li
                          key={s.action}
                          className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-sm"
                        >
                          <span className="text-white/75">{s.description}</span>
                          <span className="flex shrink-0 items-center gap-1">
                            {s.keys.map((k, i) => (
                              <kbd
                                key={i}
                                className="mono inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-white/15 bg-white/[0.05] px-1.5 text-[11px] font-medium text-white/85"
                              >
                                {k}
                              </kbd>
                            ))}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 px-5 py-3 text-xs text-white/50">
              Press <kbd className="mono mx-1 rounded border border-white/15 bg-white/5 px-1.5">?</kbd>{" "}
              anywhere to reopen this panel.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
