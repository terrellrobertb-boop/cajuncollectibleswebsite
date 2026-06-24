// Trim fully-transparent padding from a brand PNG so it can be sized
// visually next to other artwork (e.g., the wordmark sitting next to the
// gator head in the header).
//
// Usage:
//   node scripts/trim-asset.mjs public/brand/logo-wordmark.png
//
// Writes the trimmed result to a sibling file with `.trimmed.png` appended
// (e.g. logo-wordmark.trimmed.png). The original file is NEVER modified.
//
// This script is idempotent and safe to re-run after re-uploading a
// source file.

import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/trim-asset.mjs <path-to-png>");
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`File not found: ${input}`);
  process.exit(1);
}

const ext = path.extname(input);
const base = input.slice(0, -ext.length);
const output = `${base}.trimmed${ext}`;

const src = sharp(input);
const meta = await src.metadata();
if (!meta.hasAlpha) {
  console.error(
    `File has no alpha channel - nothing to trim (channels=${meta.channels}).`,
  );
  process.exit(1);
}

// `threshold: 1` treats anything with alpha >= 1 as content; we strip
// only fully-transparent rows / columns. `background` matches a perfectly
// transparent pixel so sharp knows what to consider "empty".
const trimmed = await src
  .trim({
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    threshold: 1,
  })
  .png()
  .toBuffer({ resolveWithObject: true });

await sharp(trimmed.data).toFile(output);

console.log(`Trimmed ${meta.width}x${meta.height} -> ${trimmed.info.width}x${trimmed.info.height}`);
console.log(`Wrote ${output}`);
