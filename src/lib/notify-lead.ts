import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CONTACT } from "@/data/site";

// Emails the team when a form is submitted. Runs only on the server.
// Needs the RESEND_API_KEY secret; without it this is a silent no-op.
// Optional: LEADS_NOTIFY_TO (defaults to the public contact email) and
// LEADS_NOTIFY_FROM (a sender on a domain verified in Resend).

const input = z.object({
  kind: z.enum(["brand", "creator"]),
  fields: z
    .record(z.string().max(60), z.string().max(2000))
    .refine((f) => Object.keys(f).length <= 30),
});

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export const notifyLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["RESEND_API_KEY"];
    if (!key) return { sent: false };
    const to = process.env["LEADS_NOTIFY_TO"] || CONTACT.email;
    const from = process.env["LEADS_NOTIFY_FROM"] || "Conexa <onboarding@resend.dev>";
    const f = data.fields;
    const who =
      data.kind === "brand"
        ? `${f["company"] ?? ""} (${f["full_name"] ?? ""})`
        : `${f["artistic_name"] ?? ""} (${f["full_name"] ?? ""})`;
    const subject =
      data.kind === "brand"
        ? `Nueva consulta de marca: ${who}`
        : `Nueva postulación de creador: ${who}`;
    const rows = Object.entries(f)
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join("");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        reply_to: f["email"] || undefined,
        html: `<h2 style="font-family:sans-serif">${esc(subject)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      }),
    });
    if (!res.ok) console.error("notifyLead failed", res.status, await res.text());
    return { sent: res.ok };
  });
