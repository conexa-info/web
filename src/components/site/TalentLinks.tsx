import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Talent } from "@/data/talents";
import { DICT, type Lang } from "@/lib/i18n";

// Home roster: name + categories only. Every row is a link to the creator's profile page.
export function TalentLinks({ talents, lang }: { talents: Talent[]; lang: Lang }) {
  const t = DICT[lang].talents;
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
      <p className="mb-4 font-serif text-lg italic text-muted-foreground">{t.openProfile}</p>
      <ul className="border-t">
        {talents.map((tal, i) => (
          <li key={tal.slug} className="border-b">
            <Link
              to="/$lang/talents/$slug"
              params={{ lang, slug: tal.slug }}
              onMouseEnter={() => tal.photo && setHover(tal)}
              onMouseLeave={() => setHover(null)}
              className="group grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 py-6 lg:grid-cols-[3.5rem_minmax(0,1fr)_auto] lg:gap-6 lg:py-7"
            >
              <span className="font-sans text-xs font-bold tracking-widest text-muted-foreground">
                0{i + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-4xl leading-none transition-colors duration-500 group-hover:text-primary sm:text-5xl lg:text-6xl">
                  {tal.name}
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {tal.categories.slice(0, 3).map((c) => (
                    <span
                      key={c.es}
                      className="rounded-full border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                    >
                      {c[lang]}
                    </span>
                  ))}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors group-hover:border-primary group-hover:text-primary sm:px-4 sm:py-2.5 sm:text-xs">
                <span className="hidden sm:inline">{t.viewProfile}</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
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
