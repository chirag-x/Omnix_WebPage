import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/primitives/Section";
import { StatusBadge } from "@/components/primitives/StatusBadge";
import { capabilities } from "@/data/capabilities";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      eyebrow="Capabilities"
      title="What Omnix can do — and what it can’t yet."
      description="Each capability is honest about its current state. Available, in development, or planned — and that information is part of the product."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <CapabilityCard key={c.id} capability={c} index={i} />
        ))}
      </div>
    </Section>
  );
}

interface CardProps {
  capability: (typeof capabilities)[number];
  index: number;
}

function CapabilityCard({ capability, index }: CardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const transform = useMotionTemplate`perspective(900px) rotateX(${
    reduced ? 0 : my
  }deg) rotateY(${reduced ? 0 : mx}deg)`;

  const Icon = capability.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        mx.set(px * 6);
        my.set(-py * 6);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform }}
      className="group relative"
    >
      <div className="glass relative h-full overflow-hidden rounded-2xl p-6 transition group-hover:border-white/20">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px 200px at var(--mx,50%) var(--my,50%), rgba(43,227,158,0.10), transparent 60%)",
          }}
          onMouseMove={(e) => {
            const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            (e.currentTarget as HTMLDivElement).style.setProperty(
              "--mx",
              `${e.clientX - r.left}px`
            );
            (e.currentTarget as HTMLDivElement).style.setProperty(
              "--my",
              `${e.clientY - r.top}px`
            );
          }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-300">
            <Icon className="h-5 w-5" />
          </span>
          <StatusBadge status={capability.status} />
        </div>
        <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-white">
          {capability.title}
        </h3>
        <p className="relative mt-2 text-sm text-white/65">
          {capability.description}
        </p>
        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {capability.tags.map((t) => (
            <span
              key={t}
              className="mono rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/55"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
