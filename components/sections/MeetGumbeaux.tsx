import { Container } from "@/components/ui/Container";
import { BrandImage } from "@/components/brand/BrandImage";

export function MeetGumbeaux() {
  return (
    <section className="relative bg-bayou text-cream py-20 sm:py-24 overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Container className="relative">
        {/* Side-by-side flex wrapper — `items-center` vertically balances
            the text block against the Polaroid's center-line, matching
            the hero section rhythm. Stacks to a column on mobile. */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-10 lg:gap-16">
          {/* Polaroid photo column.
              The asset is a finished PNG with its own baked-in drop
              shadow and white frame — so we intentionally render it
              "raw": no aspect-square wrapper (the polaroid is ~6:5
              landscape, not square), no glowing halo behind it, and
              NO `drop-shadow` / `box-shadow` utility on the image
              itself. Doubling the shadow would muddy the photo edges.
              Sizing per spec: `max-width: 440px; width: 100%; height: auto;`.
              Intrinsic width/height come from the source file (1374×1145)
              so Next/Image reserves the correct aspect-ratio box before
              the PNG loads and avoids layout shift. */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <BrandImage
              asset="gumbeauxPolaroid"
              alt="Polaroid photo of Gumbeaux the Gator at Louisiana Bayou"
              width={1374}
              height={1145}
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 90vw"
              className="w-full max-w-[440px] h-auto"
            />
          </div>

          <div className="order-1 lg:order-2">
            {/* Eyebrow, primary name, and "THE GATOR" all share the same
                bold geometric sans (Montserrat 900 via `font-impact`)
                for a cohesive typographic block. Colors per brand:
                  - "THE MASCOT" eyebrow → Cajun Gold (#E0B341)
                  - "MEET GUMBEAUX" → Creole Cream (#F3EAD2)
                  - "THE GATOR" → Cajun Gold (#E0B341) */}
            <p className="font-impact font-black text-gold text-sm sm:text-base tracking-[0.25em] uppercase">
              The Mascot
            </p>
            <h2 className="mt-3 font-impact font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-cream">
              MEET GUMBEAUX
              <span className="block text-gold text-2xl sm:text-3xl mt-2">
                THE GATOR
              </span>
            </h2>
            <p className="mt-6 font-display text-lg sm:text-xl text-gold tracking-wide">
              Collector. Treasure Hunter. Nostalgia Expert.
            </p>
            <p className="mt-6 text-cream/90 leading-relaxed max-w-xl">
              Gumbeaux is always on the hunt for hidden gems&mdash;from sports
              cards and comic books to retro games and vintage toys. Born in
              the heart of Louisiana, he&apos;s the friendly face of every
              adventure and the spirit behind every story.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
