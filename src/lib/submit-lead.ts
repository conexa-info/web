import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CONTACT } from "@/data/site";

// Delivers a form submission to the team. Runs only on the server, in parallel:
//  - Email through Resend: RESEND_API_KEY, RESEND_FROM (sender on a domain verified
//    in Resend) and CONEXA_PREFERENCES_TO (inbox; defaults to the public contact email).
//  - A row in a Google Sheet: SHEETS_WEBHOOK_URL + SHEETS_WEBHOOK_SECRET
//    (see scripts/google-sheets-webhook.gs for the sheet side).
// The submission counts as delivered when at least one channel accepted it.

const input = z.object({
  kind: z.enum(["brand", "creator"]),
  fields: z
    .record(z.string().max(60), z.string().max(2000))
    .refine((f) => Object.keys(f).length <= 30),
});

/** Column / email labels, in the order they appear in the sheet. */
const LABELS: Record<string, string> = {
  full_name: "Nombre",
  artistic_name: "Nombre artístico",
  company: "Empresa",
  email: "Email",
  whatsapp: "WhatsApp",
  website: "Web",
  talent: "Talento",
  market: "Mercado",
  country: "País",
  city: "Ciudad",
  instagram_user: "Instagram",
  tiktok_user: "TikTok",
  other_url: "Otro link",
  followers: "Seguidores",
  categories: "Categorías",
  description: "Descripción",
  featured_url: "Contenido destacado",
  extra: "Extra",
  locale: "Idioma",
};

const TIMEOUT_MS = 10000;
const env = (...names: string[]) => names.map((n) => process.env[n]).find(Boolean);

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

function labelled(fields: Record<string, string>): [string, string][] {
  const known = Object.keys(LABELS).filter((k) => fields[k]);
  const rest = Object.keys(fields).filter((k) => !(k in LABELS) && fields[k]);
  return [...known, ...rest].map((k) => [LABELS[k] ?? k, fields[k]!]);
}

async function sendEmail(kind: "brand" | "creator", f: Record<string, string>): Promise<boolean> {
  const key = env("RESEND_API_KEY");
  if (!key) return false;
  const to = env("CONEXA_PREFERENCES_TO", "LEADS_NOTIFY_TO") || CONTACT.email;
  const from = env("RESEND_FROM", "LEADS_NOTIFY_FROM") || "Conexa <onboarding@resend.dev>";
  const who =
    kind === "brand"
      ? `${f["company"] ?? ""} (${f["full_name"] ?? ""})`
      : `${f["artistic_name"] ?? ""} (${f["full_name"] ?? ""})`;
  const subject =
    kind === "brand" ? `Nueva consulta de marca: ${who}` : `Nueva postulación de creador: ${who}`;
  const rows = labelled(f)
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
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) console.error("[lead] email failed", res.status, await res.text());
  return res.ok;
}

async function appendRow(kind: "brand" | "creator", f: Record<string, string>): Promise<boolean> {
  const url = env("SHEETS_WEBHOOK_URL");
  if (!url) return false;
  const row: Record<string, string> = {
    Fecha: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" }),
  };
  for (const [k, v] of labelled(f)) row[k] = v;
  // Apps Script answers POST with a redirect to the result; fetch follows it.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      secret: env("SHEETS_WEBHOOK_SECRET") ?? "",
      sheet: kind === "brand" ? "Marcas" : "Creadores",
      row,
    }),
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const body = await res.text();
  const ok = res.ok && /"ok"\s*:\s*true/.test(body);
  if (!ok) console.error("[lead] sheet failed", res.status, body.slice(0, 300));
  return ok;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const settle = (p: Promise<boolean>) =>
      p.catch((err: unknown) => {
        console.error("[lead] channel threw", err);
        return false;
      });
    const [emailed, saved] = await Promise.all([
      settle(sendEmail(data.kind, data.fields)),
      settle(appendRow(data.kind, data.fields)),
    ]);
    return { ok: emailed || saved, emailed, saved };
  });
