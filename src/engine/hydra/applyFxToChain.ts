import type { FXConfig } from "../types/settings";
import type { HydraShaderChain } from "./hydraShaderTypes";

/**
 * Apply a single FX key onto a Hydra chain using an explicit config resolver.
 * Implemented inside `applyHydraScene` (shares the large per-key branches); this
 * module owns the public contract used by the main loop and by `renderFxGroup`.
 */
export type ApplyFxToChainFn = (
  chain: HydraShaderChain,
  key: string,
  getFxRow: () => FXConfig | undefined,
  modulationEffectKey?: string,
) => HydraShaderChain;

export type ApplyFxStacks = {
  chainStack: HydraShaderChain[];
  layerSourceStack: HydraShaderChain[];
};

export function fxParamFromRow(
  row: FXConfig | undefined,
  paramKey: string,
  defaultVal: number,
): number {
  const raw = row?.params?.[paramKey];
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  return defaultVal;
}
