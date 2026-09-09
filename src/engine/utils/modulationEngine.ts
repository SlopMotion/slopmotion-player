import type { TriggerEaseOutShape } from "../types/settings";
import { PULSE_HIT_DEFAULTS } from "./audioMapperDefaults";
import type { OneShotEnvelopeProfile, TriggerCondition } from "./paramBinding";
import {
  DEFAULT_EASE_OUT_SHAPE,
  easeInOutCubic,
  easeReleaseRemaining,
  triggerEnvelopeDuration,
} from "./triggerEnvelopeCurve";

export type AdsrPhase = "idle" | "attack" | "decay" | "sustain" | "release";

export type AdsrEnvelopeProfile = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export type AdsrEnvelopeState = {
  phase: AdsrPhase;
  level: number;
  gate: boolean;
};

export type EnvelopeFollowerState = {
  level: number;
};

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

const TIME_CONST = (tau: number, dt: number) => (tau <= 0 ? 1 : 1 - Math.exp(-dt / tau));

export function createAdsrEnvelopeState(): AdsrEnvelopeState {
  return { phase: "idle", level: 0, gate: false };
}
/** Gate-driven ADSR envelope step (Modulation panel EGs). */
export function stepAdsrEnvelope(
  st: AdsrEnvelopeState,
  gateOn: boolean,
  profile: AdsrEnvelopeProfile,
  dt: number,
): { level: number; phase: AdsrPhase } {
  if (gateOn && !st.gate) st.phase = "attack";
  if (!gateOn && st.gate && st.phase !== "idle") st.phase = "release";
  st.gate = gateOn;

  switch (st.phase) {
    case "attack": {
      st.level += profile.attack <= 0 ? 1 : dt / profile.attack;
      if (st.level >= 1) {
        st.level = 1;
        st.phase = "decay";
      }
      break;
    }
    case "decay": {
      const drop = profile.decay <= 0 ? 1 : dt / profile.decay;
      st.level -= drop * (1 - profile.sustain);
      if (st.level <= profile.sustain) {
        st.level = profile.sustain;
        st.phase = "sustain";
      }
      break;
    }
    case "sustain":
      st.level = profile.sustain;
      break;
    case "release": {
      st.level -= profile.release <= 0 ? 1 : (dt / profile.release) * Math.max(st.level, 0.001);
      if (st.level <= 0.0005) {
        st.level = 0;
        st.phase = "idle";
      }
      break;
    }
    default:
      st.level = 0;
  }

  st.level = clamp01(st.level);
  return { level: st.level, phase: st.phase };
}

/** Asymmetric attack/release follower (Modulation panel AMs). */
export function stepEnvelopeFollower(
  st: EnvelopeFollowerState,
  target: number,
  attack: number,
  release: number,
  dt: number,
): number {
  const clampedTarget = clamp01(target);
  const tau = clampedTarget > st.level ? attack : release;
  st.level += (clampedTarget - st.level) * TIME_CONST(tau, dt);
  st.level = clamp01(st.level);
  return st.level;
}

export function bandTriggerCrossed(bandVal: number, prev: number, threshold: number): boolean {
  return bandVal > threshold && prev <= threshold;
}

export type OneShotEnvelopeAnim =
  | {
      kind: "attack";
      t0: number;
      attack: number;
      release: number;
      decay: number;
      hold: number;
      easeShape: TriggerEaseOutShape;
    }
  | {
      kind: "hold";
      t0: number;
      duration: number;
      release: number;
      decay: number;
      easeShape: TriggerEaseOutShape;
    }
  | { kind: "release_ease"; t0: number; duration: number; easeShape: TriggerEaseOutShape }
  | { kind: "release_linear"; decay: number };

export type TriggeredBindingRuntime = {
  prevBands: Record<string, number>;
  stemHitsSeen: Set<string>;
  counts: Record<string, number>;
  envelopes: Record<string, number>;
  shapeOriginMs: Record<string, number>;
  queues: Record<string, number[]>;
  anims: Record<string, OneShotEnvelopeAnim>;
};

export function createTriggeredBindingRuntime(): TriggeredBindingRuntime {
  return {
    prevBands: {},
    stemHitsSeen: new Set<string>(),
    counts: {},
    envelopes: {},
    shapeOriginMs: {},
    queues: {},
    anims: {},
  };
}

export function clearTriggeredBindingRuntime(state: TriggeredBindingRuntime): void {
  state.prevBands = {};
  state.stemHitsSeen.clear();
  state.counts = {};
  state.envelopes = {};
  state.shapeOriginMs = {};
  state.queues = {};
  state.anims = {};
}

export function triggeredRuntimeHasMotion(state: TriggeredBindingRuntime): boolean {
  if (Object.keys(state.anims).length > 0) return true;
  for (const k in state.queues) {
    const q = state.queues[k];
    if (q && q.length > 0) return true;
  }
  return false;
}

export function fireOneShotEnvelope(
  state: TriggeredBindingRuntime,
  key: string,
  eventTimeMs: number,
  envelope: OneShotEnvelopeProfile,
  delaySec: number,
): void {
  const { attack, release, decay, hold } = envelope;
  const easeShape = envelope.easeShape ?? DEFAULT_EASE_OUT_SHAPE;

  state.shapeOriginMs[key] = eventTimeMs - Math.max(0, delaySec) * 1000;

  if (attack > 0) {
    state.anims[key] = { kind: "attack", t0: eventTimeMs, attack, release, decay, hold, easeShape };
    state.envelopes[key] = 0;
  } else if (hold > 0) {
    state.anims[key] = {
      kind: "hold",
      t0: eventTimeMs,
      duration: hold,
      release,
      decay,
      easeShape,
    };
    state.envelopes[key] = 1;
  } else if (release > 0) {
    state.anims[key] = { kind: "release_ease", t0: eventTimeMs, duration: release, easeShape };
    state.envelopes[key] = 1;
  } else {
    state.anims[key] = { kind: "release_linear", decay };
    state.envelopes[key] = 1;
  }
}

export function stepOneShotEnvelope(
  state: TriggeredBindingRuntime,
  key: string,
  nowMs: number,
  dt: number,
): void {
  const anim = state.anims[key];
  if (!anim) return;

  if (anim.kind === "attack") {
    const elapsedSec = (nowMs - anim.t0) / 1000;
    const u = anim.attack > 0 ? elapsedSec / anim.attack : 1;
    const cl = Math.max(0, Math.min(1, u));
    state.envelopes[key] = easeInOutCubic(cl);
    if (u >= 1) {
      state.envelopes[key] = 1;
      if (anim.hold > 0) {
        state.anims[key] = {
          kind: "hold",
          t0: nowMs,
          duration: anim.hold,
          release: anim.release,
          decay: anim.decay,
          easeShape: anim.easeShape,
        };
      } else if (anim.release > 0) {
        state.anims[key] = {
          kind: "release_ease",
          t0: nowMs,
          duration: anim.release,
          easeShape: anim.easeShape,
        };
      } else {
        state.anims[key] = { kind: "release_linear", decay: anim.decay };
      }
    }
  } else if (anim.kind === "hold") {
    state.envelopes[key] = 1;
    const elapsedHoldSec = (nowMs - anim.t0) / 1000;
    if (elapsedHoldSec >= anim.duration) {
      if (anim.release > 0) {
        state.anims[key] = {
          kind: "release_ease",
          t0: nowMs,
          duration: anim.release,
          easeShape: anim.easeShape,
        };
      } else {
        state.anims[key] = { kind: "release_linear", decay: anim.decay };
      }
    }
  } else if (anim.kind === "release_ease") {
    const elapsedRelSec = (nowMs - anim.t0) / 1000;
    const u = anim.duration > 0 ? elapsedRelSec / anim.duration : 1;
    const cl = Math.max(0, Math.min(1, u));
    state.envelopes[key] = easeReleaseRemaining(anim.easeShape ?? DEFAULT_EASE_OUT_SHAPE, cl);
    if (u >= 1) {
      state.envelopes[key] = 0;
      delete state.anims[key];
      delete state.shapeOriginMs[key];
    }
  } else if (anim.kind === "release_linear") {
    const v = state.envelopes[key] || 0;
    state.envelopes[key] = Math.max(0, v - dt * anim.decay);
    if ((state.envelopes[key] || 0) <= 0) {
      state.envelopes[key] = 0;
      delete state.anims[key];
      delete state.shapeOriginMs[key];
    }
  }
}

export function oneShotEnvelopePhaseU(
  state: TriggeredBindingRuntime,
  key: string,
  nowMs: number,
  trigger: TriggerCondition,
  envelope: OneShotEnvelopeProfile,
): number | undefined {
  const origin = state.shapeOriginMs[key];
  if (origin == null) return undefined;
  const active = !!state.anims[key] || (state.envelopes[key] ?? 0) > 1e-5;
  if (!active) return undefined;
  const tMax = triggerEnvelopeDuration(
    trigger.delay,
    envelope.attack,
    envelope.hold,
    envelope.release,
    envelope.decay,
  );
  return Math.max(0, Math.min(1, (nowMs - origin) / 1000 / tMax));
}

export type StepTriggeredBindingOptions = {
  key: string;
  bandVal: number;
  stemHits: number;
  trigger: TriggerCondition;
  envelope: OneShotEnvelopeProfile;
  nowMs: number;
  dt: number;
  onFire?: (key: string) => void;
};

/** Threshold/count/delay gating plus one-shot envelope step for one mapping key. */
export function stepTriggeredBinding(
  state: TriggeredBindingRuntime,
  opts: StepTriggeredBindingOptions,
): number | undefined {
  const { key, bandVal, stemHits, trigger, envelope, nowMs, dt, onFire } = opts;
  const prev = state.prevBands[key] || 0;
  const threshold = trigger.threshold ?? PULSE_HIT_DEFAULTS.triggerThreshold;
  const count = trigger.count ?? PULSE_HIT_DEFAULTS.triggerCount;
  const delay = trigger.delay ?? PULSE_HIT_DEFAULTS.delay;

  const edgeHits = stemHits > 0 ? stemHits : bandTriggerCrossed(bandVal, prev, threshold) ? 1 : 0;

  for (let h = 0; h < edgeHits; h++) {
    state.counts[key] = (state.counts[key] || 0) + 1;
    if (state.counts[key] >= count) {
      state.counts[key] = 0;
      if (delay > 0) {
        if (!state.queues[key]) state.queues[key] = [];
        state.queues[key].push(nowMs + delay * 1000);
      } else {
        onFire?.(key);
        fireOneShotEnvelope(state, key, nowMs, envelope, delay);
      }
    }
  }

  if (state.queues[key]?.length) {
    while (state.queues[key]![0] <= nowMs) {
      onFire?.(key);
      fireOneShotEnvelope(state, key, nowMs, envelope, delay);
      state.queues[key]!.shift();
      if (!state.queues[key]?.length) break;
    }
  }

  stepOneShotEnvelope(state, key, nowMs, dt);
  state.prevBands[key] = bandVal;

  return oneShotEnvelopePhaseU(state, key, nowMs, trigger, envelope);
}
