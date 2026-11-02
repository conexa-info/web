import { useState, type ReactNode } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, MessageCircle, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TALENTS } from "@/data/talents";
import { mailtoLink, whatsappLink } from "@/data/site";
import { DICT, type Lang } from "@/lib/i18n";
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
const optUrl = z.string().trim().max(300, "long").url("url").optional().or(z.literal(""));

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
  whatsapp: opt(40),
  website: opt(300),
  campaign_type: req(60),
  talent: req(60),
  product: req(500),
  objective: req(1000),
  market: req(160),
  budget: opt(120),
  campaign_date: opt(60),
  message: opt(2000),
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
    setState("sending");
    const v = parsed.data;
    const { error } = await supabase.from("brand_inquiries").insert({
      ...v,
      whatsapp: v.whatsapp || null,
      website: v.website || null,
      budget: v.budget || null,
      campaign_date: v.campaign_date || null,
      message: v.message || null,
      locale: lang,
    });
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
      className="space-y-5 rounded-3xl border bg-card p-6 shadow-card md:p-10"
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
        <Field lang={lang} id="b-whatsapp" label={b.whatsapp} optional error={errs["whatsapp"]}>
          <input {...p("whatsapp")} type="tel" autoComplete="tel" />
        </Field>
        <Field lang={lang} id="b-website" label={b.website} optional error={errs["website"]}>
          <input {...p("website")} />
        </Field>
        <Field
          lang={lang}
          id="b-campaign_type"
          label={b.campaignType}
          error={errs["campaign_type"]}
        >
          <select {...p("campaign_type")} defaultValue="">
            <option value="" disabled>
              {f.select}
            </option>
            {b.campaignTypes.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
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
      <Field lang={lang} id="b-product" label={b.product} error={errs["product"]}>
        <input {...p("product")} />
      </Field>
      <Field lang={lang} id="b-objective" label={b.objective} error={errs["objective"]}>
        <textarea {...p("objective")} rows={3} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field lang={lang} id="b-budget" label={b.budget} optional error={errs["budget"]}>
          <input {...p("budget")} />
        </Field>
        <Field
          lang={lang}
          id="b-campaign_date"
          label={b.date}
          optional
          error={errs["campaign_date"]}
        >
          <input {...p("campaign_date")} type="month" />
        </Field>
      </div>
      <Field lang={lang} id="b-message" label={b.message} optional error={errs["message"]}>
        <textarea {...p("message")} rows={3} />
      </Field>
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

const creatorSchema = z
  .object({
    full_name: req(120).pipe(z.string().min(2, "required")),
    artistic_name: req(120),
    is_adult: z.literal(true, { errorMap: () => ({ message: "adult" }) }),
    country: req(80),
    city: opt(80),
    email: z.string().trim().min(1, "required").max(255, "long").email("email"),
    whatsapp: opt(40),
    instagram_user: opt(80),
    instagram_url: optUrl,
    tiktok_user: opt(80),
    tiktok_url: optUrl,
    other_url: optUrl,
    followers: req(60),
    categories: z.array(z.string()).min(1, "categories"),
    description: req(2000),
    featured_url: z.string().trim().min(1, "required").max(300, "long").url("url"),
    extra: opt(2000),
    consent: z.literal(true, { errorMap: () => ({ message: "consent" }) }),
  })
  .refine((d) => !!(d.instagram_user || d.tiktok_user), {
    path: ["instagram_user"],
    message: "social",
  });

export function CreatorForm({ lang }: { lang: Lang }) {
  const f = DICT[lang].form;
  const c = f.creator;
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);
  const [adult, setAdult] = useState(false);
  const [cats, setCats] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = creatorSchema.safeParse({ ...data, categories: cats, consent, is_adult: adult });
    if (!parsed.success) {
      const m = mapErrors(parsed.error, lang);
      if (parsed.error.issues.some((i) => i.message === "social"))
        m["instagram_user"] = c.atLeastOne;
      setErrs(m);
      return;
    }
    setErrs({});
    setState("sending");
    const v = parsed.data;
    const nul = (s?: string) => s || null;
    const { error } = await supabase.from("creator_applications").insert({
      ...v,
      city: nul(v.city),
      whatsapp: nul(v.whatsapp),
      instagram_user: nul(v.instagram_user),
      instagram_url: nul(v.instagram_url),
      tiktok_user: nul(v.tiktok_user),
      tiktok_url: nul(v.tiktok_url),
      other_url: nul(v.other_url),
      extra: nul(v.extra),
      locale: lang,
    });
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
      className="space-y-5 rounded-3xl border bg-card p-6 shadow-card md:p-10"
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
        <Field lang={lang} id="c-whatsapp" label={c.whatsapp} optional error={errs["whatsapp"]}>
          <input {...p("whatsapp")} type="tel" />
        </Field>
        <Field
          lang={lang}
          id="c-instagram_user"
          label={c.igUser}
          optional
          error={errs["instagram_user"]}
        >
          <input {...p("instagram_user")} placeholder="@" />
        </Field>
        <Field
          lang={lang}
          id="c-instagram_url"
          label={c.igUrl}
          optional
          error={errs["instagram_url"]}
        >
          <input {...p("instagram_url")} type="url" placeholder="https://instagram.com/…" />
        </Field>
        <Field lang={lang} id="c-tiktok_user" label={c.ttUser} optional error={errs["tiktok_user"]}>
          <input {...p("tiktok_user")} placeholder="@" />
        </Field>
        <Field lang={lang} id="c-tiktok_url" label={c.ttUrl} optional error={errs["tiktok_url"]}>
          <input {...p("tiktok_url")} type="url" placeholder="https://tiktok.com/@…" />
        </Field>
        <Field lang={lang} id="c-other_url" label={c.otherUrl} optional error={errs["other_url"]}>
          <input {...p("other_url")} type="url" />
        </Field>
        <Field lang={lang} id="c-followers" label={c.followers} error={errs["followers"]}>
          <input {...p("followers")} placeholder="50.000" />
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
      <Field lang={lang} id="c-featured_url" label={c.featured} error={errs["featured_url"]}>
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
