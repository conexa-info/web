import { DICT, type Lang } from "@/lib/i18n";
import { Reveal } from "./Motion";

// Brands → Creators → Audiences as an editorial three-step system with a live signal line.
export function ConnectionFlow({ lang }: { lang: Lang }) {
  const h = DICT[lang].hero;
  return (
    <section className="px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between gap-4 border-b pb-4">
          <p className="eyebrow">{h.flowTitle}</p>
          <p className="font-serif text-lg italic text-muted-foreground">01 → 03</p>
        </div>
        <div className="relative mt-12">
          <div
            className="absolute left-0 right-0 top-[3.25rem] hidden h-px overflow-hidden bg-border md:block"
            aria-hidden
          >
            <span className="animate-travel absolute top-0 h-px w-16 -translate-x-1/2 bg-primary" />
          </div>
          <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
            {h.flow.map((f, i) => (
              <li key={f.k} className="min-w-0">
                <Reveal delay={i * 150}>
                  <div className="flex items-center gap-4">
                    <span className="relative z-10 flex h-[6.5rem] w-[6.5rem] shrink-0 items-center justify-center rounded-full border bg-background font-display text-5xl text-outline-primary">
                      0{i + 1}
                    </span>
                    {i < 2 && <span className="h-px flex-1 bg-border md:hidden" aria-hidden />}
                  </div>
                  <h3
                    className={`mt-6 text-4xl leading-none lg:text-6xl ${i === 1 ? "text-neon" : ""}`}
                  >
                    {f.k}
                  </h3>
                  <p className="mt-4 max-w-xs text-muted-foreground">{f.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
