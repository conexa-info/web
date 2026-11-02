import type { Lang } from "./i18n";

export function formatMetric(value: string | number, lang: Lang, format?: "percent") {
  if (typeof value === "string") return value;
  const formatted = value.toLocaleString(lang === "es" ? "es-AR" : "en-US", {
    minimumFractionDigits: format === "percent" ? 1 : 0,
    maximumFractionDigits: format === "percent" ? 1 : 0,
  });
  return format === "percent" ? `${formatted}%` : formatted;
}
