import { resolveLoopAssetUrl } from "./loopAssetUrl";
import {
  LOOP_THUMB_IMAGE_TRANSFORM,
  rawSupabaseObjectUrl,
  supabasePublicObjectUrl,
  withSupabaseImageTransform,
} from "./supabaseImageTransform";

export const LOOP_THUMBS_BUCKET = "loop-thumbs";

function supabaseProjectUrl(): string | null {
  const raw = import.meta.env.VITE_SUPABASE_URL?.trim();
  return raw ? raw.replace(/\/$/, "") : null;
}

/** Supabase `loop-thumbs` object key — strips leading `/loops/`. */
function loopThumbObjectKey(thumbPath: string): string | null {
  const normalized = thumbPath.replace(/^\/+/, "");
  if (!normalized.startsWith("loops/")) return null;
  return normalized.slice("loops/".length);
}

function supabaseLoopThumbUrl(thumbPath: string): string | null {
  const supabaseUrl = supabaseProjectUrl();
  if (!supabaseUrl) return null;
  const objectKey = loopThumbObjectKey(thumbPath);
  if (!objectKey || !/\.(jpe?g|png|webp)$/i.test(objectKey)) return null;
  return supabasePublicObjectUrl(
    supabaseUrl,
    LOOP_THUMBS_BUCKET,
    objectKey,
    LOOP_THUMB_IMAGE_TRANSFORM,
  );
}

function supabaseLoopThumbRawUrl(thumbPath: string): string | null {
  const supabaseUrl = supabaseProjectUrl();
  if (!supabaseUrl) return null;
  const objectKey = loopThumbObjectKey(thumbPath);
  if (!objectKey || !/\.(jpe?g|png|webp)$/i.test(objectKey)) return null;
  return supabasePublicObjectUrl(supabaseUrl, LOOP_THUMBS_BUCKET, objectKey);
}

/** Display URL for loop preview frames — Supabase transform when configured; blob/local fallback. */
export function resolveLoopThumbDisplayUrl(frameUrlOrPath: string): string {
  if (!frameUrlOrPath) return frameUrlOrPath;

  if (/^https?:\/\//i.test(frameUrlOrPath)) {
    return withSupabaseImageTransform(frameUrlOrPath, LOOP_THUMB_IMAGE_TRANSFORM) ?? frameUrlOrPath;
  }

  const fromSupabase = supabaseLoopThumbUrl(frameUrlOrPath);
  if (fromSupabase) return fromSupabase;

  return resolveLoopAssetUrl(frameUrlOrPath);
}

/** Ordered fallbacks when the primary thumb fails to load. */
export function resolveLoopThumbDisplayUrlCandidates(frameUrlOrPath: string): string[] {
  const urls: string[] = [];
  const push = (url: string | null | undefined) => {
    if (url && !urls.includes(url)) urls.push(url);
  };

  if (/^https?:\/\//i.test(frameUrlOrPath)) {
    push(withSupabaseImageTransform(frameUrlOrPath, LOOP_THUMB_IMAGE_TRANSFORM));
    push(rawSupabaseObjectUrl(frameUrlOrPath));
    push(frameUrlOrPath);
    return urls;
  }

  push(supabaseLoopThumbUrl(frameUrlOrPath));
  push(supabaseLoopThumbRawUrl(frameUrlOrPath));
  push(resolveLoopAssetUrl(frameUrlOrPath));
  return urls;
}
