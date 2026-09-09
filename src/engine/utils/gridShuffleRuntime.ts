import type { ParamBinding } from "./paramBinding";
import { bindingIsTriggered } from "./paramBinding";
import { getTriggerBandLevel } from "./fxRuntime";
import type { AudioBands } from "../hooks/useAudioAnalyzer";

export type GridShuffleRuntimeState = {
  seed: number;
  prevEnvelope: number;
  prevBand: number;
  followCooldownMs: number;
};

export function createGridShuffleRuntimeState(seed = 1): GridShuffleRuntimeState {
  return { seed, prevEnvelope: 0, prevBand: 0, followCooldownMs: 0 };
}

let runtime = createGridShuffleRuntimeState();

export function getGridShuffleSeed(): number {
  return runtime.seed;
}

export function resetGridShuffleRuntime(seed = 1): void {
  runtime = createGridShuffleRuntimeState(seed);
}

function bumpSeed(state: GridShuffleRuntimeState): void {
  state.seed = (state.seed * 1.6180339887 + 1.23456789) % 10000;
  if (state.seed < 0.001) state.seed = 1;
}

export type AdvanceGridShuffleOpts = {
  envelope: number;
  binding: ParamBinding;
  bands: (AudioBands & Record<string, number>) | undefined;
  dt: number;
  state?: GridShuffleRuntimeState;
};

/** Rising-edge pulse or follow-band hits advance the shuffle seed. */
export function advanceGridShuffleSeed(opts: AdvanceGridShuffleOpts): number {
  const state = opts.state ?? runtime;
  const envEdge = opts.envelope > 0.02 && state.prevEnvelope <= 0.02;
  if (envEdge) {
    bumpSeed(state);
  }

  if (!bindingIsTriggered(opts.binding)) {
    const bandVal = getTriggerBandLevel(opts.binding.source, opts.bands, opts.binding.depth);
    const bandEdge = bandVal > 0.35 && state.prevBand <= 0.35;
    state.followCooldownMs = Math.max(0, state.followCooldownMs - opts.dt * 1000);
    if (bandEdge || (bandVal > 0.55 && state.followCooldownMs <= 0)) {
      bumpSeed(state);
      state.followCooldownMs = 180;
    }
    state.prevBand = bandVal;
  } else {
    state.prevBand = 0;
  }

  state.prevEnvelope = opts.envelope;
  return state.seed;
}
