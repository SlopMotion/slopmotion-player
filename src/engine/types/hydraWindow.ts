import type { MutableRefObject } from "react";
import type { AnalyzerLiveSnapshot, AudioBands } from "../hooks/useAudioAnalyzer";
import type { OscilloscopeWaveformBundle } from "../utils/oscilloscopeWaveform";
import type { ExportSettings, FolderConfig, ModulationSettings, OutputMapping } from "./settings";
import type { ParVaguesDiscreteEvent } from "./parVaguesBundle";
import type { TriggerDebugBands } from "../utils/triggerDebugBands";
import type { BandEventCharacterMap } from "../utils/eventShape";
import type { TrackTimelineAnalysis } from "../utils/analyzeTrackTimeline";

export interface HydraClipPeekVideoApi {
  preloadPath: (path: string | null) => void;
  beginPeek: (
    targetPath: string,
    returnPath: string,
    returnTimeSec: number,
    targetTimeSec?: number,
  ) => boolean;
  endPeek: (returnPath: string, returnTimeSec: number) => boolean;
  beginZap: (returnPath: string, returnTimeSec: number) => void;
  showZapClip: (path: string) => "ready" | "loading" | "failed";
  completeZapClipLoad: (path: string) => boolean;
  endZap: (returnPath: string, returnTimeSec: number) => boolean;
  cancelZap: () => void;
}

export interface TriggerDebugStudioContext {
  playbackSec: number;
  bpm: number;
  events: TrackTimelineAnalysis["events"];
}

export interface HydraChain {
  scale?: (...args: unknown[]) => HydraChain;
  scrollX?: (...args: unknown[]) => HydraChain;
  scrollY?: (...args: unknown[]) => HydraChain;
  pixelate?: (...args: unknown[]) => HydraChain;
  blend?: (...args: unknown[]) => HydraChain;
  mask?: (...args: unknown[]) => HydraChain;
  add?: (...args: unknown[]) => HydraChain;
  diff?: (...args: unknown[]) => HydraChain;
  out?: (...args: unknown[]) => void;
  [key: string]: unknown;
}

export interface HydraVideoSource {
  src?: HTMLVideoElement | HTMLCanvasElement;
  init?: (opts: { src: HTMLVideoElement | HTMLCanvasElement; dynamic?: boolean }) => void;
  initVideo?: (url: string) => void;
  tex?: {
    width?: number;
    height?: number;
    resize?: (width: number, height: number) => void;
    subimage: (img: CanvasImageSource) => void;
  };
}

export interface HydraSynthInstance {
  speed?: number;
  time?: number;
  /** When set, hydra-synth throttles WebGL output to this FPS (undefined = every raf tick). */
  fps?: number;
  setFunction?: (def: Record<string, unknown>) => void;
}

export interface HydraInstance {
  canvas?: HTMLCanvasElement;
  synth?: HydraSynthInstance;
  setResolution?: (width: number, height: number) => void;
  tick?: (dt: number, uniforms?: unknown) => void;
}

export interface HydraWindow extends Window {
  s0?: HydraVideoSource;
  s1?: HydraVideoSource;
  s2?: HydraVideoSource;
  s3?: HydraVideoSource;
  hydraSettings?: FolderConfig;
  /** Global export target — read by Record Matte when aspect = Match Export. */
  exportSettings?: ExportSettings;
  /** Live output-shape mapping — read by terminal outputCornerPin getters. */
  outputMapping?: OutputMapping;
  /** True while the output-map editor overlay is open (live preview warp). */
  outputMappingEditOpen?: boolean;
  customBands?: AudioBands & Record<string, number>;
  /** Latest FFT magnitude frame for custom AM range band-pass (live analyzer or Studio). */
  audioSpectrum?: Uint8Array;
  audioSampleRate?: number;
  hydraEnvelopes?: Record<string, number>;
  /** Transport fallback while a Slowmo hit envelope is active (ms, performance.now). */
  slowmoPulseUntilMs?: number;
  /** Progressive feedback trail mix for Slowmo frame ghosts (0–0.92). */
  slowmoTrailMix?: number;
  /** Transport fallback while an Accelerate hit envelope is active (ms, performance.now). */
  acceleratePulseUntilMs?: number;
  hydraEnvelopePhaseU?: Record<string, number>;
  /** Live trigger-gate hit progress per binding key (`fxKey` or `fxKey:paramKey`). */
  hydraTriggerCounts?: Record<string, number>;
  /** Live modulation-source state (LFO / EG / AM), published by useModulationSources. */
  hydraModulation?: {
    config?: ModulationSettings;
    /** 1-based instance index → current 0–1 level. */
    lfo?: Record<number, number>;
    eg?: Record<number, number>;
    /** 1-based EG index → current ADSR stage (drives the preview playhead). */
    egStage?: Record<number, "idle" | "attack" | "decay" | "sustain" | "release">;
    /** One-shot EG preview phase 0–1 (when mode = oneshot). */
    egOneShotPhase?: Record<number, number>;
    am?: Record<number, number>;
    /** 1-based stepper index → current 0–1 level. */
    step?: Record<number, number>;
    /** 1-based stepper index → current table playhead. */
    stepIndex?: Record<number, number>;
  };
  masterDbfs?: number;
  low?: number;
  mid?: number;
  high?: number;
  beat?: number;
  kick?: number;
  /** Raw analyzed gates for Trigger Debug (studio timeline or live detectors). */
  triggerDebug?: TriggerDebugBands;
  /** Live hit shape per band — intensity + sustain for trigger visuals. */
  bandEventCharacters?: BandEventCharacterMap;
  /** Studio: timeline events + playhead for Trigger Debug highway (works paused). */
  triggerDebugStudio?: TriggerDebugStudioContext | null;
  /** Studio + ParVagues: strongest discrete event in the current pulse window. */
  studioEventPulse?: ParVaguesDiscreteEvent | null;
  /** Studio + ParVagues: all discrete events in the pulse window (orbit/role/strength). */
  studioEventPulses?: ParVaguesDiscreteEvent[];
  /** Studio + ParVagues: max strength per orbit in pulse window (1–12). */
  studioOrbitPulse?: Record<number, number>;
  /** Studio + ParVagues: max strength per role in pulse window. */
  studioRolePulse?: Record<string, number>;
  /** Manual BPM — drives LFO rate (cycles per beat × multiplier). */
  hydraBpm?: number;
  /** Master playhead (seconds) from the last studio band tick. */
  studioPlaybackMasterSec?: number;
  /** Stem/orbit events crossed since previous playhead sample — `(prevT, t]`. */
  studioStemEventsStep?: ParVaguesDiscreteEvent[];
  /** Set when playhead jumps — clears per-FX stem hit de-dupe. */
  studioStemHitsReset?: boolean;
  /** `localStorage.debugStemTriggers=1` — last-frame stem FX diagnostics. */
  studioStemTriggerDebug?: {
    t: number;
    prevT: number;
    stepTotal: number;
    windowTotal: number;
    byRoleStep: Record<string, number>;
  };
  masterLevel?: number;
  /** Smoothed vibration amplitude (0–1), updated in the Hydra RAF loop. */
  vibrationAmp?: number;
  /** Smoothed degauss amplitude (0–1), updated in the Hydra RAF loop. */
  degaussAmp?: number;
  /** Studio: true while soundtrack or Playset video transport is running. */
  studioTransportActive?: boolean;
  /** hydra-synth global clock rate (`makeGlobal`). Copied onto `synth.speed` every tick. */
  speed?: number;
  /** hydra-synth global shader time in seconds (`makeGlobal`). */
  time?: number;
  /** Pinned hydra-synth `time` while transport is paused (shader freeze). */
  studioFrozenTimeSec?: number;
  /** Live analyzer snapshot for Oscilloscope waveform push (optional). */
  oscilloscopeLiveRef?: MutableRefObject<AnalyzerLiveSnapshot>;
  /** Scrolling waveform canvas uploaded to the Oscilloscope overlay source. */
  oscilloscopeWaveformBundle?: OscilloscopeWaveformBundle | null;
  /** Studio: master peaks + playhead for Oscilloscope trace sampling. */
  studioOscilloscopePeaks?: Float32Array | null;
  studioOscilloscopeDurationSec?: number;
  studioOscilloscopeTimeSec?: number;
  /** HydraCanvas registers this so patched initVideo applies saved Video Speed on commit. */
  __hydraVideoSpeedSync?: (video: HTMLVideoElement) => void;
  /** Preview capture (scripts/capture_fx_previews.mjs) — offline FX screenshot tooling. */
  __hydraApplyScene?: () => void;
  __hydraSetPreviewVideo?: (path: string) => void;
  /** Preview capture: swap primary clip with transition crossfade when enabled. */
  __hydraSwapPreviewVideo?: (path: string) => void;
  /** Force primary s0/s1 reload after React state commits a new playset clip. */
  __hydraReloadPrimaryVideo?: () => void;
  __hydraSetTriggerGate?: (on: boolean) => void;
  /** Preview capture: force this visual FX onto the render chain for one isolated shot. */
  __hydraIsolateFxKey?: string | null;
  __hydraReactionDiffReset?: () => void;
  /** Pattern Turing (o3) — blank-canvas center seed, not Labs video-driven React Diff. */
  __hydraPatternRdReset?: () => void;
  __hydraSetOutputMapping?: (mapping: OutputMapping) => void;
  __hydraLumaDustReset?: () => void;
  /** Feedback FX — drop the recirculated frame so trails restart from the live picture. */
  __hydraFeedbackReset?: () => void;
  /** Playback Cue FX: seek target (seconds) applied after the next primary clip load. */
  __hydraPendingPlaybackCueSeek?: number;
  /** Clip Peek FX: skip the next primary load when channels already switched. */
  __hydraClipPeekSkipLoad?: string;
  /** Cue Layer / Clip Peek: load this path even while transport is marked busy. */
  __hydraTransportFallbackLoad?: string;
  /** Transport FX: next primary load uses channel swap, not transition crossfade. */
  __hydraInstantVideoLoad?: boolean;
  /** Clip Peek FX: dual-channel preload + instant swap (HydraCanvas). */
  __hydraClipPeekVideo?: HydraClipPeekVideoApi;
  /** Manual / MIDI one-shot fire for trigger-only FX rows (Slowmo, Jump Cut, …). */
  __hydraFireFxTrigger?: (fxKey: string) => void;
  osc?: (...args: unknown[]) => HydraChain;
  noise?: (...args: unknown[]) => HydraChain;
  src?: (...args: unknown[]) => HydraChain;
  shape?: (...args: unknown[]) => HydraChain;
  solid?: (...args: unknown[]) => HydraChain;
  voronoi?: (...args: unknown[]) => HydraChain;
  concentricMask?: (...args: unknown[]) => HydraChain;
  concentricSquareMask?: (...args: unknown[]) => HydraChain;
  perspectiveSlatMask?: (...args: unknown[]) => HydraChain;
  gaussianNoiseGrid?: (...args: unknown[]) => HydraChain;
  o0?: HydraChain;
}

export function getHydraWindow(): HydraWindow {
  return window as unknown as HydraWindow;
}
