import type { Lang } from "./i18n";

export function formatMetric(value: string | number, lang: Lang, format?: "percent") {
  if (typeof value === "string") return value;
  const formatted = value.toLocaleString(lang === "es" ? "es-AR" : "en-US", {
    minimumFractionDigits: format === "percent" ? 1 : 0,
    maximumFractionDigits: format === "percent" ? 1 : 0,
  });
  return format === "percent" ? `${formatted}%` : formatted;
}

/** Short form for cards and hero: 1590000 → "1,6M" (es) / "1.6M" (en), 460000 → "460K". */
export function formatCompact(value: number, lang: Lang) {
  const [div, suffix] = value >= 1e6 ? [1e6, "M"] : value >= 1e3 ? [1e3, "K"] : [1, ""];
  const n = value / div;
  return (
    n.toLocaleString(lang === "es" ? "es-AR" : "en-US", {
      maximumFractionDigits: n < 100 && div > 1 ? 1 : 0,
    }) + suffix
  );
}

/** Rounds down so totals shown with "+" are never overstated (2.356M → 2.3M, 87.4M → 87M). */
export function floorForDisplay(value: number) {
  if (value >= 1e7) return Math.floor(value / 1e6) * 1e6;
  if (value >= 1e6) return Math.floor(value / 1e5) * 1e5;
  if (value >= 1e3) return Math.floor(value / 1e3) * 1e3;
  return value;
}
