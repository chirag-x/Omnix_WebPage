import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  align = "left",
}: SectionProps) {
  const reduced = useReducedMotion();
  return (
    <section
      id={id}
      className={`relative w-full px-6 md:px-10 ${className}`}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div className="mx-auto w-full max-w-7xl">
        {(eyebrow || title || description) && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-10 md:mb-14 ${
              align === "center" ? "text-center mx-auto" : "text-left"
            } max-w-3xl`}
          >
            {eyebrow && (
              <div className="mono mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-400 shadow-glow-sm" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                id={id ? `${id}-title` : undefined}
                className="headline text-balance text-3xl sm:text-4xl md:text-5xl font-semibold text-white"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base sm:text-lg text-white/60 text-balance">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
