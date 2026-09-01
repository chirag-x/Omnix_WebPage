interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function Logo({ className = "", size = 28, showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="relative inline-flex items-center justify-center rounded-md bg-ink-950 ring-1 ring-white/10"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          width={size * 0.7}
          height={size * 0.7}
          fill="none"
        >
          <defs>
            <linearGradient id="omx-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5dffba" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path
            d="M5 19V5h2.2l9.6 10.8V5H19v14h-2.2L7.2 8.2V19H5z"
            fill="url(#omx-grad)"
          />
        </svg>
        <span className="absolute inset-0 rounded-md ring-1 ring-accent-400/20" />
      </span>
      {showWordmark && (
        <span className="font-display text-[15px] font-semibold tracking-[0.18em] text-white">
          OMNIX
        </span>
      )}
    </span>
  );
}
