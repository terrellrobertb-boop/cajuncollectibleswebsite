import type { ReactNode } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { WhatnotIcon } from "@/components/brand/WhatnotIcon";
import { YoutubeIcon } from "@/components/brand/SocialIcons";

const socials = [
  { name: "YouTube", href: site.social.youtube, Icon: YoutubeIcon },
  { name: "Whatnot", href: site.social.whatnot, Icon: WhatnotIcon },
  { name: "Contact", href: "/contact", Icon: Mail },
] as const;

export function Footer({ logo }: { logo: ReactNode }) {
  return (
    <footer className="bg-charcoal text-cream/85 mt-auto">
      <Container className="py-14 lg:py-16">
        {/* ≤lg (covers phones ≤768px and tablets): centered, single-column
            vertical stack with clean breathing room between the brand
            block, the menu links, and the social icons.
            lg+ (1024px+): 3-column row, left-aligned. */}
        <div className="grid gap-10 text-center lg:text-left lg:grid-cols-3 lg:gap-12">
          {/* Brand block. `items-center lg:items-start` keeps the logo,
              tagline, and motto in a tight centered column on mobile and
              flips them to left-aligned on desktop. `max-w-sm` is honored
              by `mx-auto lg:mx-0` on the tagline so it still centers on
              mobile without crowding the narrow column. */}
          <div className="flex flex-col items-center lg:items-start lg:col-span-1">
            {logo}
            <p className="mt-5 text-sm max-w-sm leading-relaxed">
              {site.tagline}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              {site.motto}
            </p>
          </div>

          <div>
            <h3 className="font-display text-base text-cream tracking-wide">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-cream tracking-wide">
              Follow Along
            </h3>
            {/* Social icon row — centered on mobile, left-aligned at lg+. */}
            <div className="mt-4 flex items-center justify-center lg:justify-start gap-2">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="p-2.5 rounded-full border border-cream/20 hover:text-gold hover:border-gold transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="hover:text-gold transition-colors">
                {site.social.email}
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom bar: centered stack on mobile, split row at sm+. */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-4 text-xs text-cream/60">
          <p>
            &copy; {new Date().getFullYear()} Cajun Collectibles. All rights
            reserved.
          </p>
          <p>Made with care in Louisiana.</p>
        </div>
      </Container>
    </footer>
  );
}
