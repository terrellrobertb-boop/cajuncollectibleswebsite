import { Container } from "@/components/ui/Container";
import {
  passingItDownCards,
  passingItDownSection,
} from "@/content/passing-it-down";

export function PassingItDown() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-orange text-sm sm:text-base tracking-[0.25em] uppercase">
            {passingItDownSection.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-charcoal tracking-wide">
            {passingItDownSection.title}
          </h2>
          <p className="mt-4 text-charcoal/75 text-lg leading-relaxed">
            {passingItDownSection.subtitle}
          </p>
          <div className="mt-6 max-w-[720px] mx-auto text-charcoal/80 text-lg leading-[1.6] space-y-4">
            {passingItDownSection.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Same 3-up grid + card shell as Coming Soon (LatestAdventure) so
            preview cards share identical size and styling. Four cards
            render as a full row of three plus one on the row below. */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {passingItDownCards.map((card) => (
            <article
              key={card.slug}
              className="group flex flex-col rounded-2xl bg-cream overflow-hidden border border-charcoal/10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-bayou via-bayou-deep to-charcoal overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              </div>

              <div className="flex flex-col grow p-6">
                <h3 className="font-display text-xl text-charcoal leading-snug tracking-wide">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-charcoal/75 leading-relaxed grow">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
