import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { btn } from "@/components/site/ui";
import { CONTACT, SOCIALS, whatsappLink } from "@/data/site";
import { TALENTS } from "@/data/talents";
import { pageHead, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params }) => pageHead(params.lang, "contact", "contact"),
  component: Contact,
});

function Contact() {
  const lang = useLang();
  const d = useT();
  const c = d.contact;
  return (
    <section className="relative overflow-hidden px-5 py-12 md:px-8 md:py-16">
      <div className="absolute inset-0 bg-gradient-soft" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="text-5xl font-extrabold leading-none md:text-7xl">{c.title}</h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">{c.body}</p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <a href={`mailto:${CONTACT.email}`} className="lift rounded-3xl border bg-card p-7">
            <Mail className="h-6 w-6 text-primary" aria-hidden />
            <p className="mt-4 text-lg font-bold break-words md:text-2xl">{CONTACT.email}</p>
          </a>
          <a
            href={whatsappLink(c.waBrand)}
            target="_blank"
            rel="noopener noreferrer"
            className="lift rounded-3xl bg-ink p-7 text-ink-foreground"
          >
            <MessageCircle className="h-6 w-6" aria-hidden />
            <p className="mt-4 text-lg font-bold md:text-2xl">{CONTACT.whatsappDisplay}</p>
          </a>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border bg-card p-7">
            <h2 className="text-2xl font-bold">{c.brandsTitle}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/$lang/brands" params={{ lang }} hash="brief" className={btn()}>
                {d.form.brand.submit}
              </Link>
              {TALENTS.map((t) => (
                <a
                  key={t.slug}
                  href={whatsappLink(c.waTalent(t.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btn({ variant: "outline" })}
                >
                  {t.name}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border bg-card p-7">
            <h2 className="text-2xl font-bold">{c.creatorsTitle}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/$lang/creators" params={{ lang }} hash="apply" className={btn()}>
                {d.form.creator.submit}
              </Link>
              <a
                href={whatsappLink(c.waCreator)}
                target="_blank"
                rel="noopener noreferrer"
                className={btn({ variant: "outline" })}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {c.location}
          </span>
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary"
          >
            <Instagram className="h-4 w-4" /> {c.instagram}
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary"
          >
            <Linkedin className="h-4 w-4" /> {c.linkedin}
          </a>
          <span>{c.response}</span>
        </div>
      </div>
    </section>
  );
}
