import { Container } from "@/components/ui/Container";
import { CategoryIcon } from "@/components/brand/CategoryIcon";
import { categories } from "@/content/categories";
import type { AssetKey } from "@/content/assets";

/**
 * Adventure-page specific category overview. Reuses the four brand
 * category icons (the same artwork used in the home page hero
 * `FeaturedCategories` row) but pairs each with a short adventure-
 * flavored sentence instead of the home-page tagline.
 *
 * Sits between "Built on Passion, Powered by Community" and
 * "Latest Adventures" on /adventure to anchor the page's narrative —
 * "here's what we hunt for" — before showing the latest finds.
 */

const categoryAssetKey: Record<string, AssetKey> = {
  "sports-cards": "iconSportsCards",
  "retro-games": "iconRetroGames",
  comics: "iconComics",
  "vintage-toys": "iconVintageToys",
};

// Adventure-page descriptions, keyed by category slug. Kept inline (not
// promoted to `content/categories.ts`) because they're narrative copy
// specific to this storytelling context — the home-page row uses the
// shorter `tagline` field instead.
const adventureDescription: Record<string, string> = {
  "sports-cards":
    "Rookies, legends, hidden gems, and the stories behind them.",
  "retro-games":
    "Classic consoles, cartridges, and the nostalgia of gaming history.",
  comics: "Heroes, key issues, and the artwork that inspired generations.",
  "vintage-toys": "Figures, collectibles, and memories from childhood.",
};

export function WhatWeCollect() {
  return (
    <section className="bg-cream-deep paper-grain py-20 sm:py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-orange text-sm sm:text-base tracking-[0.25em] uppercase">
            The Collection
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-charcoal tracking-wide">
            WHAT WE COLLECT
          </h2>
          <p className="mt-4 text-charcoal/75 text-lg leading-relaxed">
            From cardboard treasures to forgotten classics, these are the
            categories that fuel our adventures.
          </p>
        </div>

        {/* Responsive icon grid — mirrors the home-page FeaturedCategories
            layout so the brand reads consistently across the site.
              ≤lg (phones + tablets): 2 columns.
              lg+ (1024+): full 4-up row. */}
        <div className="mt-14 mx-auto grid max-w-5xl grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 justify-items-center">
          {categories.map((c) => (
            // Each card column matches the spec exactly:
            //   display: flex; flex-direction: column;
            //   align-items: center; text-align: center;
            // Children inherit text-center but each also restates it
            // explicitly so the centering contract is impossible to
            // accidentally break with future edits.
            <div
              key={c.slug}
              className="group flex flex-col items-center text-center gap-3 max-w-[240px]"
            >
              {/* Uniform 130×130 flex box around every illustration.
                  The category artwork has uneven natural aspect ratios
                  (controller is wider, robot is taller). Forcing each
                  icon into an identical square footprint with the image
                  centered (`flex items-center justify-center` on the
                  wrapper, plus `object-contain` on the image inside
                  CategoryIcon) gives the row a perfect shared baseline
                  and unified visual weight. `mx-auto` is a defensive
                  belt-and-suspenders centering of the icon box itself. */}
              <CategoryIcon
                asset={categoryAssetKey[c.slug]}
                fallbackIcon={c.icon}
                accent={c.accent}
                className="h-[130px] w-[130px] sm:h-[130px] sm:w-[130px] mx-auto flex items-center justify-center"
              />
              <h3 className="text-center font-display text-lg sm:text-xl text-charcoal tracking-wide">
                {c.name.toUpperCase()}
              </h3>
              <p className="text-center text-sm text-charcoal/75 leading-relaxed">
                {adventureDescription[c.slug]}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
