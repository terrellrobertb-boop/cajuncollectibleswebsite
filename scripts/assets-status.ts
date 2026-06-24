#!/usr/bin/env tsx
/**
 * Prints the status of every brand asset and indicates whether the artwork
 * is present in `public/` or still using the placeholder fallback.
 *
 * Run with: `npm run assets:status`
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { assets } from "../content/assets";

const here = dirname(fileURLToPath(import.meta.url));
const publicRoot = join(here, "..", "public");

const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
};

const rows = Object.entries(assets).map(([key, asset]) => {
  const filePath = join(publicRoot, asset.src.replace(/^\//, ""));
  return { key, asset, exists: existsSync(filePath) };
});

const final = rows.filter((r) => r.exists);
const pending = rows.filter((r) => !r.exists);

const maxKey = Math.max(...rows.map((r) => r.key.length));

console.log("");
console.log(`${COLORS.bold}Brand asset status${COLORS.reset}`);
console.log(`${COLORS.dim}Run \`npm run assets:status\` any time to refresh.${COLORS.reset}`);
console.log("");

for (const { key, asset, exists } of rows) {
  const mark = exists
    ? `${COLORS.green}✓${COLORS.reset}`
    : `${COLORS.yellow}○${COLORS.reset}`;
  const pad = " ".repeat(maxKey - key.length + 2);
  console.log(
    `  ${mark}  ${COLORS.bold}${key}${COLORS.reset}${pad}${COLORS.dim}${asset.src}${COLORS.reset}`,
  );
  if (!exists) {
    console.log(`      ${COLORS.dim}${asset.artNotes}${COLORS.reset}`);
  }
}

console.log("");
console.log(
  `  ${COLORS.green}${final.length} delivered${COLORS.reset}  ·  ${COLORS.yellow}${pending.length} pending${COLORS.reset}`,
);
console.log("");

if (pending.length > 0) {
  console.log(
    `${COLORS.dim}Drop each pending file at its path above (under \`public/\`) and rerun.${COLORS.reset}`,
  );
  console.log("");
}
