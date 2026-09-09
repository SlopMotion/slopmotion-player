import type { HydraShaderChain, HydraShaderFn } from "./hydraShaderTypes";
import {
  clampGroupCompositeMode,
  clampLayerBlendMode,
  GROUP_COMPOSITE_MASK_MODE,
} from "../utils/layerBlendMode";

export const MAX_LAYER_MASK_REACH = 6;

type HydraChainSnapshot = HydraShaderChain & {
  transforms?: unknown[];
  defaultOutput?: unknown;
  synth?: unknown;
  type?: string;
  defaultUniforms?: unknown;
};

export function hydraChainTransformCount(chain: HydraShaderChain): number {
  return (chain as HydraChainSnapshot).transforms?.length ?? 0;
}

/** Hydra chains mutate in place — clone transform stacks for snapshots. */
export function cloneHydraChain(chain: HydraShaderChain): HydraShaderChain {
  const source = chain as HydraChainSnapshot;
  const cloned = Object.create(Object.getPrototypeOf(chain)) as HydraChainSnapshot;
  cloned.transforms = source.transforms?.slice() ?? [];
  cloned.defaultOutput = source.defaultOutput;
  cloned.synth = source.synth;
  cloned.type = source.type;
  cloned.defaultUniforms = source.defaultUniforms;
  return cloned;
}

export function snapshotChainStack(chain: HydraShaderChain, chainStack: HydraShaderChain[]): void {
  const last = chainStack[chainStack.length - 1];
  if (!last || hydraChainTransformCount(chain) > hydraChainTransformCount(last)) {
    chainStack.push(cloneHydraChain(chain));
  }
}

export function resolveRevealChain(
  chainStack: HydraShaderChain[],
  reach: number,
): HydraShaderChain {
  if (reach <= 0) return chainStack[0]!;
  return chainStack[Math.max(0, chainStack.length - reach)]!;
}

export interface CompositeLayerModeOptions {
  chain: HydraShaderChain;
  layerSrc: HydraShaderChain;
  mode: number;
  getAmount: () => number;
  solid: HydraShaderFn;
  /** Round and clamp mode when true — layer FX use 0..5, group onto uses clampGroupCompositeMode externally. */
  clampMode?: boolean;
  getLayerLuma?: () => number;
  layerWithoutLuma?: boolean;
  layerSourceStack?: HydraShaderChain[];
  chainStack?: HydraShaderChain[];
  getMaskReveal?: () => number;
  getMaskReach?: () => number;
  getMaskThreshold?: () => number;
  getMaskSoftness?: () => number;
  getMaskInvert?: () => number;
}

function resolveCompositeMode(mode: number, clampMode: boolean): number {
  if (!clampMode) return Math.round(mode);
  return clampLayerBlendMode(mode);
}

/** Composite a generator onto the chain and publish it to the layer source stack. */
export function applyLayerComposite(opts: CompositeLayerModeOptions): HydraShaderChain {
  if (opts.layerSourceStack) {
    opts.layerSourceStack.push(opts.layerSrc);
  }
  return compositeLayerMode(opts);
}

export function compositeLayerMode(opts: CompositeLayerModeOptions): HydraShaderChain {
  const {
    chain,
    layerSrc,
    mode: rawMode,
    getAmount,
    solid,
    clampMode = true,
    layerWithoutLuma = false,
    chainStack,
    getMaskReveal,
    getMaskReach,
    getMaskThreshold,
    getMaskSoftness,
    getMaskInvert,
  } = opts;

  const mode = resolveCompositeMode(rawMode, clampMode);

  if (mode === GROUP_COMPOSITE_MASK_MODE && chainStack) {
    const reach = Math.max(
      0,
      Math.min(MAX_LAYER_MASK_REACH, Math.round(getMaskReach?.() ?? 0)),
    );
    const revealBelow = (getMaskReveal?.() ?? 0) < 1;
    const getInvert = getMaskInvert ?? (() => 0);
    const getThreshold = getMaskThreshold ?? (() => 0.35);
    const getSoftness = getMaskSoftness ?? (() => 0.12);

    if (revealBelow) {
      const revealSource = resolveRevealChain(chainStack, reach);
      const revealChain = cloneHydraChain(revealSource);
      return chain.layer(
        revealChain.layerMaskAlpha(
          layerSrc,
          getAmount,
          getInvert,
          getThreshold,
          getSoftness,
        ),
      );
    }
    return chain.layerMaskCut(layerSrc, getAmount, getInvert, getThreshold, getSoftness);
  }

  if (mode === 0) return chain.blend(layerSrc, getAmount);
  if (mode === 1) return chain.diff(layerSrc.mult(solid(getAmount, getAmount, getAmount)));
  if (mode === 2) return chain.add(layerSrc, getAmount);
  if (mode === 3) return chain.mult(layerSrc, getAmount);
  if (mode === 4) {
    if (layerWithoutLuma) return chain.layer(layerSrc);
    const getLuma = opts.getLayerLuma ?? getAmount;
    return chain.layer(layerSrc.luma(getLuma));
  }
  if (mode === 5) return chain.layerOverlay(layerSrc, getAmount);

  return chain;
}

export function compositeGroupOntoMode(
  opts: CompositeLayerModeOptions,
): HydraShaderChain {
  return compositeLayerMode({
    ...opts,
    mode: clampGroupCompositeMode(opts.mode),
    clampMode: false,
  });
}
