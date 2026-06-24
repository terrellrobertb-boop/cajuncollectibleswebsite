// Generate site favicons from the gator head asset.
//
// Produces:
//   - app/icon.png        (192x192) - browser tab favicon (auto-detected
//                                     by Next.js; browsers downscale to 16
//                                     or 32 as needed, but 192 keeps it
//                                     crisp on retina + future PWA use)
//   - app/apple-icon.png  (180x180) - iOS home screen icon
//
// Each is the Gumbeaux gator head centered on a bayou-teal background
// with subtly rounded corners.
//
// Re-run any time the gator head asset changes:
//   npm run favicon
//
// Reads from: public/brand/logo-head-icon.png

import sharp from "sharp";
import { existsSync } from "node:fs";

const SOURCE = "public/brand/logo-head-icon.png";
const TEAL = { r: 13, g: 92, b: 99 };

if (!existsSync(SOURCE)) {
  console.error(`Source file not found: ${SOURCE}`);
  process.exit(1);
}

/**
 * Generate one favicon at the given output size. The gator head is
 * scaled to fill `gatorScale` of the canvas (with a bit of breathing
 * room) and centered. Optionally rounds the canvas corners.
 */
async function makeFavicon({ size, out, gatorScale = 0.82, cornerRadius }) {
  const gatorPx = Math.round(size * gatorScale);

  // Resize the gator head, preserving its transparent background
  const gator = await sharp(SOURCE)
    .resize({
      width: gatorPx,
      height: gatorPx,
      fit: "inside",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // Solid teal canvas at the requested size
  let canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...TEAL, alpha: 1 },
    },
  })
    .composite([{ input: gator, gravity: "center" }])
    .png();

  // Apply rounded corners via an SVG alpha mask
  if (cornerRadius) {
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#fff"/></svg>`,
    );
    const baseBuf = await canvas.toBuffer();
    canvas = sharp(baseBuf).composite([
      { input: mask, blend: "dest-in" },
    ]);
  }

  await canvas.png().toFile(out);
  console.log(`Wrote ${out} (${size}x${size})`);
}

await makeFavicon({
  size: 192,
  out: "app/icon.png",
  gatorScale: 0.82,
  cornerRadius: 36,
});

await makeFavicon({
  size: 180,
  out: "app/apple-icon.png",
  gatorScale: 0.82,
  cornerRadius: 36,
});

console.log("done");
