import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /**
   * Visual variant.
   * - "default": cream letters with dark charcoal outline. Reads well on
   *   the dark bayou-teal header and the charcoal footer.
   * - "mono-cream": flat cream letters with no outline, for use on light
   *   backgrounds where the charcoal stroke would feel heavy.
   */
  variant?: "default" | "mono-cream";
  /**
   * Accessible label. The SVG is treated as an image with an
   * accessible name; we don't expose the <text> children to AT because
   * they're decorative duplicates of the alt text.
   */
  ariaLabel?: string;
};

/**
 * Inline SVG wordmark. Renders using the Alfa Slab One brand font that
 * is already loaded by next/font in app/layout.tsx via the
 * --font-display CSS variable.
 *
 * Why SVG instead of a PNG?
 *  - PNG exports out of ChatGPT have repeatedly shipped with a cream
 *    "sticker" border that is invisible against white but very visible
 *    against the teal header.
 *  - SVG has no rasterized alpha channel, so there is no place for a
 *    halo to hide.
 */
export function Wordmark({
  className,
  variant = "default",
  ariaLabel = "Cajun Collectibles",
}: WordmarkProps) {
  const cream = "#F5EFD8";
  const dark = "#1B1B1B";

  const isOutlined = variant === "default";

  return (
    <svg
      viewBox="0 0 360 110"
      role="img"
      aria-label={ariaLabel}
      className={cn("block h-full w-auto", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{ariaLabel}</title>
      <g
        style={{
          fontFamily: "var(--font-display), 'Alfa Slab One', serif",
          fontWeight: 400,
        }}
        textRendering="geometricPrecision"
      >
        <text
          x="180"
          y="58"
          textAnchor="middle"
          fontSize="56"
          letterSpacing="2"
          fill={cream}
          stroke={isOutlined ? dark : "none"}
          strokeWidth={isOutlined ? 5 : 0}
          strokeLinejoin="round"
          paintOrder="stroke fill"
        >
          CAJUN
        </text>
        <text
          x="180"
          y="98"
          textAnchor="middle"
          fontSize="28"
          letterSpacing="3"
          fill={cream}
          stroke={isOutlined ? dark : "none"}
          strokeWidth={isOutlined ? 3.5 : 0}
          strokeLinejoin="round"
          paintOrder="stroke fill"
        >
          COLLECTIBLES
        </text>
      </g>
    </svg>
  );
}
