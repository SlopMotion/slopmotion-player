export type SelectaClipRow = { path?: string };

type SelectaCatalog = {
  clips?: SelectaClipRow[];
};

let catalog: SelectaCatalog | null = null;

export function initSelectaClipCatalog(data: unknown): void {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    catalog = { clips: [] };
    return;
  }
  catalog = data as SelectaCatalog;
}

export function getSelectaClipRows(): SelectaClipRow[] {
  return catalog?.clips ?? [];
}

export function getSelectaClipPaths(): string[] {
  return getSelectaClipRows()
    .map((clip) => clip.path)
    .filter((path): path is string => typeof path === "string" && path.startsWith("/loops/"));
}
