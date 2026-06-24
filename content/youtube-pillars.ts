import type { AssetKey } from "./assets";

export type YouTubeFeaturedVideo = {
  slug: string;
  title: string;
  asset?: AssetKey;
  /** Key into content/upcoming-channel.ts for shared production status. */
  upcomingSlug?: string;
};

export type YouTubePillar = {
  slug: "the-hunt" | "the-find" | "the-story";
  title: "THE HUNT" | "THE FIND" | "THE STORY";
  subtitle: string;
  description: string;
  videos: YouTubeFeaturedVideo[];
};

export const youtubePillars: YouTubePillar[] = [
  {
    slug: "the-hunt",
    title: "THE HUNT",
    subtitle: "The chase is half the fun.",
    description:
      "Collection purchases, flea markets, garage sales, card shops, conventions, antique stores, and hidden treasures waiting to be discovered.",
    videos: [
      {
        slug: "whats-inside-ebay-collections",
        title: "What's Inside eBay Collections?",
        asset: "adventure5000Cards",
        upcomingSlug: "whats-inside-ebay-collections",
      },
      {
        slug: "bayou-bargain-hunt",
        title: "Bayou Bargain Hunt",
        upcomingSlug: "bayou-bargain-hunt",
      },
      {
        slug: "estate-sale-treasure-hunt",
        title: "Estate Sale Treasure Hunt",
      },
    ],
  },
  {
    slug: "the-find",
    title: "THE FIND",
    subtitle: "Discovering the unexpected.",
    description:
      "Hidden gems, collection reveals, favorite finds, grading candidates, and collectibles worth remembering.",
    videos: [
      {
        slug: "best-finds-40000-cards",
        title: "Best Finds From 40,000 Cards",
        asset: "adventure40000Cards",
        upcomingSlug: "40000-card-challenge",
      },
      {
        slug: "hidden-gems-1000-games",
        title: "Hidden Gems From My 1,000 Game Collection",
        asset: "adventureRetroPickups",
        upcomingSlug: "hidden-gems-1000-games",
      },
      {
        slug: "crown-jewels-of-the-collection",
        title: "Crown Jewels of the Collection",
      },
    ],
  },
  {
    slug: "the-story",
    title: "THE STORY",
    subtitle: "The memories behind the collectibles.",
    description:
      "The memories, nostalgia, family adventures, and collector stories that make these hobbies worth passing down.",
    videos: [
      {
        slug: "dad-vs-daughters-contra",
        title: "Dad vs Daughters: Can They Beat Contra?",
        upcomingSlug: "dad-vs-daughters-contra",
      },
      {
        slug: "passing-it-down",
        title: "Passing It Down",
      },
      {
        slug: "kids-rank-retro-games",
        title: "Kids Rank Retro Games",
      },
    ],
  },
];
