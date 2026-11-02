import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site/Shell";
import { isLang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  const l = isLang(lang) ? lang : "es";
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang={l} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter lang={l} />
    </div>
  );
}
