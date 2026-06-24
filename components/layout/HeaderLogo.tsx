import Image from "next/image";
import Link from "next/link";
import { resolveAsset } from "@/lib/assets-server";
import { GatorMark } from "@/components/brand/GatorMark";
import { Wordmark } from "@/components/brand/Wordmark";

/**
 * Header logo block: gator head + wordmark, wrapped in a "/" link.
 *
 * Server component on purpose: it uses {@link resolveAsset} to detect
 * whether the real artwork has been delivered to /public yet, falling
 * back to in-code SVGs ({@link GatorMark} / {@link Wordmark}) when not.
 *
 * Rendered inside the client {@link Header} component via the `logo`
 * prop so we can keep the nav / menu interactive while still doing
 * server-side file existence checks.
 */
export function HeaderLogo() {
  const head = resolveAsset("logoHeadIcon");
  const word = resolveAsset("logoWordmark");

  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 sm:gap-3 group"
      aria-label="Cajun Collectibles home"
    >
      {head.isFinal ? (
        <Image
          src={head.src}
          alt=""
          width={160}
          height={160}
          priority
          // Critical: skip Next.js's image optimizer for transparent logos.
          // The optimizer flattens the alpha channel onto a white background
          // when converting larger sizes to WebP, which produces a visible
          // white box on dark backgrounds. Serving the raw PNG preserves
          // transparency exactly as it appears in the file.
          unoptimized
          className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 shrink-0 transition-transform group-hover:rotate-[-4deg]"
        />
      ) : (
        <GatorMark
          className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 shrink-0 transition-transform group-hover:rotate-[-4deg]"
          aria-hidden="true"
        />
      )}

      {word.isFinal ? (
        <Image
          src={word.src}
          alt="Cajun Collectibles"
          width={802}
          height={340}
          priority
          unoptimized
          className="h-8 sm:h-9 lg:h-10 w-auto drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]"
        />
      ) : (
        <Wordmark className="h-8 sm:h-9 lg:h-10 w-auto drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]" />
      )}
    </Link>
  );
}

/** Footer variant: same logic, smaller default size, no priority loading. */
export function FooterLogo() {
  const head = resolveAsset("logoHeadIcon");
  const word = resolveAsset("logoWordmark");

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3"
      aria-label="Cajun Collectibles home"
    >
      {head.isFinal ? (
        <Image
          src={head.src}
          alt=""
          width={160}
          height={160}
          unoptimized
          className="h-10 w-10"
        />
      ) : (
        <GatorMark className="h-10 w-10" aria-hidden="true" />
      )}

      {word.isFinal ? (
        <Image
          src={word.src}
          alt="Cajun Collectibles"
          width={802}
          height={340}
          unoptimized
          className="h-12 w-auto"
        />
      ) : (
        <Wordmark className="h-12 w-auto" />
      )}
    </Link>
  );
}
