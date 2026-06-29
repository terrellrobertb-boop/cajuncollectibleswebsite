import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChannelStatusBadge } from "@/components/ui/ChannelStatusBadge";
import { YoutubeIcon } from "@/components/brand/SocialIcons";
import { isLatestVideoPublished, latestVideo } from "@/content/latest-video";
import {
  extractYouTubeVideoId,
  youTubeThumbnailUrl,
} from "@/lib/youtube";

export function LatestVideoHighlight() {
  if (!isLatestVideoPublished() || !latestVideo) return null;

  const videoId = extractYouTubeVideoId(latestVideo.youtubeUrl);
  const thumbnail = videoId ? youTubeThumbnailUrl(videoId, "hq") : null;

  return (
    <section className="bg-cream-warm py-10 sm:py-12">
      <Container>
        <div className="text-center max-w-xl mx-auto">
          <p className="font-display text-orange text-sm tracking-[0.25em] uppercase">
            Now Live on YouTube
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl text-charcoal tracking-wide">
            LATEST ADVENTURE
          </h2>
        </div>

        <div className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <a
            href={latestVideo.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video w-full sm:w-[min(100%,340px)] sm:shrink-0 rounded-xl overflow-hidden bg-bayou-deep ring-1 ring-charcoal/10 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:ring-gold"
          >
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={latestVideo.title}
                fill
                unoptimized
                sizes="(min-width: 640px) 340px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-bayou-deep via-charcoal to-bayou-deep" />
            )}

            <div className="absolute top-3 left-3 z-10">
              <ChannelStatusBadge status="Live" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-cream shadow-md transition-transform group-hover:scale-110">
                <Play className="h-4 w-4 fill-current ml-0.5" />
              </div>
            </div>
          </a>

          <div className="flex flex-col justify-center text-center sm:text-left min-w-0">
            <span className="text-xs uppercase tracking-widest text-charcoal/60">
              {latestVideo.pillar}
            </span>
            <h3 className="mt-1.5 font-display text-lg sm:text-xl text-charcoal leading-snug tracking-wide">
              {latestVideo.title}
            </h3>
            <p className="mt-2 text-sm text-charcoal/75 leading-relaxed">
              {latestVideo.description}
            </p>
            <div className="mt-5 flex justify-center sm:justify-start">
              <Button href={latestVideo.youtubeUrl} variant="primary" size="md">
                <YoutubeIcon className="h-4 w-4" />
                Watch on YouTube
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
