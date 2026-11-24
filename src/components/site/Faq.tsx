import { Plus } from "lucide-react";
import { CONTACT, SOCIALS } from "@/data/site";
import { DICT, type Lang } from "@/lib/i18n";
import { Reveal } from "./Motion";
import { Section } from "./ui";

type Group = "brands" | "creators" | "general";
type Item = { q: string; a: string };

const igHandle = () => "@" + SOCIALS.instagram.replace(/\/+$/, "").split("/").pop();

function faqGroups(lang: Lang, only?: Group[]) {
  const f = DICT[lang].faq;
  const groups: { id: Group; title: string; items: Item[] }[] = [
    ...f.groups.map((g) => ({ id: g.id as Group, title: g.title, items: g.items })),
    {
      id: "general",
      title: f.general,
      items: [{ q: f.contactQ, a: f.contactA(CONTACT.email, CONTACT.whatsappDisplay, igHandle()) }],
    },
  ];
  return only ? groups.filter((g) => only.includes(g.id)) : groups;
}

/** schema.org FAQPage so search engines and AI assistants can quote the answers. */
export function faqJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqGroups(lang).flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };
}

export function Faq({ lang, only, id = "faq" }: { lang: Lang; only?: Group[]; id?: string }) {
  const f = DICT[lang].faq;
  const groups = faqGroups(lang, only);
  return (
    <Section id={id}>
      <Reveal>
        <p className="eyebrow mb-4">{f.eyebrow}</p>
        <h2 className="max-w-3xl text-4xl leading-none md:text-6xl">{f.title}</h2>
      </Reveal>
      <div className="mt-10 space-y-12">
        {groups.map((g) => (
          <Reveal key={g.id}>
            {groups.length > 1 && (
              <h3 className="mb-4 font-sans text-sm font-bold tracking-[0.16em] text-primary">
                {g.title}
              </h3>
            )}
            <div className="border-t">
              {g.items.map((i) => (
                <details key={i.q} className="group border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-primary md:text-xl [&::-webkit-details-marker]:hidden">
                    {i.q}
                    <Plus
                      className="h-6 w-6 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="max-w-3xl pb-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {i.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
