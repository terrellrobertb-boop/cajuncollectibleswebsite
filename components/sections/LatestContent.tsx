import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { YoutubeIcon } from "@/components/brand/SocialIcons";
import { youtubePlaylists } from "@/content/youtube-playlists";
import { site } from "@/content/site";

/**
 * YouTube page playlist row — visually distinct from the video grid above:
 * no play icons, master-playlist cover treatment, playlist titles as
 * the primary card headers.
 */
export function LatestContent() {
  return (
    <section className="bg-bayou text-cream py-20 sm:py-24">
      <Container>
        <div className="text-center">
          <p className="font-display text-gold text-sm sm:text-base tracking-[0.25em] uppercase">
            Playlists
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-cream tracking-wide">
            SIGNATURE SERIES
          </h2>
          <p className="mt-4 text-cream/75 max-w-2xl mx-auto">
            Explore the flagship adventures, discoveries, stories, and family
            traditions that define Cajun Collectibles.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {youtubePlaylists.map(({ slug, title, pillar }) => (
            <div
              key={slug}
              className="group relative aspect-video w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] rounded-xl overflow-hidden bg-bayou-deep ring-1 ring-cream/10 transition-all duration-200 hover:-translate-y-1 hover:ring-gold/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-bayou-deep via-charcoal to-bayou-deep" />
              <div
                className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
                }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent p-6 flex flex-col justify-end">
                <span className="text-cream/60 text-xs uppercase tracking-widest">
                  {pillar}
                </span>
                <h3 className="mt-2 font-display text-lg sm:text-xl text-cream leading-snug tracking-wide">
                  {title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[30px] text-center">
          <Button href={site.social.youtube} variant="primary" size="lg">
            <YoutubeIcon className="h-5 w-5" />
            Browse All Playlists
          </Button>
        </div>
      </Container>
    </section>
  );
}
