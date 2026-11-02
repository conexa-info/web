import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { WinWin } from "@/components/site/Sections";
import { Heading, Section } from "@/components/site/ui";
import santino from "@/assets/san.webp";
import spiky from "@/assets/spiky.webp";
import emilia from "@/assets/emilia.webp";
import { SOCIALS } from "@/data/site";
import { pageHead, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/about")({
  head: ({ params }) => pageHead(params.lang, "about", "about"),
  component: About,
});

const photos = [santino, spiky, emilia];
const links = [SOCIALS.founderLinkedIn, null, "https://emidonzabidini.github.io/portfolio/"];

function About() {
  const lang = useLang();
  const t = useT().about;
  return (
    <>
      <section className="relative overflow-hidden px-5 py-12 md:px-8 md:py-16">
        <div className="absolute inset-0 bg-gradient-soft" aria-hidden />
        <div className="relative mx-auto max-w-6xl">
          <p className="eyebrow mb-5">{t.eyebrow}</p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-none md:text-7xl">{t.title}</h1>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.story.map((s) => (
              <p key={s} className="text-lg leading-relaxed">
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>
      <Section className="bg-card">
        <Heading title={t.originTitle} />
        <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          {t.origin.map((o) => (
            <p key={o}>{o}</p>
          ))}
        </div>
      </Section>
      <Section>
        <Heading title={t.teamTitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.team.map((m, i) => (
            <article key={m.name} className="lift overflow-hidden rounded-3xl border bg-card">
              <img
                src={photos[i]}
                alt={m.name}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{m.name}</h3>
                <p className="text-sm font-semibold text-primary">{m.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{m.text}</p>
                {links[i] ? (
                  <a
                    href={links[i]!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold hover:text-primary"
                  >
                    {t.more} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section className="bg-soft">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">{t.visionTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.vision}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">{t.baseTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.base}</p>
          </div>
        </div>
      </Section>
      <WinWin lang={lang} />
    </>
  );
}
