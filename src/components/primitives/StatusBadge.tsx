import type { CapabilityStatus } from "@/data/capabilities";

interface StatusBadgeProps {
  status: CapabilityStatus;
  className?: string;
}

const labels: Record<CapabilityStatus, string> = {
  available: "Available",
  "in-development": "In development",
  planned: "Planned",
};

const styles: Record<CapabilityStatus, string> = {
  available:
    "text-accent-300 border-accent-400/30 bg-accent-400/10 shadow-[0_0_18px_-8px_rgba(43,227,158,0.6)]",
  "in-development":
    "text-cyan-300 border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_18px_-8px_rgba(34,211,238,0.6)]",
  planned: "text-white/60 border-white/10 bg-white/[0.03]",
};

const dots: Record<CapabilityStatus, string> = {
  available: "bg-accent-400",
  "in-development": "bg-cyan-400",
  planned: "bg-white/40",
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] ${styles[status]} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]} ${status !== "planned" ? "animate-pulse-soft" : ""}`}
        aria-hidden
      />
      {labels[status]}
    </span>
  );
}
