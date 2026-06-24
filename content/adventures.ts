import type { AssetKey } from "./assets";

export type Adventure = {
  slug: string;
  title: string;
  description: string;
  category: "Sports Cards" | "Retro Games" | "Comics" | "Vintage Toys" | "Collection";
  asset: AssetKey;
};

export const adventures: Adventure[] = [
  {
    slug: "5000-card-ebay-collection",
    title: "Bought a 5,000-Card Collection on eBay",
    description:
      "Took a chance on a massive lot — what we found inside still has us hunting for more.",
    category: "Collection",
    asset: "adventure5000Cards",
  },
  {
    slug: "sorting-40000-sports-cards",
    title: "Sorting 40,000 Sports Cards",
    description:
      "How we tackled a mountain of cardboard, from rookies to rookies-to-watch.",
    category: "Sports Cards",
    asset: "adventure40000Cards",
  },
  {
    slug: "retro-game-pickups-hidden-gems",
    title: "Retro Game Pickups & Hidden Gems",
    description:
      "Cartridges, consoles, and the stories behind every find on the latest pickup run.",
    category: "Retro Games",
    asset: "adventureRetroPickups",
  },
];
