import { resolveAsset } from "@/lib/assets-server";
import { cn } from "@/lib/utils";

type TornPaperDividerProps = {
  /** Extra classes for the rendered element. */
  className?: string;
  /** Fallback fill color used by the SVG bridge before the PNG exists. */
  fallbackFill?: string;
};

/**
 * Torn-paper transition divider.
 *
 * Renders the brand `tornEdge` PNG asset (`/brand/torn-edge.png`) as a
 * normal in-flow `<img>` element. Drop it between a dark hero section and
 * the cream section below it — the asset's transparent torn top shows the
 * hero through, and its solid cream bottom seamlessly continues the cream
 * background below.
 *
 * While the PNG is still being prepared we render an SVG fallback with the
 * same dimensions so the site never breaks. As soon as the file is dropped
 * at `public/brand/torn-edge.png`, the `<img>` takes over automatically.
 */
export function TornPaperDivider({
  className,
  fallbackFill = "#F3EAD2",
}: TornPaperDividerProps) {
  const asset = resolveAsset("tornEdge");

  // Final artwork delivered — render the PNG straight, in normal flow at
  // the bottom of the hero section. No mask / no max-height / no overlap
  // gymnastics: the full torn-teeth area of the PNG shows above the
  // cream paper baseline, biting cleanly into the bayou hero above. The
  // PNG's solid cream bottom is color-matched to the `cream-deep` section
  // below, so the seam reads as one continuous sheet of paper.
  if (asset.isFinal) {
    return (
      <img
        src={asset.src}
        alt="Torn paper transition divider"
        className={cn(
          "img-crisp block w-full h-auto relative z-10 -mb-px pointer-events-none select-none",
          className,
        )}
      />
    );
  }

  // Bridge fallback: render the previous hand-tuned SVG so the page still
  // looks correct until the PNG is uploaded. This vanishes the moment
  // `public/brand/torn-edge.png` exists.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="xMidYMid meet"
      className={cn(
        "block w-full h-auto relative z-10 -mb-px pointer-events-none select-none",
        className,
      )}
    >
      <path
        d="M 0 80 L 0 28
           Q 14 14 28 24 L 44 36 L 60 22
           Q 76 12 92 20 L 108 34 L 124 18 L 140 28 L 156 14
           Q 172 8 188 18 L 204 32 L 220 22 L 238 38 L 254 26
           Q 270 16 286 24 L 302 14 L 318 32 L 336 20 L 352 12
           Q 368 8 384 18 L 400 30 L 416 22 L 432 40 L 448 28
           Q 464 18 480 26 L 496 14 L 512 34 L 530 22 L 546 12
           Q 562 8 578 18 L 594 32 L 612 24 L 628 36 L 644 22
           Q 660 14 676 22 L 692 36 L 710 24 L 726 12 L 742 28 L 758 18 L 774 36
           Q 790 44 806 32 L 822 22 L 838 12
           Q 854 6 870 16 L 886 30 L 902 20 L 920 36 L 936 24
           Q 952 16 968 24 L 984 12 L 1000 32 L 1018 22 L 1034 14
           Q 1050 8 1066 18 L 1082 30 L 1100 22 L 1116 38 L 1132 26
           Q 1148 18 1164 26 L 1180 14 L 1198 32 L 1214 22 L 1230 12
           Q 1246 8 1262 18 L 1278 32 L 1296 24 L 1312 14 L 1328 30 L 1344 20 L 1362 36
           Q 1378 44 1394 32 L 1410 22 L 1426 14
           Q 1434 12 1440 24
           L 1440 80 Z"
        fill={fallbackFill}
      />
    </svg>
  );
}
