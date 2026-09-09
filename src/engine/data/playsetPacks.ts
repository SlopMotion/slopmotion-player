import playsetMeta from "./playsetPacks.json";

export type PlaysetPackMeta = {
  folder: string;
  slug: string;
  name: string;
  blurb: string;
  coverClipPath?: string;
  featured?: boolean;
  sortOrder?: number;
  /** When false, excluded from marketplace seed (collab-only playsets). */
  marketplace?: boolean;
};

export const PLAYSET_PACKS = (playsetMeta as PlaysetPackMeta[]).filter(
  (p) => p.marketplace !== false,
);

/** All playsets including collab-only folders (for metadata lookup). */
export const ALL_PLAYSET_PACKS = playsetMeta as PlaysetPackMeta[];

export const STARTER_PLAYSET_SLUG = "white-hole";

const packBySlug = new Map(ALL_PLAYSET_PACKS.map((p) => [p.slug, p]));

export function playsetFolderForPackSlug(slug: string): string | null {
  return packBySlug.get(slug)?.folder ?? slug;
}

export function playsetPackMeta(slug: string): PlaysetPackMeta | null {
  return packBySlug.get(slug) ?? null;
}
