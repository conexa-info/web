import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { CreatorForm } from "@/components/site/Forms";
import { btn, Heading, Section } from "@/components/site/ui";
import { whatsappLink } from "@/data/site";
import { DICT, pageHead, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/creators")({
  head: ({ params }) => pageHead(params.lang, "creators", "creators"),
  component: Creators,
});

function Creators() {
  const lang = useLang();
  const d = DICT[lang];
  const t = d.creators;
  return (
    <>
      <section className="relative overflow-hidden px-5 py-12 md:px-8 md:py-16">
        <div className="absolute inset-0 bg-gradient-soft" aria-hidden />
        <div className="relative mx-auto max-w-6xl">
          <p className="eyebrow mb-5">{t.eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-[1] md:text-6xl">
            {t.title.split(".")[0]}.{" "}
            <span className="text-gradient">{t.title.split(".").slice(1).join(".").trim()}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#apply" className={btn({ size: "lg" })}>
              {t.cta}
            </a>
            <a
              href={whatsappLink(d.contact.waCreator)}
              target="_blank"
              rel="noopener noreferrer"
              className={btn({ variant: "outline", size: "lg" })}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
      <Section className="bg-card">
        <Heading title={t.servicesTitle} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.map((s, i) => (
            <li key={s} className="lift rounded-3xl border bg-background p-6">
              <span className="font-display text-3xl font-extrabold text-gradient">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-semibold">{s}</p>
            </li>
          ))}
        </ol>
      </Section>
      <section id="apply" className="bg-soft px-5 py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <CreatorForm lang={lang} />
        </div>
      </section>
    </>
  );
}
