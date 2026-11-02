import { describe, expect, it } from "vitest";
import { TALENTS, getTalent } from "@/data/talents";
import { formatMetric } from "@/lib/metric-format";

describe("Lowkey client-reported metrics", () => {
  const talent = getTalent("lowkey");
  it("updates the single existing talent with 52,812 total followers", () => {
    expect(TALENTS.filter((t) => t.slug === "lowkey")).toHaveLength(1);
    expect(talent?.groups[0]?.metrics[0]?.value).toBe(52812);
  });
  it("keeps Instagram plays and non-follower reach separate over 30 days", () => {
    expect(talent?.groups[1]?.period).toEqual({ es: "Últimos 30 días", en: "Last 30 days" });
    expect(talent?.groups[1]?.metrics.map((m) => m.value)).toEqual([4452764, 96.6]);
    expect(talent?.groups[1]?.metrics[1]?.format).toBe("percent");
  });
  it("preserves TikTok's 28-day figures separately", () => {
    expect(talent?.groups[2]?.period).toEqual({ es: "Últimos 28 días", en: "Last 28 days" });
    expect(talent?.groups[2]?.metrics.map((m) => m.value)).toEqual([3700000, 444700, 19700, 1900]);
    expect(talent?.groups).toHaveLength(3);
  });
  it("keeps gender percentages exact", () => {
    expect(talent?.gender?.items.map((i) => i.value)).toEqual([85.8, 14.2]);
  });
  it("retains only supplied ages, with 68.8 percent aged 18 to 34", () => {
    expect(talent?.age?.items.map((i) => i.value)).toEqual([14.7, 30.6, 38.2, 11.1]);
    expect((talent?.age?.items[1]?.value ?? 0) + (talent?.age?.items[2]?.value ?? 0)).toBeCloseTo(
      68.8,
    );
  });
  it("retains exact country and language percentages", () => {
    expect(talent?.countries?.map((c) => c.value)).toEqual([50.0, 14.6, 5.4, 4.2, 4.0]);
    expect(talent?.languages?.map((i) => i.value)).toEqual([98.6]);
  });
  it("formats the same numbers faithfully for both locales", () => {
    expect(formatMetric(4452764, "es")).toBe("4.452.764");
    expect(formatMetric(4452764, "en")).toBe("4,452,764");
    expect(formatMetric(96.6, "es", "percent")).toBe("96,6%");
    expect(formatMetric(96.6, "en", "percent")).toBe("96.6%");
  });
  it("does not invent a measurement date, platform or location", () => {
    expect(talent?.groups.map((g) => g.period?.es)).toEqual([
      undefined,
      "Últimos 30 días",
      "Últimos 28 días",
    ]);
    expect(talent?.location).toBeUndefined();
    expect(talent?.age?.title.es).toBe("Distribución por edades");
  });
});
