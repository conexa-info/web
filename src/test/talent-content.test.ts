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
