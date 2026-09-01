import { useEffect, useState } from "react";
import { Menu, X, Github, ArrowUpRight, Search, Command } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/primitives/Logo";
import { Button } from "@/components/primitives/Button";
import { AmbientToggle } from "@/components/AmbientToggle";
import { navLinks } from "@/data/nav";
import { config } from "@/config";

interface NavbarProps {
  onOpenPalette: () => void;
  onOpenShortcuts: () => void;
}

export function Navbar({ onOpenPalette, onOpenShortcuts }: NavbarProps) {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0]?.id ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string, id: string) => {
    setOpen(false);
    setActive(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <nav
          aria-label="Primary"
          className={`flex h-12 items-center justify-between rounded-full border px-3 pl-4 transition-all duration-300 ${
            scrolled
              ? "border-white/10 bg-ink-950/70 backdrop-blur-xl shadow-[0_8px_30px_-20px_rgba(0,0,0,0.8)]"
              : "border-white/[0.04] bg-white/[0.015] backdrop-blur"
          }`}
        >
          <button
            onClick={() => handleNav("#hero", "hero")}
            className="flex items-center gap-2"
            aria-label="Omnix home"
          >
            <Logo size={26} />
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => handleNav(l.href, l.id)}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition ${
                    active === l.id
                      ? "text-white"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={onOpenPalette}
              className="mono inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 text-[11px] uppercase tracking-[0.18em] text-white/55 transition hover:border-white/20 hover:text-white"
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5" />
              <span>search</span>
              <span className="ml-1 flex items-center gap-0.5">
                <kbd className="rounded border border-white/15 bg-white/5 px-1 text-[10px] text-white/70">
                  ⌘
                </kbd>
                <kbd className="rounded border border-white/15 bg-white/5 px-1 text-[10px] text-white/70">
                  K
                </kbd>
              </span>
            </button>
            <AmbientToggle />
            <button
              onClick={onOpenShortcuts}
              className="mono inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/55 transition hover:border-white/20 hover:text-white"
              aria-label="Show keyboard shortcuts"
              title="Keyboard shortcuts (?)"
            >
              <Command className="h-3.5 w-3.5" />
            </button>
            <a
              href={config.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <Button
              size="sm"
              trailingIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
              onClick={() => handleNav("#demo", "demo")}
            >
              Try Omnix
            </Button>
          </div>

          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/90 p-2 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => handleNav(l.href, l.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm ${
                        active === l.id
                          ? "bg-white/[0.05] text-white"
                          : "text-white/70 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      {l.label}
                      <ArrowUpRight className="h-4 w-4 opacity-50" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    onOpenPalette();
                  }}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-white/80"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
                <AmbientToggle />
                <a
                  href={config.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] text-sm text-white/80"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <Button
                  fullWidth
                  size="sm"
                  onClick={() => handleNav("#demo", "demo")}
                >
                  Try Omnix
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
