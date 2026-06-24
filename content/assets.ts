/**
 * Brand asset registry.
 *
 * Single source of truth for every image the site uses from the Cajun
 * Collectibles brand. Drop a file at the `src` path under `public/` and
 * the `<BrandImage>` / `<CategoryIcon>` components will pick it up
 * automatically on the next page load.
 *
 * Workflow:
 *  1. Open this file to see the path each asset expects.
 *  2. Generate / export the artwork to that exact path.
 *  3. Reload the page — no code changes needed.
 *
 * Status check: `npm run assets:status` prints which assets are still
 * using the placeholder fallback vs. real artwork.
 */

export type BrandAsset = {
  /** Path under `/public` where the artwork should live. Starts with `/`. */
  readonly src: string;
  /** Accessible alt text. Empty string is allowed only for purely decorative art. */
  readonly alt: string;
  /** Short note for the artist / generator describing what this asset should be. */
  readonly artNotes: string;
  /** Optional aspect ratio hint (width / height) for placeholders. */
  readonly aspectRatio?: number;
};

/**
 * The fallback shown anywhere an asset is missing.
 * This is the full color circular Cajun Collectibles logo.
 */
export const ASSET_FALLBACK = "/brand/logo-full.png";

export const assets = {
  // ─── Logo ─────────────────────────────────────────────────────────────
  logoFull: {
    src: "/brand/logo-full.png",
    alt: "Cajun Collectibles full color logo with Gumbeaux the Gator holding a comic book, NES controller, and action figures",
    artNotes: "Primary logo / circular badge with wordmark.",
    aspectRatio: 1,
  },
  logoWordmark: {
    // We point at the trimmed derivative so the visible letters fill the
    // available height (the raw export from ChatGPT has ~33% empty padding
    // above + below). Regenerate it any time the source PNG changes via:
    //   npm run trim:wordmark
    src: "/brand/logo-wordmark.trimmed.png",
    alt: "Cajun Collectibles wordmark",
    artNotes: "Wordmark only: 'CAJUN' / 'COLLECTIBLES' stacked on two lines in cream slab with dark outline. Used in the header and footer.",
    aspectRatio: 802 / 340,
  },
  logoGatorOnly: {
    src: "/brand/logo-gator-only.png",
    alt: "Gumbeaux the Gator without wordmark",
    artNotes: "Gator + collectibles composition (no circular badge frame, no wordmark). Used as the right-side artwork in hero sections.",
    aspectRatio: 1,
  },
  logoHeadIcon: {
    src: "/brand/logo-head-icon.png",
    alt: "Gumbeaux the Gator head icon",
    artNotes: "Small standalone gator head icon for the header (next to the wordmark) and the favicon. Should read cleanly at ~40x40 on a Bayou Teal background.",
    aspectRatio: 1,
  },
  logoMono: {
    src: "/brand/logo-mono.svg",
    alt: "Cajun Collectibles single-color logo",
    artNotes: "Single-color logo for monotone contexts (e.g., dark footer if a mono treatment is preferred over the full color wordmark).",
    aspectRatio: 1,
  },

  // ─── Hero artwork ─────────────────────────────────────────────────────
  heroHeadline: {
    src: "/brand/hero-headline.png",
    alt: "Cajun Collectibles — Sports Cards, Retro Games, Comics, Vintage Toys. Authentic finds. Stories worth telling.",
    artNotes: "Full hero text block: title + subtitle categories + tagline baked into a single transparent PNG. Replaces the live text in the left column of the homepage hero. Designed to read on the bayou teal background.",
    aspectRatio: 1200 / 900,
  },

  // ─── Mascot poses ─────────────────────────────────────────────────────
  gumbeauxHeadshot: {
    src: "/brand/gumbeaux-headshot.png",
    alt: "Gumbeaux the Gator portrait",
    artNotes: "Clean head/bust shot, no badge frame. Transparent background preferred. Used in Meet Gumbeaux section.",
    aspectRatio: 1,
  },
  gumbeauxMagnifier: {
    src: "/brand/gumbeaux-magnifier.png",
    alt: "Gumbeaux the Gator holding a magnifying glass",
    artNotes: "Curious / excited pose holding a magnifying glass to examine a collectible. Transparent background. Used in Tools Coming Soon section.",
    aspectRatio: 1,
  },
  gumbeauxStoryteller: {
    src: "/brand/gumbeaux-storyteller.png",
    alt: "Gumbeaux the Gator in storytelling pose",
    artNotes: "Friendly storyteller / 'come hear about this' pose. Transparent background. Used in About page hero.",
    aspectRatio: 1,
  },
  gumbeauxExplorer: {
    src: "/brand/gumbeaux-explorer.png",
    alt: "Gumbeaux the Gator Explorer Mascot",
    artNotes:
      "Premium explorer / adventurer pose — Gumbeaux as a treasure-hunter with backpack, explorer hat, and gear (map, compass, lantern, etc.). Transparent background. Used as the visual anchor for the Adventure page hero. Recommended canvas ~960x960 (square, transparent PNG).",
    aspectRatio: 1,
  },
  gumbeauxPolaroid: {
    src: "/brand/gumbeaux-polaroid.png",
    alt: "Polaroid photo of Gumbeaux the Gator at Louisiana Bayou",
    artNotes:
      "Polaroid-framed photo of Gumbeaux at the Louisiana bayou — classic instant-camera white border with a natural drop shadow baked into the PNG. Used in the Meet Gumbeaux section. Native canvas 1374×1145 (landscape, ~6:5). Transparent background outside the polaroid frame so the baked shadow blends naturally over any background color. IMPORTANT: do not apply additional CSS `box-shadow` / `drop-shadow` to this asset — the shadow lives in the file.",
    aspectRatio: 1374 / 1145,
  },
  gumbeauxYoutube: {
    src: "/brand/gumbeaux-youtube.png",
    alt: "Gumbeaux the Gator holding a video camera",
    artNotes: "Gumbeaux with camera / microphone / 'on the air' pose. Transparent background. Legacy YouTube hero asset — superseded by gumbeauxTvHero.",
    aspectRatio: 1,
  },
  gumbeauxTvHero: {
    src: "/brand/gumbeaux-tv-hero.png",
    alt: "Gumbeaux the Gator hosting on a Vintage Television Set",
    artNotes:
      "Gumbeaux on a vintage TV set — premium YouTube page hero anchor. Native canvas 1358×1159 (landscape). Transparent background with a natural drop shadow baked into the PNG. IMPORTANT: do not apply additional CSS `box-shadow` / `drop-shadow` to this asset — the shadow lives in the file.",
    aspectRatio: 1358 / 1159,
  },

  // ─── Category icons (illustrated flat icons) ───────────────────────────
  iconSportsCards: {
    src: "/brand/icons/sports-cards.png",
    alt: "Sports Cards",
    artNotes: "Colorful flat illustration of a fan of baseball / sports cards. Roughly 240x240. Transparent background.",
    aspectRatio: 1,
  },
  iconRetroGames: {
    src: "/brand/icons/retro-games.png",
    alt: "Retro Games",
    artNotes: "Colorful flat illustration of a vintage NES-style gamepad. Roughly 240x240. Transparent background.",
    aspectRatio: 1,
  },
  iconComics: {
    src: "/brand/icons/comics.png",
    alt: "Comics",
    artNotes: "Colorful flat illustration of stacked vintage comic books. Roughly 240x240. Transparent background.",
    aspectRatio: 1,
  },
  iconVintageToys: {
    src: "/brand/icons/vintage-toys.png",
    alt: "Vintage Toys",
    artNotes: "Colorful flat illustration of an action figure / robot. Roughly 240x240. Transparent background.",
    aspectRatio: 1,
  },

  // ─── Backgrounds ──────────────────────────────────────────────────────
  bayouSilhouette: {
    src: "/brand/bayou-silhouette.png",
    alt: "",
    artNotes: "Wide cypress trees + Spanish moss silhouette for hero backgrounds. Dark teal / charcoal tones, with negative space to let the hero content breathe. Roughly 1600x600.",
    aspectRatio: 1600 / 600,
  },
  paperTexture: {
    src: "/brand/paper-texture.png",
    alt: "",
    artNotes: "Subtle warm cream paper texture (light grain). Used as a low-opacity overlay on cream sections. Tileable preferred.",
  },
  tornEdge: {
    // Temporary: testing the cleaned-up v2 export. Swap back to
    // `/brand/torn-edge.png` once we've decided which version is final.
    src: "/brand/torn-edge2.png",
    alt: "Torn paper transition divider",
    artNotes:
      "Wide horizontal PNG used as the visual divider between a dark hero section and the cream section below it. The TOP edge is transparent and irregularly torn (organic hand-ripped paper feel). The BOTTOM portion is solid Creole Cream (#F3EAD2) that bleeds off the bottom of the canvas with no transparent gap. Recommended canvas ~1920x140 (long & short) so the teeth read clearly at full-screen widths.",
    aspectRatio: 1920 / 140,
  },

  // ─── Adventure thumbnails ─────────────────────────────────────────────
  adventure5000Cards: {
    src: "/brand/adventures/5000-card-collection.jpg",
    alt: "Stacks of sports cards from a 5,000-card eBay purchase",
    artNotes: "Photo / illustration representing buying a 5,000-card collection. 16:10 ratio.",
    aspectRatio: 16 / 10,
  },
  adventure40000Cards: {
    src: "/brand/adventures/40000-sports-cards.jpg",
    alt: "Sorting 40,000 sports cards",
    artNotes: "Photo / illustration of the sorting process. 16:10 ratio.",
    aspectRatio: 16 / 10,
  },
  adventureRetroPickups: {
    src: "/brand/adventures/retro-pickups.jpg",
    alt: "Retro game pickups and hidden gems",
    artNotes: "Photo / illustration of cartridges + consoles. 16:10 ratio.",
    aspectRatio: 16 / 10,
  },
} as const satisfies Record<string, BrandAsset>;

export type AssetKey = keyof typeof assets;

/** List of every asset key — handy for status scripts. */
export const allAssetKeys = Object.keys(assets) as AssetKey[];
