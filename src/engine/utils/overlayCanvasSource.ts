import type { FolderConfig, FXConfig } from "../types/settings";
import { getHydraWindow, type HydraVideoSource } from "../types/hydraWindow";
import { resolveRenderFxList } from "./settingsUtils";
import {
  layerPanelKey,
  parseLayerPanelKey,
  resolveActiveRenderChain,
} from "./fxChainTree";

export type OverlayCanvasOwner = "oscilloscope" | "neonGrid" | "textLayer" | "throughTheStars" | "lumaDust" | "lumaLock";

export const OVERLAY_FX_KEYS: readonly OverlayCanvasOwner[] = [
  "neonGrid",
  "textLayer",
  "throughTheStars",
  "lumaDust",
  "lumaLock",
  "oscilloscope",
];

/** s0–s3 stay video / layer / metal-env. Overlay canvases start at s4. */
export const OVERLAY_HYDRA_SOURCE_OFFSET = 4;

export function overlayHydraSourceIndex(key: OverlayCanvasOwner): number {
  return OVERLAY_HYDRA_SOURCE_OFFSET + OVERLAY_FX_KEYS.indexOf(key);
}

export function hydraSourceCountForOverlays(): number {
  return OVERLAY_HYDRA_SOURCE_OFFSET + OVERLAY_FX_KEYS.length;
}

export function getOverlayHydraSource(key: OverlayCanvasOwner): HydraVideoSource | undefined {
  const idx = overlayHydraSourceIndex(key);
  if (idx < OVERLAY_HYDRA_SOURCE_OFFSET) return undefined;
  return (getHydraWindow() as unknown as Record<string, HydraVideoSource | undefined>)[`s${idx}`];
}

/** True when the FX draws to its own offscreen canvas and Hydra source. */
export function isOverlayCanvasFxKey(key: string): key is OverlayCanvasOwner {
  return (OVERLAY_FX_KEYS as readonly string[]).includes(key);
}

/** Last enabled overlay FX in render chain order (legacy helper; overlays no longer share s3). */
export function resolveOverlayCanvasOwner(
  activeFxList: readonly string[] | undefined,
  fx: Record<string, { enabled?: boolean } | undefined> | undefined,
): OverlayCanvasOwner | null {
  let owner: OverlayCanvasOwner | null = null;
  const list = activeFxList ?? [];
  for (let i = 0; i < list.length; i++) {
    const key = list[i]!;
    if (
      (OVERLAY_FX_KEYS as readonly string[]).includes(key) &&
      fx?.[key]?.enabled
    ) {
      owner = key as OverlayCanvasOwner;
    }
  }
  return owner;
}

/** Overlay owner from saved chain + any enabled FX missing from the list (matches applyScene). */
export function resolveOverlayCanvasOwnerFromFx(
  activeFxList: FolderConfig["activeFxList"] | undefined,
  fx: FolderConfig["fx"] | undefined,
): OverlayCanvasOwner | null {
  return resolveOverlayCanvasOwner(resolveRenderFxList(fx, activeFxList) as string[], fx);
}

export type OverlayFxStores = {
  fx?: FolderConfig["fx"];
  activeChain?: FolderConfig["activeChain"];
  activeFxList?: FolderConfig["activeFxList"];
  fxGroups?: FolderConfig["fxGroups"];
  layerInstances?: FolderConfig["layerInstances"];
};

export type LiveOverlayFx = {
  key: OverlayCanvasOwner;
  config: FXConfig;
  effectKey: string;
};

function visitEnabledOverlayRows(
  stores: OverlayFxStores,
  visit: (row: LiveOverlayFx) => void,
): void {
  const chain = resolveActiveRenderChain(stores);
  const fx = stores.fx;
  for (const node of chain) {
    if (node.kind === "fx") {
      const key = String(node.key);
      const row = fx?.[key as keyof FolderConfig["fx"]];
      if (isOverlayCanvasFxKey(key) && row?.enabled) {
        visit({ key, config: row, effectKey: key });
      }
      continue;
    }
    const group = stores.fxGroups?.[node.id];
    if (!group?.enabled) continue;
    for (const layerId of group.layerIds) {
      const inst = stores.layerInstances?.[layerId];
      if (!inst?.config.enabled) continue;
      const key = String(inst.templateKey);
      if (isOverlayCanvasFxKey(key)) {
        visit({
          key,
          config: inst.config,
          effectKey: layerPanelKey(node.id, layerId),
        });
      }
    }
  }
}

/** Last enabled overlay in chain order, including group children. */
export function resolveOverlayCanvasOwnerFromStores(
  stores: OverlayFxStores,
): OverlayCanvasOwner | null {
  let owner: OverlayCanvasOwner | null = null;
  visitEnabledOverlayRows(stores, (row) => {
    owner = row.key;
  });
  return owner;
}

/** Last enabled occurrence of an overlay key (singleton or group instance). */
export function resolveLiveOverlayFx(
  stores: OverlayFxStores,
  key: OverlayCanvasOwner,
): LiveOverlayFx | null {
  let found: LiveOverlayFx | null = null;
  visitEnabledOverlayRows(stores, (row) => {
    if (row.key === key) found = row;
  });
  return found;
}

/** Overlay template from a singleton key or `layer:group:layer` effect key. */
export function overlayTemplateKeyFromEffectKey(
  effectKey: string,
  stores: OverlayFxStores,
): OverlayCanvasOwner | null {
  if (isOverlayCanvasFxKey(effectKey)) return effectKey;
  const parsed = parseLayerPanelKey(effectKey);
  if (!parsed) return null;
  const template = stores.layerInstances?.[parsed.layerId]?.templateKey;
  if (!template || !isOverlayCanvasFxKey(template)) return null;
  return template;
}

export type OverlayCanvasBindState = {
  owner: OverlayCanvasOwner | null;
  canvas: HTMLCanvasElement | null;
};

/** Bind an overlay canvas to its dedicated Hydra source (skip if already attached). */
export function bindOverlayCanvasSource(
  source: HydraVideoSource | undefined,
  canvas: HTMLCanvasElement,
  owner: OverlayCanvasOwner,
  state: OverlayCanvasBindState,
): void {
  if (!source?.init) return;
  if (source.src === canvas) return;
  source.init({ src: canvas, dynamic: false });
  state.owner = owner;
  state.canvas = canvas;
}

export function bindOverlayFxSource(
  key: OverlayCanvasOwner,
  canvas: HTMLCanvasElement,
  state: OverlayCanvasBindState,
): HydraVideoSource | undefined {
  const source = getOverlayHydraSource(key);
  bindOverlayCanvasSource(source, canvas, key, state);
  return source;
}

export function createOverlayCanvasBindState(): OverlayCanvasBindState {
  return { owner: null, canvas: null };
}
