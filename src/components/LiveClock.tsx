import { useClock } from "@/hooks/useClock";

export function LiveClock({ className = "" }: { className?: string }) {
  const now = useClock(1000);
  const time = now.toLocaleTimeString([], { hour12: false });
  const date = now.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-soft" />
      <span className="mono text-[12px] text-white/80">{time}</span>
      <span className="mono text-[10px] uppercase tracking-[0.18em] text-white/35">
        {date}
      </span>
    </div>
  );
}
