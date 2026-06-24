import { cn } from "@/lib/utils";

/**
 * Small simplified gator-head icon for the header wordmark and favicon.
 * Designed to read at small sizes; pulls from the Gumbeaux palette.
 */
export function GatorMark({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Head */}
      <ellipse cx="24" cy="26" rx="18" ry="14" fill="#7A9B47" />
      {/* Snout / mouth */}
      <path
        d="M6 28 Q3 28 4 31 L8 33 Q14 35 24 35 L24 28 Z"
        fill="#6B8A3E"
      />
      <path d="M6 31 L24 31" stroke="#3a4a23" strokeWidth="0.8" fill="none" />
      {/* Teeth */}
      <path
        d="M9 31 L10 33 L11 31 L12 33 L13 31 L14 33 L15 31"
        stroke="#F3EAD2"
        strokeWidth="0.8"
        fill="#F3EAD2"
      />
      {/* Eye */}
      <ellipse cx="30" cy="18" rx="5" ry="5.5" fill="#F3EAD2" />
      <ellipse cx="30" cy="19" rx="2.5" ry="3" fill="#1F1F1F" />
      <circle cx="29" cy="18" r="0.9" fill="#F3EAD2" />
      {/* Brow */}
      <path
        d="M25 13 Q30 11 35 13"
        stroke="#3a4a23"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Nostril */}
      <circle cx="9" cy="29" r="0.8" fill="#3a4a23" />
    </svg>
  );
}
