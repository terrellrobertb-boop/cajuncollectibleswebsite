import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChannelStatusBadge } from "@/components/ui/ChannelStatusBadge";
import { upcomingChannel } from "@/content/upcoming-channel";
import { isPreLaunchStatus } from "@/lib/channel-status";

export function LatestAdventure() {
  return (
    <section className="bg-cream-warm py-20 sm:py-24">
      <Container>
        <div className="text-center">
          <p className="font-display text-orange text-sm sm:text-base tracking-[0.25em] uppercase">
            The Hunt. The Find. The Story.
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-charcoal tracking-wide">
            COMING SOON TO THE CHANNEL
          </h2>
          <p className="mt-4 text-charcoal/70 max-w-2xl mx-auto">
            Follow along as we hunt, discover, share stories, and pass the
            hobby down — from massive card sorts to family gaming challenges
            and bayou bargain finds.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {upcomingChannel.filter((item) => isPreLaunchStatus(item.status)).map((item) => (
            <article
              key={item.slug}
              data-teaser-card
              data-teaser-theme="light"
              className="group flex flex-col rounded-2xl bg-cream overflow-hidden border border-charcoal/10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-bayou via-bayou-deep to-charcoal overflow-hidden">
                {/* Vintage paper grain placeholder until episode art drops. */}
                <div
                  className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />

                {/* Status badge overlay — stylized per production state. */}
                <div className="absolute top-4 left-4 z-10">
                  <ChannelStatusBadge status={item.status} />
                </div>
              </div>

              <div className="flex flex-col grow p-6">
                <h3 className="font-display text-xl text-charcoal leading-snug tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-charcoal/75 leading-relaxed grow">
                  {item.description}
                </p>
                <div data-teaser-vote-slot className="mt-4" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/youtube" variant="ghost">
            Follow the Adventure
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
