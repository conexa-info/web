import type { Lang } from "@/lib/i18n";
import { useInView } from "./Motion";

export function Bars({
  items,
  max,
  lang = "es",
  decimals = 0,
  format,
}: {
  items: { label: string; value: number; prefix?: string }[];
  max?: number;
  lang?: Lang;
  decimals?: number | undefined;
  /** Custom value label; defaults to a percentage. */
  format?: (value: number) => string;
}) {
  const { ref, inView } = useInView<HTMLUListElement>(0.3);
  const top = max ?? Math.max(...items.map((i) => i.value));
  const show =
    format ??
    ((v: number) =>
      v.toLocaleString(lang === "es" ? "es-AR" : "en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: Math.max(decimals, 1),
      }) + "%");
  return (
    <ul ref={ref} className="space-y-3">
      {items.map((i, n) => (
        <li key={i.label}>
          <div className="mb-1 grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm">
            <span className="min-w-0 font-medium">
              {i.prefix && <span className="mr-2">{i.prefix}</span>}
              {i.label}
            </span>
            <span className="shrink-0 font-bold tabular-nums">{show(i.value)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-brand transition-[width] duration-1000 ease-out"
              style={{
                width: inView ? `${(i.value / top) * 100}%` : "0%",
                transitionDelay: `${n * 80}ms`,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
