import type { FXConfig } from "../types/settings";
import type { HydraShaderChain, HydraShaderFn } from "./hydraShaderTypes";
import type { LayerInstance } from "../types/fxChainTree";
import type { FxGroup } from "../types/fxChainTree";
import {
  FX_GROUP_BUFFER_START_CHAIN,
  FX_GROUP_BUFFER_START_CLIP,
  FX_GROUP_BUFFER_START_GROUP,
  asFxGroupBufferStart,
  isLayerInstanceTemplateKey,
} from "../types/fxChainTree";
import { layerPanelKey } from "../utils/fxChainTree";
import {
  cloneHydraChain,
  compositeGroupOntoMode,
  compositeLayerMode,
  snapshotChainStack,
  type CompositeLayerModeOptions,
} from "./compositeLayerMode";
import { clampLayerBlendMode } from "../utils/layerBlendMode";
import { publishLayerSource } from "../utils/layerSourceStack";

export interface RenderFxGroupResult {
  chain: HydraShaderChain;
  /** True when this group owns the canvas (buffer-only solo). */
  solo: boolean;
}

export type ApplyGroupOperatorFn = (
  chain: HydraShaderChain,
  key: string,
  getFxRow: () => FXConfig | undefined,
  stacks: {
    chainStack: HydraShaderChain[];
    layerSourceStack: HydraShaderChain[];
  },
  modulationEffectKey?: string,
) => HydraShaderChain;

export interface RenderFxGroupContext {
  fxGroups: Record<string, FxGroup>;
  layerInstances: Record<string, LayerInstance>;
  solid: HydraShaderFn;
  buildLayer: (inst: LayerInstance, effectKey: string) => HydraShaderChain | null;
  /** Apply a non-source FX onto the group buffer with instance config + scoped stacks. */
  applyOperator: ApplyGroupOperatorFn;
  getGroupAmount: (groupId: string) => () => number;
  maskCompositeOpts: (groupId: string) => Pick<
    CompositeLayerModeOptions,
    | "chainStack"
    | "getMaskReveal"
    | "getMaskReach"
    | "getMaskThreshold"
    | "getMaskSoftness"
    | "getMaskInvert"
  >;
  /** Primary playset clip (active channel), used when bufferStart = Clip. */
  getClipSource: () => HydraShaderChain;
  /**
   * Buffers from groups already built (dependency order, not chain order).
   * Always clone when reading — Hydra chains mutate in place.
   */
  groupBufferCache: Record<string, HydraShaderChain>;
  /** True when this group has a reserved Feedback FBO. */
  hasGroupFeedbackOut?: (groupId: string) => boolean;
  /**
   * Apply Feedback like the main chain: `chain.blend(src(fb).scale().grade(), amt)`.
   * Uses the group's reserved FBO instead of o0.
   */
  applyGroupFeedback?: (
    chain: HydraShaderChain,
    groupId: string,
    feedbackRow: FXConfig,
  ) => HydraShaderChain;
  /** Persist the post-feedback chain onto the group's FBO for the next frame. */
  commitGroupFeedbackLoop?: (groupId: string, chain: HydraShaderChain) => void;
}

function resolvePeerGroupId(groupId: string, group: FxGroup, ctx: RenderFxGroupContext): string | null {
  if (group.bufferStartGroupId && group.bufferStartGroupId !== groupId) {
    return group.bufferStartGroupId;
  }
  return Object.keys(ctx.fxGroups).find((id) => id !== groupId) ?? null;
}

function resolveBufferStartMode(group: FxGroup): number {
  return asFxGroupBufferStart(group.bufferStart ?? 0);
}

function resolveGroupBufferStart(
  groupId: string,
  group: FxGroup,
  ctx: RenderFxGroupContext,
): HydraShaderChain {
  const mode = resolveBufferStartMode(group);
  if (mode === FX_GROUP_BUFFER_START_CLIP) {
    return ctx.getClipSource();
  }
  if (mode === FX_GROUP_BUFFER_START_GROUP) {
    const srcId = resolvePeerGroupId(groupId, group, ctx);
    if (srcId && ctx.groupBufferCache[srcId]) {
      return cloneHydraChain(ctx.groupBufferCache[srcId]!);
    }
    return ctx.solid(0, 0, 0);
  }
  // Black — and Chain (built live in renderFxGroup from the incoming chain).
  return ctx.solid(0, 0, 0);
}

function groupEnabledFeedbackRow(
  group: FxGroup,
  layerInstances: Record<string, LayerInstance>,
): FXConfig | null {
  for (const layerId of group.layerIds) {
    const inst = layerInstances[layerId];
    if (inst?.templateKey === "feedback" && inst.config.enabled) {
      return { ...inst.config, enabled: true };
    }
  }
  return null;
}

function groupHasNonFeedbackLayer(
  group: FxGroup,
  layerInstances: Record<string, LayerInstance>,
): boolean {
  return group.layerIds.some((layerId) => {
    const inst = layerInstances[layerId];
    return !!inst?.config.enabled && inst.templateKey !== "feedback";
  });
}

/** Stack enabled non-feedback children onto a seed buffer. */
function stackGroupChildren(
  seed: HydraShaderChain,
  groupId: string,
  group: FxGroup,
  ctx: RenderFxGroupContext,
): HydraShaderChain {
  const internalMode = clampLayerBlendMode(group.internalMode ?? 2);
  const localChainStack: HydraShaderChain[] = [];
  const localLayerSourceStack: HydraShaderChain[] = [];

  let groupLayer = seed;
  snapshotChainStack(groupLayer, localChainStack);

  for (const layerId of group.layerIds) {
    const inst = ctx.layerInstances[layerId];
    if (!inst?.config.enabled) continue;
    const key = String(inst.templateKey);
    if (key === "feedback") continue;

    if (isLayerInstanceTemplateKey(key)) {
      const effectKey = layerPanelKey(groupId, layerId);
      const gen = ctx.buildLayer(inst, effectKey);
      if (!gen) continue;
      publishLayerSource(localLayerSourceStack, gen);
      groupLayer = compositeLayerMode({
        chain: groupLayer,
        layerSrc: gen,
        mode: internalMode,
        getAmount: () => 1,
        solid: ctx.solid,
        layerWithoutLuma: internalMode === 4,
        layerSourceStack: localLayerSourceStack,
      });
      snapshotChainStack(groupLayer, localChainStack);
      continue;
    }

    groupLayer = ctx.applyOperator(
      groupLayer,
      key,
      () => ({ ...inst.config, enabled: true }),
      {
        chainStack: localChainStack,
        layerSourceStack: localLayerSourceStack,
      },
      layerPanelKey(groupId, layerId),
    );
    snapshotChainStack(groupLayer, localChainStack);
  }

  return groupLayer;
}

/** Build a group's internal buffer and store a clone in `groupBufferCache`. */
export function buildFxGroupBuffer(
  groupId: string,
  ctx: RenderFxGroupContext,
): HydraShaderChain | null {
  const group = ctx.fxGroups[groupId];
  if (!group?.enabled) return null;

  // Chain-start groups are stacked onto the live FX chain at render time.
  if (resolveBufferStartMode(group) === FX_GROUP_BUFFER_START_CHAIN) {
    return null;
  }

  const groupLayer = stackGroupChildren(
    resolveGroupBufferStart(groupId, group, ctx),
    groupId,
    group,
    ctx,
  );

  const cached = cloneHydraChain(groupLayer);
  ctx.groupBufferCache[groupId] = cached;
  return cached;
}

/**
 * Build every enabled group buffer in dependency order so a later group can
 * seed from an earlier one even when that peer appears later in the FX chain.
 */
export function buildAllFxGroupBuffers(
  groupIds: readonly string[],
  ctx: RenderFxGroupContext,
): void {
  const pending = new Set(
    groupIds.filter((id) => ctx.fxGroups[id]?.enabled !== false && ctx.fxGroups[id]),
  );
  let guard = pending.size + 2;
  while (pending.size > 0 && guard-- > 0) {
    let progressed = false;
    for (const id of pending) {
      const group = ctx.fxGroups[id]!;
      const mode = resolveBufferStartMode(group);
      if (mode === FX_GROUP_BUFFER_START_CHAIN) {
        // Deferred until renderFxGroup has the live chain.
        pending.delete(id);
        progressed = true;
        continue;
      }
      if (mode === FX_GROUP_BUFFER_START_GROUP) {
        const peerId = resolvePeerGroupId(id, group, ctx);
        if (peerId && pending.has(peerId) && !ctx.groupBufferCache[peerId]) {
          continue;
        }
      }
      buildFxGroupBuffer(id, ctx);
      pending.delete(id);
      progressed = true;
    }
    if (!progressed) {
      for (const id of pending) {
        buildFxGroupBuffer(id, ctx);
        pending.delete(id);
      }
      break;
    }
  }
}

function applyGroupFeedbackIfNeeded(
  chain: HydraShaderChain,
  groupId: string,
  group: FxGroup,
  ctx: RenderFxGroupContext,
): { chain: HydraShaderChain; applied: boolean } {
  const feedbackRow = groupEnabledFeedbackRow(group, ctx.layerInstances);
  const useFeedback =
    !!feedbackRow &&
    !!ctx.hasGroupFeedbackOut?.(groupId) &&
    !!ctx.applyGroupFeedback &&
    !!ctx.commitGroupFeedbackLoop;
  if (!useFeedback || !feedbackRow) return { chain, applied: false };
  const next = ctx.applyGroupFeedback!(chain, groupId, feedbackRow);
  ctx.commitGroupFeedbackLoop!(groupId, next);
  return { chain: next, applied: true };
}

export function renderFxGroup(
  chain: HydraShaderChain,
  groupId: string,
  ctx: RenderFxGroupContext,
): RenderFxGroupResult {
  const group = ctx.fxGroups[groupId];
  if (!group?.enabled) return { chain, solo: false };

  const bufferMode = resolveBufferStartMode(group);

  // Chain: seed from everything below, stack children in place, skip outer composite.
  if (bufferMode === FX_GROUP_BUFFER_START_CHAIN) {
    let next = stackGroupChildren(cloneHydraChain(chain), groupId, group, ctx);
    ctx.groupBufferCache[groupId] = cloneHydraChain(next);
    const fb = applyGroupFeedbackIfNeeded(next, groupId, group, ctx);
    next = fb.chain;
    if (group.solo) return { chain: next, solo: true };
    return { chain: next, solo: false };
  }

  const feedbackRow = groupEnabledFeedbackRow(group, ctx.layerInstances);
  const useFeedback =
    !!feedbackRow &&
    !!ctx.hasGroupFeedbackOut?.(groupId) &&
    !!ctx.applyGroupFeedback &&
    !!ctx.commitGroupFeedbackLoop;

  const groupContent =
    ctx.groupBufferCache[groupId] ??
    buildFxGroupBuffer(groupId, ctx) ??
    ctx.solid(0, 0, 0);

  const hasLayers = groupHasNonFeedbackLayer(group, ctx.layerInstances);
  let next = chain;

  if (group.solo && !useFeedback) {
    return { chain: cloneHydraChain(groupContent), solo: true };
  }

  // Composite generative / operator layers onto the incoming chain first.
  if (hasLayers) {
    const mode = Number(group.composite.params?.mode ?? 0);
    next = compositeGroupOntoMode({
      chain: next,
      layerSrc: cloneHydraChain(groupContent),
      mode,
      getAmount: ctx.getGroupAmount(groupId),
      solid: ctx.solid,
      ...ctx.maskCompositeOpts(groupId),
    });
  } else if (!useFeedback) {
    const mode = Number(group.composite.params?.mode ?? 0);
    next = compositeGroupOntoMode({
      chain: next,
      layerSrc: cloneHydraChain(groupContent),
      mode,
      getAmount: ctx.getGroupAmount(groupId),
      solid: ctx.solid,
      ...ctx.maskCompositeOpts(groupId),
    });
  }

  // Feedback matches main-chain: blend previous FBO into the chain at this point.
  if (useFeedback && feedbackRow) {
    const fb = applyGroupFeedbackIfNeeded(next, groupId, group, ctx);
    next = fb.chain;
    if (group.solo) return { chain: next, solo: true };
    return { chain: next, solo: false };
  }

  if (group.solo) {
    return { chain: cloneHydraChain(groupContent), solo: true };
  }

  return { chain: next, solo: false };
}
