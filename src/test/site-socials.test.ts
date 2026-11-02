import { describe, expect, it } from "vitest";
import { CONTACT, SOCIALS } from "@/data/site";

describe("Conexa official profiles", () => {
  it("links the company Instagram and LinkedIn pages", () => {
    expect(SOCIALS.instagram).toBe("https://www.instagram.com/agencyconexa");
    expect(SOCIALS.linkedin).toBe("https://www.linkedin.com/company/conexa-agency/");
  });

  it("keeps the WhatsApp and email already published", () => {
    expect(CONTACT.whatsappNumber).toBe("5491154714007");
    expect(CONTACT.whatsappDisplay).toBe("+54 9 11 5471-4007");
    expect(CONTACT.email).toBe("conexa.contactos@gmail.com");
  });
});
