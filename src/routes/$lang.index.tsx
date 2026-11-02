import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-creator.jpg";
import { ConnectionFlow } from "@/components/site/ConnectionFlow";
import { TalentLinks } from "@/components/site/TalentLinks";
import { HowSteps, ValueSection, WinWin } from "@/components/site/Sections";
import { btn, Section } from "@/components/site/ui";
import { TALENTS } from "@/data/talents";
import { CONTACT, SOCIALS } from "@/data/site";
import { pageHead, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => ({
    ...pageHead(params.lang, "home", ""),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CONEXA",
          url: CONTACT.siteUrl,
          email: CONTACT.email,
          telephone: CONTACT.whatsappDisplay,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Buenos Aires",
            addressCountry: "AR",
          },
          sameAs: [SOCIALS.instagram, SOCIALS.linkedin, SOCIALS.founderLinkedIn],
          founder: { "@type": "Person", name: "Santino Gioveni", sameAs: SOCIALS.founderLinkedIn },
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const lang = useLang();
  const t = useT();
  const [l1, l2, l3, l4] = t.hero.lines;
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-12">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          width={1024}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40 blur-sm grayscale"
        />
        <div className="absolute inset-0 bg-background/75" aria-hidden />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b pb-3 text-xs font-bold uppercase text-muted-foreground">
            <span className="min-w-0">{t.hero.tag}</span>
            <span className="shrink-0">(AR) — 2026</span>
          </div>
          <div className="relative mt-8 md:mt-10 md:pr-12">
            <h1
              aria-label={t.hero.title}
              className="animate-rise relative z-10 space-y-1 text-5xl leading-[1.02] sm:text-7xl md:text-8xl lg:text-[7.5rem]"
            >
              <span className="block">{l1}</span>
              <span className="block text-outline">
                {l2}{" "}
                <span className="align-middle font-serif text-[0.35em] normal-case italic text-foreground [-webkit-text-stroke:0]">
                  {l3}
                </span>
              </span>
              <span className="block text-neon">{l4}</span>
            </h1>
            <span className="vertical absolute right-0 top-0 hidden font-display text-sm uppercase tracking-[0.5em] text-muted-foreground md:block">
              {t.hero.vertical} — {t.hero.vertical}
            </span>
          </div>
          <div className="mt-5 md:mt-6">
            <p className="max-w-xl text-lg leading-relaxed text-foreground">{t.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/$lang/brands"
                params={{ lang }}
                hash="brief"
                className={btn({ size: "lg" })}
              >
                {t.hero.primary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/$lang/creators"
                params={{ lang }}
                hash="apply"
                className={btn({ variant: "outline", size: "lg" })}
              >
                {t.hero.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HowSteps lang={lang} />
      <ConnectionFlow lang={lang} />
      <ValueSection lang={lang} />

      <Section>
        <div className="grid gap-px border bg-border md:grid-cols-[1.3fr_1fr]">
          <Link
            to="/$lang/brands"
            params={{ lang }}
            className="group bg-background p-8 transition-colors hover:bg-primary hover:text-primary-foreground md:p-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em]">A — {t.nav.brands}</p>
            <p className="mt-10 font-display text-4xl uppercase leading-none md:text-6xl">
              {t.home.brandsCard}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold">
              {t.home.discover}{" "}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />
            </span>
          </Link>
          <Link
            to="/$lang/creators"
            params={{ lang }}
            className="group bg-background p-8 transition-colors hover:bg-foreground hover:text-background md:mt-12 md:p-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em]">B — {t.nav.creators}</p>
            <p className="mt-10 font-serif text-3xl italic leading-tight md:text-4xl">
              {t.home.creatorsCard}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold">
              {t.home.discover}{" "}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />
            </span>
          </Link>
        </div>
      </Section>

      <Section>
        <div className="grid min-w-0 gap-6 sm:flex sm:items-end sm:justify-between">
          <h2 className="text-6xl leading-[0.85] md:text-9xl">
            {t.nav.talents}
            <sup className="ml-2 align-top font-sans text-lg text-primary">
              {String(TALENTS.length).padStart(2, "0")}
            </sup>
          </h2>
          <Link to="/$lang/talents" params={{ lang }} className={btn({ variant: "outline" })}>
            {t.home.allTalents}
          </Link>
        </div>
        <p className="mt-6 max-w-xl font-serif text-2xl italic text-muted-foreground">
          {t.talents.international}
        </p>
        <div className="mt-8">
          <TalentLinks talents={TALENTS} lang={lang} />
        </div>
      </Section>

      <WinWin lang={lang} />
    </>
  );
}
