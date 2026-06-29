import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ChannelStatusBadge } from "@/components/ui/ChannelStatusBadge";
import { getYoutubePillarsWithLive } from "@/lib/youtube-content";
import {
  extractYouTubeVideoId,
  youTubeThumbnailUrl,
} from "@/lib/youtube";
import { resolveAsset } from "@/lib/assets-server";
import type { YouTubeFeaturedVideo, YouTubePillar } from "@/content/youtube-pillars";

function FeaturedVideoCard({
  video,
  pillarTitle,
}: {
  video: YouTubeFeaturedVideo;
  pillarTitle: YouTubePillar["title"];
}) {
  const isLive = Boolean(video.youtubeUrl);
  const videoId = video.youtubeUrl
    ? extractYouTubeVideoId(video.youtubeUrl)
    : null;
  const youTubeThumb = videoId ? youTubeThumbnailUrl(videoId, "hq") : null;
  const assetThumb = video.asset ? resolveAsset(video.asset) : null;

  const cardClassName =
    "group relative aspect-video rounded-xl overflow-hidden bg-bayou-deep ring-1 ring-charcoal/10 transition-all duration-200 hover:-translate-y-1 hover:ring-gold";

  const inner = (
    <>
      {isLive && youTubeThumb ? (
        <Image
          src={youTubeThumb}
          alt={video.title}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : assetThumb?.isFinal ? (
        <Image
          src={assetThumb.resolvedSrc}
          alt={assetThumb.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-bayou-deep via-charcoal to-bayou-deep" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </>
      )}

      <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
        <ChannelStatusBadge
          status={isLive ? "Live" : undefined}
          upcomingSlug={isLive ? undefined : video.upcomingSlug}
        />
        {!isLive ? <div data-teaser-vote-slot /> : null}
      </div>

      {isLive ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-cream transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 fill-current ml-0.5" />
          </div>
        </div>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent p-5 flex flex-col justify-end">
        <span className="text-cream/70 text-xs uppercase tracking-widest">
          {pillarTitle}
        </span>
        <h3 className="mt-3 font-display text-lg text-cream leading-snug tracking-wide">
          {video.title}
        </h3>
      </div>
    </>
  );

  if (isLive && video.youtubeUrl) {
    return (
      <a
        href={video.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-teaser-card
        data-teaser-theme="dark"
        data-channel-status="Live"
        className={cardClassName}
      >
        {inner}
      </a>
    );
  }

  return (
    <div data-teaser-card data-teaser-theme="dark" className={cardClassName}>
      {inner}
    </div>
  );
}

function PillarBlock({ pillar }: { pillar: YouTubePillar }) {
  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl text-charcoal text-center tracking-wide">
        {pillar.title}
      </h2>
      <p className="mt-3 text-center font-semibold text-gold">{pillar.subtitle}</p>
      <p className="mt-3 text-charcoal/70 text-center max-w-2xl mx-auto">
        {pillar.description}
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pillar.videos.map((video) => (
          <FeaturedVideoCard
            key={video.slug}
            video={video}
            pillarTitle={pillar.title}
          />
        ))}
      </div>
    </div>
  );
}

export function YouTubePillarSections() {
  const pillars = getYoutubePillarsWithLive();

  return (
    <section className="bg-cream pb-20 sm:pb-24">
      <Container>
        <div className="space-y-16 sm:space-y-20">
          {pillars.map((pillar) => (
            <PillarBlock key={pillar.slug} pillar={pillar} />
          ))}
        </div>
      </Container>
    </section>
  );
}
