import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyOmnix } from "@/components/WhyOmnix";
import { FromWordsToActions } from "@/components/FromWordsToActions";
import { Architecture } from "@/components/Architecture";
import { Capabilities } from "@/components/Capabilities";
import { Skills } from "@/components/Skills";
import { VoiceExperience } from "@/components/VoiceExperience";
import { ComputerUse } from "@/components/ComputerUse";
import { AgentDemo } from "@/components/AgentDemo";
import { DemoVideo } from "@/components/DemoVideo";
import { ExecutionTrace } from "@/components/ExecutionTrace";
import { Roadmap } from "@/components/Roadmap";
import { SystemStatus } from "@/components/SystemStatus";
import { UnderTheHood } from "@/components/UnderTheHood";
import { DependencyGraph } from "@/components/DependencyGraph";
import { Vocabulary } from "@/components/Vocabulary";
import { ChangelogPanel } from "@/components/ChangelogPanel";
import { FutureVision } from "@/components/FutureVision";
import { GithubCTA } from "@/components/GithubCTA";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { CursorFollower } from "@/components/CursorFollower";
import { EasterEggPanel, useEasterEgg } from "@/hooks/useEasterEgg";
import { ScrollProgress } from "@/hooks/useScrollProgress";
import { AmbientProvider, useAmbient } from "@/hooks/useAmbient";

function Shell() {
  const egg = useEasterEgg();
  const ambient = useAmbient();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /INPUT|TEXTAREA|SELECT/i.test(target.tagName)) return;
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      if (e.key === "?") {
        e.preventDefault();
        setShortcutsOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setShortcutsOpen(false);
        return;
      }
      if (!meta) {
        const k = e.key.toLowerCase();
        if (k === "g") {
          const next = (e2: KeyboardEvent) => {
            const m = e2.key.toLowerCase();
            const map: Record<string, string> = {
              h: "hero",
              a: "architecture",
              c: "capabilities",
              d: "demo",
              s: "status",
              r: "roadmap",
            };
            const id = map[m];
            if (id) {
              const el = document.getElementById(id);
              el?.scrollIntoView({ behavior: "smooth" });
            }
            window.removeEventListener("keydown", next);
          };
          window.addEventListener("keydown", next, { once: true });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CursorFollower />
      <Navbar
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
      />
      <main className="relative">
        <Hero />
        <WhyOmnix />
        <FromWordsToActions />
        <Architecture />
        <Capabilities />
        <Skills />
        <AgentDemo />
        <VoiceExperience />
        <ComputerUse />
        <DemoVideo />
        <ExecutionTrace />
        <SystemStatus />
        <UnderTheHood />
        <DependencyGraph />
        <Vocabulary />
        <Roadmap />
        <ChangelogPanel />
        <FutureVision />
        <GithubCTA />
      </main>
      <Footer />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
        onToggleAmbient={() => ambient.toggle()}
      />
      <KeyboardShortcuts
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
      <EasterEggPanel open={egg.open} onClose={() => egg.setOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AmbientProvider>
      <Shell />
    </AmbientProvider>
  );
}
