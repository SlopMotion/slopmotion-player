/** Normalize Vercel Blob store ids and hosts to the public CDN origin. */
export function normalizeBlobOrigin(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  if (!trimmed) return "";

  const storeIdOnly = trimmed.match(/^store_([a-z0-9]+)$/i);
  if (storeIdOnly) {
    return `https://${storeIdOnly[1]!.toLowerCase()}.public.blob.vercel-storage.com`;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const hostMatch = url.hostname.match(/^store_([a-z0-9]+)\.public\.blob\.vercel-storage\.com$/i);
      if (hostMatch) {
        url.hostname = `${hostMatch[1]!.toLowerCase()}.public.blob.vercel-storage.com`;
        url.protocol = "https:";
        return url.origin;
      }
      if (/store_/i.test(url.hostname)) return "";
      return url.origin;
    } catch {
      return "";
    }
  }

  if (/store_/i.test(trimmed)) return "";
  return trimmed;
}

export function normalizeBlobAssetUrl(url: string): string {
  if (!/^https?:\/\//i.test(url)) return url;
  try {
    const parsed = new URL(url);
    const hostMatch = parsed.hostname.match(/^store_([a-z0-9]+)\.public\.blob\.vercel-storage\.com$/i);
    if (!hostMatch) return url;
    parsed.hostname = `${hostMatch[1]!.toLowerCase()}.public.blob.vercel-storage.com`;
    parsed.protocol = "https:";
    return parsed.toString();
  } catch {
    return url;
  }
}
