import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhatnotIcon } from "@/components/brand/WhatnotIcon";
import { YoutubeIcon } from "@/components/brand/SocialIcons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cajun Collectibles. Drop a line about collections, collaborations, or just to say hello.",
};

const socials = [
  { name: "YouTube", href: site.social.youtube, Icon: YoutubeIcon },
  { name: "Whatnot", href: site.social.whatnot, Icon: WhatnotIcon },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-cream pt-20 pb-12 sm:pt-24">
        <Container className="max-w-3xl text-center">
          <p className="font-display text-orange text-sm sm:text-base tracking-[0.25em] uppercase">
            Drop Us A Line
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl text-charcoal leading-tight tracking-wide">
            LET&apos;S TALK COLLECTIBLES
          </h1>
          <p className="mt-5 text-charcoal/75 text-lg leading-relaxed">
            Got a collection to share, a question to ask, or a story to tell?
            We&apos;d love to hear from you.
          </p>
        </Container>
      </section>

      <section className="bg-cream pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* Form card — solid Creole Cream (#F3EAD2 via `bg-cream`) to
                match card blocks on Adventure and other pages. */}
            <div className="rounded-2xl bg-cream border border-charcoal/10 p-7 sm:p-9 shadow-sm">
              <h2 className="font-display text-2xl text-charcoal tracking-wide">
                SEND A MESSAGE
              </h2>
              <p className="mt-2 text-sm text-charcoal/70">
                We read every message. Replies usually come within a couple of days.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>

            <aside className="flex flex-col gap-7">
              {/* Sidebar card — Bayou Teal (#0D5C63 via `bg-bayou`).
                  Links and body copy stay solid Creole Cream for contrast. */}
              <div className="rounded-2xl bg-bayou text-cream p-7 sm:p-9">
                <h2 className="font-display text-2xl tracking-wide text-cream">
                  GET IN TOUCH
                </h2>
                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-1 text-gold shrink-0" strokeWidth={1.8} />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-cream/70">
                        Email
                      </p>
                      <p className="text-cream break-all">{site.social.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-1 text-gold shrink-0" strokeWidth={1.8} />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-cream/70">
                        Based In
                      </p>
                      <p className="text-cream">Louisiana, USA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-cream-warm/70 border border-charcoal/10 p-7 sm:p-9">
                <h2 className="font-display text-2xl text-charcoal tracking-wide">
                  FOLLOW ALONG
                </h2>
                <p className="mt-2 text-sm text-charcoal/70">
                  Catch us live, hunt with us on stream, and keep up with the
                  latest finds.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  {socials.map(({ name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      aria-label={name}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http") ? "noopener noreferrer" : undefined
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-bayou/30 text-bayou hover:bg-bayou hover:text-cream hover:border-bayou transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
