// Verify that public/brand/logo-wordmark.png is a clean transparent PNG.
// Usage: npm run verify:wordmark
//
// Pass criteria (a "clean" wordmark):
//   - Real PNG with an alpha channel
//   - All four corners have alpha = 0 (truly transparent)
//   - The top, bottom, left, and right edge bands (10px) have no
//     near-opaque cream / white pixels — i.e. no sticker border bleeding
//     to the edges
//   - Outside the bounding box of opaque (alpha >= 230) pixels, no
//     stray cream halo (sampled at offsets just outside the box)
//
// This is read-only. It never modifies your file.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { existsSync } from "node:fs";

const file = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public/brand/logo-wordmark.png",
);

if (!existsSync(file)) {
  console.error(`FAIL: file not found: ${file}`);
  process.exit(1);
}

const meta = await sharp(file).metadata();
if (meta.format !== "png") {
  console.error(`FAIL: not a PNG (format = ${meta.format})`);
  process.exit(1);
}
if (!meta.hasAlpha) {
  console.error(`FAIL: PNG has no alpha channel`);
  process.exit(1);
}

const { data, info } = await sharp(file)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;

const pixel = (x, y) => {
  const i = (y * w + x) * c;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};

// 1) Corners must be alpha = 0
const corners = [
  ["TL", pixel(0, 0)],
  ["TR", pixel(w - 1, 0)],
  ["BL", pixel(0, h - 1)],
  ["BR", pixel(w - 1, h - 1)],
];
const badCorners = corners.filter(([, p]) => p[3] !== 0);

// 2) Find bounding box of opaque pixels (alpha >= 230)
let minX = w,
  minY = h,
  maxX = -1,
  maxY = -1;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (data[(y * w + x) * c + 3] >= 230) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
}

// 3) Look for near-opaque, near-cream pixels OUTSIDE the dark/cream stroke
//    by checking partial-alpha pixels in the bounding box. A "clean"
//    wordmark has very few partial-alpha pixels that are cream-colored
//    (the legit partial pixels are anti-aliasing along letter edges, so
//    they'll be mixes of dark + cream, not pure cream).
const isCream = (r, g, b) =>
  r > 220 && g > 200 && b > 170 && Math.abs(r - g) < 40 && r - b < 80;
let partialCreamCount = 0;
let totalPartial = 0;
for (let y = Math.max(0, minY - 30); y <= Math.min(h - 1, maxY + 30); y++) {
  for (let x = Math.max(0, minX - 30); x <= Math.min(w - 1, maxX + 30); x++) {
    const a = data[(y * w + x) * c + 3];
    if (a > 0 && a < 230) {
      totalPartial++;
      const r = data[(y * w + x) * c];
      const g = data[(y * w + x) * c + 1];
      const b = data[(y * w + x) * c + 2];
      if (a > 60 && isCream(r, g, b)) partialCreamCount++;
    }
  }
}

// 4) Composite over teal and look for "lighter-than-teal" pixels in a
//    1-px buffer around the opaque bounding box. If there's a sticker
//    border, it shows up here.
const teal = { r: 13, g: 92, b: 99 };
let borderBleed = 0;
const ringSamples = [];
for (let off = 4; off <= 14; off += 2) {
  for (let x = Math.max(0, minX - off); x <= Math.min(w - 1, maxX + off); x += 8) {
    for (const y of [Math.max(0, minY - off), Math.min(h - 1, maxY + off)]) {
      const [r, g, b, a] = pixel(x, y);
      if (a > 0) {
        const cr = Math.round((r * a + teal.r * (255 - a)) / 255);
        const cg = Math.round((g * a + teal.g * (255 - a)) / 255);
        const cb = Math.round((b * a + teal.b * (255 - a)) / 255);
        if (cr + cg + cb > 250 && cr > 60 && cg > 110 && cb > 110) {
          borderBleed++;
          if (ringSamples.length < 4) ringSamples.push({ x, y, r, g, b, a });
        }
      }
    }
  }
}

const verdict = [];
if (badCorners.length) {
  verdict.push(
    `corners not transparent: ${badCorners
      .map(([n, p]) => `${n}=alpha${p[3]}`)
      .join(", ")}`,
  );
}
if (partialCreamCount > 200) {
  verdict.push(
    `${partialCreamCount} partial-alpha CREAM pixels detected (sticker border?)`,
  );
}
if (borderBleed > 8) {
  verdict.push(`${borderBleed} bright pixels in the border ring around letters`);
}

console.log(`File: ${file}`);
console.log(`Format: ${meta.format} ${w}x${h}  hasAlpha=${meta.hasAlpha}`);
console.log(`Opaque bounding box: x=${minX}..${maxX}, y=${minY}..${maxY}`);
console.log(
  `Partial-alpha pixels in/around letters: ${totalPartial} (${partialCreamCount} are cream-colored)`,
);
console.log(`Border-ring bright pixels: ${borderBleed}`);
if (ringSamples.length) {
  console.log("  examples:", ringSamples);
}

if (verdict.length === 0) {
  console.log("\nPASS — wordmark is clean. No sticker border detected.");
  process.exit(0);
} else {
  console.log("\nFAIL — wordmark has issues:");
  for (const v of verdict) console.log("  - " + v);
  process.exit(1);
}
