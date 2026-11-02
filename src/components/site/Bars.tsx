import type { Lang } from "@/lib/i18n";

export function Bars({
  items,
  max,
  lang = "es",
  decimals = 0,
}: {
  items: { label: string; value: number; prefix?: string }[];
  max?: number;
  lang?: Lang;
  decimals?: number | undefined;
}) {
  const top = max ?? Math.max(...items.map((i) => i.value));
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.label}>
          <div className="mb-1 grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm">
            <span className="min-w-0 font-medium">
              {i.prefix && <span className="mr-2">{i.prefix}</span>}
              {i.label}
            </span>
            <span className="shrink-0 font-bold tabular-nums">
              {i.value.toLocaleString(lang === "es" ? "es-AR" : "en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: Math.max(decimals, 1),
              })}
              %
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-brand"
              style={{ width: `${(i.value / top) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
