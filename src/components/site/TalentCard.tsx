import { Link } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import type { Talent } from "@/data/talents";
import { DICT, type Lang } from "@/lib/i18n";
import { formatMetric } from "@/lib/metric-format";
import { btn } from "./ui";

export function TalentPhoto({
  talent,
  lang,
  className = "",
}: {
  talent: Talent;
  lang: Lang;
  className?: string;
}) {
  if (talent.photo)
    return (
      <img
        src={talent.photo}
        alt={talent.name}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 grain border border-dashed border-primary/40 bg-soft text-center text-sm text-primary ${className}`}
    >
      <ImageIcon className="h-8 w-8" aria-hidden />
      <span className="font-semibold">{DICT[lang].talents.photoPending}</span>
      <span className="font-display text-3xl uppercase">{talent.name}</span>
    </div>
  );
}

export function TalentCard({ talent, lang }: { talent: Talent; lang: Lang }) {
  const t = DICT[lang].talents;
  return (
    <article className="lift group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <TalentPhoto
          talent={talent}
          lang={lang}
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-bold backdrop-blur">
          {talent.socials.map((s) => s.platform).join(" · ")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold">{talent.name}</h3>
        <p className="text-sm text-muted-foreground">{talent.handle}</p>
        <p className="mt-4 font-display text-3xl text-neon">
          {formatMetric(talent.headline?.value ?? "—", lang)}
        </p>
        <p className="text-xs text-muted-foreground">{talent.headline?.label[lang] ?? t.soon}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.categories}>
          {talent.categories.slice(0, 4).map((c) => (
            <li
              key={c.es}
              className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
            >
              {c[lang]}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Link
            to="/$lang/talents/$slug"
            params={{ lang, slug: talent.slug }}
            className={btn({ variant: "ink" })}
          >
            {t.viewProfile}
          </Link>
          <Link
            to="/$lang/brands"
            params={{ lang }}
            search={{ talent: talent.slug }}
            hash="brief"
            className={btn({ variant: "outline" })}
          >
            {t.ask}
          </Link>
        </div>
      </div>
    </article>
  );
}
