import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { useRef, useState } from "react";
import type { Talent } from "@/data/talents";
import { DICT, type Lang } from "@/lib/i18n";
import { formatMetric } from "@/lib/metric-format";
import { Button } from "@/components/ui/button";
import { TalentPhoto } from "./TalentCard";
import { btn } from "./ui";

// Expandable creator list: hover previews the photo next to the cursor, click opens the mini profile.
export function TalentAccordion({ talents, lang }: { talents: Talent[]; lang: Lang }) {
  const t = DICT[lang].talents;
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<Talent | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = preview.current;
    if (el) {
      const x = Math.max(24, Math.min(e.clientX + 24, window.innerWidth - 216));
      const y = Math.max(24, Math.min(e.clientY - 120, window.innerHeight - 264));
      el.style.transform = `translate(${x}px, ${y}px) rotate(-4deg)`;
    }
  };

  return (
    <div onMouseMove={move} onMouseLeave={() => setHover(null)}>
      <p className="mb-4 font-serif text-lg italic text-muted-foreground">{t.hint}</p>
      <ul className="border-t">
        {talents.map((tal, i) => {
          const isOpen = open === tal.slug;
          const first = tal.name.split(" ")[0];
          return (
            <li key={tal.slug} className="border-b">
              <h3>
                <Button
                  variant="ghost"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`talent-${tal.slug}`}
                  onClick={() => setOpen(isOpen ? null : tal.slug)}
                  onMouseEnter={() => tal.photo && !isOpen && setHover(tal)}
                  onMouseLeave={() => setHover(null)}
                  className="group grid h-auto w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 whitespace-normal rounded-none px-0 py-6 text-left hover:bg-transparent lg:grid-cols-[4rem_minmax(0,1fr)_auto_auto] lg:py-8 [&_svg]:size-8"
                >
                  <span className="font-sans text-xs font-bold tracking-widest text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span
                    className={`min-w-0 font-display text-4xl leading-none transition-all duration-500 sm:text-5xl lg:text-7xl ${isOpen ? "text-neon" : "group-hover:text-primary"}`}
                  >
                    {tal.name}
                  </span>
                  <span className="hidden max-w-60 text-right lg:block">
                    <span className="block font-display text-3xl">
                      {formatMetric(tal.headline?.value ?? "—", lang)}
                    </span>
                    <span className="block font-sans text-xs normal-case text-muted-foreground">
                      {tal.headline?.label[lang] ?? t.soon}
                    </span>
                  </span>
                  <Plus
                    className={`h-8 w-8 transition-transform duration-500 ${isOpen ? "rotate-45 text-primary" : ""}`}
                    aria-hidden
                  />
                </Button>
              </h3>
              <div
                id={`talent-${tal.slug}`}
                className={`grid transition-[grid-template-rows] duration-700 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-8 pb-12 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
                    <div className="grain relative aspect-[4/5] overflow-hidden">
                      <TalentPhoto
                        talent={tal}
                        lang={lang}
                        className={`grayscale transition-all duration-1000 hover:grayscale-0 ${isOpen ? "scale-100" : "scale-125"}`}
                      />
                      <span className="vertical absolute bottom-4 left-3 font-display text-4xl text-primary">
                        {tal.handle}
                      </span>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <p className="eyebrow mb-3">{t.who}</p>
                        <p className="font-serif text-2xl leading-snug md:text-3xl">
                          {tal.intro[lang]}
                        </p>
                        {tal.bio?.slice(0, 2).map((b) => (
                          <p key={b.es} className="mt-4 text-muted-foreground">
                            {b[lang]}
                          </p>
                        ))}
                      </div>
                      {tal.whyWork.length > 0 && (
                        <div>
                          <p className="eyebrow mb-3">
                            {t.why} {first}
                          </p>
                          <ol className="space-y-3">
                            {tal.whyWork.map((w, j) => (
                              <li key={w.es} className="flex gap-4 border-t pt-3">
                                <span className="font-display text-2xl text-primary">{j + 1}</span>
                                <span>{w[lang]}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                      <div>
                        <p className="eyebrow mb-3">{t.skills}</p>
                        <ul className="flex flex-wrap gap-2">
                          {(tal.skills.length ? tal.skills : tal.categories).map((s) => (
                            <li
                              key={s.es}
                              className="rounded-full border px-3 py-1.5 text-sm font-semibold"
                            >
                              {s[lang]}
                            </li>
                          ))}
                          {!tal.skills.length && (
                            <li className="rounded-full border border-dashed border-primary px-3 py-1.5 text-sm text-primary">
                              {t.soon}
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to="/$lang/talents/$slug"
                          params={{ lang, slug: tal.slug }}
                          className={btn()}
                        >
                          {t.viewProfile} <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <Link
                          to="/$lang/brands"
                          params={{ lang }}
                          search={{ talent: tal.slug }}
                          hash="brief"
                          className={btn({ variant: "outline" })}
                        >
                          {t.ask}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div
        ref={preview}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden h-60 w-48 overflow-hidden transition-opacity duration-300 lg:block ${hover ? "opacity-100" : "opacity-0"}`}
      >
        {hover?.photo && (
          <img
            src={hover.cutout ?? hover.photo}
            alt=""
            className={`h-full w-full ${hover.cutout ? "object-contain object-bottom drop-shadow-[0_0_24px_var(--color-primary)]" : "object-cover grayscale contrast-125"}`}
          />
        )}
      </div>
    </div>
  );
}
