import { snapPlexusLayers } from "../shaders/plexusSrcGlsl";
import type { RenderQualityTier } from "./renderQuality";

const PLEXUS_POINTS_FLOOR = 1.05;

export function plexusLayersForQuality(
  rawLayers: number,
  tier: RenderQualityTier | undefined,
): number {
  const layers = snapPlexusLayers(rawLayers);
  if (tier === "minimal") return Math.min(layers, 1);
  if (tier === "reduced") return Math.min(layers, 2);
  return layers;
}

export function plexusPointsForQuality(
  rawPoints: number,
  tier: RenderQualityTier | undefined,
): number {
  const points = Math.max(PLEXUS_POINTS_FLOOR, rawPoints);
  if (tier === "minimal") return Math.max(PLEXUS_POINTS_FLOOR, points * 0.68);
  if (tier === "reduced") return Math.max(PLEXUS_POINTS_FLOOR, points * 0.84);
  return points;
}
