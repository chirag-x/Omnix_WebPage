import { useState } from "react";
import { Play, Maximize2, Volume2, Pause, Film } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";

const placeholders = [
  { t: "00:00", label: "Voice request received" },
  { t: "00:04", label: "Omnix opens Chrome" },
  { t: "00:09", label: "Targets the search field" },
  { t: "00:14", label: "Types the query" },
  { t: "00:18", label: "Verifies results" },
];

export function DemoVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <Section
      id="video"
      eyebrow="See it run"
      title="See Omnix in action."
      description="A real desktop recording, narrated by the agent itself. Drop a file into /public/omnix-demo.mp4 to replace this placeholder."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="glass relative overflow-hidden rounded-2xl p-1">
            <div className="relative aspect-video w-full overflow-hidden rounded-[14px] border border-white/5 bg-gradient-to-b from-ink-900 to-ink-950">
              <div
                aria-hidden
                className="absolute inset-0 grid-bg-fine opacity-30"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_50%,rgba(43,227,158,0.10),transparent_60%)]"
              />

              {/* Play overlay */}
              {!playing && (
                <button
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 flex items-center justify-center"
                  aria-label="Play demo"
                >
                  <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur transition group-hover:scale-105">
                    <span className="absolute inset-0 rounded-full ring-1 ring-accent-400/30" />
                    <Play className="h-7 w-7 fill-white text-white" />
                  </span>
                </button>
              )}

              {/* Simulated video content */}
              {playing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="flex items-center justify-between border-b border-white/5 bg-ink-950/60 px-4 py-2 text-xs text-white/55">
                    <div className="flex items-center gap-2">
                      <Film className="h-3.5 w-3.5" />
                      omnix-demo.mp4
                    </div>
                    <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      playing
                    </div>
                  </div>
                  <div className="relative flex-1 overflow-hidden">
                    <div className="absolute inset-0 grid-bg-fine opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="w-full max-w-md rounded-xl border border-white/10 bg-ink-950/70 p-4 text-sm text-white/80">
                        <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                          omnix · live narration
                        </div>
                        <p className="mt-2 text-balance">
                          “Opening Chrome. Locating the search field. Typing
                          ‘AI agents’. Submitting. Verifying the results.”
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-x-0 bottom-0 h-1 bg-accent-400/70"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 18, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Controls */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-white/5 bg-ink-950/70 px-3 py-2 backdrop-blur">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 hover:text-white"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5 fill-current" />
                  )}
                </button>
                <div className="mono flex-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
                  00:00 / 00:18
                </div>
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 hover:text-white"
                  aria-label="Mute"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </button>
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 hover:text-white"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="glass h-full overflow-hidden rounded-2xl p-6">
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              chapter list
            </div>
            <ol className="mt-3 space-y-1.5">
              {placeholders.map((p, i) => (
                <li
                  key={p.t}
                  className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm"
                >
                  <span className="mono text-[10px] text-white/35">{p.t}</span>
                  <span className="text-white/80">{p.label}</span>
                </li>
              ))}
            </ol>
            <div className="divider my-5" />
            <p className="text-xs text-white/50">
              Add a real recording at <code className="mono">/public/omnix-demo.mp4</code> to replace the placeholder.
            </p>
            <div className="mt-4">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setPlaying(true)}
                leadingIcon={<Play className="h-3.5 w-3.5 fill-current" />}
              >
                Play simulation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
