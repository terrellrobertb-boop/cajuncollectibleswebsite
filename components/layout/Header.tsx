"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { WhatnotIcon } from "@/components/brand/WhatnotIcon";
import { YoutubeIcon, InstagramIcon } from "@/components/brand/SocialIcons";
import { cn } from "@/lib/utils";

const socials = [
  { name: "YouTube", href: site.social.youtube, Icon: YoutubeIcon },
  { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { name: "Whatnot", href: site.social.whatnot, Icon: WhatnotIcon },
  { name: "Email", href: `mailto:${site.social.email}`, Icon: Mail },
] as const;

export function Header({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-bayou text-cream shadow-md">
      <Container className="flex h-14 items-center justify-between gap-4 lg:h-16">
        {logo}

        <nav className="hidden lg:flex items-center gap-8">
          {site.nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative font-semibold text-sm uppercase tracking-wider transition-colors py-1",
                  isActive
                    ? "text-gold"
                    : "text-cream/90 hover:text-gold",
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute left-0 right-0 -bottom-0.5 h-[3px] rounded-full bg-gold transition-transform origin-left",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-cream/20">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="p-2 text-cream/85 hover:text-gold transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-cream"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-14 bottom-0 bg-bayou-deep z-40 transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <Container className="py-10 flex flex-col gap-2">
          {site.nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-display text-3xl py-3 border-b border-cream/10 transition-colors",
                  isActive ? "text-gold" : "text-cream",
                )}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="flex items-center gap-3 pt-8">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-3 rounded-full border border-cream/25 text-cream hover:text-gold hover:border-gold transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}
