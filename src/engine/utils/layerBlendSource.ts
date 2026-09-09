import type { FolderConfig } from "../types/settings";
import { clipPathsEquivalent } from "./videoUtils";

export const LAYER_BLEND_SOURCE_INDEX = 0;
export const LAYER_BLEND_SOURCE_STATIC = 1;

export function layerBlendSourceMode(
  params: FolderConfig["fx"]["layerBlend"]["params"] | undefined,
): number {
  const raw = params?.sourceMode;
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.round(raw) === LAYER_BLEND_SOURCE_STATIC
      ? LAYER_BLEND_SOURCE_STATIC
      : LAYER_BLEND_SOURCE_INDEX;
  }
  return LAYER_BLEND_SOURCE_INDEX;
}

export function isLayerBlendStaticSource(
  params: FolderConfig["fx"]["layerBlend"]["params"] | undefined,
): boolean {
  return layerBlendSourceMode(params) === LAYER_BLEND_SOURCE_STATIC;
}

export function layerBlendStaticVideoPath(
  params: FolderConfig["fx"]["layerBlend"]["params"] | undefined,
): string | undefined {
  const raw = params?.videoPath;
  return typeof raw === "string" && raw.trim() ? raw.trim() : undefined;
}

export function layerBlendIndexFromParams(
  params: FolderConfig["fx"]["layerBlend"]["params"] | undefined,
): number {
  const raw = params?.videoIndex ?? 1;
  return typeof raw === "number" ? raw : Math.max(1, Number(raw) || 1);
}

export function resolveLayerBlendClipPath(
  filteredLibrary: { path: string }[],
  activeVideo: string | undefined,
  params: FolderConfig["fx"]["layerBlend"]["params"] | undefined,
): string | undefined {
  if (filteredLibrary.length === 0) return undefined;

  const pickAlt = (path: string | undefined) => {
    if (!path || !clipPathsEquivalent(path, activeVideo)) return path;
    const idx = filteredLibrary.findIndex((v) => clipPathsEquivalent(v.path, path));
    const alt = filteredLibrary[(idx + 1) % filteredLibrary.length]?.path;
    return alt && !clipPathsEquivalent(alt, activeVideo) ? alt : path;
  };

  if (isLayerBlendStaticSource(params)) {
    const staticPath = layerBlendStaticVideoPath(params);
    if (staticPath) {
      const match = filteredLibrary.find((v) => clipPathsEquivalent(v.path, staticPath));
      return pickAlt(match?.path ?? staticPath);
    }
  }

  const videoIndex = layerBlendIndexFromParams(params);
  const nextVideoIndex = Math.max(0, videoIndex - 1) % filteredLibrary.length;
  return pickAlt(filteredLibrary[nextVideoIndex]?.path);
}
