import { Volume2, VolumeX } from "lucide-react";
import { useAmbient } from "@/hooks/useAmbient";

export function AmbientToggle({ className = "" }: { className?: string }) {
  const { enabled, toggle } = useAmbient();
  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      className={`mono inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 text-[11px] uppercase tracking-[0.18em] text-white/75 transition hover:border-white/20 hover:text-white ${
        enabled ? "text-accent-300 border-accent-400/30 bg-accent-400/10" : ""
      } ${className}`}
    >
      {enabled ? (
        <Volume2 className="h-3.5 w-3.5" />
      ) : (
        <VolumeX className="h-3.5 w-3.5" />
      )}
      <span className="hidden sm:inline">
        ambient · {enabled ? "on" : "off"}
      </span>
    </button>
  );
}
