export type PassingItDownCard = {
  slug: string;
  title: string;
  description: string;
};

export const passingItDownSection = {
  eyebrow: "Family Series",
  title: "PASSING IT DOWN",
  subtitle:
    "Sharing the hobbies, collectibles, games, and memories we love with the next generation.",
  intro: [
    "Some collectibles are valuable.",
    "Some are rare.",
    "The best ones come with stories.",
    "Passing It Down is our family-focused series where we introduce classic games, cards, comics, toys, and collecting adventures to the next generation while creating new memories along the way.",
  ],
} as const;

export const passingItDownCards: PassingItDownCard[] = [
  {
    slug: "dad-vs-daughters-retro-gaming",
    title: "Dad vs Daughters Retro Gaming",
    description:
      "Can modern kids beat the games we grew up playing?",
  },
  {
    slug: "kids-rank-retro-games",
    title: "Kids Rank Retro Games",
    description:
      "What happens when today's kids judge yesterday's classics?",
  },
  {
    slug: "teaching-next-generation-to-collect",
    title: "Teaching the Next Generation to Collect",
    description:
      "Cards, comics, toys, and the stories behind them.",
  },
  {
    slug: "family-collection-adventures",
    title: "Family Collection Adventures",
    description:
      "Exploring collections, memories, and discoveries together.",
  },
];
