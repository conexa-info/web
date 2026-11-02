import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-brand text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:brightness-110",
        ink: "bg-ink text-ink-foreground hover:bg-primary",
        outline:
          "border border-foreground/15 bg-card text-foreground hover:border-primary hover:text-primary",
        ghost: "text-foreground hover:bg-secondary",
        light: "bg-ink-foreground text-ink hover:bg-secondary",
      },
      size: { md: "", lg: "min-h-13 px-8 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("px-5 py-12 md:px-8 md:py-16", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-balance text-3xl font-bold leading-[1.05] md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

export function Pending({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-soft p-5 text-sm">
      <p className="font-bold text-primary">⚑ {label}</p>
      <ul className="mt-2 list-disc pl-5 text-muted-foreground">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
