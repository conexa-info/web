import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: "es" } });
  },
  head: () => ({
    meta: [
      { title: "Conexa — Conectamos marcas con la nueva generación" },
      {
        name: "description",
        content: "Agencia argentina de representación de creadores de contenido y desarrollo comercial.",
      },
      { property: "og:title", content: "Conexa — Conectamos marcas con la nueva generación" },
      {
        property: "og:description",
        content: "Agencia argentina de representación de creadores y desarrollo comercial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
