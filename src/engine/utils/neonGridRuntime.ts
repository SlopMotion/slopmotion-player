import type { ParamBinding } from "./paramBinding";
import { bindingIsTriggered } from "./paramBinding";
import { getTriggerBandLevel } from "./fxRuntime";
import type { AudioBands } from "../hooks/useAudioAnalyzer";
import type { NeonGridBundle, NeonGridDrawOpts, NeonGridSpawnOpts } from "./neonGridLines";
import {
  neonGridColorsFromParams,
  spawnNeonGridLines,
  stepNeonGridLines,
  syncNeonGridTexture,
  type NeonGridTexSource,
} from "./neonGridLines";
import {
  bindOverlayCanvasSource,
  type OverlayCanvasOwner,
} from "./overlayCanvasSource";

export type NeonGridRuntimeState = {
  prevEnvelope: number;
  prevBand: number;
  followCooldownMs: number;
};

export function createNeonGridRuntimeState(): NeonGridRuntimeState {
  return { prevEnvelope: 0, prevBand: 0, followCooldownMs: 0 };
}

export type AdvanceNeonGridOpts = {
  bundle: NeonGridBundle;
  s3: NeonGridTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  params: Record<string, unknown> | undefined;
  spawn: NeonGridSpawnOpts;
  draw: Omit<NeonGridDrawOpts, "colors" | "dt">;
  dt: number;
  now: number;
  aspect: number;
  envelope: number;
  binding: ParamBinding;
  bands: (AudioBands & Record<string, number>) | undefined;
  runtime: NeonGridRuntimeState;
  shouldBind?: boolean;
};

export function advanceNeonGridFrame(opts: AdvanceNeonGridOpts): void {
  const {
    bundle,
    s3,
    bindState,
    params,
    spawn,
    draw,
    dt,
    now,
    aspect,
    envelope,
    binding,
    bands,
    runtime,
    shouldBind = true,
  } = opts;

  if (!s3?.tex) return;

  if (shouldBind) {
    bindOverlayCanvasSource(s3, bundle.canvas, "neonGrid", bindState);
  }

  if (!bindingIsTriggered(binding)) {
    const bandVal = getTriggerBandLevel(binding.source, bands, binding.depth);
    const bandEdge = bandVal > 0.35 && runtime.prevBand <= 0.35;
    runtime.followCooldownMs = Math.max(0, runtime.followCooldownMs - dt * 1000);
    if (bandEdge || (bandVal > 0.55 && runtime.followCooldownMs <= 0)) {
      spawnNeonGridLines(bundle, spawn);
      runtime.followCooldownMs = 120;
    }
    runtime.prevBand = bandVal;
  } else {
    runtime.prevBand = 0;
  }
  runtime.prevEnvelope = envelope;

  stepNeonGridLines(bundle, dt, draw.decay);
  syncNeonGridTexture(
    s3,
    bundle,
    {
      ...draw,
      dt,
      colors: neonGridColorsFromParams(params),
    },
    aspect,
    now,
    shouldBind ? 0 : 999999,
  );
}

export function seedNeonGridDemo(
  bundle: NeonGridBundle,
  spawn: NeonGridSpawnOpts,
): void {
  bundle.lines = [];
  const count = Math.max(3, Math.round(spawn.spawn));
  spawnNeonGridLines(bundle, { ...spawn, spawn: count, horizontal: 1, vertical: 0 });
  spawnNeonGridLines(bundle, { ...spawn, spawn: count, horizontal: 0, vertical: 1 });
  bundle.lastUploadMs = 0;
}

export type FlushNeonGridTextureOpts = {
  bundle: NeonGridBundle;
  s3: NeonGridTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  params: Record<string, unknown> | undefined;
  draw: Omit<NeonGridDrawOpts, "colors" | "dt">;
  aspect: number;
  now: number;
};

export function flushNeonGridTexture(opts: FlushNeonGridTextureOpts): boolean {
  const { bundle, s3, bindState, params, draw, aspect, now } = opts;
  if (!s3?.tex || bundle.lines.length === 0) return false;
  bindOverlayCanvasSource(s3, bundle.canvas, "neonGrid", bindState);
  bundle.lastUploadMs = 0;
  return syncNeonGridTexture(
    s3,
    bundle,
    {
      ...draw,
      dt: 0,
      colors: neonGridColorsFromParams(params),
    },
    aspect,
    now,
    0,
  );
}
