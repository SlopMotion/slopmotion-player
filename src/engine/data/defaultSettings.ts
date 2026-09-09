import type {
  FolderPlaybackState,
  FolderConfig,
  FXConfig,
  GlobalSettings,
  Scene,
  SceneTrackerPattern,
  ParamSync,
} from "../types/settings";
import {
  defaultLaunchControlMidiMap,
  defaultLaunchpadMiniMidiMap,
  defaultLaunchkeyMidiMap,
  ensureLaunchControlSlots,
  ensureLaunchpadMiniSlots,
  ensureLaunchkeySlots,
} from "../types/midiMap";
import { DEFAULT_EXPORT_SETTINGS } from "./exportPresets";
import { DEFAULT_OUTPUT_MAPPING } from "./outputMapping";
import { DEFAULT_ENTITLEMENTS } from "../utils/fxEntitlements";
import { migrateLegacyRampGradientFx } from "../utils/rampGradientStops";
import { createDefaultModulation } from "../utils/modulationSources";
import {
  createDefaultHydraFxMap,
  createOnboardingFxMap,
  ONBOARDING_ACTIVE_FX,
  DEFAULT_SCROLL_FX,
} from "./defaultHydraFxMap";
export { createDefaultHydraFxMap } from "./defaultHydraFxMap";

const DEFAULT_SCENE_TRACKERS: SceneTrackerPattern[] = [
  {
    id: "tracker-default-a",
    name: "Pattern 1",
    beatsPerStep: 4,
    steps: [null, null, null, null, null, null, null, null],
  },
];

function legacyScrollRow(
  row: Partial<FolderConfig["fx"]["scroll"]> | undefined,
): Partial<FolderConfig["fx"]["scroll"]> {
  if (!row || typeof row !== "object") return {};
  const {
    enabled,
    base,
    syncBand,
    syncMultiplier,
    isTrigger,
    triggerThreshold,
    triggerCount,
    delay,
    decay,
    triggerAttack,
    triggerRelease,
    triggerHold,
    triggerEaseOutShape,
  } = row;
  return {
    enabled,
    base,
    syncBand,
    syncMultiplier,
    isTrigger,
    triggerThreshold,
    triggerCount,
    delay,
    decay,
    triggerAttack,
    triggerRelease,
    triggerHold,
    triggerEaseOutShape,
  };
}

/** Fold legacy scrollX / scrollY rows into the combined scroll effect. */
export function migrateLegacyScrollFx(
  saved: Partial<FolderConfig["fx"]> & Record<string, unknown>,
): Partial<FolderConfig["fx"]> {
  const scrollX = saved.scrollX as FolderConfig["fx"]["scroll"] | undefined;
  const scrollY = saved.scrollY as FolderConfig["fx"]["scroll"] | undefined;
  if (!scrollX && !scrollY) return saved;

  const next = { ...saved } as Partial<FolderConfig["fx"]> & Record<string, unknown>;
  const template = DEFAULT_SCROLL_FX;
  const fromX = (scrollX ?? {}) as Partial<FolderConfig["fx"]["scroll"]>;
  const fromY = (scrollY ?? {}) as Partial<FolderConfig["fx"]["scroll"]>;

  next.scroll = {
    ...template,
    ...legacyScrollRow(fromX),
    enabled: Boolean(fromX.enabled || fromY.enabled),
    params: {
      ...(template.params ?? {}),
      y: fromY.base ?? template.params?.y ?? 0,
    },
    ...(scrollY
      ? {
          paramSync: {
            ...(template.paramSync ?? {}),
            y: {
              band: fromY.syncBand ?? "mid",
              multiplier: fromY.syncMultiplier ?? 0.05,
              isTrigger: fromY.isTrigger,
              triggerThreshold: fromY.triggerThreshold,
              triggerCount: fromY.triggerCount,
              delay: fromY.delay,
              decay: fromY.decay,
              triggerAttack: fromY.triggerAttack,
              triggerRelease: fromY.triggerRelease,
              triggerHold: fromY.triggerHold,
              triggerEaseOutShape: fromY.triggerEaseOutShape,
            },
          },
        }
      : {}),
  };

  delete next.scrollX;
  delete next.scrollY;
  return next;
}

export function migrateScrollFxActiveList(list: string[]): (keyof FolderConfig["fx"])[] {
  if (!list.some((k) => k === "scrollX" || k === "scrollY")) {
    return list.filter((k): k is keyof FolderConfig["fx"] => k in createDefaultHydraFxMap());
  }
  const without = list.filter((k) => k !== "scrollX" && k !== "scrollY");
  const xIdx = list.indexOf("scrollX");
  const yIdx = list.indexOf("scrollY");
  const insertAt = Math.min(xIdx === -1 ? Infinity : xIdx, yIdx === -1 ? Infinity : yIdx);
  if (!without.includes("scroll")) {
    without.splice(insertAt === Infinity ? without.length : insertAt, 0, "scroll");
  }
  return without.filter((k): k is keyof FolderConfig["fx"] => k in createDefaultHydraFxMap());
}

/** Fold legacy standalone saturation into Color Adjust (params + optional paramSync). */
export function migrateLegacySaturationFx(
  saved: Partial<FolderConfig["fx"]> & Record<string, unknown>,
): Partial<FolderConfig["fx"]> & Record<string, unknown> {
  const sat = saved.saturation as FXConfig | undefined;
  if (!sat || typeof sat !== "object") return saved;

  const next = { ...saved } as Partial<FolderConfig["fx"]> & Record<string, unknown>;
  const template = createDefaultHydraFxMap().colorAdjust;
  const existing = (next.colorAdjust ?? {}) as FXConfig;
  const params = {
    ...(template.params ?? {}),
    ...(existing.params ?? {}),
    saturation: sat.base ?? (existing.params?.saturation as number) ?? 1.0,
  };

  const paramSync: Record<string, ParamSync> = { ...(existing.paramSync ?? {}) };
  const band = sat.syncBand;
  const mult = sat.syncMultiplier;
  if (band && band !== "none" && typeof mult === "number" && mult !== 0) {
    paramSync.saturation = { band, multiplier: mult };
  }

  next.colorAdjust = {
    ...template,
    ...existing,
    enabled: Boolean(existing.enabled || sat.enabled),
    params,
    ...(Object.keys(paramSync).length ? { paramSync } : {}),
  };

  delete next.saturation;
  return next;
}

/**
 * Color Adjust hue is stored as degrees (0…360). Older saves passed Hydra HSV
 * turn units (−π…π slider, values added directly to 0–1 hue). Convert once.
 */
export function migrateColorAdjustHueDegrees(
  saved: Partial<FolderConfig["fx"]> & Record<string, unknown>,
): Partial<FolderConfig["fx"]> & Record<string, unknown> {
  const row = saved.colorAdjust as FXConfig | undefined;
  if (!row?.params || typeof row.params !== "object") return saved;
  const params = row.params as Record<string, unknown>;
  if (params.hueRev === 2) return saved;
  const raw = params.hue;
  if (typeof raw !== "number" || !Number.isFinite(raw)) {
    return {
      ...saved,
      colorAdjust: { ...row, params: { ...params, hueRev: 2 } },
    };
  }

  let deg = raw * 360;
  deg = ((deg % 360) + 360) % 360;

  return {
    ...saved,
    colorAdjust: {
      ...row,
      params: { ...params, hue: deg, hueRev: 2 },
    },
  };
}

const DISTORTION_STYLE_REV = 2;

/** Old 0–5 enum → new 0–3 (pinch / H / V / radial). Only for legacy rows without styleRev. */
function remapLegacyDistortionMode(mode: number, params: Record<string, unknown>): number {
  if (mode === 2 && !("curvature" in params) && "frequency" in params) return 1;
  if (mode >= 3) return mode - 2;
  if (mode === 1 || mode === 2) return 0;
  return 0;
}

/** Legacy Distortion modes (barrel/spherize/sweep) → pincushion + sweeps only. */
export function migrateLegacyDistortionFx(
  saved: Partial<FolderConfig["fx"]> & Record<string, unknown>,
): Partial<FolderConfig["fx"]> & Record<string, unknown> {
  const row = saved.distortion as FXConfig | undefined;
  if (!row?.params || typeof row.params !== "object") return saved;

  const params = { ...(row.params ?? {}) };
  if (Number(params.styleRev) >= DISTORTION_STYLE_REV) return saved;

  const mode = Math.round(Number(params.mode ?? 0));
  params.mode = remapLegacyDistortionMode(mode, params);

  if (!("curvature" in params)) {
    const freqNum = Number(params.frequency);
    params.curvature = Number.isFinite(freqNum)
      ? Math.max(0.2, Math.min(2, freqNum / 12))
      : 1;
  }

  params.styleRev = DISTORTION_STYLE_REV;

  const next = { ...saved } as Partial<FolderConfig["fx"]> & Record<string, unknown>;
  next.distortion = { ...row, params };
  return next;
}

/** Retired blur style 3=Directional + angle param → Gaussian, drop direction. */
export function migrateLegacyBlurFx(
  saved: Partial<FolderConfig["fx"]> & Record<string, unknown>,
): Partial<FolderConfig["fx"]> & Record<string, unknown> {
  const row = saved.blur as FXConfig | undefined;
  if (!row?.params || typeof row.params !== "object") return saved;
  const params: Record<string, number | string> = { ...row.params };
  const mode = Number(params.mode);
  const hasAngle = "angle" in params;
  if (!(Number.isFinite(mode) && mode >= 3) && !hasAngle) return saved;
  if (Number.isFinite(mode) && mode >= 3) params.mode = 0;
  delete params.angle;
  const next = { ...saved } as Partial<FolderConfig["fx"]> & Record<string, unknown>;
  const paramSync = row.paramSync ? { ...row.paramSync } : undefined;
  if (paramSync && "angle" in paramSync) delete paramSync.angle;
  next.blur = {
    ...row,
    params,
    ...(paramSync ? { paramSync } : {}),
  };
  return next;
}

/** Legacy Normal Map source 2=Video (old 3-way schema) → 1=Bump. Leave 0/1 untouched. */
export function migrateLegacyNormalMapSource(
  saved: Partial<FolderConfig["fx"]> & Record<string, unknown>,
): Partial<FolderConfig["fx"]> & Record<string, unknown> {
  const row = saved.normalMap as FXConfig | undefined;
  if (!row?.params || typeof row.params !== "object") return saved;
  const source = Number((row.params as Record<string, unknown>).source);
  if (!Number.isFinite(source) || source < 2) return saved;
  const next = { ...saved } as Partial<FolderConfig["fx"]> & Record<string, unknown>;
  next.normalMap = {
    ...row,
    params: { ...row.params, source: 1 },
  };
  return next;
}

/** Legacy coordinate Oscilloscope → sweep params on Distortion; row becomes waveform trace FX. */
export function migrateLegacyOscilloscopeFx(
  saved: Partial<FolderConfig["fx"]> & Record<string, unknown>,
): Partial<FolderConfig["fx"]> & Record<string, unknown> {
  const row = saved.oscilloscope as FXConfig | undefined;
  if (!row?.params || typeof row.params !== "object") return saved;
  if (!("frequency" in row.params) && !("centerFocus" in row.params)) return saved;

  const template = createDefaultHydraFxMap();
  const oscParams = { ...(template.oscilloscope.params ?? {}), ...row.params };
  const dist = (saved.distortion ?? template.distortion) as FXConfig;
  const distParams = { ...(template.distortion.params ?? {}), ...(dist.params ?? {}) };

  const next = { ...saved } as Partial<FolderConfig["fx"]> & Record<string, unknown>;
  next.distortion = {
    ...dist,
    enabled: dist.enabled || row.enabled,
    params: {
      ...distParams,
      mode: 1,
      frequency: oscParams.frequency ?? distParams.frequency,
      speed: oscParams.speed ?? distParams.speed,
      centerFocus: oscParams.centerFocus ?? distParams.centerFocus,
      styleRev: DISTORTION_STYLE_REV,
    },
  };
  delete oscParams.frequency;
  delete oscParams.speed;
  delete oscParams.centerFocus;
  next.oscilloscope = {
    ...row,
    params: {
      mode: 0,
      persistence: 0.62,
      scale: 0.38,
      positionY: 0.52,
      glow: 0.4,
      ...oscParams,
    },
  };
  return next;
}

export function migrateSaturationFxActiveList(list: string[]): (keyof FolderConfig["fx"])[] {
  if (!list.includes("saturation")) {
    return list.filter((k): k is keyof FolderConfig["fx"] => k in createDefaultHydraFxMap());
  }
  const without = list.filter((k) => k !== "saturation");
  if (without.includes("colorAdjust")) {
    return without.filter((k): k is keyof FolderConfig["fx"] => k in createDefaultHydraFxMap());
  }
  const idx = list.indexOf("saturation");
  const next = [...without];
  next.splice(Math.min(idx, next.length), 0, "colorAdjust");
  return next.filter((k): k is keyof FolderConfig["fx"] => k in createDefaultHydraFxMap());
}

/** Fold legacy Bayer `dither` + `stochasticDither` into unified blue-noise `dither`. */
export function migrateLegacyDitherFx(
  saved: Partial<FolderConfig["fx"]> & Record<string, unknown>,
): Partial<FolderConfig["fx"]> & Record<string, unknown> {
  const stoch = saved.stochasticDither as FXConfig | undefined;
  const legacy = saved.dither as FXConfig | undefined;
  if (!stoch && !legacy) return saved;

  const next = { ...saved } as Partial<FolderConfig["fx"]> & Record<string, unknown>;
  const template = createDefaultHydraFxMap().dither;
  const enabled = Boolean(legacy?.enabled || stoch?.enabled);

  if (stoch) {
    next.dither = {
      ...template,
      ...legacy,
      ...stoch,
      enabled,
      params: {
        ...(template.params ?? {}),
        ...(legacy?.params ?? {}),
        ...(stoch.params ?? {}),
      },
      ...(legacy?.paramSync || stoch.paramSync
        ? {
            paramSync: {
              ...(legacy?.paramSync ?? {}),
              ...(stoch.paramSync ?? {}),
            },
          }
        : {}),
    };
  } else if (legacy) {
    next.dither = {
      ...template,
      ...legacy,
      params: {
        ...(template.params ?? {}),
        ...(legacy.params ?? {}),
      },
    };
  }

  delete next.stochasticDither;
  return next;
}

export function migrateDitherFxActiveList(list: string[]): (keyof FolderConfig["fx"])[] {
  if (!list.includes("stochasticDither")) {
    return list.filter((k): k is keyof FolderConfig["fx"] => k in createDefaultHydraFxMap());
  }
  const without = list.filter((k) => k !== "stochasticDither");
  if (!without.includes("dither")) {
    const idx = list.indexOf("stochasticDither");
    without.splice(Math.min(idx, without.length), 0, "dither");
  }
  return without.filter((k): k is keyof FolderConfig["fx"] => k in createDefaultHydraFxMap());
}

/** Merge persisted `global.fx` with defaults so new FX keys (e.g. colorAdjust) always exist. */
export function mergeGlobalFxMap(
  saved: Partial<FolderConfig["fx"]> | undefined,
): FolderConfig["fx"] {
  const templateFx = createDefaultHydraFxMap();
  const savedRaw = saved && typeof saved === "object" ? saved : {};
  const savedFx = migrateLegacyRampGradientFx(
    migrateColorAdjustHueDegrees(
      migrateLegacyBlurFx(
        migrateLegacyNormalMapSource(
          migrateLegacyOscilloscopeFx(
            migrateLegacyDistortionFx(
              migrateLegacyDitherFx(
                migrateLegacySaturationFx(
                  migrateLegacyScrollFx(savedRaw as Partial<FolderConfig["fx"]> & Record<string, unknown>),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
  const nextFx = { ...templateFx } as FolderConfig["fx"];
  for (const k of Object.keys(templateFx) as (keyof FolderConfig["fx"])[]) {
    const templateRow = templateFx[k];
    const row = savedFx[k];
    if (row && typeof row === "object") {
      const merged = { ...templateRow, ...row } as FolderConfig["fx"][typeof k];
      if (templateRow.params || row.params) {
        merged.params = { ...(templateRow.params || {}), ...(row.params || {}) };
      }
      if (templateRow.paramSync || row.paramSync) {
        merged.paramSync = { ...(templateRow.paramSync || {}), ...(row.paramSync || {}) };
      }
      nextFx[k] = merged;
    } else {
      nextFx[k] = { ...templateRow } as FolderConfig["fx"][typeof k];
    }
  }
  return nextFx;
}

/** Shipped mood scenes; paths match `src/data/videoLibrary.json` Playsets. */
export const DEMO_MOOD_SCENES: Scene[] = [
  {
    id: "demo-mood-drift",
    name: "Drift",
    playsetFolder: "white-hole",
    fxPresetId: "demo-fx-drift",
    videoPaths: [
      "/loops/white-hole/WhiteHole__1xy8__287.mp4",
      "/loops/white-hole/WhiteHole__a47l__290.mp4",
      "/loops/white-hole/WhiteHole__db4q__286.mp4",
    ],
  },
  {
    id: "demo-mood-cosmic",
    name: "Cosmic calm",
    playsetFolder: "white-hole",
    fxPresetId: "demo-fx-cosmic",
    videoPaths: [
      "/loops/white-hole/WhiteHole__0dzu__20.mp4",
      "/loops/white-hole/WhiteHole__03i7__79.mp4",
      "/loops/white-hole/WhiteHole__01ef__143.mp4",
    ],
  },
  {
    id: "demo-mood-neon-grid",
    name: "Neon grid",
    playsetFolder: "point-cloud",
    fxPresetId: "demo-fx-neon-grid",
    videoPaths: [
      "/loops/point-cloud/PointCloud__6jt5__95.mp4",
      "/loops/point-cloud/PointCloud__8eq1__94.mp4",
      "/loops/point-cloud/PointCloud__aq5q__93.mp4",
    ],
  },
  {
    id: "demo-mood-alpine",
    name: "Alpine glass",
    playsetFolder: "parvagues",
    fxPresetId: "demo-fx-alpine",
    videoPaths: [
      "/loops/parvagues/ParVagues__0lcg__21.mp4",
      "/loops/parvagues/ParVagues__1y6b__20.mp4",
      "/loops/parvagues/ParVagues__3sz6__19.mp4",
    ],
  },
  {
    id: "demo-mood-clouds",
    name: "Soft skies",
    playsetFolder: "parvagues",
    fxPresetId: "demo-fx-soft-skies",
    videoPaths: [
      "/loops/parvagues/ParVagues__5y20__18.mp4",
      "/loops/parvagues/ParVagues__7szd__17.mp4",
      "/loops/parvagues/ParVagues__9gg7__16.mp4",
    ],
  },
  {
    id: "demo-mood-peak",
    name: "Peak hour",
    playsetFolder: "hex-skull",
    fxPresetId: "demo-fx-peak",
    videoPaths: [
      "/loops/hex-skull/HexSkull__07y6__10.mp4",
      "/loops/hex-skull/HexSkull__yjus__9.mp4",
      "/loops/hex-skull/HexSkull__x9i5__8.mp4",
    ],
  },
];

export function buildDefaultGlobalSettings(): GlobalSettings {
  return {
  videoRatings: {},
  videoLoopTagOverrides: {},
  sceneTrackers: DEFAULT_SCENE_TRACKERS.map((t) => ({
    ...t,
    steps: [...t.steps],
  })),
  fxPresets: [],
  scenes: [],
  studioSceneProgression: undefined,
  activeFxList: [...ONBOARDING_ACTIVE_FX],
  fx: createOnboardingFxMap(),
  activePresetId: null,
  activeSceneId: null,
  inputGain: 1.0,
  inputMultiplier: 1.0,
  lowSensitivity: 1.18,
  midSensitivity: 0.9,
  highSensitivity: 1.02,
  lowCrossoverHz: 150,
  highCrossoverHz: 3400,
  lowGate: 0,
  midGate: 0,
  highGate: 0,
  audioAdaptiveNormalization: true,
  audioKickOnsetDetection: true,
  audioKickOnsetSensitivity: 1.4,
  audioFftSmoothing: 0.15,
  audioSnareDetection: true,
  audioSnareSensitivity: 1.6,
  audioHatDetection: true,
  audioHatSensitivity: 1.9,
  audioBassDetection: true,
  audioBassSensitivity: 1.45,
  audioVocalsDetection: true,
  audioVocalsSensitivity: 1.5,
  audioRhythmDetection: true,
  audioBpmAutoSync: false,
  audioDensityFastMs: 140,
  audioDensitySlowMs: 1400,
  bpm: 128,
  modulation: createDefaultModulation(),
  masterLevelFloorDb: -55,
  masterLevelCeilDb: -10,
  targetFps: 60,
  renderResolution: "viewport",
  perfTier: "auto",
  uiState: {
    isAudioExpanded: true,
    isVideoExpanded: true,
    isParamsExpanded: true,
    videoLibrarySort: "library",
    presetPadIndex: 0,
    outputMuted: false,
  },
  launchControlMidi: ensureLaunchControlSlots(defaultLaunchControlMidiMap()),
  launchpadMiniMidi: ensureLaunchpadMiniSlots(defaultLaunchpadMiniMidiMap()),
  launchkeyMidi: ensureLaunchkeySlots(defaultLaunchkeyMidiMap()),
  fxMidiParamBindings: [],
  exportSettings: { ...DEFAULT_EXPORT_SETTINGS },
  outputMapping: {
    ...DEFAULT_OUTPUT_MAPPING,
    points: DEFAULT_OUTPUT_MAPPING.points.map((point) => ({
      dest: { ...point.dest },
      src: { ...point.src },
    })),
    mask: DEFAULT_OUTPUT_MAPPING.mask.map((point) => ({ ...point })),
    maskPolys: DEFAULT_OUTPUT_MAPPING.maskPolys.map((poly) => ({
      op: poly.op,
      points: poly.points.map((point) => ({ ...point })),
    })),
  },
  outputMapTemplates: [],
  entitlements: {
    ...DEFAULT_ENTITLEMENTS,
    engagement: { ...DEFAULT_ENTITLEMENTS.engagement },
  },
  };
}

let defaultGlobalSettingsCache: GlobalSettings | null = null;

export function getDefaultGlobalSettings(): GlobalSettings {
  if (!defaultGlobalSettingsCache) {
    defaultGlobalSettingsCache = buildDefaultGlobalSettings();
  }
  return defaultGlobalSettingsCache;
}

/** Mutable copy for app state — never pass `DEFAULT_GLOBAL_SETTINGS` (read-only proxy) into migrations. */
export function cloneDefaultGlobalSettings(): GlobalSettings {
  return JSON.parse(JSON.stringify(getDefaultGlobalSettings())) as GlobalSettings;
}

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = new Proxy({} as GlobalSettings, {
  get(_target, prop, receiver) {
    if (Object.prototype.hasOwnProperty.call(_target, prop)) {
      return Reflect.get(_target, prop, receiver);
    }
    return Reflect.get(getDefaultGlobalSettings(), prop);
  },
  set(_target, prop) {
    throw new TypeError(`DEFAULT_GLOBAL_SETTINGS is read-only (attempted to set ${String(prop)})`);
  },
  ownKeys() {
    return Reflect.ownKeys(getDefaultGlobalSettings());
  },
  getOwnPropertyDescriptor(_target, prop) {
    if (Object.prototype.hasOwnProperty.call(_target, prop)) {
      return Object.getOwnPropertyDescriptor(_target, prop);
    }
    const descriptor = Object.getOwnPropertyDescriptor(getDefaultGlobalSettings(), prop);
    if (descriptor) descriptor.configurable = true;
    return descriptor;
  },
});

export const createDefaultFolderConfig = (initialVideoPath: string): FolderPlaybackState => ({
  video: initialVideoPath,
  isVideoPlaying: true,
});
