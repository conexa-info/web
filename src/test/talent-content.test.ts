import { describe, expect, it } from "vitest";
import { getTalent } from "@/data/talents";

describe("Creator data boundaries", () => {
  it("uses the TikTok account supplied for Lua", () => {
    expect(getTalent("lua-sansat")?.socials.find((s) => s.platform === "TikTok")?.url).toBe(
      "https://www.tiktok.com/@luasansat",
    );
  });
  it("omits Lua's calendar date ranges without changing platform figures", () => {
    const groups = getTalent("lua-sansat")?.groups;
    expect(groups?.[1]?.period).toBeUndefined();
    expect(groups?.[2]?.period).toBeUndefined();
    expect(groups?.[1]?.metrics[0]?.value).toBe("13.6M");
    expect(groups?.[2]?.metrics[0]?.value).toBe("4.62M");
  });
  it("uses the accounts supplied for Goddermann and Lowkey Santo", () => {
    expect(getTalent("goddermann")?.socials[0]?.url).toBe("https://www.instagram.com/goddermann/");
    expect(getTalent("lowkey")?.socials.map((s) => s.url)).toEqual([
      "https://www.instagram.com/lowkeysanto.stz/",
      "https://www.tiktok.com/@lowkeysanto.stz",
    ]);
  });
});

describe("Talent cards and FAQ", () => {
  it("gives every talent the followers and monthly views shown on cards", async () => {
    const { TALENTS } = await import("@/data/talents");
    for (const t of TALENTS) {
      expect(t.keyStats.followers, t.slug).toBeGreaterThan(0);
      expect(t.keyStats.monthlyViews, t.slug).toBeGreaterThan(0);
    }
  });

  it("formats compact numbers per locale", async () => {
    const { formatCompact } = await import("@/lib/metric-format");
    expect(formatCompact(1590000, "es")).toBe("1,6M");
    expect(formatCompact(1590000, "en")).toBe("1.6M");
    expect(formatCompact(460000, "es")).toBe("460K");
    expect(formatCompact(34900000, "en")).toBe("34.9M");
  });

  it("publishes the FAQ with contact data from site.ts", async () => {
    const { faqJsonLd } = await import("@/components/site/Faq");
    const { CONTACT } = await import("@/data/site");
    const ld = faqJsonLd("es");
    const last = ld.mainEntity.at(-1)!;
    expect(ld.mainEntity).toHaveLength(11);
    expect(last.acceptedAnswer.text).toContain(CONTACT.email);
    expect(last.acceptedAnswer.text).toContain("@agencyconexa");
  });
});
