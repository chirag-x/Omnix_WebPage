import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
}

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium tracking-tight select-none transition-all duration-200 will-change-transform rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-ink-950 hover:bg-accent-300 shadow-[0_8px_30px_-12px_rgba(255,255,255,0.35)] hover:shadow-[0_8px_36px_-10px_rgba(43,227,158,0.55)]",
  secondary:
    "bg-white/[0.04] text-white border border-white/10 hover:border-white/25 hover:bg-white/[0.07] backdrop-blur",
  ghost:
    "text-white/80 hover:text-white hover:bg-white/[0.04] border border-transparent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      leadingIcon,
      trailingIcon,
      fullWidth,
      className = "",
      children,
      ...rest
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={`${base} ${sizes[size]} ${variants[variant]} ${
          fullWidth ? "w-full" : ""
        } ${className}`}
        {...rest}
      >
        {leadingIcon && <span className="-ml-0.5 inline-flex">{leadingIcon}</span>}
        <span>{children}</span>
        {trailingIcon && <span className="-mr-0.5 inline-flex">{trailingIcon}</span>}
      </button>
    );
  }
);
