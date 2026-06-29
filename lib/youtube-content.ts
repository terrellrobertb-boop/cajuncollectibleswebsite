import { latestVideo, isLatestVideoPublished } from "@/content/latest-video";
import { youtubePillars, type YouTubePillar } from "@/content/youtube-pillars";

/** Pillar grid data with the latest live video wired into its Hunt/Find/Story card. */
export function getYoutubePillarsWithLive(): YouTubePillar[] {
  if (!isLatestVideoPublished() || !latestVideo) {
    return youtubePillars;
  }

  const live = latestVideo;

  return youtubePillars.map((pillar) => ({
    ...pillar,
    videos: pillar.videos.map((video) => {
      if (video.slug !== live.pillarVideoSlug) return video;

      return {
        ...video,
        title: live.title,
        youtubeUrl: live.youtubeUrl,
      };
    }),
  }));
}
