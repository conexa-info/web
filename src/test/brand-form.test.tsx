import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { submitLead } = vi.hoisted(() => ({ submitLead: vi.fn() }));
vi.mock("@/lib/submit-lead", () => ({ submitLead }));

import { BrandForm } from "@/components/site/Forms";
import { DICT } from "@/lib/i18n";

const set = (id: string, value: string) =>
  fireEvent.change(document.getElementById(`b-${id}`)!, { target: { value } });

describe("BrandForm", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    submitLead.mockReset().mockResolvedValue({ ok: true });
  });
  afterEach(() => vi.useRealTimers());

  it("only asks for the short list of fields", () => {
    render(<BrandForm lang="es" />);
    const names = [...document.querySelectorAll("form [name]")]
      .map((el) => el.getAttribute("name"))
      .filter((n) => n !== "nickname" && n !== "consent");
    expect(names).toEqual([
      "full_name",
      "company",
      "email",
      "whatsapp",
      "website",
      "talent",
      "market",
    ]);
  });

  it("requires WhatsApp", () => {
    render(<BrandForm lang="es" />);
    fireEvent.submit(document.querySelector("form")!);
    expect(document.getElementById("b-whatsapp-err")).toHaveTextContent(
      DICT.es.form.errors.required,
    );
  });

  it("sends the brand lead with the preset talent", async () => {
    render(<BrandForm lang="es" defaultTalent="spiky" />);
    set("full_name", "Ana Pérez");
    set("company", "Marca");
    set("email", "ana@marca.com");
    set("whatsapp", "+54 9 11 5555-1234");
    set("market", "Argentina");
    fireEvent.click(screen.getByRole("checkbox"));
    vi.setSystemTime(Date.now() + 10_000);
    fireEvent.submit(document.querySelector("form")!);
    await waitFor(() =>
      expect(screen.getByText(DICT.es.form.brand.successTitle)).toBeInTheDocument(),
    );
    const { kind, fields } = submitLead.mock.calls[0]![0].data;
    expect(kind).toBe("brand");
    expect(fields).toMatchObject({ talent: "Spiky", company: "Marca", locale: "es" });
  });
});
