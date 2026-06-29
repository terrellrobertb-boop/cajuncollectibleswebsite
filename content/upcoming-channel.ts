export type ChannelStatus = "Live" | "In Progress" | "Recording" | "Coming Soon";

export type UpcomingChannelItem = {
  slug: string;
  title: string;
  description: string;
  status: ChannelStatus;
};

/** Pre-launch teaser content for the Adventure page "Coming Soon"
 *  section — planned YouTube episodes while the channel is in
 *  production. */
export const upcomingChannel: UpcomingChannelItem[] = [
  {
    slug: "40000-card-challenge",
    title: "The 40,000 Card Challenge",
    description:
      "Sorting, organizing, and discovering hidden gems from a massive collection.",
    status: "In Progress",
  },
  {
    slug: "whats-inside-ebay-collections",
    title: "What's Inside eBay Collections?",
    description:
      "Uncovering treasures from mystery collection purchases.",
    status: "Recording",
  },
  {
    slug: "dad-vs-daughters-contra",
    title: "Dad vs Daughters: Can They Beat Contra?",
    description:
      "A classic gaming challenge across generations.",
    status: "Coming Soon",
  },
  {
    slug: "hidden-gems-1000-games",
    title: "Hidden Gems from My 1,000 Game Collection",
    description:
      "Forgotten favorites and unexpected treasures.",
    status: "Coming Soon",
  },
  {
    slug: "bayou-bargain-hunt",
    title: "Bayou Bargain Hunt",
    description:
      "Searching flea markets, garage sales, and antique stores.",
    status: "Coming Soon",
  },
  {
    slug: "passing-it-down-teaching-kids",
    title: "Passing It Down: Teaching My Kids to Collect",
    description:
      "Sharing the hobby with the next generation.",
    status: "Coming Soon",
  },
];
