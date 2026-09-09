export type SupabaseImageTransform = {
  width?: number;
  height?: number;
  resize?: "cover" | "contain" | "fill";
  quality?: number;
  format?: "origin" | "webp";
};

/** Loop grid tiles — 16∶10 at ~2× mobile grid density. */
export const LOOP_THUMB_IMAGE_TRANSFORM: SupabaseImageTransform = {
  width: 480,
  height: 300,
  resize: "cover",
  quality: 80,
  format: "webp",
};

const SUPABASE_OBJECT_PUBLIC =
  /^(https?:\/\/[^/]+)\/storage\/v1\/object\/public\/([^?#]+)/i;
const SUPABASE_RENDER_PUBLIC =
  /^(https?:\/\/[^/]+)\/storage\/v1\/render\/image\/public\/([^?#]+)/i;

function appendTransformParams(url: URL, transform: SupabaseImageTransform): void {
  if (transform.width != null) url.searchParams.set("width", String(transform.width));
  if (transform.height != null) url.searchParams.set("height", String(transform.height));
  if (transform.resize) url.searchParams.set("resize", transform.resize);
  if (transform.quality != null) url.searchParams.set("quality", String(transform.quality));
  if (transform.format) url.searchParams.set("format", transform.format);
}

/** Serve a resized Supabase Storage image via the render endpoint. */
export function withSupabaseImageTransform(
  url: string | null | undefined,
  transform: SupabaseImageTransform = LOOP_THUMB_IMAGE_TRANSFORM,
): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();

  const renderMatch = trimmed.match(SUPABASE_RENDER_PUBLIC);
  if (renderMatch) {
    const parsed = new URL(trimmed);
    appendTransformParams(parsed, transform);
    return parsed.toString();
  }

  const objectMatch = trimmed.match(SUPABASE_OBJECT_PUBLIC);
  if (!objectMatch) return trimmed;

  const [, origin, objectPath] = objectMatch;
  const parsed = new URL(`${origin}/storage/v1/render/image/public/${objectPath}`);
  appendTransformParams(parsed, transform);

  const queryStart = trimmed.indexOf("?");
  if (queryStart >= 0) {
    const originalParams = new URLSearchParams(trimmed.slice(queryStart + 1).split("#")[0]);
    for (const [key, value] of originalParams) {
      if (!parsed.searchParams.has(key)) parsed.searchParams.set(key, value);
    }
  }

  return parsed.toString();
}

/** Raw `/object/public/` URL — fallback when the render endpoint fails. */
export function rawSupabaseObjectUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();

  const renderMatch = trimmed.match(SUPABASE_RENDER_PUBLIC);
  if (renderMatch) {
    const [, origin, objectPath] = renderMatch;
    return `${origin}/storage/v1/object/public/${objectPath}`;
  }
  const objectMatch = trimmed.match(SUPABASE_OBJECT_PUBLIC);
  if (objectMatch) {
    const [, origin, objectPath] = objectMatch;
    return `${origin}/storage/v1/object/public/${objectPath}`;
  }
  return null;
}

export function supabasePublicObjectUrl(
  supabaseUrl: string,
  bucket: string,
  objectPath: string,
  transform?: SupabaseImageTransform,
): string {
  const base = supabaseUrl.replace(/\/$/, "");
  const objectUrl = `${base}/storage/v1/object/public/${bucket}/${objectPath.replace(/^\/+/, "")}`;
  if (!transform) return objectUrl;
  return withSupabaseImageTransform(objectUrl, transform) ?? objectUrl;
}
