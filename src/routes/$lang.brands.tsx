import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { z } from "zod";
import { BrandForm } from "@/components/site/Forms";
import { btn, Heading, Section } from "@/components/site/ui";
import { pageHead, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/brands")({
  validateSearch: z.object({ talent: z.string().optional() }),
  head: ({ params }) => pageHead(params.lang, "brands", "brands"),
  component: Brands,
});

function Brands() {
  const lang = useLang();
  const t = useT().brands;
  const { talent } = Route.useSearch();
  return (
    <>
      <section className="relative overflow-hidden bg-ink px-5 py-12 text-ink-foreground md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-5">{t.eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-[1] md:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-80">{t.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#brief" className={btn({ size: "lg" })}>
              {t.cta}
            </a>
            <Link
              to="/$lang/talents"
              params={{ lang }}
              className={btn({ variant: "light", size: "lg" })}
            >
              {t.cta2}
            </Link>
          </div>
        </div>
      </section>
      <Section>
        <Heading title={t.servicesTitle} />
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {t.services.map((s) => (
            <li key={s} className="flex items-start gap-3 rounded-2xl border bg-card p-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                <Check className="h-3.5 w-3.5" />
              </span>
              {s}
            </li>
          ))}
        </ul>
        <h3 className="mt-16 text-2xl font-bold">{t.legacyTitle}</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {t.legacy.map((l) => (
            <div key={l.title} className="rounded-3xl bg-soft p-7">
              <h4 className="text-lg font-bold">{l.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{l.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <section id="brief" className="bg-soft px-5 py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <BrandForm key={talent ?? "none"} lang={lang} defaultTalent={talent} />
        </div>
      </section>
    </>
  );
}
