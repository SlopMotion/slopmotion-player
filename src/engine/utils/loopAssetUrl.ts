import { HEXA_BLOB_CDN_ORIGIN } from "../data/blobCdnOrigin";
import { normalizeBlobAssetUrl, normalizeBlobOrigin } from "../lib/blobAssetOrigin";

function readBlobAssetsBase(): string {
  const forceRemote = import.meta.env.VITE_LOOP_ASSETS_FORCE_REMOTE === "1";
  if (import.meta.env.DEV && !forceRemote) {
    return "";
  }

  const fromEnv = import.meta.env.VITE_LOOP_ASSETS_BASE_URL ?? "";
  const normalizedEnv = fromEnv ? normalizeBlobOrigin(fromEnv) : "";
  if (normalizedEnv) return normalizedEnv;
  if (import.meta.env.PROD) {
    return normalizeBlobOrigin(HEXA_BLOB_CDN_ORIGIN) || HEXA_BLOB_CDN_ORIGIN;
  }
  return "";
}

let cachedBlobAssetsBase: string | undefined;

function blobAssetsBase(): string {
  if (cachedBlobAssetsBase === undefined) {
    cachedBlobAssetsBase = readBlobAssetsBase();
  }
  return cachedBlobAssetsBase;
}
/** Site-relative paths uploaded to Vercel Blob (loops + shipped studio bundle). */
const BLOB_ASSET_PREFIXES = [
  "/loops/",
  "/audio/Recordings/Montreuil26_master/studio/",
  "/audio/Recordings/Montreuil26_master/tracks_bandcamp/stems/",
] as const;

export function blobAssetsUseRemoteBase(): boolean {
  return blobAssetsBase().length > 0;
}

export function loopAssetsUseRemoteBase(): boolean {
  return blobAssetsUseRemoteBase();
}

function isBlobBackedPath(path: string): boolean {
  return BLOB_ASSET_PREFIXES.some((prefix) => path.startsWith(prefix));
}

/** Map canonical public paths to Vercel Blob (or pass through locally). */
export function resolvePublicAssetUrl(path: string): string {
  if (!path || typeof path !== "string") return path;
  if (path.startsWith("data:")) return path;
  if (/^https?:\/\//i.test(path)) {
    return normalizeBlobAssetUrl(path);
  }
  const base = blobAssetsBase();
  if (!path.startsWith("/") || !isBlobBackedPath(path)) return path;
  if (!base) return path;
  return `${base}${path}`;
}

/** @deprecated Prefer resolvePublicAssetUrl — kept for loop call sites. */
export function resolveLoopAssetUrl(path: string): string {
  return resolvePublicAssetUrl(path);
}
