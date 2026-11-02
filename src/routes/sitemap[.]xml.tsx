import { createFileRoute } from "@tanstack/react-router";
import { TALENTS } from "@/data/talents";
import { CONTACT } from "@/data/site";

const PATHS = [
  "",
  "/brands",
  "/creators",
  "/talents",
  "/about",
  "/how-we-work",
  "/contact",
  ...TALENTS.map((t) => `/talents/${t.slug}`),
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = PATHS.flatMap((p) =>
          ["es", "en"].map(
            (l) =>
              `<url><loc>${CONTACT.siteUrl}/${l}${p}</loc><xhtml:link rel="alternate" hreflang="es" href="${CONTACT.siteUrl}/es${p}"/><xhtml:link rel="alternate" hreflang="en" href="${CONTACT.siteUrl}/en${p}"/></url>`,
          ),
        ).join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
