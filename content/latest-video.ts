import type { YouTubePillar } from "./youtube-pillars";

/**
 * The newest published YouTube video — powers the /youtube "Now Live"
 * highlight, the homepage "Watch Latest Video" CTA, and the matching
 * pillar grid card when `pillarVideoSlug` is set.
 *
 * To feature a new upload:
 * 1. Paste the full YouTube watch URL in `youtubeUrl`
 * 2. Set title / description to match the video
 * 3. Point `pillarVideoSlug` at the card in content/youtube-pillars.ts
 * 4. Remove the matching entry from content/upcoming-channel.ts (if any)
 */
export type LatestVideo = {
  slug: string;
  title: string;
  description: string;
  youtubeUrl: string;
  pillar: YouTubePillar["title"];
  /** Slug of the card in youtube-pillars.ts to mark Live + link. */
  pillarVideoSlug: string;
};

export const latestVideo: LatestVideo | null = {
  slug: "first-downtown-pull",
  title: "I Pulled My First Downtown",
  description:
    "Every hunt begins with hope. This one ended with my very first Downtown pull.",
  youtubeUrl: "https://youtu.be/R0jzerD4Kdo",
  pillar: "THE HUNT",
  pillarVideoSlug: "first-downtown-pull",
};

export function isLatestVideoPublished(): boolean {
  return latestVideo !== null && latestVideo.youtubeUrl.trim().length > 0;
}
