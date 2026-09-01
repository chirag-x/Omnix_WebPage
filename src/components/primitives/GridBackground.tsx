interface GridBackgroundProps {
  variant?: "soft" | "fine";
  className?: string;
  children?: React.ReactNode;
}

export function GridBackground({
  variant = "soft",
  className = "",
  children,
}: GridBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`absolute inset-0 ${
          variant === "soft" ? "grid-bg" : "grid-bg-fine"
        } animate-grid-move`}
      />
      <div className="absolute inset-0 noise" />
      {children}
    </div>
  );
}
