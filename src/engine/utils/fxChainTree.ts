import type { FXConfig, FolderConfig, GlobalSettings } from "../types/settings";
import type {
  FxChainNode,
  FxGroup,
  FxGroupComposite,
  GroupLayerTemplateKey,
  LayerInstance,
} from "../types/fxChainTree";
import { HYDRA_FX_TEMPLATE_RAW } from "../data/defaultHydraFxMap";
import { FX_GROUP_LAYER_INSTANCE_HIDDEN_PARAM_KEYS, FX_GROUP_MASK_DEFAULT_PARAMS } from "../data/fxGroupConfig";
import {
  asFxGroupBufferStart,
  isLayerInstanceTemplateKey,
  FX_GROUP_BUFFER_START_CHAIN,
  FX_GROUP_BUFFER_START_GROUP,
} from "../types/fxChainTree";
import { buildStaticFxConfig } from "./fxAddConfig";
import { isCoreFxKey, isPlaybackChainFxKey } from "../data/fxConfig";
import { PULSE_HIT_DEFAULTS } from "./audioMapperDefaults";

export function newFxChainId(prefix: "grp" | "lyr"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function createDefaultFxGroupComposite(): FxGroup["composite"] {
  return {
    enabled: true,
    base: 0.65,
    syncBand: "none",
    syncMultiplier: 0,
    isTrigger: false,
    triggerThreshold: 0.5,
    triggerCount: PULSE_HIT_DEFAULTS.triggerCount,
    params: {
      mode: 0,
      ...FX_GROUP_MASK_DEFAULT_PARAMS,
    },
  };
}

/** Max layer groups per scene / live chain. */
export const MAX_FX_GROUPS = 2;

export const FX_GROUP_SLOT_LABELS = ["Group 1", "Group 2"] as const;

export function listGroupIdsInChain(chain: FxChainNode[]): string[] {
  return chain.filter((node): node is { kind: "group"; id: string } => node.kind === "group").map(
    (node) => node.id,
  );
}

/** Assign Group 1 / Group 2 by order in the chain. */
export function labelFxGroupsByChainOrder(
  chain: FxChainNode[],
  fxGroups: Record<string, FxGroup>,
): Record<string, FxGroup> {
  const ids = listGroupIdsInChain(chain);
  let next = fxGroups;
  let changed = false;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]!;
    const group = next[id];
    if (!group) continue;
    const label = FX_GROUP_SLOT_LABELS[Math.min(i, FX_GROUP_SLOT_LABELS.length - 1)]!;
    if (group.label === label) continue;
    if (!changed) {
      next = { ...fxGroups };
      changed = true;
    }
    next[id] = { ...group, label };
  }
  return next;
}

/** The other group id when at most two groups exist. */
export function resolveOtherFxGroupId(
  groupId: string,
  stores: {
    activeChain?: FxChainNode[];
    activeFxList?: (keyof FolderConfig["fx"])[];
    fxGroups?: Record<string, FxGroup>;
  },
): string | null {
  const ids = listGroupIdsInChain(resolveActiveChain(stores));
  return ids.find((id) => id !== groupId) ?? null;
}

export function createDefaultFxGroup(
  layerIds: string[] = [],
  label: string = FX_GROUP_SLOT_LABELS[0],
): FxGroup {
  return {
    enabled: true,
    label,
    layerIds: [...layerIds],
    internalMode: 2,
    composite: createDefaultFxGroupComposite(),
    solo: false,
    bufferStart: FX_GROUP_BUFFER_START_CHAIN,
    bufferStartGroupId: null,
  };
}

/** True when an FX key can be dragged into a layer group as an instance. */
export function canAdoptFxAsGroupLayer(fxKey: string): fxKey is GroupLayerTemplateKey {
  if (!fxKey) return false;
  if (isCoreFxKey(fxKey)) return false;
  if (isPlaybackChainFxKey(fxKey)) return false;
  return fxKey in HYDRA_FX_TEMPLATE_RAW;
}

export function createLayerInstance(
  templateKey: GroupLayerTemplateKey,
  enabled = true,
): LayerInstance {
  const template =
    HYDRA_FX_TEMPLATE_RAW[templateKey as keyof typeof HYDRA_FX_TEMPLATE_RAW];
  const config = buildStaticFxConfig(
    templateKey as keyof typeof HYDRA_FX_TEMPLATE_RAW,
    template,
    enabled,
  );
  if (config.params && isLayerInstanceTemplateKey(String(templateKey))) {
    const params = { ...config.params };
    for (const key of FX_GROUP_LAYER_INSTANCE_HIDDEN_PARAM_KEYS) {
      delete params[key];
    }
    config.params = params;
  }
  return { templateKey, config };
}

export function activeFxListToChain(
  activeFxList: (keyof FolderConfig["fx"])[] | undefined,
): FxChainNode[] {
  return (activeFxList ?? [])
    .filter((key) => !isCoreFxKey(key as string) && !isPlaybackChainFxKey(key as string))
    .map((key) => ({ kind: "fx" as const, key }));
}

export function flattenFxKeysFromChain(chain: FxChainNode[] | undefined): (keyof FolderConfig["fx"])[] {
  if (!chain?.length) return [];
  return chain
    .filter((node): node is { kind: "fx"; key: keyof FolderConfig["fx"] } => node.kind === "fx")
    .map((node) => node.key);
}

/** Enabled singleton FX keys referenced by the tree (not group children). */
export function flattenActiveFxKeysFromStores(stores: {
  activeChain?: FxChainNode[];
  activeFxList?: (keyof FolderConfig["fx"])[];
}): (keyof FolderConfig["fx"])[] {
  const chain = resolveActiveChain(stores);
  return flattenFxKeysFromChain(chain);
}

export function resolveActiveChain(stores: {
  activeChain?: FxChainNode[];
  activeFxList?: (keyof FolderConfig["fx"])[];
}): FxChainNode[] {
  if (stores.activeChain?.length) return stores.activeChain;
  return activeFxListToChain(stores.activeFxList);
}

/** Shader evaluation order: flatten groups into FX keys for legacy overlay / MIDI helpers. */
export function resolveRenderFxListFromChain(
  fx: FolderConfig["fx"] | undefined,
  stores: {
    activeChain?: FxChainNode[];
    activeFxList?: (keyof FolderConfig["fx"])[];
  },
): (keyof FolderConfig["fx"])[] {
  const chain = resolveActiveChain(stores);
  const listed = flattenFxKeysFromChain(chain);
  if (!fx) return listed;

  const enabledSingleton = (Object.keys(fx) as (keyof FolderConfig["fx"])[]).filter(
    (k) => !isCoreFxKey(k as string) && fx[k]?.enabled,
  );
  if (listed.length === 0) return enabledSingleton;

  const seen = new Set(listed);
  const merged = [...listed];
  for (const key of enabledSingleton) {
    if (!seen.has(key)) merged.push(key);
  }
  return merged;
}

export function resolveActiveRenderChain(stores: {
  activeChain?: FxChainNode[];
  activeFxList?: (keyof FolderConfig["fx"])[];
  fxGroups?: Record<string, FxGroup>;
}): FxChainNode[] {
  return resolveActiveChain(stores).filter((node) => {
    if (node.kind === "fx") return true;
    const group = stores.fxGroups?.[node.id];
    return group?.enabled !== false;
  });
}

/**
 * Playback slots live on `activeFxList` (Video rail), not `activeChain`.
 * Never graft leftover visual FX — those must be chain/group nodes or they ghost
 * after Reset all FX.
 */
export function mergePlaybackKeysOntoRenderChain(
  renderChain: FxChainNode[],
  activeList: readonly (keyof FolderConfig["fx"])[],
): FxChainNode[] {
  const listed = new Set(flattenFxKeysFromChain(renderChain).map(String));
  const next = [...renderChain];
  for (const key of activeList) {
    if (listed.has(String(key))) continue;
    if (!isPlaybackChainFxKey(String(key))) continue;
    next.push({ kind: "fx", key });
    listed.add(String(key));
  }
  return next;
}

/** Unlocked visual FX still marked enabled — Reset must turn these off or Hydra keeps drawing them. */
export function visualFxKeysToDisableOnReset(
  fx: FolderConfig["fx"] | undefined,
  lockedFxKeys: readonly (keyof FolderConfig["fx"])[] = [],
): (keyof FolderConfig["fx"])[] {
  if (!fx) return [];
  const locked = new Set(lockedFxKeys.map(String));
  return (Object.keys(fx) as (keyof FolderConfig["fx"])[]).filter((key) => {
    if (isCoreFxKey(String(key)) || isPlaybackChainFxKey(String(key))) return false;
    if (locked.has(String(key))) return false;
    const row = fx[key];
    return Boolean(row && typeof row === "object" && row.enabled && !row.locked);
  });
}

export function syncActiveFxListFromChain(global: Pick<GlobalSettings, "activeChain" | "activeFxList">): void {
  global.activeFxList = flattenFxKeysFromChain(resolveActiveChain(global));
}

export function migrateGlobalFxChainTree(global: GlobalSettings): GlobalSettings {
  let activeChain = global.activeChain;
  let layerInstances = global.layerInstances ?? {};
  let fxGroups = global.fxGroups ?? {};

  if (!activeChain?.length) {
    activeChain = activeFxListToChain(global.activeFxList);
  }

  for (const node of activeChain) {
    if (node.kind !== "group") continue;
    if (!fxGroups[node.id]) {
      fxGroups = { ...fxGroups, [node.id]: createDefaultFxGroup() };
    }
  }

  layerInstances = Object.fromEntries(
    Object.entries(layerInstances).filter(([, inst]) =>
      canAdoptFxAsGroupLayer(String(inst.templateKey)),
    ),
  );
  for (const [groupId, group] of Object.entries(fxGroups)) {
    const layerIds = group.layerIds.filter((id) => layerInstances[id]);
    if (layerIds.length !== group.layerIds.length) {
      fxGroups = { ...fxGroups, [groupId]: { ...group, layerIds } };
    }
  }

  fxGroups = labelFxGroupsByChainOrder(activeChain, fxGroups);

  const nextActiveFxList = flattenFxKeysFromChain(activeChain);
  return {
    ...global,
    activeChain,
    layerInstances,
    fxGroups,
    activeFxList: nextActiveFxList,
  };
}

export function instanceParamValue(
  inst: LayerInstance,
  paramKey: string,
  fallback: number,
): number {
  const raw = inst.config.params?.[paramKey];
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  return fallback;
}

export function instanceFxAmount(inst: LayerInstance, bands: () => unknown): number {
  const base = inst.config.base ?? 0;
  if (inst.config.syncBand === "none" || !inst.config.syncBand) return base;
  void bands;
  return base;
}

export type CreateLayerGroupResult = {
  activeChain: FxChainNode[];
  layerInstances: Record<string, LayerInstance>;
  fxGroups: Record<string, FxGroup>;
  groupId: string;
};

/** Append an empty group to the chain — add layers by drag or the group detail panel.
 *  Returns null when the scene already has {@link MAX_FX_GROUPS} groups. */
export function appendLayerGroupToChain(
  stores: {
    activeChain?: FxChainNode[];
    activeFxList?: (keyof FolderConfig["fx"])[];
    layerInstances?: Record<string, LayerInstance>;
    fxGroups?: Record<string, FxGroup>;
  },
): CreateLayerGroupResult | null {
  const chain = resolveActiveChain(stores);
  const existingIds = listGroupIdsInChain(chain);
  if (existingIds.length >= MAX_FX_GROUPS) return null;

  const groupId = newFxChainId("grp");
  const label =
    FX_GROUP_SLOT_LABELS[Math.min(existingIds.length, FX_GROUP_SLOT_LABELS.length - 1)]!;
  let fxGroups: Record<string, FxGroup> = {
    ...(stores.fxGroups ?? {}),
    [groupId]: createDefaultFxGroup([], label),
  };
  const activeChain = [...chain, { kind: "group" as const, id: groupId }];
  fxGroups = labelFxGroupsByChainOrder(activeChain, fxGroups);

  // Wire any group already set to "other group" buffer start to the new peer.
  for (const id of existingIds) {
    const g = fxGroups[id];
    if (!g || (g.bufferStart ?? 0) !== FX_GROUP_BUFFER_START_GROUP) continue;
    fxGroups = {
      ...fxGroups,
      [id]: { ...g, bufferStartGroupId: groupId },
    };
  }

  return {
    activeChain,
    layerInstances: { ...(stores.layerInstances ?? {}) },
    fxGroups,
    groupId,
  };
}

export function removeGroupFromChain(
  stores: {
    activeChain?: FxChainNode[];
    activeFxList?: (keyof FolderConfig["fx"])[];
    layerInstances?: Record<string, LayerInstance>;
    fxGroups?: Record<string, FxGroup>;
    fx?: FolderConfig["fx"];
  },
  groupId: string,
): {
  activeChain: FxChainNode[];
  layerInstances: Record<string, LayerInstance>;
  fxGroups: Record<string, FxGroup>;
  fx: FolderConfig["fx"] | undefined;
  restoredFxKeys: GroupLayerTemplateKey[];
} {
  const group = stores.fxGroups?.[groupId];
  const chain = resolveActiveChain(stores);
  const groupIndex = chain.findIndex((node) => node.kind === "group" && node.id === groupId);
  const layerInstances = { ...(stores.layerInstances ?? {}) };
  const fxGroups = { ...(stores.fxGroups ?? {}) };
  let fx = stores.fx ? { ...stores.fx } : undefined;
  const restoredFxKeys: GroupLayerTemplateKey[] = [];
  const releasedNodes: Array<{ kind: "fx"; key: GroupLayerTemplateKey }> = [];
  const releasedKeySet = new Set<string>();

  for (const layerId of group?.layerIds ?? []) {
    const inst = layerInstances[layerId];
    delete layerInstances[layerId];
    if (!inst) continue;
    const fxKey = inst.templateKey;
    if (fx) {
      fx = {
        ...fx,
        [fxKey]: { ...inst.config, enabled: true },
      };
    }
    if (releasedKeySet.has(String(fxKey))) continue;
    releasedKeySet.add(String(fxKey));
    releasedNodes.push({ kind: "fx", key: fxKey });
    restoredFxKeys.push(fxKey);
  }

  delete fxGroups[groupId];

  for (const [id, g] of Object.entries(fxGroups)) {
    if ((g.bufferStart ?? 0) !== FX_GROUP_BUFFER_START_GROUP && g.bufferStartGroupId !== groupId) {
      continue;
    }
    fxGroups[id] = {
      ...g,
      bufferStart:
        (g.bufferStart ?? 0) === FX_GROUP_BUFFER_START_GROUP
          ? asFxGroupBufferStart(0)
          : g.bufferStart,
      bufferStartGroupId: null,
    };
  }

  const withoutGroup = chain.filter(
    (node) => !(node.kind === "group" && node.id === groupId),
  );
  const cleaned = withoutGroup.filter(
    (node) => !(node.kind === "fx" && releasedKeySet.has(String(node.key))),
  );

  let insertPos = cleaned.length;
  if (groupIndex >= 0) {
    insertPos = 0;
    for (let i = 0; i < groupIndex; i++) {
      const node = chain[i]!;
      if (node.kind === "fx" && releasedKeySet.has(String(node.key))) continue;
      insertPos++;
    }
  }

  const activeChain = [
    ...cleaned.slice(0, insertPos),
    ...releasedNodes,
    ...cleaned.slice(insertPos),
  ];

  return {
    activeChain,
    layerInstances,
    fxGroups: labelFxGroupsByChainOrder(activeChain, fxGroups),
    fx,
    restoredFxKeys,
  };
}

export function updateGroupComposite(
  fxGroups: Record<string, FxGroup>,
  groupId: string,
  composite: FxGroupComposite,
): Record<string, FxGroup> {
  const group = fxGroups[groupId];
  if (!group) return fxGroups;
  return { ...fxGroups, [groupId]: { ...group, composite } };
}

/** Set solo on one group; clears solo on every other group. */
export function setFxGroupSoloExclusive(
  fxGroups: Record<string, FxGroup>,
  groupId: string,
  solo: boolean,
): Record<string, FxGroup> {
  const next: Record<string, FxGroup> = {};
  for (const [id, group] of Object.entries(fxGroups)) {
    next[id] = {
      ...group,
      solo: solo && id === groupId,
    };
  }
  return next;
}

export function updateLayerInstanceConfig(
  layerInstances: Record<string, LayerInstance>,
  layerId: string,
  config: FXConfig,
): Record<string, LayerInstance> {
  const inst = layerInstances[layerId];
  if (!inst) return layerInstances;
  return { ...layerInstances, [layerId]: { ...inst, config } };
}

export function fxGroupDropId(groupId: string): string {
  return `group-drop:${groupId}`;
}

export function parseFxGroupDropId(id: string): string | null {
  return id.startsWith("group-drop:") ? id.slice("group-drop:".length) : null;
}

export function layerPanelKey(groupId: string, layerId: string): string {
  return `layer:${groupId}:${layerId}`;
}

export function parseGroupPanelKey(panel: string): string | null {
  if (!panel.startsWith("group:")) return null;
  const groupId = panel.slice("group:".length);
  return groupId.length > 0 ? groupId : null;
}

export function parseLayerPanelKey(panel: string): { groupId: string; layerId: string } | null {
  if (!panel.startsWith("layer:")) return null;
  const rest = panel.slice("layer:".length);
  const splitAt = rest.indexOf(":");
  if (splitAt <= 0) return null;
  return { groupId: rest.slice(0, splitAt), layerId: rest.slice(splitAt + 1) };
}

export function layerInstanceFromFxConfig(
  templateKey: GroupLayerTemplateKey,
  config: FXConfig,
): LayerInstance {
  const cloned = JSON.parse(JSON.stringify(config)) as FXConfig;
  if (cloned.params && isLayerInstanceTemplateKey(String(templateKey))) {
    const params = { ...cloned.params };
    for (const key of FX_GROUP_LAYER_INSTANCE_HIDDEN_PARAM_KEYS) {
      delete params[key];
    }
    cloned.params = params;
  }
  return { templateKey, config: cloned };
}

export function moveFxIntoGroup(
  stores: {
    activeChain?: FxChainNode[];
    activeFxList?: (keyof FolderConfig["fx"])[];
    layerInstances?: Record<string, LayerInstance>;
    fxGroups?: Record<string, FxGroup>;
    fx?: FolderConfig["fx"];
  },
  fxKey: GroupLayerTemplateKey,
  groupId: string,
): {
  activeChain: FxChainNode[];
  layerInstances: Record<string, LayerInstance>;
  fxGroups: Record<string, FxGroup>;
  fx: FolderConfig["fx"];
  layerId: string;
} | null {
  if (!canAdoptFxAsGroupLayer(String(fxKey))) return null;
  const group = stores.fxGroups?.[groupId];
  const fxMap = stores.fx;
  const fxRow = fxMap?.[fxKey];
  if (!group || !fxMap || !fxRow) return null;

  const inChain = resolveActiveChain(stores).some(
    (node) => node.kind === "fx" && node.key === fxKey,
  );
  if (!inChain) return null;

  const layerId = newFxChainId("lyr");
  const layerInstances = {
    ...(stores.layerInstances ?? {}),
    [layerId]: layerInstanceFromFxConfig(fxKey, fxRow),
  };
  const fxGroups = {
    ...(stores.fxGroups ?? {}),
    [groupId]: { ...group, layerIds: [...group.layerIds, layerId] },
  };
  const activeChain = resolveActiveChain(stores).filter(
    (node) => !(node.kind === "fx" && node.key === fxKey),
  );
  const fx = {
    ...fxMap,
    [fxKey]: { ...fxRow, enabled: false },
  };

  return { activeChain, layerInstances, fxGroups, fx, layerId };
}

export function groupLayerDragId(groupId: string, layerId: string): string {
  return `group-layer:${groupId}:${layerId}`;
}

export function parseGroupLayerDragId(id: string): { groupId: string; layerId: string } | null {
  if (!id.startsWith("group-layer:")) return null;
  const rest = id.slice("group-layer:".length);
  const splitAt = rest.indexOf(":");
  if (splitAt <= 0) return null;
  return { groupId: rest.slice(0, splitAt), layerId: rest.slice(splitAt + 1) };
}

/** Move a layer instance back onto the main chain. Optional `overSortableId` places it at that row. */
export function moveLayerOutOfGroup(
  stores: {
    activeChain?: FxChainNode[];
    layerInstances?: Record<string, LayerInstance>;
    fxGroups?: Record<string, FxGroup>;
    fx?: FolderConfig["fx"];
  },
  groupId: string,
  layerId: string,
  overSortableId?: string | null,
): {
  activeChain: FxChainNode[];
  layerInstances: Record<string, LayerInstance>;
  fxGroups: Record<string, FxGroup>;
  fx: FolderConfig["fx"];
  fxKey: GroupLayerTemplateKey;
} | null {
  const group = stores.fxGroups?.[groupId];
  const inst = stores.layerInstances?.[layerId];
  const fxMap = stores.fx;
  if (!group || !inst || !fxMap || !group.layerIds.includes(layerId)) return null;

  const fxKey = inst.templateKey;
  const layerInstances = { ...(stores.layerInstances ?? {}) };
  delete layerInstances[layerId];
  const fxGroups = {
    ...(stores.fxGroups ?? {}),
    [groupId]: { ...group, layerIds: group.layerIds.filter((id) => id !== layerId) },
  };
  const fx = {
    ...fxMap,
    [fxKey]: { ...inst.config, enabled: true },
  };

  const chain = resolveActiveChain(stores);
  const groupIndex = chain.findIndex((node) => node.kind === "group" && node.id === groupId);
  const hasFxNode = chain.some((node) => node.kind === "fx" && node.key === fxKey);
  let activeChain = chain;
  if (!hasFxNode) {
    const fromOver = overSortableId
      ? chainInsertIndexForSortableOver(chain, overSortableId, { ejectFromGroupId: groupId })
      : null;
    const at =
      fromOver != null
        ? fromOver
        : groupIndex >= 0
          ? groupIndex + 1
          : chain.length;
    activeChain = [
      ...chain.slice(0, at),
      { kind: "fx" as const, key: fxKey },
      ...chain.slice(at),
    ];
  }

  return { activeChain, layerInstances, fxGroups, fx, fxKey };
}

/** Chain index to insert at when dropping a restored FX onto a sortable row. */
export function chainInsertIndexForSortableOver(
  chain: FxChainNode[],
  overId: string,
  opts?: { ejectFromGroupId?: string },
): number | null {
  if (overId === FX_CHAIN_PREPEND_DROP_ID) return 0;
  if (overId === FX_CHAIN_APPEND_DROP_ID) return chain.length;
  const overGroupId = parseFxChainGroupSortableId(overId);
  if (overGroupId) {
    const idx = chain.findIndex((node) => node.kind === "group" && node.id === overGroupId);
    if (idx < 0) return null;
    if (opts?.ejectFromGroupId === overGroupId) return idx + 1;
    return idx;
  }
  const idx = chain.findIndex((node) => node.kind === "fx" && String(node.key) === overId);
  return idx >= 0 ? idx : null;
}

export function removeLayerFromGroup(
  stores: {
    layerInstances?: Record<string, LayerInstance>;
    fxGroups?: Record<string, FxGroup>;
  },
  groupId: string,
  layerId: string,
): {
  layerInstances: Record<string, LayerInstance>;
  fxGroups: Record<string, FxGroup>;
} | null {
  const group = stores.fxGroups?.[groupId];
  if (!group || !group.layerIds.includes(layerId)) return null;

  const layerInstances = { ...(stores.layerInstances ?? {}) };
  delete layerInstances[layerId];
  const fxGroups = {
    ...(stores.fxGroups ?? {}),
    [groupId]: { ...group, layerIds: group.layerIds.filter((id) => id !== layerId) },
  };
  return { layerInstances, fxGroups };
}

/** Reorder layers inside a group by moving `activeLayerId` to the slot of `overLayerId`. */
export function reorderLayersInGroup(
  fxGroups: Record<string, FxGroup>,
  groupId: string,
  activeLayerId: string,
  overLayerId: string,
): Record<string, FxGroup> | null {
  const group = fxGroups[groupId];
  if (!group || activeLayerId === overLayerId) return null;
  const oldIndex = group.layerIds.indexOf(activeLayerId);
  const newIndex = group.layerIds.indexOf(overLayerId);
  if (oldIndex < 0 || newIndex < 0) return null;
  const layerIds = [...group.layerIds];
  const [moved] = layerIds.splice(oldIndex, 1);
  if (!moved) return null;
  layerIds.splice(newIndex, 0, moved);
  return {
    ...fxGroups,
    [groupId]: { ...group, layerIds },
  };
}

export function reorderFxInChain(
  chain: FxChainNode[],
  newFxOrder: (keyof FolderConfig["fx"])[],
): FxChainNode[] {
  const fxKeysInChain = chain
    .filter((node): node is { kind: "fx"; key: keyof FolderConfig["fx"] } => node.kind === "fx")
    .map((node) => node.key);
  if (newFxOrder.length !== fxKeysInChain.length) return chain;
  let fxIdx = 0;
  return chain.map((node) => {
    if (node.kind === "group") return node;
    const next = newFxOrder[fxIdx++];
    return next ? { kind: "fx" as const, key: next } : node;
  });
}

/** Sortable id for a group row in the FX rail (distinct from nest drop `group-drop:`). */
export function fxChainGroupSortableId(groupId: string): string {
  return `group:${groupId}`;
}

export function parseFxChainGroupSortableId(id: string): string | null {
  if (!id.startsWith("group:") || id.startsWith("group-drop:")) return null;
  const groupId = id.slice("group:".length);
  return groupId.length > 0 && !groupId.includes(":") ? groupId : null;
}

/** Group id from a droppable hit — nest zone or the group card itself. */
export function parseFxGroupDropTargetId(id: string): string | null {
  return parseFxGroupDropId(id) ?? parseFxChainGroupSortableId(id);
}

export function nestGroupIdFromHits(hitIds: Iterable<string>): string | null {
  for (const id of hitIds) {
    const groupId = parseFxGroupDropTargetId(id);
    if (groupId) return groupId;
  }
  return null;
}

export function fxChainSortableId(node: FxChainNode): string {
  return node.kind === "group" ? fxChainGroupSortableId(node.id) : String(node.key);
}

/** Drop target inserted before the first chain row (reorder / eject to start). */
export const FX_CHAIN_PREPEND_DROP_ID = "fx-chain-prepend";

/** Drop target appended after the last chain row (reorder / eject to end). */
export const FX_CHAIN_APPEND_DROP_ID = "fx-chain-append";

export function isFxChainEdgeDropId(id: string): boolean {
  return id === FX_CHAIN_PREPEND_DROP_ID || id === FX_CHAIN_APPEND_DROP_ID;
}

export function nodeFromFxChainSortableId(
  id: string,
): FxChainNode | null {
  const groupId = parseFxChainGroupSortableId(id);
  if (groupId) return { kind: "group", id: groupId };
  if (id.includes(":")) return null;
  return { kind: "fx", key: id as keyof FolderConfig["fx"] };
}

/** Visual FX rail nodes — groups + non-playback FX (Cue Layer etc. stay on the Video rail). */
export function isVisualFxChainNode(node: FxChainNode): boolean {
  if (node.kind === "group") return true;
  return !isPlaybackChainFxKey(node.key as string);
}

export function visualFxChainNodes(chain: FxChainNode[]): FxChainNode[] {
  return chain.filter(isVisualFxChainNode);
}

/** Reorder visual chain nodes (FX + groups) by sortable ids; keep playback slots in place. */
export function reorderActiveChainBySortableIds(
  chain: FxChainNode[],
  sortableIds: string[],
): FxChainNode[] {
  const visual = visualFxChainNodes(chain);
  const byId = new Map(visual.map((node) => [fxChainSortableId(node), node]));
  if (sortableIds.length !== visual.length) return chain;

  const reorderedVisual: FxChainNode[] = [];
  for (const id of sortableIds) {
    const node = byId.get(id);
    if (!node) return chain;
    reorderedVisual.push(node);
  }

  let visualIdx = 0;
  return chain.map((node) => {
    if (!isVisualFxChainNode(node)) return node;
    return reorderedVisual[visualIdx++]!;
  });
}

export type KeepLockedFxChainResult = {
  activeChain: FxChainNode[];
  layerInstances: Record<string, LayerInstance>;
  fxGroups: Record<string, FxGroup>;
  unlockedFxKeys: (keyof FolderConfig["fx"])[];
  lockedFxKeys: (keyof FolderConfig["fx"])[];
  removedGroupIds: string[];
  removedLayerIds: string[];
  changed: boolean;
};

function clearBufferStartRefsToGroups(
  fxGroups: Record<string, FxGroup>,
  removedGroupIds: readonly string[],
): Record<string, FxGroup> {
  if (removedGroupIds.length === 0) return fxGroups;
  const removed = new Set(removedGroupIds);
  let next = fxGroups;
  for (const [id, group] of Object.entries(fxGroups)) {
    const pointsAtRemoved =
      (group.bufferStartGroupId != null && removed.has(group.bufferStartGroupId)) ||
      ((group.bufferStart ?? 0) === FX_GROUP_BUFFER_START_GROUP &&
        (group.bufferStartGroupId == null || removed.has(group.bufferStartGroupId)));
    if (!pointsAtRemoved) continue;
    if (next === fxGroups) next = { ...fxGroups };
    next[id] = {
      ...group,
      bufferStart:
        (group.bufferStart ?? 0) === FX_GROUP_BUFFER_START_GROUP
          ? asFxGroupBufferStart(0)
          : group.bufferStart,
      bufferStartGroupId: null,
    };
  }
  return next;
}

/**
 * Drop unlocked chain FX and group layers. Locked singletons and locked
 * instances stay — they survive FX reset / random.
 */
export function keepLockedFxChain(stores: {
  activeChain?: FxChainNode[];
  activeFxList?: (keyof FolderConfig["fx"])[];
  layerInstances?: Record<string, LayerInstance>;
  fxGroups?: Record<string, FxGroup>;
  fx?: FolderConfig["fx"];
}): KeepLockedFxChainResult {
  const chain = resolveActiveChain(stores);
  const layerInstances = { ...(stores.layerInstances ?? {}) };
  const fxGroups = { ...(stores.fxGroups ?? {}) };
  const unlockedFxKeys: (keyof FolderConfig["fx"])[] = [];
  const lockedFxKeys: (keyof FolderConfig["fx"])[] = [];
  const removedGroupIds: string[] = [];
  const removedLayerIds: string[] = [];
  const activeChain: FxChainNode[] = [];

  for (const node of chain) {
    if (node.kind === "fx") {
      const row = stores.fx?.[node.key];
      if (row && typeof row === "object" && row.locked) {
        lockedFxKeys.push(node.key);
        activeChain.push(node);
      } else {
        unlockedFxKeys.push(node.key);
      }
      continue;
    }

    const group = fxGroups[node.id];
    if (!group) {
      removedGroupIds.push(node.id);
      continue;
    }
    const keptLayerIds: string[] = [];
    for (const layerId of group.layerIds) {
      const inst = layerInstances[layerId];
      if (inst?.config.locked) {
        keptLayerIds.push(layerId);
      } else {
        removedLayerIds.push(layerId);
        delete layerInstances[layerId];
      }
    }
    if (keptLayerIds.length === 0) {
      removedGroupIds.push(node.id);
      delete fxGroups[node.id];
    } else {
      fxGroups[node.id] = { ...group, layerIds: keptLayerIds };
      activeChain.push(node);
    }
  }

  const cleanedGroups = labelFxGroupsByChainOrder(
    activeChain,
    clearBufferStartRefsToGroups(fxGroups, removedGroupIds),
  );

  return {
    activeChain,
    layerInstances,
    fxGroups: cleanedGroups,
    unlockedFxKeys,
    lockedFxKeys,
    removedGroupIds,
    removedLayerIds,
    changed:
      unlockedFxKeys.length > 0 || removedGroupIds.length > 0 || removedLayerIds.length > 0,
  };
}

export function fxChainHasUnlockedItems(stores: {
  activeChain?: FxChainNode[];
  activeFxList?: (keyof FolderConfig["fx"])[];
  layerInstances?: Record<string, LayerInstance>;
  fxGroups?: Record<string, FxGroup>;
  fx?: FolderConfig["fx"];
}): boolean {
  return keepLockedFxChain(stores).changed;
}

/** True when reset/random removed the inspect panel's chain target. */
export function isRemovedFromKeptChain(
  panel: string | null,
  kept: KeepLockedFxChainResult,
  retainedFxKeys: readonly string[] = kept.lockedFxKeys.map(String),
): boolean {
  if (!panel) return false;
  const layer = parseLayerPanelKey(panel);
  if (layer) {
    return (
      kept.removedLayerIds.includes(layer.layerId) || kept.removedGroupIds.includes(layer.groupId)
    );
  }
  const groupId = parseGroupPanelKey(panel);
  if (groupId) return kept.removedGroupIds.includes(groupId);
  if (
    kept.unlockedFxKeys.includes(panel as keyof FolderConfig["fx"]) ||
    kept.lockedFxKeys.includes(panel as keyof FolderConfig["fx"])
  ) {
    return !retainedFxKeys.includes(panel);
  }
  return false;
}

/** Move a layer instance from one group into another (keeps the same instance id). */
export function moveLayerBetweenGroups(
  stores: {
    layerInstances?: Record<string, LayerInstance>;
    fxGroups?: Record<string, FxGroup>;
  },
  fromGroupId: string,
  layerId: string,
  toGroupId: string,
): {
  layerInstances: Record<string, LayerInstance>;
  fxGroups: Record<string, FxGroup>;
} | null {
  if (fromGroupId === toGroupId) return null;
  const from = stores.fxGroups?.[fromGroupId];
  const to = stores.fxGroups?.[toGroupId];
  const inst = stores.layerInstances?.[layerId];
  if (!from || !to || !inst || !from.layerIds.includes(layerId)) return null;
  if (to.layerIds.includes(layerId)) return null;

  return {
    layerInstances: stores.layerInstances ?? {},
    fxGroups: {
      ...(stores.fxGroups ?? {}),
      [fromGroupId]: { ...from, layerIds: from.layerIds.filter((id) => id !== layerId) },
      [toGroupId]: { ...to, layerIds: [...to.layerIds, layerId] },
    },
  };
}
