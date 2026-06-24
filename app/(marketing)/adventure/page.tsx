import type { Metadata } from "next";
import { ArrowRight, Heart, Home as HomeIcon, MapPin, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandImage } from "@/components/brand/BrandImage";
import { CypressBackground } from "@/components/brand/CypressBackground";
import { MeetGumbeaux } from "@/components/sections/MeetGumbeaux";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { WhatWeCollect } from "@/components/sections/WhatWeCollect";
import { PassingItDown } from "@/components/sections/PassingItDown";
import { LatestAdventure } from "@/components/sections/LatestAdventure";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Adventure",
  description:
    "Join the Cajun Collectibles adventure — where every hunt creates a memory, every collection has a story, and every generation deserves to discover the hobbies we love.",
};

export default function AdventurePage() {
  return (
    <>
      {/* ── Adventure hero — premium two-column flex layout ──
            Built fresh with the new Explorer Gumbeaux artwork as the
            right-side anchor. CypressBackground + bg-bayou give the deep
            swamp tones the spec calls for; the noise/grain overlay is
            handled inside CypressBackground. */}
      <section className="relative bg-bayou text-cream overflow-hidden">
        <CypressBackground />

        {/* Master flex wrapper.
              ≤md (mobile, <768px): vertical stack, fully centered.
              md+ (≥768px): horizontal row, space-between, items-center,
                with viewport-percentage horizontal padding (`md:px-[10%]`)
                so the two columns sit cleanly inside the middle ~80% of
                the screen, framed by generous side rails on desktop.
            `max-w-[1600px]` is a soft cap so the two columns never drift
            absurdly far apart on ultra-wide monitors. */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] flex flex-col md:flex-row items-center md:justify-between gap-10 md:gap-12 text-center md:text-left px-5 sm:px-6 md:px-[10%] py-20 sm:py-28">
          {/* Left column — text. ~45% width on desktop, capped at 560px
              so the heading reads as a clean column even on wide screens. */}
          <div className="w-full md:w-[45%] max-w-[560px]">
            <p className="font-display text-gold text-sm sm:text-base tracking-[0.25em] uppercase">
              Our Story
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-cream">
              BUILT ON MEMORIES.
              <span className="block text-gold">SHARED THROUGH COLLECTING.</span>
            </h1>
            <p className="mt-6 text-cream/90 text-lg leading-relaxed">
              Cajun Collectibles is about more than cards, comics, games, and
              toys&mdash;it&apos;s about the memories attached to them. Every
              collection has a story. Every hunt creates a memory. Every
              generation deserves the opportunity to discover what made these
              hobbies special. From sports cards and comic books to retro games
              and vintage toys, we celebrate the stories behind the
              collectibles we love and the memories that keep them alive.
            </p>
          </div>

          {/* Right column — Explorer Gumbeaux mascot. Hard cap at 480px
              max-width per spec; ~45% column width on desktop so the
              two columns balance visually. `aspect-square` reserves
              vertical space so the layout doesn't jump while the
              transparent PNG loads. */}
          <div className="relative w-full max-w-[480px] md:w-[45%] aspect-square">
            <BrandImage
              asset="gumbeauxExplorer"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 480px"
              className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>

        {/* Torn-paper transition into the cream "Roots" section below.
            Uses the CSS-mask `torn-paper-top` rule (defined in
            `globals.css`) layered against `bg-cream` (#F3EAD2) so the
            seam color-matches the section immediately below — the
            PNG-based TornPaperDivider isn't used here because its
            cream-deep bottom would clash with the cream "Roots"
            section that follows. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-12 sm:h-16 bg-cream torn-paper-top" />
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              {
                Icon: MapPin,
                title: "Louisiana Roots",
                body: "From the bayou to your collection. Our brand is steeped in Southern hospitality, gumbo nights, and the warm storytelling tradition of Cajun country.",
              },
              {
                Icon: Heart,
                title: "Passion for the Hunt",
                body: "We chase the unexpected. Card breaks, retro game pickups, comic hauls, and toy lots — each one is a story waiting to be told.",
              },
              {
                Icon: Users,
                title: "Community First",
                body: "Collecting is better together. We share what we find, learn from others, and celebrate the people who keep this hobby alive.",
              },
              {
                Icon: HomeIcon,
                title: "Family-Friendly",
                body: "Built to be enjoyed by all ages. Whether you&apos;re a beginner with a binder or a veteran with a vault, you belong here.",
              },
              {
                Icon: MapPin,
                title: "Preserving History",
                body: "Every collectible has a story. We document, share, and protect the pieces of pop culture that shaped generations.",
              },
              {
                Icon: Heart,
                title: "Nostalgia, Always",
                body: "The past is what makes the present richer. We celebrate what was — and discover what&apos;s still waiting to be found.",
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl bg-cream-warm/60 p-7 border border-charcoal/5 hover:border-gold/40 hover:bg-cream-warm transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bayou text-cream">
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                {/* Heading uses full-strength charcoal; `[text-shadow:none]`
                    is a defensive no-op that explicitly guarantees no
                    shadow ever lands here (overrides any future global
                    text-shadow rule). */}
                <h3 className="mt-5 font-display text-xl text-charcoal tracking-wide [text-shadow:none]">
                  {title}
                </h3>
                {/* Body bumped from `text-charcoal/75` (soft, perceptually
                    "hazy" on cream) to full `text-charcoal` so the copy
                    reads as crisp, solid dark gray per the readability
                    spec. `[text-shadow:none]` is defensive — there's no
                    shadow being applied today, but the explicit reset
                    makes that contract clear in the markup. */}
                <p
                  className="mt-3 text-sm leading-relaxed text-charcoal [text-shadow:none]"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Adventure narrative flow ──
            Meet the mascot, hear the brand pitch, see what we collect,
            then look at the latest finds. Each section is a beat in the
            story rather than a corporate values list. */}
      <MeetGumbeaux />
      {/* `showCta={false}` hides the "Read Our Story → /adventure" button
          since this section is now rendered on /adventure itself. */}
      <AboutPreview showCta={false} adventurePage />
      <WhatWeCollect />
      <PassingItDown />
      <LatestAdventure />

      {/* ── Existing closing CTA (kept at the bottom of the page) ── */}
      <section className="bg-bayou text-cream py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-display text-gold text-sm tracking-[0.25em] uppercase">
              {site.motto}
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-cream leading-tight">
              Join the adventure.
            </h2>
            <p className="mt-5 text-cream/80 text-lg leading-relaxed">
              Whether you&apos;re after the next big find or just love the
              stories behind the hobby, there&apos;s a place for you in the
              Cajun Collectibles community.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/youtube" variant="primary" size="lg">
                Watch on YouTube
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Say Hello
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
