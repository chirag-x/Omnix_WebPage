import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, ArrowRight, CornerDownLeft, Hash, Layers, Cpu, BookOpen, Github, Sparkles, FileText } from "lucide-react";
import { navLinks } from "@/data/nav";
import { vocabulary } from "@/data/vocabulary";
import { changelog } from "@/data/changelog";
import { config } from "@/config";

type CommandKind = "navigation" | "vocab" | "changelog" | "actions" | "links";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  kind: CommandKind;
  icon: typeof Search;
  run: () => void;
  hint?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onOpenShortcuts: () => void;
  onToggleAmbient: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onOpenShortcuts,
  onToggleAmbient,
}: CommandPaletteProps) {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const items: CommandItem[] = useMemo(() => {
    const navigate = (id: string, href: string) => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    };
    const base: CommandItem[] = [
      ...navLinks.map<CommandItem>((l) => ({
        id: `nav:${l.id}`,
        label: l.label,
        description: `Go to ${l.label.toLowerCase()}`,
        kind: "navigation",
        icon: Hash,
        run: () => navigate(l.id, l.href),
        hint: l.href,
      })),
      ...vocabulary.map<CommandItem>((v) => ({
        id: `vocab:${v.id}`,
        label: v.term,
        description: v.short,
        kind: "vocab",
        icon: BookOpen,
        run: () => {
          const el = document.querySelector("#under-the-hood");
          if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        },
        hint: "vocabulary",
      })),
      ...changelog.map<CommandItem>((c) => ({
        id: `cl:${c.id}`,
        label: `${c.version} — ${c.title}`,
        description: `${c.changes.length} change${c.changes.length === 1 ? "" : "s"} · ${c.date}`,
        kind: "changelog",
        icon: FileText,
        run: () => {
          const el = document.querySelector("#status");
          if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        },
        hint: "changelog",
      })),
      {
        id: "act:run-demo",
        label: "Run agent demo",
        description: "Trigger the interactive command playground",
        kind: "actions",
        icon: Sparkles,
        run: () => navigate("demo", "#demo"),
        hint: "demo",
      },
      {
        id: "act:copy-repo",
        label: "Copy repository URL",
        description: config.githubUrl,
        kind: "actions",
        icon: Layers,
        run: () => {
          navigator.clipboard?.writeText(config.githubUrl).catch(() => undefined);
        },
        hint: "clipboard",
      },
      {
        id: "act:shortcuts",
        label: "Show keyboard shortcuts",
        description: "Open the shortcuts overlay",
        kind: "actions",
        icon: Cpu,
        run: () => onOpenShortcuts(),
        hint: "ui",
      },
      {
        id: "act:ambient",
        label: "Toggle ambient sound",
        description: "On by default: off. Switch it on for a subtle system hum.",
        kind: "actions",
        icon: Sparkles,
        run: () => onToggleAmbient(),
        hint: "audio",
      },
      {
        id: "link:github",
        label: "View on GitHub",
        description: config.githubUrl,
        kind: "links",
        icon: Github,
        run: () => window.open(config.githubUrl, "_blank", "noopener,noreferrer"),
        hint: "external",
      },
    ];
    return base;
  }, [onOpenShortcuts, onToggleAmbient, reduced]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [i.label, i.description ?? "", i.hint ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(filtered.length - 1, a + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[active];
        if (item) {
          item.run();
          onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onClick={onClose}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-md"
          />
          <motion.div
            initial={reduced ? false : { y: 12, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { y: 6, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <Search className="h-4 w-4 text-white/50" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, page, term, or shortcut…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                aria-label="Command search"
              />
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                esc
              </span>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-white/45">
                  No matches. Try “architecture”, “v0.6.0”, or “github”.
                </li>
              ) : (
                filtered.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = i === active;
                  return (
                    <li key={item.id}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => {
                          item.run();
                          onClose();
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                          isActive
                            ? "bg-white/[0.06] text-white"
                            : "text-white/70 hover:bg-white/[0.03]"
                        }`}
                        role="option"
                        aria-selected={isActive}
                      >
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${
                            isActive
                              ? "border-accent-400/40 bg-accent-400/10 text-accent-300"
                              : "border-white/10 bg-white/[0.03] text-white/55"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm">{item.label}</div>
                          {item.description && (
                            <div className="truncate text-xs text-white/45">
                              {item.description}
                            </div>
                          )}
                        </div>
                        <span className="mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                          {item.kind}
                        </span>
                        <ArrowRight
                          className={`h-3.5 w-3.5 ${
                            isActive ? "text-accent-300" : "text-white/30"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
            <div className="flex items-center justify-between border-t border-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
              <span className="mono">omnix — command palette</span>
              <span className="mono flex items-center gap-1.5">
                <CornerDownLeft className="h-3 w-3" />
                to run
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
