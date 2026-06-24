import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type AboutPreviewProps = {
  /**
   * Show the "Read Our Story" CTA at the bottom of the section.
   * Defaults to `true`. Pass `false` when rendering this section on the
   * Adventure page itself (the CTA would be a self-link).
   */
  showCta?: boolean;
  /**
   * When `true`, renders community-focused copy for the Adventure page
   * instead of the default mission statement (which already lives in
   * the hero above). Avoids repeating the same paragraph twice on
   * `/adventure`.
   */
  adventurePage?: boolean;
};

export function AboutPreview({
  showCta = true,
  adventurePage = false,
}: AboutPreviewProps = {}) {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container>
        {/* `max-w-[720px]` is the readability cap — long lines on wide
            desktop monitors are uncomfortable to read. `mx-auto` +
            `text-center` keep the block centered with even side rails. */}
        <div className="max-w-[720px] mx-auto text-center">
          <p className="font-display text-orange text-sm sm:text-base tracking-[0.25em] uppercase">
            About Cajun Collectibles
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-charcoal leading-tight tracking-wide">
            Built on Passion, Powered by Community
          </h2>
          {/* Adventure page gets its own body copy so it doesn't repeat the
              hero mission statement above. Default copy stays available
              if this section is reused elsewhere later. */}
          <p className="mt-6 text-charcoal/80 text-lg leading-[1.6]">
            {adventurePage ? (
              <>
                We&apos;re collectors, storytellers, and Louisiana proud.
                Whether it&apos;s a card show, a garage sale, or a late-night
                eBay scroll, we share what we find and learn from the people
                who hunt alongside us. This community is built on passion,
                hospitality, and a shared love for the stories behind every
                find.
              </>
            ) : (
              <>
                Cajun Collectibles is about more than cards, comics, games, and
                toys&mdash;it&apos;s about the memories attached to them. Every
                collection has a story. Every hunt creates a memory. Every
                generation deserves the opportunity to discover what made these
                hobbies special. From sports cards and comic books to retro
                games and vintage toys, we celebrate the stories behind the
                collectibles we love and the memories that keep them alive.
              </>
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-bayou/10 text-bayou text-sm font-semibold">
              Collecting
            </span>
            <span className="px-4 py-1.5 rounded-full bg-orange/15 text-orange text-sm font-semibold">
              Community
            </span>
            <span className="px-4 py-1.5 rounded-full bg-gold/25 text-charcoal text-sm font-semibold">
              Nostalgia
            </span>
            <span className="px-4 py-1.5 rounded-full bg-swamp/15 text-swamp text-sm font-semibold">
              Discovery
            </span>
            <span className="px-4 py-1.5 rounded-full bg-bayou-light/15 text-bayou text-sm font-semibold">
              Family
            </span>
          </div>
          {showCta && (
            <div className="mt-10">
              <Button href="/adventure" variant="gold">
                Read Our Story
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
