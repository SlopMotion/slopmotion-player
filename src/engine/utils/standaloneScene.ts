import { createDefaultHydraFxMap } from "../data/defaultHydraFxMap";
import type { FolderConfig } from "../types/settings";
import type { FxChainNode, FxGroup, LayerInstance } from "../types/fxChainTree";

export const STANDALONE_SCENE_VERSION = 1;

/**
 * Portable scene payload imported as a JSON source by slopmotion-player.
 *
 * Only FX rows the scene actually touches travel with it; the player rebuilds the
 * rest from `createDefaultHydraFxMap` so the document stays small and readable.
 */
export type StandaloneScene = {
  version: number;
  title: string;
  /** Absolute clip URLs in play order. */
  clips: string[];
  clipIndex: number;
  fx: Partial<FolderConfig["fx"]>;
  activeFxList: (keyof FolderConfig["fx"])[];
  activeChain?: FxChainNode[];
  fxGroups?: Record<string, FxGroup>;
  layerInstances?: Record<string, LayerInstance>;
};

type FxKey = keyof FolderConfig["fx"];

/** Mixer + transport rows the player always needs, even when left at defaults. */
const ALWAYS_KEPT_FX_KEYS: FxKey[] = ["videoSpeed", "autoMix", "transition"];

function chainReferencedKeys(config: Pick<FolderConfig, "activeChain" | "layerInstances">): FxKey[] {
  const keys: FxKey[] = [];
  const walk = (nodes: FxChainNode[] | undefined) => {
    for (const node of nodes ?? []) {
      if (node.kind === "fx") keys.push(node.key);
    }
  };
  walk(config.activeChain);
  for (const instance of Object.values(config.layerInstances ?? {})) {
    keys.push(instance.templateKey as FxKey);
  }
  return keys;
}

function sameAsDefault(key: FxKey, config: FolderConfig["fx"], defaults: FolderConfig["fx"]) {
  return JSON.stringify(config[key]) === JSON.stringify(defaults[key]);
}

export function pruneSceneFx(config: FolderConfig): Partial<FolderConfig["fx"]> {
  const defaults = createDefaultHydraFxMap();
  const referenced = new Set<FxKey>([
    ...ALWAYS_KEPT_FX_KEYS,
    ...(config.activeFxList ?? []),
    ...chainReferencedKeys(config),
  ]);
  const out: Partial<FolderConfig["fx"]> = {};
  for (const key of Object.keys(config.fx ?? {}) as FxKey[]) {
    if (!referenced.has(key) && sameAsDefault(key, config.fx, defaults)) continue;
    out[key] = config.fx[key];
  }
  return out;
}

export function buildStandaloneScene(input: {
  title: string;
  config: FolderConfig;
  clips: string[];
  clipIndex?: number;
}): StandaloneScene {
  const clips = input.clips.filter((clip) => typeof clip === "string" && clip.length > 0);
  const requestedIndex = input.clipIndex ?? clips.indexOf(input.config.video);
  const clipIndex = requestedIndex >= 0 && requestedIndex < clips.length ? requestedIndex : 0;
  return {
    version: STANDALONE_SCENE_VERSION,
    title: input.title,
    clips,
    clipIndex,
    fx: pruneSceneFx(input.config),
    activeFxList: [...(input.config.activeFxList ?? [])],
    ...(input.config.activeChain ? { activeChain: input.config.activeChain } : {}),
    ...(input.config.fxGroups ? { fxGroups: input.config.fxGroups } : {}),
    ...(input.config.layerInstances ? { layerInstances: input.config.layerInstances } : {}),
  };
}

/** Rebuild the render config the Hydra pipeline expects from a portable scene. */
export function standaloneSceneToFolderConfig(scene: StandaloneScene): FolderConfig {
  const fx = { ...createDefaultHydraFxMap(), ...scene.fx } as FolderConfig["fx"];
  const clipIndex = Math.max(0, Math.min(scene.clipIndex ?? 0, scene.clips.length - 1));
  return {
    video: scene.clips[clipIndex] ?? "",
    isVideoPlaying: true,
    activeFxList: [...(scene.activeFxList ?? [])],
    ...(scene.activeChain ? { activeChain: scene.activeChain } : {}),
    ...(scene.fxGroups ? { fxGroups: scene.fxGroups } : {}),
    ...(scene.layerInstances ? { layerInstances: scene.layerInstances } : {}),
    fx,
  };
}
