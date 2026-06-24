import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { resolveAsset } from "@/lib/assets-server";
import type { AssetKey } from "@/content/assets";
import { cn } from "@/lib/utils";

type CategoryIconProps = {
  /** Asset key for the illustrated icon (e.g. `iconSportsCards`). */
  asset: AssetKey;
  /** Lucide icon used when the illustrated artwork isn't on disk yet. */
  fallbackIcon: LucideIcon;
  /** Accent palette for the fallback badge background. */
  accent: "orange" | "gold" | "swamp" | "bayou-light";
  /** Container size class (Tailwind sizing). */
  className?: string;
};

const accentClasses: Record<string, string> = {
  orange: "bg-orange/15 text-orange ring-orange/30",
  gold: "bg-gold/20 text-charcoal ring-gold/40",
  swamp: "bg-swamp/15 text-swamp ring-swamp/30",
  "bayou-light": "bg-bayou-light/15 text-bayou ring-bayou-light/30",
};

/**
 * Renders a category icon. Prefers the user-provided illustrated artwork from
 * the asset registry; falls back to a Lucide stroke icon in a colored badge
 * when the illustration isn't on disk yet.
 *
 * Server component.
 */
export function CategoryIcon({
  asset,
  fallbackIcon: Icon,
  accent,
  className,
}: CategoryIconProps) {
  const resolved = resolveAsset(asset);

  if (resolved.isFinal) {
    return (
      <div
        className={cn(
          "relative h-24 w-24 sm:h-28 sm:w-28 transition-transform duration-200 group-hover:scale-105",
          className,
        )}
      >
        <Image
          src={resolved.resolvedSrc}
          alt={resolved.alt}
          fill
          sizes="(min-width: 640px) 112px, 96px"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl ring-2 transition-shadow duration-200 group-hover:shadow-lg",
        accentClasses[accent],
        className,
      )}
    >
      <Icon className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.6} />
    </div>
  );
}
