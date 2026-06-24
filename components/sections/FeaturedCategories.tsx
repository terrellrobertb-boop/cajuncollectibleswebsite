import { Container } from "@/components/ui/Container";
import { CategoryIcon } from "@/components/brand/CategoryIcon";
import { categories } from "@/content/categories";
import type { AssetKey } from "@/content/assets";

const categoryAssetKey: Record<string, AssetKey> = {
  "sports-cards": "iconSportsCards",
  "retro-games": "iconRetroGames",
  comics: "iconComics",
  "vintage-toys": "iconVintageToys",
};

export function FeaturedCategories() {
  return (
    <section
      id="categories"
      // Cream-deep section flows directly out of the torn-paper divider
      // above (the PNG's bottom edge is color-matched to `cream-deep`,
      // so the section reads as a single continuous sheet of paper).
      // Tight top padding keeps the icon row close to the rip without
      // any negative margin tricks that would clip the teeth.
      className="bg-cream-deep paper-grain pt-6 sm:pt-8 pb-20 sm:pb-24"
    >
      <Container>
        {/* Responsive icon grid.
              ≤lg (covers all phones ≤768px and tablets): 2 columns so
                cards never squish horizontally on narrow viewports.
              lg+ (1024px+): the full 4-up row.
            `justify-items-center` centers each cell's contents on its
            column axis, `mx-auto` + `max-w-5xl` keeps the row tight +
            horizontally centered on very wide screens. */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              // `gap-1.5` (6px) tightens spacing between the icon, the
              // title, and the tagline so each card reads as one compact
              // unit matching the mockup.
              className="group flex flex-col items-center text-center gap-1.5 transition-transform duration-200 hover:-translate-y-1"
            >
              <CategoryIcon
                asset={categoryAssetKey[c.slug]}
                fallbackIcon={c.icon}
                accent={c.accent}
              />
              <h3 className="font-display text-lg sm:text-xl text-charcoal tracking-wide">
                {c.name.toUpperCase()}
              </h3>
              <p className="text-sm text-charcoal/70 italic">
                {c.tagline}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
