import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandImage } from "@/components/brand/BrandImage";
import { CypressBackground } from "@/components/brand/CypressBackground";
import { TornPaperDivider } from "@/components/brand/TornPaperDivider";
import { resolveAsset } from "@/lib/assets-server";
import { site } from "@/content/site";
import { isLatestVideoPublished, latestVideo } from "@/content/latest-video";

export function Hero() {
  // Resolve the wordmark from the asset registry so we automatically use
  // the trimmed variant when present (and stay in sync with future swaps).
  const wordmark = resolveAsset("logoWordmark");

  return (
    <section className="relative bg-bayou text-cream overflow-hidden">
      <CypressBackground />

      {/* Top padding stays comfortable; bottom padding is collapsed hard
          (was pb-28/32/36 ≈ 112-144px). The torn-paper divider below now
          uses a negative top-margin to slice INTO the lower water section
          of the bayou background, so the content visually anchors close
          to the rip and the home page above the fold gets ~80-100px
          shorter without resizing any artwork.

          `laptop:pt-[30px]` further shaves the top padding down to 30px
          on short widescreen laptops (e.g. MacBook Air, 1440×800 and
          below) so the CTAs land above the fold without scrolling.

          `tablet:pt-10 tablet:pb-5` (40px / 20px) tightens hero padding
          on iPad-class viewports (769-1024px). Paired with the smaller
          tablet wordmark/mascot and a milder divider overlap below,
          this guarantees the CTAs stay clear of the torn paper line
          in portrait tablet form factors.

          The `laptop` and `tablet` variants are defined in
          `app/globals.css`. */}
      <Container className="relative z-10 pt-10 pb-12 sm:pt-12 sm:pb-12 lg:pt-12 lg:pb-12 laptop:pt-[30px] tablet:pt-10 tablet:pb-5">
        {/* Master hero wrapper.
            Below 992px (mobile + tablet, covers all phones ≤768px): single
            column, vertical stack, center-aligned, 40px gap between the
            text block and the mascot — satisfies the mobile layout spec
            (flex-direction: column; text-align: center; 40px gap).
            From 992px+: side-by-side two-column grid (8px gap). */}
        <div className="grid grid-cols-1 items-center gap-10 min-[992px]:grid-cols-[1.25fr_1fr] min-[992px]:gap-8">
          {/* Left text column — vertical flex stack. Centered on mobile/tablet,
              left-aligned from 992px+. 18px gap between every item.

              `pb-8 md:pb-0` — on mobile (≤768px) the column carries a
              hard 32px bottom-padding buffer directly below the CTA
              buttons. Combined with the divider's negative top-margin
              being reset to 0 on mobile (below), this guarantees the
              torn-paper teeth can never clip into the buttons on narrow
              phone viewports. The buffer is dropped from `md:` upward
              where the side-by-side layout makes it unnecessary. */}
          <div className="order-2 min-[992px]:order-1 flex flex-col items-center text-center min-[992px]:items-start min-[992px]:text-left gap-[18px] pb-8 md:pb-0">
            {/* 1. Wordmark logo (replaces the H1 placeholder).
                `min-[992px]:ml-2` (8px) — optical-alignment nudge.
                The wordmark PNG has a few px of transparent padding
                around the letter "C", which makes the visible glyph
                sit slightly to the left of the text/buttons below it.
                The small left margin pushes the visible "C" flush
                with the left baseline of the categories text, slogan,
                and CTA buttons. Scoped to the side-by-side desktop
                layout so it doesn't break centering on mobile/tablet. */}
            <Image
              src={wordmark.resolvedSrc}
              alt="Cajun Collectibles Logo"
              width={802}
              height={340}
              priority
              unoptimized
              // `laptop:max-w-[390px]` — on short widescreen laptops
              // (≤1440 × ≤800), shrink the wordmark from 480→390px so
              // the whole hero compresses just enough to land the CTAs
              // above the fold without touching mobile or desktop sizing.
              //
              // `tablet:max-w-[380px]` — on iPad-class viewports
              // (769-1024px), shrink to 380px so the wordmark and
              // mascot read in balance with the tighter tablet padding.
              className="w-full max-w-[480px] laptop:max-w-[390px] tablet:max-w-[380px] h-auto drop-shadow-[0_3px_0_rgba(0,0,0,0.35)] min-[992px]:ml-2"
            />

            {/* 2. Categories list — heavy geometric impact sans (Montserrat 800/900).
                Wraps naturally on mobile; locks to a single horizontal line from
                992px+ so it balances the width of the wordmark above it. */}
            <p className="font-impact font-black uppercase leading-tight text-base sm:text-lg min-[992px]:text-[1.35rem] min-[992px]:leading-none min-[992px]:whitespace-nowrap tracking-[1px] text-[#3AAFB9]">
              Sports Cards &bull; Retro Games &bull; Comics &bull; Vintage Toys
            </p>

            {/* 3. Slogan — bold sans, Cajun Gold, slightly larger than categories */}
            <p className="font-sans font-bold leading-snug text-lg sm:text-xl lg:text-2xl text-gold">
              {site.tagline}
            </p>

            {/* 4. CTA buttons — stack vertically on phones, side-by-side from sm:+ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                href={
                  isLatestVideoPublished() && latestVideo
                    ? latestVideo.youtubeUrl
                    : site.social.youtube
                }
                variant="primary"
                size="lg"
              >
                <Play className="h-5 w-5 fill-current" />
                {isLatestVideoPublished() ? "Watch Latest Video" : "Watch on YouTube"}
              </Button>
              <Button
                href="/adventure"
                variant="secondary"
                size="lg"
                className="bg-[#052528] text-white border-transparent hover:bg-[#0a3a3f] hover:border-transparent"
              >
                Explore the Adventure
              </Button>
            </div>
          </div>

          {/* Right mascot column — centered on mobile, right-aligned from 992px+.
              `laptop:max-w-[400px]` — on short widescreen laptops the mascot
              shrinks from 520 → 400px to match the wordmark scale-down and
              keep the proportions of the hero column balanced.
              `tablet:max-w-[380px]` — on iPad-class viewports the mascot
              matches the wordmark width so the two columns balance visually
              inside the narrower tablet hero. */}
          <div className="order-1 min-[992px]:order-2 flex justify-center min-[992px]:justify-end">
            <div className="relative w-full max-w-[360px] sm:max-w-[440px] min-[992px]:max-w-[520px] xl:max-w-[600px] laptop:max-w-[400px] tablet:max-w-[380px] aspect-square drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
              <BrandImage
                asset="logoGatorOnly"
                fill
                priority
                sizes="(min-width: 992px) 520px, (min-width: 640px) 440px, 360px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Torn-paper transition to the cream categories section below.
          Lives in normal flow at the bottom of the hero section — the
          PNG's transparent top shows the bayou hero through, and its
          solid cream bottom continues seamlessly into the cream
          categories section. `-mb-px` defeats any sub-pixel gap.

          Negative top-margin scoped per breakpoint:
            mobile (≤767px): `mt-0` — no overlap. The PNG's bottom is
              color-matched to `bg-cream-deep` below, so it still reads
              as a clean rip; the bayou hero just ends cleanly at the
              torn line instead of having it cut into the CTA buttons.
            tablet (769-1024px): `tablet:-mt-10` (-40px) — milder overlap
              that drops the paper line low enough to clear the CTAs on
              iPad Pro portrait viewports while still feeling integrated.
            md (≥768px, non-tablet): `-mt-16` (-64px) — used in the
              brief gap zone (768px itself, since tablet starts at 769).
            lg+ (≥1024px): `-mt-20` (-80px) for a more dramatic slice
              on roomy desktop layouts.

          The `tablet:` rule wins inside its range thanks to its later
          declaration order in `app/globals.css`. */}
      <TornPaperDivider className="md:-mt-16 lg:-mt-20 tablet:-mt-10" />
    </section>
  );
}
