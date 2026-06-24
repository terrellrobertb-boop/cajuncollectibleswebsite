import Image, { type ImageProps } from "next/image";
import { resolveAsset } from "@/lib/assets-server";
import type { AssetKey, BrandAsset } from "@/content/assets";

type Props = Omit<ImageProps, "src" | "alt"> & {
  /** Key from the asset registry OR a custom BrandAsset object. */
  asset: AssetKey | BrandAsset;
  /** Override the registered alt text (rare — usually keep registry alt). */
  alt?: string;
};

/**
 * Renders a brand image from the asset registry. Automatically falls back to
 * the Cajun Collectibles full logo if the artwork isn't on disk yet, so the
 * site never breaks when artwork is in progress.
 *
 * Server component — keep it out of files marked "use client".
 *
 * NOTE on `unoptimized`: Brand assets (logos, mascots, category icons) are
 * almost always transparent PNGs. Next.js's image optimizer has a known
 * issue where it drops the alpha channel when converting larger sizes to
 * WebP, which paints a white background behind the artwork on dark
 * sections. We default to `unoptimized` here so transparency is always
 * preserved exactly as it appears in the source file. Callers can pass
 * `unoptimized={false}` if they want optimization for a specific image
 * that they know is fully opaque (e.g., a JPG photo).
 */
export function BrandImage({ asset, alt, unoptimized = true, ...rest }: Props) {
  const resolved = resolveAsset(asset as AssetKey);
  return (
    <Image
      src={resolved.resolvedSrc}
      alt={alt ?? resolved.alt}
      unoptimized={unoptimized}
      {...rest}
    />
  );
}
