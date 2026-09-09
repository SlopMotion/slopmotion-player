import { clearMidiDebugPersisted } from "@/utils/midiDebugPersist";
import { clearVideoSpeedCurveRing } from "@/utils/videoSpeedCurveRing";
import type { FolderConfig } from "@/types/settings";

export type MemoryPruneResult = {
  /** DevTools Chromium only (launch with `--js-flags="--expose-gc"` or `--expose-gc`). */
  ranGcHint: boolean;
  clearedMidiDebug: boolean;
  clearedSpeedCurveSamples: boolean;
};

/** Pause + clear `<video>` backing Hydra sources so Recover can drop decoder pressure (canvas resets separately). */
export function releaseHydraVideoDecodersBestEffort(): void {
  const win = window as unknown as {
    s0?: { src?: unknown };
    s1?: { src?: unknown };
    s2?: { src?: unknown };
  };
  for (const key of ["s0", "s1", "s2"] as const) {
    const el = win[key]?.src;
    if (!(el instanceof HTMLVideoElement)) continue;
    try {
      el.pause();
      el.removeAttribute("src");
      el.load();
    } catch {
      /* noop */
    }
  }
}

/**
 * Lightweight best-effort memory pressure helpers (no guarantees — browsers manage GL/video separately).
 */
export function runManualMemoryPrune(): MemoryPruneResult {
  releaseHydraVideoDecodersBestEffort();
  clearVideoSpeedCurveRing();
  clearMidiDebugPersisted();
  const win = typeof window !== "undefined" ? (window as unknown as { gc?: () => void }) : null;
  let ranGcHint = false;
  if (typeof win?.gc === "function") {
    try {
      win.gc();
      ranGcHint = true;
    } catch {
      /* noop */
    }
  }
  return {
    ranGcHint,
    clearedMidiDebug: true,
    clearedSpeedCurveSamples: true,
  };
}

/** True when any enabled FX maps audio pulses / triggers — Hydra can skip envelope sweeps when idle. */
export function fxHasReactiveTriggers(config: FolderConfig["fx"] | undefined): boolean {
  if (!config || typeof config !== "object") return false;
  for (const key of Object.keys(config)) {
    const row = config[key as keyof FolderConfig["fx"]];
    if (!row || typeof row !== "object" || !(row as { enabled?: boolean }).enabled) continue;
    const fx = row as {
      enabled: boolean;
      isTrigger?: boolean;
      syncBand?: string;
      paramSync?: Record<string, { isTrigger?: boolean; band?: string }>;
    };
    if (fx.isTrigger && fx.syncBand && fx.syncBand !== "none") return true;
    const psync = fx.paramSync;
    if (psync && typeof psync === "object") {
      for (const ps of Object.values(psync)) {
        if (!ps?.isTrigger) continue;
        if (ps.band && ps.band !== "none") return true;
      }
    }
  }
  return false;
}

/** Includes group layer instances and group composite rows. */
export function settingsHasReactiveTriggers(
  fx: FolderConfig["fx"] | undefined,
  layerInstances?: Record<string, import("../types/fxChainTree").LayerInstance>,
  fxGroups?: Record<string, import("../types/fxChainTree").FxGroup>,
): boolean {
  if (fxHasReactiveTriggers(fx)) return true;
  if (!layerInstances || !fxGroups) return false;
  for (const group of Object.values(fxGroups)) {
    if (!group?.enabled) continue;
    if (group.composite?.enabled) {
      const composite = group.composite;
      if (composite.isTrigger && composite.syncBand && composite.syncBand !== "none") return true;
      const psync = composite.paramSync;
      if (psync) {
        for (const ps of Object.values(psync)) {
          if (ps?.isTrigger && ps.band && ps.band !== "none") return true;
        }
      }
    }
    for (const layerId of group.layerIds) {
      const inst = layerInstances[layerId];
      if (!inst?.config.enabled) continue;
      const row = inst.config;
      if (row.isTrigger && row.syncBand && row.syncBand !== "none") return true;
      const psync = row.paramSync;
      if (psync) {
        for (const ps of Object.values(psync)) {
          if (ps?.isTrigger && ps.band && ps.band !== "none") return true;
        }
      }
    }
  }
  return false;
}
