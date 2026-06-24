import Image from "next/image";
import { resolveAsset } from "@/lib/assets-server";
import { cn } from "@/lib/utils";

export function CypressBackground({ className }: { className?: string }) {
  const silhouette = resolveAsset("bayouSilhouette");

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {silhouette.isFinal ? (
        <Image
          src={silhouette.resolvedSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          // `object-top` anchors the cover crop to the top of the
          // silhouette so the cypress canopy stays perfectly framed
          // when the hero section gets shorter. Any cropping happens
          // off the bottom of the image — which is exactly where the
          // torn-paper divider now slices through anyway.
          className="object-cover object-top opacity-50"
        />
      ) : (
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full opacity-30"
      >
        <defs>
          <radialGradient id="cypressGlow" cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#1f8a93" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0d5c63" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="silhouetteFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#08373c" stopOpacity="0" />
            <stop offset="100%" stopColor="#06292d" stopOpacity="1" />
          </linearGradient>
        </defs>

        <rect width="1440" height="600" fill="url(#cypressGlow)" />

        {/* Distant tree line */}
        <g fill="url(#silhouetteFade)" opacity="0.6">
          <path d="M0 480 L40 460 L80 470 L120 440 L160 455 L200 430 L240 450 L280 425 L320 445 L360 420 L400 440 L440 415 L480 435 L520 410 L560 430 L600 405 L640 425 L680 400 L720 420 L760 395 L800 415 L840 390 L880 410 L920 385 L960 405 L1000 380 L1040 400 L1080 375 L1120 395 L1160 370 L1200 390 L1240 365 L1280 385 L1320 360 L1360 380 L1400 355 L1440 375 L1440 600 L0 600 Z" />
        </g>

        {/* Foreground cypress trees with hanging moss */}
        <g fill="#06292d" opacity="0.85">
          {/* Tree 1 - far left */}
          <path d="M80 280 Q70 300 75 340 L72 380 Q68 420 72 460 L88 460 Q92 420 88 380 L85 340 Q90 300 80 280 Z" />
          <ellipse cx="80" cy="290" rx="35" ry="20" />
          <ellipse cx="65" cy="310" rx="25" ry="15" />
          <ellipse cx="95" cy="310" rx="25" ry="15" />
          {/* Spanish moss */}
          <path d="M55 320 Q53 360 58 400" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M70 325 Q68 365 73 405" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M100 325 Q102 365 98 405" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />

          {/* Tree 2 */}
          <path d="M280 250 Q270 280 275 330 L272 380 Q268 430 272 470 L292 470 Q296 430 292 380 L289 330 Q294 280 280 250 Z" />
          <ellipse cx="280" cy="265" rx="45" ry="28" />
          <ellipse cx="255" cy="290" rx="32" ry="20" />
          <ellipse cx="305" cy="290" rx="32" ry="20" />
          <path d="M245 305 Q243 350 248 395" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M275 308 Q273 355 278 400" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M310 305 Q312 350 308 395" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />

          {/* Tree 3 - center */}
          <path d="M620 220 Q608 260 614 320 L611 380 Q606 440 612 480 L636 480 Q640 440 636 380 L633 320 Q638 260 620 220 Z" />
          <ellipse cx="620" cy="240" rx="55" ry="32" />
          <ellipse cx="590" cy="265" rx="38" ry="24" />
          <ellipse cx="650" cy="265" rx="38" ry="24" />
          <ellipse cx="605" cy="285" rx="30" ry="18" />
          <ellipse cx="635" cy="285" rx="30" ry="18" />

          {/* Tree 4 */}
          <path d="M960 270 Q950 295 955 345 L952 390 Q948 435 952 475 L972 475 Q976 435 972 390 L969 345 Q974 295 960 270 Z" />
          <ellipse cx="960" cy="285" rx="42" ry="25" />
          <ellipse cx="938" cy="305" rx="30" ry="18" />
          <ellipse cx="982" cy="305" rx="30" ry="18" />
          <path d="M925 320 Q923 365 928 410" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M990 320 Q992 365 988 410" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />

          {/* Tree 5 - far right */}
          <path d="M1300 240 Q1290 275 1295 330 L1292 380 Q1287 430 1292 470 L1312 470 Q1316 430 1312 380 L1309 330 Q1314 275 1300 240 Z" />
          <ellipse cx="1300" cy="255" rx="50" ry="30" />
          <ellipse cx="1275" cy="280" rx="35" ry="22" />
          <ellipse cx="1325" cy="280" rx="35" ry="22" />
          <path d="M1260 295 Q1258 340 1263 385" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M1340 295 Q1342 340 1338 385" stroke="#06292d" strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        {/* Ground / water suggestion */}
        <path
          d="M0 490 Q360 480 720 490 T1440 490 L1440 600 L0 600 Z"
          fill="#04222a"
          opacity="0.7"
        />
      </svg>
      )}

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
