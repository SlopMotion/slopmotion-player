import type { FolderConfig } from "../types/settings";
import type { FXConfig } from "../types/settings";
import type { FxGroup, LayerInstance } from "../types/fxChainTree";
import { layerPanelKey } from "../utils/fxChainTree";
import { paramBindingFromFx, bindingIsTriggered } from "../utils/paramBinding";
import { normalizeTriggerOnlyPlaybackFxRow } from "../utils/triggerOnlyPlaybackFx";
import { playbackCueEventCount } from "../utils/playbackCueSlots";

/** One audio-reactive trigger source: an FX row, or one of its paramSync entries. */
export interface ReactiveTriggerDescriptor {
  /** State key: `fxKey` or `fxKey:paramKey`. */
  key: string;
  fxKey: string;
  paramKey?: string;
  /** When set, use this row instead of fx[fxKey] (group layers / group composite). */
  config?: FXConfig;
}

function appendTriggeredDescriptors(
  out: ReactiveTriggerDescriptor[],
  effectKey: string,
  row: FXConfig,
  templateKey?: string,
): void {
  const fxKey = templateKey ?? effectKey;
  const baseBinding = paramBindingFromFx(row, "base");
  if (bindingIsTriggered(baseBinding)) {
    out.push({ key: effectKey, fxKey: effectKey, config: row });
  }
  const psync = row.paramSync;
  if (!psync) return;
  const cueEventCount =
    fxKey === "playbackCue" ? playbackCueEventCount(row.params) : undefined;
  for (const paramKey of Object.keys(psync)) {
    if (cueEventCount != null) {
      const slot = Number.parseInt(paramKey.replace(/^frame/, ""), 10);
      if (paramKey.startsWith("frame") && Number.isFinite(slot) && slot > cueEventCount) {
        continue;
      }
    }
    const binding = paramBindingFromFx(row, paramKey);
    if (bindingIsTriggered(binding)) {
      out.push({
        key: `${effectKey}:${paramKey}`,
        fxKey: effectKey,
        paramKey,
        config: row,
      });
    }
  }
}

function appendLayerInstanceTriggers(
  out: ReactiveTriggerDescriptor[],
  layerInstances: Record<string, LayerInstance>,
  fxGroups: Record<string, FxGroup>,
): void {
  for (const [groupId, group] of Object.entries(fxGroups)) {
    if (!group?.enabled) continue;
    for (const layerId of group.layerIds) {
      const inst = layerInstances[layerId];
      if (!inst?.config.enabled) continue;
      appendTriggeredDescriptors(
        out,
        layerPanelKey(groupId, layerId),
        inst.config,
        inst.templateKey,
      );
    }
    if (group.composite?.enabled) {
      appendTriggeredDescriptors(out, `group:${groupId}`, group.composite);
    }
  }
}

/**
 * Only enabled FX (or paramSync entries) with `isTrigger` and a real band
 * actually need per-frame envelope work. Precomputing this list lets the rAF
 * loop skip the other ~45 inert FX keys (and avoids allocating a closure per
 * key every frame). Rebuilt only when the FX config object changes.
 */
export function buildReactiveTriggerDescriptors(
  fx: FolderConfig["fx"] | undefined,
  extras?: {
    layerInstances?: Record<string, LayerInstance>;
    fxGroups?: Record<string, FxGroup>;
  },
): ReactiveTriggerDescriptor[] {
  if (!fx || typeof fx !== "object") return [];
  const out: ReactiveTriggerDescriptor[] = [];
  for (const fxKey of Object.keys(fx)) {
    const raw = fx[fxKey as keyof FolderConfig["fx"]];
    const row = normalizeTriggerOnlyPlaybackFxRow(fxKey, raw as never) ?? raw;
    if (!row || !row.enabled) continue;
    appendTriggeredDescriptors(out, fxKey, row);
  }
  if (extras?.layerInstances && extras?.fxGroups) {
    appendLayerInstanceTriggers(out, extras.layerInstances, extras.fxGroups);
  }
  return out;
}

export function fxRowHasReactiveTriggers(row: FXConfig | undefined): boolean {
  if (!row || !row.enabled) return false;
  const baseBinding = paramBindingFromFx(row, "base");
  if (bindingIsTriggered(baseBinding) && baseBinding.source !== "none") return true;
  const psync = row.paramSync;
  if (!psync || typeof psync !== "object") return false;
  for (const ps of Object.values(psync)) {
    if (ps?.isTrigger && ps.band && ps.band !== "none") return true;
  }
  return false;
}
