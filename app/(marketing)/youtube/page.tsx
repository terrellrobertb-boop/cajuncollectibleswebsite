import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandImage } from "@/components/brand/BrandImage";
import { CypressBackground } from "@/components/brand/CypressBackground";
import { YoutubeIcon } from "@/components/brand/SocialIcons";
import { LatestContent } from "@/components/sections/LatestContent";
import { LatestVideoHighlight } from "@/components/sections/LatestVideoHighlight";
import { YouTubePillarSections } from "@/components/sections/YouTubePillarSections";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "YouTube",
  description:
    "The Hunt. The Find. The Story. Every collectible has a story, every hunt creates a memory — follow the Cajun Collectibles YouTube channel.",
};

const channelPillars = ["The Hunt", "The Find", "The Story"] as const;

export default function YouTubePage() {
  return (
    <>
      <section className="relative bg-bayou text-cream overflow-hidden">
        <CypressBackground />
        <Container className="relative z-10 py-20 sm:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div className="max-w-[560px]">
              <p className="font-display text-gold text-sm sm:text-base tracking-[0.25em] uppercase">
                The Channel
              </p>
              <h1 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-cream">
                THE HUNT.
                <span className="block text-gold">THE FIND.</span>
                <span className="block text-orange-bright">THE STORY.</span>
              </h1>
              <p className="mt-6 text-cream/90 text-lg leading-relaxed">
                Every collectible has a story.
                <br />
                Every hunt creates a memory.
                <br />
                Every video follows the adventure&mdash;from the hunt, to the
                find, to the stories worth passing down.
              </p>
              <div className="mt-8">
                <Button href={site.social.youtube} variant="primary" size="lg">
                  <YoutubeIcon className="h-5 w-5" />
                  Subscribe on YouTube
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end w-full lg:max-w-[560px] lg:justify-self-end">
              <BrandImage
                asset="gumbeauxTvHero"
                alt="Gumbeaux the Gator hosting on a Vintage Television Set"
                width={1358}
                height={1159}
                priority
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 480px, 90vw"
                className="w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] h-auto"
              />
            </div>
          </div>
        </Container>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-12 sm:h-16 bg-cream torn-paper-top" />
      </section>

      <LatestVideoHighlight />

      <section className="bg-cream py-16">
        <Container>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {channelPillars.map((pillar) => (
              <span
                key={pillar}
                className="px-4 py-2 rounded-full bg-cream-warm border border-charcoal/10 text-sm font-semibold text-charcoal transition-all duration-200 ease-in-out hover:bg-orange hover:text-cream hover:border-orange cursor-default"
              >
                {pillar}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <YouTubePillarSections />

      <LatestContent />
    </>
  );
}
