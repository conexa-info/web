import { createFileRoute } from "@tanstack/react-router";
import { TalentAccordion } from "@/components/site/TalentAccordion";
import { Section } from "@/components/site/ui";
import { TALENTS } from "@/data/talents";
import { pageHead, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/talents/")({
  head: ({ params }) => pageHead(params.lang, "talents", "talents"),
  component: Talents,
});

function Talents() {
  const lang = useLang();
  const t = useT().talents;
  return (
    <Section>
      <p className="eyebrow mb-4">
        {t.eyebrow} · {String(TALENTS.length).padStart(2, "0")}
      </p>
      <h1 className="text-5xl leading-[1.02] sm:text-7xl md:text-8xl lg:text-[8rem]">
        {t.title.split(" ").map((w, i) => (
          <span key={w} className={i % 2 ? "text-outline block" : "block"}>
            {w}
          </span>
        ))}
      </h1>
      <p className="mt-6 max-w-xl font-serif text-2xl italic text-muted-foreground">{t.body}</p>
      <p className="mt-4 max-w-xl text-lg text-primary">{t.international}</p>
      <div className="mt-10">
        <TalentAccordion talents={TALENTS} lang={lang} />
      </div>
    </Section>
  );
}
