import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Instagram, MessageCircle, Music2 } from "lucide-react";
import { Bars } from "@/components/site/Bars";
import { FeaturedVideos } from "@/components/site/FeaturedVideos";
import { TalentPhoto } from "@/components/site/TalentCard";
import { btn, Pending, Section } from "@/components/site/ui";
import { getTalent } from "@/data/talents";
import { whatsappLink } from "@/data/site";
import { DICT, isLang, pageHead, useLang } from "@/lib/i18n";
import { formatMetric } from "@/lib/metric-format";

export const Route = createFileRoute("/$lang/talents/$slug")({
  loader: ({ params }) => {
    const t = getTalent(params.slug);
    if (!t) throw notFound();
    return { slug: t.slug, name: t.name };
  },
  head: ({ params, loaderData }) => {
    const lang = isLang(params.lang) ? params.lang : "es";
    if (!loaderData) return { meta: [{ title: "Conexa" }, { name: "robots", content: "noindex" }] };
    return pageHead(lang, DICT[lang].meta.talent(loaderData.name), `talents/${loaderData.slug}`);
  },
  component: Profile,
});

function Profile() {
  const lang = useLang();
  const d = DICT[lang];
  const p = d.profile;
  const { slug } = Route.useParams();
  const t = getTalent(slug);
  if (!t) throw notFound();
  const isLua = t.slug === "lua-sansat";

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-16 pt-10 md:px-8">
        <div className="absolute inset-0 bg-gradient-soft" aria-hidden />
        <div className="relative mx-auto max-w-6xl">
          <Link
            to="/$lang/talents"
            params={{ lang }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> {p.back}
          </Link>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div className="grain aspect-[4/5] overflow-hidden [&_img]:grayscale [&_img]:transition-all [&_img]:duration-1000 hover:[&_img]:grayscale-0">
              <TalentPhoto talent={t} lang={lang} />
            </div>
            <div className="animate-rise min-w-0">
              {isLua && <p className="font-display text-2xl font-bold text-primary">{p.hello}</p>}
              <h1 className="mt-2 text-5xl font-extrabold leading-none md:text-7xl">{t.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {t.handle}
                {t.location ? ` · ${t.location[lang]}` : ""}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {t.categories.map((c) => (
                  <li
                    key={c.es}
                    className="rounded-full border bg-card px-3 py-1.5 text-sm font-semibold"
                  >
                    {c[lang]}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xl leading-relaxed">{t.intro[lang]}</p>
              {t.slug === "lowkey" && t.headline && (
                <div className="mt-6 border-t pt-5">
                  <p className="font-display text-5xl text-primary">
                    {formatMetric(t.headline.value, lang)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.headline.label[lang]}</p>
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {t.socials.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btn({ variant: "outline" })}
                  >
                    {s.platform === "Instagram" ? (
                      <Instagram className="h-4 w-4" />
                    ) : (
                      <Music2 className="h-4 w-4" />
                    )}{" "}
                    {s.platform}
                  </a>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/$lang/brands"
                  params={{ lang }}
                  search={{ talent: t.slug }}
                  hash="brief"
                  className={btn({ size: "lg" })}
                >
                  {p.collabWith} {t.name.split(" ")[0]}
                </Link>
                <a
                  href={whatsappLink(d.contact.waTalent(t.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btn({ variant: "ink", size: "lg" })}
                >
                  <MessageCircle className="h-4 w-4" /> {p.whatsappWith}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {t.bio && (
        <Section className="bg-card">
          <p className="eyebrow mb-4">
            {p.about} {t.name.split(" ")[0]}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {t.bio.map((b) => (
              <p key={b.es} className="text-lg leading-relaxed">
                {b[lang]}
              </p>
            ))}
          </div>
          {t.audienceReach && <p className="mt-8 text-muted-foreground">{t.audienceReach[lang]}</p>}
        </Section>
      )}

      {isLua && (
        <section className="bg-ink px-5 py-16 text-ink-foreground md:px-8">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["1.4M", lang === "es" ? "seguidores en TikTok" : "TikTok followers"],
              ["190K", lang === "es" ? "seguidores en Instagram" : "Instagram followers"],
              [
                "13.6M",
                lang === "es" ? "visualizaciones TikTok · 60 días" : "TikTok views · 60 days",
              ],
              [
                "4.62M",
                lang === "es" ? "visualizaciones Instagram · 30 días" : "Instagram views · 30 days",
              ],
              ["73.5%", lang === "es" ? "audiencia de 18 a 34 años" : "audience aged 18–34"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-3xl border border-ink-foreground/15 p-6">
                <p className="font-display text-4xl font-extrabold text-gradient">{v}</p>
                <p className="mt-1 text-sm opacity-80">{l}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(t.whyWork.length > 0 || t.skills.length > 0) && (
        <Section>
          <div className="grid gap-12 md:grid-cols-2">
            {t.whyWork.length > 0 && (
              <div>
                <h2 className="text-4xl md:text-6xl">
                  {d.talents.why} <span className="text-neon">{t.name.split(" ")[0]}</span>
                </h2>
                <ol className="mt-8 space-y-4">
                  {t.whyWork.map((w, j) => (
                    <li key={w.es} className="flex gap-5 border-t pt-4 text-lg">
                      <span className="font-display text-4xl text-outline-primary">0{j + 1}</span>
                      {w[lang]}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {t.skills.length > 0 && (
              <div>
                <h2 className="text-4xl md:text-6xl">{d.talents.skills}</h2>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {t.skills.map((s) => (
                    <li
                      key={s.es}
                      className="border px-5 py-3 font-display text-2xl uppercase hover:border-primary hover:text-primary"
                    >
                      {s[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {t.groups.length > 0 && (
        <Section>
          <h2 className="text-3xl font-bold md:text-4xl">{p.stats}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{p.statsNote}</p>
          <div className="mt-10 space-y-10">
            {t.groups.map((g) => (
              <div key={g.title.es}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 sm:flex sm:flex-wrap">
                  <h3 className="text-xl font-bold">{g.title[lang]}</h3>
                  {g.period && (
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {g.period[lang]}
                    </span>
                  )}
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {g.metrics.map((m) => (
                    <div
                      key={m.label.es}
                      className="min-w-0 rounded-lg border bg-card p-5 shadow-card"
                    >
                      <p className="font-display text-3xl font-extrabold">
                        {formatMetric(m.value, lang, m.format)}
                      </p>
                      <p className="mt-1 font-semibold">{m.label[lang]}</p>
                      {m.note && (
                        <p className="mt-2 text-xs text-muted-foreground">{m.note[lang]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {isLua && (
            <div className="mt-10 rounded-3xl border bg-card p-6 md:p-8">
              <h3 className="font-bold">{p.compare}</h3>
              <div className="mt-4">
                <Bars
                  items={[
                    { label: "TikTok · 1.4M", value: 1400 },
                    { label: "Instagram · 190K", value: 190 },
                  ]}
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {lang === "es"
                  ? "Barras proporcionales a la cantidad de seguidores; el número se muestra en miles."
                  : "Bars proportional to follower count; value shown in thousands."}
              </p>
            </div>
          )}
        </Section>
      )}

      {(t.age || t.gender || t.countries) && (
        <Section className="bg-soft">
          <h2 className="text-3xl font-bold md:text-4xl">{p.audience}</h2>
          {t.audienceNote && (
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{t.audienceNote[lang]}</p>
          )}
          {t.age?.highlight && (
            <p className="mt-4 font-display text-2xl font-bold text-primary">
              {t.age.highlight[lang]}
            </p>
          )}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {t.age && (
              <div className="rounded-3xl bg-card p-6 shadow-card">
                <h3 className="mb-5 font-bold">{t.age.title[lang]}</h3>
                <Bars
                  lang={lang}
                  decimals={t.audienceDecimals}
                  items={t.age.items.map((i) => ({ label: i.label[lang], value: i.value }))}
                />
              </div>
            )}
            {t.gender && (
              <div className="rounded-3xl bg-card p-6 shadow-card">
                <h3 className="mb-5 font-bold">{p.gender}</h3>
                <Bars
                  lang={lang}
                  decimals={t.audienceDecimals}
                  max={100}
                  items={t.gender.items.map((i) => ({ label: i.label[lang], value: i.value }))}
                />
              </div>
            )}
            {t.countries && (
              <div className="rounded-3xl bg-card p-6 shadow-card">
                <h3 className="mb-5 font-bold">{p.countries}</h3>
                <Bars
                  lang={lang}
                  decimals={t.audienceDecimals}
                  items={t.countries.map((c) => ({
                    label: c.label[lang],
                    value: c.value,
                    prefix: c.flag,
                  }))}
                />
              </div>
            )}
          </div>
          {t.languages && (
            <div className="mt-8 max-w-xl">
              <h3 className="mb-5 font-bold">{p.languages}</h3>
              <Bars
                lang={lang}
                decimals={t.audienceDecimals}
                max={100}
                items={t.languages.map((i) => ({ label: i.label[lang], value: i.value }))}
              />
            </div>
          )}
          {isLua && (
            <div className="mt-10 max-w-3xl">
              <h3 className="text-2xl font-bold">{p.geoTitle}</h3>
              <p className="mt-2 text-muted-foreground">{p.geoText}</p>
            </div>
          )}
        </Section>
      )}

      {t.pillars && (
        <Section>
          <p className="eyebrow mb-4">{p.pillars}</p>
          <h2 className="max-w-3xl text-3xl font-bold md:text-5xl">{p.pillarsTitle}</h2>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{p.pillarsText}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {t.pillars.map((pl, i) => (
              <div key={pl.title.es} className="lift rounded-3xl border bg-card p-7">
                <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{pl.title[lang]}</h3>
                <p className="mt-2 text-muted-foreground">{pl.text[lang]}</p>
              </div>
            ))}
          </div>

          {isLua && <p className="mt-8 text-sm text-muted-foreground">{p.gamesMetric}</p>}
        </Section>
      )}

      <FeaturedVideos talent={t} lang={lang} />

      {isLua && (
        <section className="bg-ink px-5 py-12 text-ink-foreground md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-3xl text-3xl font-bold md:text-5xl">{p.pitchTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg opacity-80">{p.pitchText}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {p.strengths.map((s) => (
                <div key={s.k} className="rounded-3xl border border-ink-foreground/15 p-7">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">{s.k}</p>
                  <p className="mt-2 font-display text-5xl font-extrabold text-gradient">{s.v}</p>
                  <p className="mt-2 text-sm opacity-80">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Section>
        <div className="rounded-[2rem] bg-gradient-brand p-8 text-primary-foreground md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">{p.opportunitiesTitle}</h2>
          <p className="mt-3 max-w-2xl opacity-90">{p.opportunitiesText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/$lang/brands"
              params={{ lang }}
              search={{ talent: t.slug }}
              hash="brief"
              className={btn({ variant: "light", size: "lg" })}
            >
              {p.collabWith} {t.name.split(" ")[0]}
            </Link>
            <a
              href={whatsappLink(d.contact.waTalent(t.name))}
              target="_blank"
              rel="noopener noreferrer"
              className={btn({ variant: "ink", size: "lg" })}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{p.dataNote}</p>
        {t.pendingReview && (
          <div className="mt-8">
            <Pending label={p.pending} items={t.pendingReview.map((x) => x[lang])} />
          </div>
        )}
      </Section>
    </>
  );
}
