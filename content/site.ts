export const site = {
  name: "Cajun Collectibles",
  tagline: "Where the Past Comes Alive, One Memory at a Time",
  motto: "The Hunt. The Find. The Story.",
  description:
    "Louisiana-based collectibles brand for sports cards, retro video games, comic books, and vintage toys.",
  url: "https://cajuncollectibles.com",
  // TODO: Replace placeholders once channels/handles are live
  social: {
    youtube: "https://www.youtube.com/@cajuncollectibles",
    instagram: "#",
    whatnot: "https://www.whatnot.com/user/cajunprez/shop",
    email: "hello@cajuncollectibles.com",
  },
  nav: [
    { name: "Home", href: "/" as const },
    { name: "Adventure", href: "/adventure" as const },
    { name: "YouTube", href: "/youtube" as const },
    { name: "Contact", href: "/contact" as const },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
