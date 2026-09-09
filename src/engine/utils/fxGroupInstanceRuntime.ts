import type { LayerInstance } from "../types/fxChainTree";
import type { FXConfig } from "../types/settings";
import { parseLayerPanelKey } from "./fxChainTree";

/** Live group-layer config for a `layer:groupId:layerId` effect key. */
export function liveGroupInstanceConfig(
  effectKey: string,
  templateKey: string,
  layerInstances: Record<string, LayerInstance> | undefined,
): FXConfig | undefined {
  const parsed = parseLayerPanelKey(effectKey);
  if (!parsed) return undefined;
  const inst = layerInstances?.[parsed.layerId];
  if (!inst || String(inst.templateKey) !== templateKey) return undefined;
  return inst.config;
}
