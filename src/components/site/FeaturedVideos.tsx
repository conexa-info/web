import { useState } from "react";
import { ExternalLink, Play, PlayCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Talent } from "@/data/talents";
import { DICT, type Lang } from "@/lib/i18n";
import { Section } from "./ui";

export function FeaturedVideos({ talent, lang }: { talent: Talent; lang: Lang }) {
  const p = DICT[lang].profile;
  const [active, setActive] = useState<string | null>(null);
  const videos = talent.videos ?? [];

  return (
    <Section id="featured-videos">
      <p className="eyebrow mb-4">{talent.name}</p>
      <h2 className="text-4xl md:text-6xl">{p.featuredVideos}</h2>
      {videos.length === 0 ? (
        <div className="mt-8 flex items-center gap-4 border-y py-8 text-muted-foreground">
          <PlayCircle className="h-8 w-8 shrink-0 text-primary" aria-hidden />
          <p className="font-serif text-xl italic">{p.videosPending}</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <article key={video.url} className="min-w-0">
              <div className="relative aspect-[9/16] overflow-hidden rounded-lg border bg-card">
                {active === video.url ? (
                  <>
                    <iframe
                      src={video.embedUrl}
                      title={video.title[lang]}
                      className="h-full w-full border-0"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-2"
                      aria-label={p.closeVideo}
                      title={p.closeVideo}
                      onClick={() => setActive(null)}
                    >
                      <X />
                    </Button>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
                    <span className="eyebrow">{video.platform}</span>
                    <p className="font-display text-3xl leading-tight">{video.title[lang]}</p>
                    <Button
                      size="icon"
                      className="h-14 w-14 rounded-full"
                      aria-label={`${p.playVideo}: ${video.title[lang]}`}
                      title={p.playVideo}
                      onClick={() => setActive(video.url)}
                    >
                      <Play />
                    </Button>
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{video.title[lang]}</h3>
              <Button
                asChild
                variant="link"
                className="mt-1 h-auto justify-start whitespace-normal p-0 text-left"
              >
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  {p.originalVideo}
                  <ExternalLink aria-hidden />
                </a>
              </Button>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
