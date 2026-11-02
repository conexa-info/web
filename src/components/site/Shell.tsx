import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Instagram, Linkedin, Menu, X } from "lucide-react";
import { TALENTS } from "@/data/talents";
import { useState } from "react";
import { CONTACT, SOCIALS, whatsappLink } from "@/data/site";
import { DICT, type Lang } from "@/lib/i18n";
import { btn } from "./ui";
import { Button } from "@/components/ui/button";
const logoWhite = "/logo-white.svg";
const logoBlack = "/logo-black.svg";

const NAV = [
  ["home", "/$lang"],
  ["brands", "/$lang/brands"],
  ["creators", "/$lang/creators"],
  ["talents", "/$lang/talents"],
  ["about", "/$lang/about"],
  ["contact", "/$lang/contact"],
] as const;

export function Logo({
  variant = "white",
  className = "h-6 w-auto md:h-7",
}: {
  variant?: "white" | "black";
  className?: string;
}) {
  return (
    <img
      src={variant === "black" ? logoBlack : logoWhite}
      alt="Conexa"
      width={660}
      height={159}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}

export function LangSwitch({ lang }: { lang: Lang }) {
  const { pathname, searchStr } = useLocation();
  const rest = pathname.replace(/^\/(es|en)/, "");
  return (
    <div
      className="flex w-fit rounded-full border bg-card p-0.5 text-xs font-bold"
      role="group"
      aria-label={DICT[lang].nav.lang}
    >
      {(["es", "en"] as const).map((l) => (
        <a
          key={l}
          href={`/${l}${rest}${searchStr}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`rounded-full px-3 py-1.5 uppercase transition-colors ${l === lang ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l}
        </a>
      ))}
    </div>
  );
}

export function SiteHeader({ lang }: { lang: Lang }) {
  const t = DICT[lang].nav;
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-foreground"
      >
        {t.skip}
      </a>
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:px-8 lg:flex lg:justify-between">
        <Link to="/$lang" params={{ lang }} aria-label="Conexa" className="min-w-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.slice(1).map(([k, to]) =>
            k === "talents" ? (
              <div key={k} className="group relative">
                <Link
                  to={to}
                  params={{ lang }}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "!text-primary" }}
                >
                  {t[k]}{" "}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="border border-border bg-background p-2 shadow-2xl">
                    {TALENTS.map((tal, i) => (
                      <li key={tal.slug}>
                        <Link
                          to="/$lang/talents/$slug"
                          params={{ lang, slug: tal.slug }}
                          className="flex items-baseline gap-3 px-3 py-2.5 font-display text-xl uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          <span className="font-sans text-[10px] font-bold opacity-60">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {tal.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={k}
                to={to}
                params={{ lang }}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "!text-primary" }}
              >
                {t[k]}
              </Link>
            ),
          )}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch lang={lang} />
          <div className="hidden sm:block">
            <Link to="/$lang/contact" params={{ lang }} className={btn({ variant: "primary" })}>
              {t.cta}
            </Link>
          </div>
          <Button
            variant="outline"
            size="icon"
            type="button"
            className="h-11 w-11 shrink-0 rounded-full lg:hidden [&_svg]:size-5"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="border-t bg-background px-5 pb-6 pt-2 lg:hidden"
          aria-label="Móvil"
        >
          {NAV.map(([k, to]) => (
            <Link
              key={k}
              to={to}
              params={{ lang }}
              onClick={() => setOpen(false)}
              className="block border-b py-4 font-display text-xl font-bold"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
            >
              {t[k]}
            </Link>
          ))}
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {t.talents}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TALENTS.map((tal) => (
              <Link
                key={tal.slug}
                to="/$lang/talents/$slug"
                params={{ lang, slug: tal.slug }}
                onClick={() => setOpen(false)}
                className="rounded-full border px-3 py-1.5 text-sm font-bold"
              >
                {tal.name}
              </Link>
            ))}
          </div>
          <Link
            to="/$lang/contact"
            params={{ lang }}
            onClick={() => setOpen(false)}
            className={`${btn({ variant: "primary", size: "lg" })} mt-6 w-full`}
          >
            {t.cta}
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <footer className="border-t bg-card px-5 pb-10 pt-16 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-8 w-auto" />
          <p className="mt-4 font-display text-2xl font-bold">{d.footer.tagline}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{d.footer.desc}</p>
          <div className="mt-6">
            <LangSwitch lang={lang} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-3.5 w-3.5" aria-hidden /> {d.footer.instagram}
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden /> {d.footer.linkedin}
            </a>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">{d.footer.navTitle}</p>
          <ul className="space-y-2 text-sm">
            {NAV.slice(1).map(([k, to]) => (
              <li key={k}>
                <Link to={to} params={{ lang }} className="hover:text-primary">
                  {d.nav[k]}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/$lang/how-we-work" params={{ lang }} className="hover:text-primary">
                {d.nav.how}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">{d.footer.contactTitle}</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(d.contact.waBrand)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {CONTACT.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t pt-6 text-xs text-muted-foreground">
        <p id="privacy">{d.footer.privacy}</p>
        <p className="mt-3">{d.footer.rights}</p>
      </div>
    </footer>
  );
}
