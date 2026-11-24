import { useState, type ReactNode } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, MessageCircle, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TALENTS } from "@/data/talents";
import { mailtoLink, whatsappLink } from "@/data/site";
import { DICT, type Lang } from "@/lib/i18n";
import { trackLead } from "@/lib/analytics";
import { notifyLead } from "@/lib/notify-lead";
import { btn } from "./ui";

type Errs = Record<string, string>;
type ErrKey = keyof (typeof DICT)["es"]["form"]["errors"];

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-destructive";

function Field({
  id,
  label,
  error,
  optional,
  children,
  lang,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  optional?: boolean | undefined;
  children: ReactNode;
  lang: Lang;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional ? (
          <span className="font-normal text-muted-foreground"> ({DICT[lang].form.optional})</span>
        ) : (
          <span className="text-primary" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const req = (max: number) => z.string().trim().min(1, "required").max(max, "long");
const opt = (max: number) => z.string().trim().max(max, "long").optional().or(z.literal(""));
// Accepts links pasted without protocol (e.g. "tiktok.com/@user") by prefixing https://.
const withProtocol = (v: unknown) => {
  if (typeof v !== "string") return v;
  const t = v.trim();
  return t && !/^https?:\/\//i.test(t) ? `https://${t}` : t;
};
const optUrl = z.preprocess(
  withProtocol,
  z.string().max(300, "long").url("url").optional().or(z.literal("")),
);

// Phone numbers: digits with optional leading "+" and common separators, 8–15 digits.
const PHONE_SEPARATORS = /[\s().-]/g;
const isPhone = (v: string) => /^\+?\d{8,15}$/.test(v.replace(PHONE_SEPARATORS, ""));
const reqPhone = req(40).refine(isPhone, "phone");
const optPhone = opt(40).refine((v) => !v || isPhone(v), "phone");

// Spam trap: bots fill the hidden field or submit within seconds of loading the form.
const HONEYPOT = "nickname";
const MIN_FILL_MS = 3000;
const looksLikeBot = (data: Record<string, string>, startedAt: number) =>
  !!data[HONEYPOT] || Date.now() - startedAt < MIN_FILL_MS;

function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Nickname
        <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

/** Analytics + team email after a successful insert. Never blocks or fails the submission. */
function afterLead(kind: "brand" | "creator", lang: Lang, fields: Record<string, unknown>) {
  trackLead(kind, lang);
  const flat: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields))
    if (v !== undefined && v !== null && v !== "")
      flat[k] = (Array.isArray(v) ? v.join(", ") : String(v)).slice(0, 2000);
  notifyLead({ data: { kind, fields: flat } }).catch(() => {});
}

function mapErrors(err: z.ZodError, lang: Lang): Errs {
  const out: Errs = {};
  for (const i of err.issues) {
    const k = String(i.path[0]);
    if (!out[k])
      out[k] =
        DICT[lang].form.errors[
          (i.message as ErrKey) in DICT[lang].form.errors ? (i.message as ErrKey) : "required"
        ];
  }
  return out;
}

function Status({
  state,
  lang,
  success,
  waMsg,
}:
  | { state: "error"; lang: Lang; success?: never; waMsg: string }
  | { state: "success"; lang: Lang; success: { title: string; body: string }; waMsg?: string }) {
  const f = DICT[lang].form;
  if (state === "success")
    return (
      <div
        className="rounded-3xl border bg-card p-8 text-center shadow-card"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden />
        <h3 className="mt-4 text-2xl font-bold">{success.title}</h3>
        <p className="mt-2 text-muted-foreground">{success.body}</p>
      </div>
    );
  return (
    <div
      className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 text-sm"
      role="alert"
    >
      <p className="font-bold text-destructive">{f.errorTitle}</p>
      <p className="mt-1">{f.errorBody}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={whatsappLink(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className={btn({ variant: "outline" })}
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href={mailtoLink(DICT[lang].contact.mailSubject, waMsg)}
          className={btn({ variant: "outline" })}
        >
          <Mail className="h-4 w-4" /> Email
        </a>
      </div>
    </div>
  );
}

function Consent({
  lang,
  error,
  checked,
  onChange,
}: {
  lang: Lang;
  error?: string | undefined;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="consent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-5 w-5 accent-[var(--primary)]"
          aria-invalid={!!error}
        />
        <span>
          {DICT[lang].form.consent}{" "}
          <a href="#privacy" className="underline">
            ↓
          </a>
        </span>
      </label>
      {error && (
        <p className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const brandSchema = z.object({
  full_name: req(120).pipe(z.string().min(2, "required")),
  company: req(160),
  email: z.string().trim().min(1, "required").max(255, "long").email("email"),
  whatsapp: reqPhone,
  website: opt(300),
  talent: req(60),
  market: req(160),
  consent: z.literal(true, { errorMap: () => ({ message: "consent" }) }),
});

export function BrandForm({
  lang,
  defaultTalent,
}: {
  lang: Lang;
  defaultTalent?: string | undefined;
}) {
  const f = DICT[lang].form;
  const b = f.brand;
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const talentNames = TALENTS.map((t) => t.name);
  const preset = TALENTS.find((t) => t.slug === defaultTalent)?.name ?? "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = brandSchema.safeParse({ ...data, consent });
    if (!parsed.success) {
      setErrs(mapErrors(parsed.error, lang));
      return;
    }
    setErrs({});
    if (looksLikeBot(data, startedAt)) {
      setState("success");
      return;
    }
    setState("sending");
    const v = parsed.data;
    const { error } = await supabase.from("brand_inquiries").insert({
      ...v,
      website: v.website || null,
      // Columns that are NOT NULL in the table but no longer asked in the short form.
      campaign_type: "",
      product: "",
      objective: "",
      locale: lang,
    });
    if (!error) afterLead("brand", lang, { ...v, locale: lang });
    setState(error ? "error" : "success");
  }

  if (state === "success")
    return (
      <Status
        state="success"
        lang={lang}
        success={{ title: b.successTitle, body: b.successBody }}
      />
    );

  const p = (name: string) => ({
    id: `b-${name}`,
    name,
    "aria-invalid": !!errs[name],
    "aria-describedby": errs[name] ? `b-${name}-err` : undefined,
    className: inputCls,
  });
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-5 rounded-3xl border bg-card p-6 shadow-card md:p-10"
    >
      <div>
        <h2 className="text-3xl font-bold">{b.title}</h2>
        <p className="mt-2 text-muted-foreground">{b.text}</p>
      </div>
      {Object.keys(errs).length > 0 && (
        <p className="text-sm font-semibold text-destructive" role="alert">
          {f.fixErrors}
        </p>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <Field lang={lang} id="b-full_name" label={b.fullName} error={errs["full_name"]}>
          <input {...p("full_name")} autoComplete="name" />
        </Field>
        <Field lang={lang} id="b-company" label={b.company} error={errs["company"]}>
          <input {...p("company")} autoComplete="organization" />
        </Field>
        <Field lang={lang} id="b-email" label={b.email} error={errs["email"]}>
          <input {...p("email")} type="email" autoComplete="email" />
        </Field>
        <Field lang={lang} id="b-whatsapp" label={b.whatsapp} error={errs["whatsapp"]}>
          <input {...p("whatsapp")} type="tel" autoComplete="tel" placeholder="+54 9 11 …" />
        </Field>
        <Field lang={lang} id="b-website" label={b.website} optional error={errs["website"]}>
          <input {...p("website")} />
        </Field>
        <Field lang={lang} id="b-talent" label={b.talent} error={errs["talent"]}>
          <select {...p("talent")} defaultValue={preset}>
            <option value="" disabled>
              {f.select}
            </option>
            {[...talentNames, ...b.talentOther].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field lang={lang} id="b-market" label={b.market} error={errs["market"]}>
          <input {...p("market")} />
        </Field>
      </div>
      <Honeypot />
      <Consent lang={lang} checked={consent} onChange={setConsent} error={errs["consent"]} />
      {state === "error" && <Status state="error" lang={lang} waMsg={DICT[lang].contact.waBrand} />}
      <button type="submit" disabled={state === "sending"} className={btn({ size: "lg" })}>
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {f.sending}
          </>
        ) : (
          b.submit
        )}
      </button>
    </form>
  );
}

const creatorSchema = z.object({
  full_name: req(120).pipe(z.string().min(2, "required")),
  artistic_name: req(120),
  is_adult: z.literal(true, { errorMap: () => ({ message: "adult" }) }),
  country: req(80),
  city: opt(80),
  email: z.string().trim().min(1, "required").max(255, "long").email("email"),
  whatsapp: reqPhone,
  instagram_user: req(80),
  tiktok_user: opt(80),
  other_url: optUrl,
  followers: req(60),
  categories: z.array(z.string()).min(1, "categories"),
  description: req(2000),
  featured_url: optUrl,
  extra: opt(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "consent" }) }),
});

export function CreatorForm({ lang }: { lang: Lang }) {
  const f = DICT[lang].form;
  const c = f.creator;
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);
  const [adult, setAdult] = useState(false);
  const [cats, setCats] = useState<string[]>([]);
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = creatorSchema.safeParse({ ...data, categories: cats, consent, is_adult: adult });
    if (!parsed.success) {
      setErrs(mapErrors(parsed.error, lang));
      return;
    }
    setErrs({});
    if (looksLikeBot(data, startedAt)) {
      setState("success");
      return;
    }
    setState("sending");
    const v = parsed.data;
    const nul = (s?: string) => s || null;
    const { error } = await supabase.from("creator_applications").insert({
      ...v,
      city: nul(v.city),
      tiktok_user: nul(v.tiktok_user),
      other_url: nul(v.other_url),
      // featured_url is NOT NULL in the table, so an empty optional value is stored as "".
      featured_url: v.featured_url ?? "",
      extra: nul(v.extra),
      locale: lang,
    });
    if (!error) afterLead("creator", lang, { ...v, locale: lang });
    setState(error ? "error" : "success");
  }

  if (state === "success")
    return (
      <Status
        state="success"
        lang={lang}
        success={{ title: c.successTitle, body: c.successBody }}
      />
    );

  const p = (name: string) => ({
    id: `c-${name}`,
    name,
    "aria-invalid": !!errs[name],
    "aria-describedby": errs[name] ? `c-${name}-err` : undefined,
    className: inputCls,
  });
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-5 rounded-3xl border bg-card p-6 shadow-card md:p-10"
    >
      <div>
        <h2 className="text-3xl font-bold">{c.title}</h2>
        <p className="mt-2 text-muted-foreground">{c.text}</p>
      </div>
      {Object.keys(errs).length > 0 && (
        <p className="text-sm font-semibold text-destructive" role="alert">
          {f.fixErrors}
        </p>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <Field lang={lang} id="c-full_name" label={c.fullName} error={errs["full_name"]}>
          <input {...p("full_name")} autoComplete="name" />
        </Field>
        <Field
          lang={lang}
          id="c-artistic_name"
          label={c.artisticName}
          error={errs["artistic_name"]}
        >
          <input {...p("artistic_name")} />
        </Field>
        <Field lang={lang} id="c-country" label={c.country} error={errs["country"]}>
          <input {...p("country")} autoComplete="country-name" />
        </Field>
        <Field lang={lang} id="c-city" label={c.city} optional error={errs["city"]}>
          <input {...p("city")} />
        </Field>
        <Field lang={lang} id="c-email" label={c.email} error={errs["email"]}>
          <input {...p("email")} type="email" autoComplete="email" />
        </Field>
        <Field lang={lang} id="c-whatsapp" label={c.whatsapp} error={errs["whatsapp"]}>
          <input {...p("whatsapp")} type="tel" autoComplete="tel" placeholder="+54 9 11 …" />
        </Field>
        <Field lang={lang} id="c-instagram_user" label={c.igUser} error={errs["instagram_user"]}>
          <input {...p("instagram_user")} placeholder="@" />
        </Field>
        <Field lang={lang} id="c-tiktok_user" label={c.ttUser} optional error={errs["tiktok_user"]}>
          <input {...p("tiktok_user")} placeholder="@" />
        </Field>
        <Field lang={lang} id="c-other_url" label={c.otherUrl} optional error={errs["other_url"]}>
          <input {...p("other_url")} type="url" />
        </Field>
        <Field lang={lang} id="c-followers" label={c.followers} error={errs["followers"]}>
          <select {...p("followers")} defaultValue="">
            <option value="" disabled>
              {f.select}
            </option>
            {c.followerRanges.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">
          {c.categories}
          <span className="text-primary" aria-hidden>
            {" "}
            *
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {c.cats.map((cat) => {
            const on = cats.includes(cat);
            return (
              <label
                key={cat}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${on ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary"}`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => setCats(on ? cats.filter((x) => x !== cat) : [...cats, cat])}
                />
                {cat}
              </label>
            );
          })}
        </div>
        {errs["categories"] && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errs["categories"]}
          </p>
        )}
      </fieldset>
      <Field lang={lang} id="c-description" label={c.description} error={errs["description"]}>
        <textarea {...p("description")} rows={3} />
      </Field>
      <Field
        lang={lang}
        id="c-featured_url"
        label={c.featured}
        optional
        error={errs["featured_url"]}
      >
        <input {...p("featured_url")} type="url" placeholder="https://" />
      </Field>
      <Field lang={lang} id="c-extra" label={c.extra} optional error={errs["extra"]}>
        <textarea {...p("extra")} rows={2} />
      </Field>
      <div>
        <label className="flex items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            checked={adult}
            onChange={(e) => setAdult(e.target.checked)}
            className="h-5 w-5 accent-[var(--primary)]"
            aria-invalid={!!errs["is_adult"]}
          />
          {c.adult}
        </label>
        {errs["is_adult"] && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errs["is_adult"]}
          </p>
        )}
      </div>
      <Honeypot />
      <Consent lang={lang} checked={consent} onChange={setConsent} error={errs["consent"]} />
      {state === "error" && (
        <Status state="error" lang={lang} waMsg={DICT[lang].contact.waCreator} />
      )}
      <p className="text-xs text-muted-foreground">{DICT[lang].creators.disclaimer}</p>
      <button type="submit" disabled={state === "sending"} className={btn({ size: "lg" })}>
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {f.sending}
          </>
        ) : (
          c.submit
        )}
      </button>
    </form>
  );
}
