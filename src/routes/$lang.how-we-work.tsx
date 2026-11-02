import { createFileRoute, Link } from "@tanstack/react-router";
import { HowSteps, WinWin } from "@/components/site/Sections";
import { btn } from "@/components/site/ui";
import { pageHead, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/how-we-work")({
  head: ({ params }) => pageHead(params.lang, "how", "how-we-work"),
  component: How,
});

function How() {
  const lang = useLang();
  const t = useT();
  return (
    <>
      <h1 className="sr-only">{t.how.title}</h1>
      <HowSteps lang={lang} />
      <div className="flex flex-wrap justify-center gap-3 px-5 pb-20">
        <Link to="/$lang/brands" params={{ lang }} hash="brief" className={btn({ size: "lg" })}>
          {t.hero.primary}
        </Link>
        <Link
          to="/$lang/creators"
          params={{ lang }}
          hash="apply"
          className={btn({ variant: "outline", size: "lg" })}
        >
          {t.hero.secondary}
        </Link>
      </div>
      <WinWin lang={lang} />
    </>
  );
}
