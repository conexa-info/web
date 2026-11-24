import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import type { Talent } from "@/data/talents";
import { DICT, type Lang } from "@/lib/i18n";
import { formatCompact } from "@/lib/metric-format";
import { useInView } from "./Motion";

export function TalentPhoto({
  talent,
  lang,
  className = "",
  eager = false,
}: {
  talent: Talent;
  lang: Lang;
  className?: string;
  eager?: boolean;
}) {
  if (talent.photo)
    return (
      <img
        src={talent.photo}
        alt={talent.name}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
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

export function TalentCard({
  talent,
  lang,
  index = 0,
}: {
  talent: Talent;
  lang: Lang;
  index?: number;
}) {
  const t = DICT[lang].talents;
  const { ref, inView } = useInView<HTMLAnchorElement>(0.15);
  const k = talent.keyStats;
  return (
    <Link
      ref={ref}
      to="/$lang/talents/$slug"
      params={{ lang, slug: talent.slug }}
      data-in={inView}
      style={{ transitionDelay: `${(index % 3) * 110}ms` }}
      className="rise-in group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary md:rounded-3xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
          <TalentPhoto talent={talent} lang={lang} className="settle" />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent"
          aria-hidden
        />
        <span
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur transition-colors group-hover:bg-primary group-hover:text-primary-foreground md:right-4 md:top-4 md:h-11 md:w-11"
          aria-hidden
        >
          <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-6">
          <h3 className="text-2xl leading-none md:text-4xl">{talent.name}</h3>
          <p className="mt-1 truncate text-xs text-muted-foreground md:text-sm">{talent.handle}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 divide-x border-t">
        <div className="flex min-w-0 flex-col justify-between gap-1 p-3 md:p-5">
          <dt className="text-xs text-muted-foreground md:text-sm">{t.cardFollowers}</dt>
          <dd className="font-display text-xl text-foreground md:text-3xl">
            {k.followersPrefix ?? ""}
            {formatCompact(k.followers, lang)}
          </dd>
        </div>
        <div className="flex min-w-0 flex-col justify-between gap-1 p-3 md:p-5">
          <dt className="text-xs text-muted-foreground md:text-sm">{t.cardViews}</dt>
          <dd className="font-display text-xl text-primary md:text-3xl">
            {k.viewsApprox ? "≈" : ""}
            {formatCompact(k.monthlyViews, lang)}
          </dd>
        </div>
      </dl>
      <ul className="hidden flex-wrap gap-1.5 border-t px-5 py-4 md:flex" aria-label={t.categories}>
        {talent.categories.slice(0, 3).map((c) => (
          <li
            key={c.es}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
          >
            {c[lang]}
          </li>
        ))}
      </ul>
    </Link>
  );
}

/** Three columns on desktop, two on phones. */
export function TalentGrid({ talents, lang }: { talents: Talent[]; lang: Lang }) {
  const approx = talents.some((t) => t.keyStats.viewsApprox || t.keyStats.followersPrefix);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
        {talents.map((t, i) => (
          <TalentCard key={t.slug} talent={t} lang={lang} index={i} />
        ))}
      </div>
      {approx && <p className="mt-4 text-xs text-muted-foreground">{DICT[lang].talents.approx}</p>}
    </>
  );
}
