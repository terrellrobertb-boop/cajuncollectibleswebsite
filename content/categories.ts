import type { LucideIcon } from "lucide-react";
import { Layers, Gamepad2, BookOpen, ToyBrick } from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: "orange" | "gold" | "swamp" | "bayou-light";
};

export const categories: Category[] = [
  {
    slug: "sports-cards",
    name: "Sports Cards",
    tagline: "Every card tells a story.",
    description:
      "Modern and vintage sports cards, grading, pack openings, collection purchases, and hidden gems.",
    icon: Layers,
    accent: "orange",
  },
  {
    slug: "retro-games",
    name: "Retro Games",
    tagline: "Memories across generations.",
    description:
      "Classic consoles, retro gaming, game collecting, restoration, and nostalgia.",
    icon: Gamepad2,
    accent: "swamp",
  },
  {
    slug: "comics",
    name: "Comics",
    tagline: "Legends worth remembering.",
    description:
      "Comic collecting, key issues, full collections, and comic history.",
    icon: BookOpen,
    accent: "gold",
  },
  {
    slug: "vintage-toys",
    name: "Vintage Toys",
    tagline: "Childhood, found again.",
    description:
      "Action figures, toys, pop culture collectibles, and nostalgic memorabilia.",
    icon: ToyBrick,
    accent: "bayou-light",
  },
];
