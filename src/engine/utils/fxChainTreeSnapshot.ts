import type { GlobalSettings } from "../types/settings";
import type {
  FxChainNode,
  FxChainStores,
  FxGroup,
  GroupLayerTemplateKey,
  LayerInstance,
} from "../types/fxChainTree";
import { isPlaybackChainFxKey } from "../data/fxConfig";
import { migrateGlobalFxChainTree, resolveActiveChain } from "./fxChainTree";

export function cloneFxChainTreeSnapshot(stores: FxChainStores): FxChainStores {
  return {
    ...(stores.activeChain
      ? { activeChain: JSON.parse(JSON.stringify(stores.activeChain)) as FxChainNode[] }
      : {}),
    ...(stores.layerInstances
      ? {
          layerInstances: JSON.parse(JSON.stringify(stores.layerInstances)) as Record<
            string,
            LayerInstance
          >,
        }
      : {}),
    ...(stores.fxGroups
      ? { fxGroups: JSON.parse(JSON.stringify(stores.fxGroups)) as Record<string, FxGroup> }
      : {}),
  };
}

export function snapshotFxChainFromLive(stores: FxChainStores): FxChainStores {
  return cloneFxChainTreeSnapshot({
    activeChain: resolveActiveChain(stores),
    layerInstances: stores.layerInstances ?? {},
    fxGroups: stores.fxGroups ?? {},
  });
}

function isFxChainNode(value: unknown): value is FxChainNode {
  if (!value || typeof value !== "object") return false;
  const node = value as { kind?: unknown; id?: unknown; key?: unknown };
  if (node.kind === "group" && typeof node.id === "string" && node.id.trim()) return true;
  return node.kind === "fx" && typeof node.key === "string" && node.key.trim().length > 0;
}

function parseLayerInstances(raw: unknown): Record<string, LayerInstance> | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const out: Record<string, LayerInstance> = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!id || !value || typeof value !== "object") continue;
    const inst = value as { templateKey?: unknown; config?: unknown };
    if (typeof inst.templateKey !== "string" || !inst.templateKey) continue;
    if (!inst.config || typeof inst.config !== "object") continue;
    out[id] = {
      templateKey: inst.templateKey as GroupLayerTemplateKey,
      config: inst.config as LayerInstance["config"],
    };
  }
  return out;
}

function parseFxGroups(raw: unknown): Record<string, FxGroup> | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const out: Record<string, FxGroup> = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!id || !value || typeof value !== "object") continue;
    const group = value as FxGroup;
    if (!Array.isArray(group.layerIds)) continue;
    out[id] = group;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export function parseFxChainTreeSnapshot(raw: {
  activeChain?: unknown;
  layerInstances?: unknown;
  fxGroups?: unknown;
}): FxChainStores {
  const activeChain = Array.isArray(raw.activeChain)
    ? raw.activeChain.filter(isFxChainNode)
    : undefined;
  const layerInstances = parseLayerInstances(raw.layerInstances);
  const fxGroups = parseFxGroups(raw.fxGroups);
  return {
    ...(activeChain ? { activeChain } : {}),
    ...(layerInstances ? { layerInstances } : {}),
    ...(fxGroups ? { fxGroups } : {}),
  };
}

export function applyFxChainTreeToGlobal(
  global: GlobalSettings,
  snap: FxChainStores | undefined,
): GlobalSettings {
  const playbackList = (global.activeFxList ?? []).filter((key) =>
    isPlaybackChainFxKey(key as string),
  );
  const next = snap?.activeChain?.length
    ? migrateGlobalFxChainTree({
        ...global,
        activeChain: snap.activeChain,
        layerInstances: snap.layerInstances ?? {},
        fxGroups: snap.fxGroups ?? {},
      })
    : migrateGlobalFxChainTree({
        ...global,
        activeChain: undefined,
        layerInstances: {},
        fxGroups: {},
      });
  const visual = next.activeFxList ?? [];
  const seen = new Set(visual);
  return {
    ...next,
    activeFxList: [...playbackList.filter((key) => !seen.has(key)), ...visual],
  };
}
