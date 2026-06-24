/**
 * Server-only helpers for the brand asset registry.
 *
 * `assetExists` checks whether a file is present under `public/`, which we
 * use to swap final artwork in for the placeholder fallback automatically.
 * Keep this file out of client components — it imports `node:fs`.
 */
import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { ASSET_FALLBACK, assets, type AssetKey, type BrandAsset } from "@/content/assets";

const publicRoot = join(process.cwd(), "public");

/**
 * In production builds we cache file existence for performance, but during
 * development we always hit the filesystem so newly-dropped artwork shows
 * up on the next request without a server restart.
 */
const isDev = process.env.NODE_ENV !== "production";
const existsCache = new Map<string, boolean>();

export function assetExists(publicPath: string): boolean {
  if (!isDev && existsCache.has(publicPath)) {
    return existsCache.get(publicPath)!;
  }
  const filePath = join(publicRoot, publicPath.replace(/^\//, ""));
  const exists = existsSync(filePath);
  if (!isDev) existsCache.set(publicPath, exists);
  return exists;
}

export type ResolvedAsset = BrandAsset & {
  /** Path that should actually be rendered (real `src` or the fallback). */
  resolvedSrc: string;
  /** Whether the final artwork is delivered (true) or we're showing a stand-in (false). */
  isFinal: boolean;
};

export function resolveAsset(key: AssetKey): ResolvedAsset;
export function resolveAsset(asset: BrandAsset): ResolvedAsset;
export function resolveAsset(input: AssetKey | BrandAsset): ResolvedAsset {
  const asset = typeof input === "string" ? assets[input] : input;
  const isFinal = assetExists(asset.src);
  return {
    ...asset,
    isFinal,
    resolvedSrc: isFinal ? asset.src : ASSET_FALLBACK,
  };
}
