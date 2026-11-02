import { DICT, type Lang } from "@/lib/i18n";
import { Heading, Section } from "./ui";

export function ValueSection({ lang }: { lang: Lang }) {
  const v = DICT[lang].value;
  return (
    <Section className="border-t">
      <h2 className="eyebrow mb-8">{v.eyebrow}</h2>
      <ol className="grid gap-8 lg:grid-cols-3">
        {v.blocks.map((b, i) => (
          <li key={b.title} className="min-w-0 border-t pt-6">
            <h3 className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 text-3xl leading-tight">
              <span className="text-primary">0{i + 1}</span>
              <span>{b.title}</span>
            </h3>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function HowSteps({ lang }: { lang: Lang }) {
  const h = DICT[lang].how;
  return (
    <Section>
      <Heading eyebrow={h.eyebrow} title={h.title} />
      <ol className="mt-10 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {h.steps.map((s, i) => (
          <li
            key={s.t}
            className="group min-w-0 bg-background p-5 transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <p className="font-display text-7xl leading-none text-outline-primary group-hover:text-primary-foreground">
              {i + 1}
            </p>
            <p className="mt-8 text-xs font-bold uppercase tracking-widest opacity-60">
              {h.step} {i + 1}
            </p>
            <h3 className="mt-1 break-words text-2xl">{s.t}</h3>
            <p className="mt-2 text-sm opacity-75">{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function WinWin({ lang }: { lang: Lang }) {
  const w = DICT[lang].win;
  return (
    <section className="border-t px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">{w.eyebrow}</p>
        <p className="font-display text-6xl leading-none sm:text-8xl md:text-9xl lg:text-[12rem]">
          WIN<span className="text-neon">—</span>
          <span className="text-outline">WIN</span>
        </p>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl md:text-5xl">{w.title}</h2>
            {w.body.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
          <div className="grid gap-px border bg-border">
            {[
              [w.brands, w.brandsWin],
              [w.creators, w.creatorsWin],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">WIN</p>
                <h3 className="mt-2 text-3xl">{k}</h3>
                <p className="mt-1 text-muted-foreground">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
