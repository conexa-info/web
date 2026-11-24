import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { insert, notifyLead } = vi.hoisted(() => ({
  insert: vi.fn(),
  notifyLead: vi.fn(() => Promise.resolve({ sent: true })),
}));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert }) },
}));
vi.mock("@/lib/notify-lead", () => ({ notifyLead }));

import { CreatorForm } from "@/components/site/Forms";
import { DICT } from "@/lib/i18n";

const c = DICT.es.form.creator;
const set = (id: string, value: string) =>
  fireEvent.change(document.getElementById(`c-${id}`)!, { target: { value } });

function fillRequired() {
  set("full_name", "Ana Pérez");
  set("artistic_name", "anita");
  set("country", "Argentina");
  set("email", "ana@example.com");
  set("whatsapp", "+54 9 11 5555-1234");
  set("instagram_user", "@anita");
  set("followers", c.followerRanges[1]!);
  set("description", "Hago contenido de viajes.");
  fireEvent.click(screen.getByText(c.cats[0]!));
  fireEvent.click(screen.getByLabelText(c.adult));
  fireEvent.click(screen.getByLabelText(new RegExp(DICT.es.form.consent.slice(0, 20))));
}

describe("CreatorForm", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    insert.mockReset().mockResolvedValue({ error: null });
    notifyLead.mockClear();
  });
  afterEach(() => vi.useRealTimers());

  it("no longer asks for Instagram or TikTok links", () => {
    render(<CreatorForm lang="es" />);
    expect(document.getElementById("c-instagram_url")).toBeNull();
    expect(document.getElementById("c-tiktok_url")).toBeNull();
  });

  it("requires WhatsApp and Instagram user, but not the featured link", () => {
    render(<CreatorForm lang="es" />);
    fireEvent.submit(document.querySelector("form")!);
    expect(document.getElementById("c-whatsapp-err")).toHaveTextContent(
      DICT.es.form.errors.required,
    );
    expect(document.getElementById("c-instagram_user-err")).toBeInTheDocument();
    expect(document.getElementById("c-featured_url-err")).toBeNull();
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects a WhatsApp number that is not a phone", () => {
    render(<CreatorForm lang="es" />);
    set("whatsapp", "llamame");
    fireEvent.submit(document.querySelector("form")!);
    expect(document.getElementById("c-whatsapp-err")).toHaveTextContent(DICT.es.form.errors.phone);
  });

  it("submits without featured link and shows success only after the insert", async () => {
    render(<CreatorForm lang="es" />);
    fillRequired();
    vi.setSystemTime(Date.now() + 10_000);
    fireEvent.submit(document.querySelector("form")!);
    await waitFor(() => expect(screen.getByText(c.successTitle)).toBeInTheDocument());
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({ featured_url: "", instagram_user: "@anita", locale: "es" }),
    );
    expect(notifyLead).toHaveBeenCalledOnce();
  });

  it("adds https:// to a featured link pasted without it", async () => {
    render(<CreatorForm lang="es" />);
    fillRequired();
    set("featured_url", "tiktok.com/@anita/video/1");
    vi.setSystemTime(Date.now() + 10_000);
    fireEvent.submit(document.querySelector("form")!);
    await waitFor(() => expect(insert).toHaveBeenCalled());
    expect(insert.mock.calls[0]![0].featured_url).toBe("https://tiktok.com/@anita/video/1");
  });

  it("shows the error state when the insert fails", async () => {
    insert.mockResolvedValue({ error: { message: "boom" } });
    render(<CreatorForm lang="es" />);
    fillRequired();
    vi.setSystemTime(Date.now() + 10_000);
    fireEvent.submit(document.querySelector("form")!);
    await waitFor(() => expect(screen.getByText(DICT.es.form.errorTitle)).toBeInTheDocument());
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("silently drops submissions that fill the spam trap", async () => {
    render(<CreatorForm lang="es" />);
    fillRequired();
    fireEvent.change(document.querySelector('input[name="nickname"]')!, {
      target: { value: "bot" },
    });
    vi.setSystemTime(Date.now() + 10_000);
    fireEvent.submit(document.querySelector("form")!);
    await waitFor(() => expect(screen.getByText(c.successTitle)).toBeInTheDocument());
    expect(insert).not.toHaveBeenCalled();
  });
});
