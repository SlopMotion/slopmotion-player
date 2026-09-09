import type { HydraShaderChain } from "../hydra/hydraShaderTypes";

/** FX keys that publish a generator into the layer source stack each frame. */
export const LAYER_SOURCE_PUBLISHER_KEYS = [
  "electricNoise",
  "fillLayer",
  "fractalFold",
  "mirrorStripes",
  "noise",
  "patternLayer",
  "plasma",
  "plexus",
  "shapeLayer",
  "superformula",
  "topoContour",
  "universeWithin",
] as const;

export type LayerSourcePublisherKey = (typeof LAYER_SOURCE_PUBLISHER_KEYS)[number];

export function isLayerSourcePublisher(key: string): key is LayerSourcePublisherKey {
  return (LAYER_SOURCE_PUBLISHER_KEYS as readonly string[]).includes(key);
}

export function publishLayerSource(
  layerSourceStack: HydraShaderChain[],
  layerSrc: HydraShaderChain,
): void {
  layerSourceStack.push(layerSrc);
}
