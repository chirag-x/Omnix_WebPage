interface GlowProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "accent" | "cyan";
}

export function Glow({ className = "", size = "md", color = "accent" }: GlowProps) {
  const sizes = {
    sm: "h-40 w-40",
    md: "h-72 w-72",
    lg: "h-[28rem] w-[28rem]",
  };
  const colorClass =
    color === "accent"
      ? "from-accent-400/30 via-accent-400/10 to-transparent"
      : "from-cyan-400/30 via-cyan-400/10 to-transparent";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full bg-gradient-radial ${sizes[size]} ${colorClass} blur-3xl ${className}`}
      style={{
        background:
          color === "accent"
            ? "radial-gradient(closest-side, rgba(43,227,158,0.35), transparent 70%)"
            : "radial-gradient(closest-side, rgba(34,211,238,0.30), transparent 70%)",
      }}
    />
  );
}
