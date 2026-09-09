import type {
  AppState,
  FolderConfig,
  FolderPlaybackState,
  GlobalSettings,
  LiveSessionSnapshot,
  Preset,
  Scene,
  SceneTrackerPattern,
  StudioSceneProgression,
  StudioProgressionMode,
} from "../types/settings";
import { asJsonRecord, isJsonRecord, type JsonRecord } from "../types/jsonMigrate";
import type { VideoLibrary } from "../types/videoLibrary";
import { resolveLoopThumbDisplayUrl, resolveLoopThumbDisplayUrlCandidates } from "./loopThumbUrl";
import loopPathMigrations from "../data/loopPathMigrations.json";
import { SELECTA_FOLDER, UNRATED_FOLDER } from "./videoUtils";
import {
  DEFAULT_GLOBAL_SETTINGS,
  DEMO_MOOD_SCENES,
  cloneDefaultGlobalSettings,
  createDefaultFolderConfig,
  createDefaultHydraFxMap,
  mergeGlobalFxMap,
  migrateLegacySaturationFx,
  migrateSaturationFxActiveList,
  migrateScrollFxActiveList,
  migrateLegacyDitherFx,
  migrateDitherFxActiveList,
} from "../data/defaultSettings";
import { normalizeExportSettings } from "../data/exportPresets";
import { normalizeOutputMapping, normalizeOutputMapTemplates } from "../data/outputMapping";
import { isTriggerOnlyFx, isTriggerOnlyPulseAmountFx } from "../data/fxConfig";
import { HYDRA_FX_TEMPLATE_RAW } from "../data/defaultHydraFxMap";
import {
  MAI_FLORAL_SCENE_TRACKER,
  MAI_FLORAL_SCENES,
} from "../data/maiFloralLegacy";
import {
  getMontreuil26FxPresets,
  getMontreuil26Scenes,
  repairMontreuil26SceneVideoPaths,
} from "../data/montreuil26Set";
import {
  countSceneScopedPresets,
  globalPresets,
  migrateMontreuil26PresetSceneId,
} from "./presetScopeUtils";
import { migrateLegacyLfoOnFxMap } from "./migrateLegacyLfoBindings";
import { mergeArchivedFxPresets } from "./fxPresetsArchive";
import { normalizeModulation } from "./modulationSources";
import { seedSelectaRatingsFromCatalog, SELECTA_RATINGS_SEED_VERSION } from "./selectaRatingsSeed";
import { starterPlaysetFromLibrary } from "./playsetPackEntitlements";
import { syncAccountLoopRatingsFromAppState, withAccountLoopRatings } from "./loopRatingsStore";
import {
  syncAccountOutputMapTemplatesFromAppState,
  withAccountOutputMapTemplates,
} from "./outputMapTemplatesStore";
import { CORE_FX_KEYS, isCoreFxKey } from "../data/fxConfig";
import { migrateGlobalFxChainTree } from "./fxChainTree";
import { applyFxChainTreeToGlobal, parseFxChainTreeSnapshot } from "./fxChainTreeSnapshot";
import { parseThumbDataUrl } from "./captureHydraThumb";
import { migrateLegacyVideoSpeedBase } from "./videoPlaybackSpeed";
import {
  defaultLaunchControlMidiMap,
  defaultLaunchpadMiniMidiMap,
  defaultLaunchkeyMidiMap,
  ensureLaunchControlSlots,
  ensureLaunchpadMiniSlots,
  ensureLaunchkeySlots,
} from "../types/midiMap";
import { sanitizeFxMidiParamBindings } from "../utils/fxMidiParam";
import { reconcileSceneVideoPathsAgainstLibrary } from "./sceneVideoPaths";

import {
  canonicalLoopPath,
  remapArchiveCohortToWhiteHolePath,
  remapConsolidatedArchiveLoopPath,
  remapLoopVideoPath,
  remapPointWavesPlaysetPath,
  remapVeoIncomingToWhiteHolePath,
  restoreMisarchivedActivePlaysetPath,
} from "../lib/loopPathCanonical";
import { legacyMergedPlaysetRatingPaths } from "../lib/loopPathRules";

type ParsedAppState = {
  global: JsonRecord;
  folders: Record<string, JsonRecord>;
};

type FxMapKey = keyof FolderConfig["fx"];

type MigrationTarget = {
  global: JsonRecord | GlobalSettings;
  folders: Record<string, JsonRecord | FolderPlaybackState>;
};

function asParsedAppState(parsed: JsonRecord): ParsedAppState {
  const global = asJsonRecord(parsed.global);
  const foldersRaw = asJsonRecord(parsed.folders);
  const folders: Record<string, JsonRecord> = {};
  for (const [key, row] of Object.entries(foldersRaw)) {
    if (isJsonRecord(row)) folders[key] = row;
  }
  parsed.global = global;
  parsed.folders = folders;
  return { global, folders };
}

/** Old transition kinds: 2=ZoomOut (removed), 3=SwipeX, 4=Pixelate → new 0–3 indices without ZoomOut. */
function migrateLegacyTransitionType(transitionFx: { params?: { type?: number } } | undefined | null) {
  const params = transitionFx?.params;
  if (!params || typeof params.type !== "number") return;
  const t = Math.round(params.type);
  if (!Number.isFinite(t)) return;
  let nt = t;
  if (t === 2) nt = 0;
  else if (t === 3) nt = 2;
  else if (t === 4) nt = 3;
  else nt = Math.max(0, Math.min(7, t));
  transitionFx.params = { ...params, type: nt };
}

export {
  canonicalLoopPath,
  remapArchiveCohortToWhiteHolePath,
  remapConsolidatedArchiveLoopPath,
  remapLoopVideoPath,
  remapPointWavesPlaysetPath,
  remapVeoIncomingToWhiteHolePath,
  restoreMisarchivedActivePlaysetPath,
};

/** Drop pre-merge rating keys so stars persist under `/loops/point-cloud/…` only. */
export function purgeLegacyPointWavesRatingKeys(
  ratings: Record<string, number>,
  canonicalPointWavesPath: string,
): void {
  if (!canonicalPointWavesPath.startsWith("/loops/point-cloud/")) return;
  for (const legacy of legacyMergedPlaysetRatingPaths(canonicalPointWavesPath)) {
    delete ratings[legacy];
  }
}

function parsePerfectLoopTimestampMs(loopPath: string): number | null {
  const m = loopPath.match(/perfect_loop_(\d+)\.mp4$/i);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

function parseCompanionFrameTimestampMs(frameUrl: string): number | null {
  let m = frameUrl.match(/generated_frame_from_ref_(\d+)\./i);
  if (m) {
    const n = Number(m[1]);
    return Number.isFinite(n) ? n : null;
  }
  m = frameUrl.match(/generated_frame_(\d+)\./i);
  if (m) {
    const n = Number(m[1]);
    return Number.isFinite(n) ? n : null;
  }
  m = frameUrl.match(/frame_[^_]+_(\d+)\.(?:jpe?g|png|webp)$/i);
  if (m) {
    const n = Number(m[1]);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function cohortPrefixFromLoopFile(file: string): string | null {
  const i = file.indexOf("__");
  if (i <= 0) return null;
  return file.slice(0, i);
}

/** Mirrors `FRAMES_DIR_ALIASES` in `scripts/discoverLoopSourceFrames.js`. */
const LOOP_FOLDER_FRAME_ALIASES: Record<string, string> = {
  "000_White-Hole3": "white-hole",
  "000_White-Hole": "white-hole",
  parvagues: "parvagues",
  ParVagues: "parvagues",
  "hex-skull": "hex-skull",
  HexSkull: "hex-skull",
  "point-waves": "point-cloud",
  "point-cloud": "point-cloud",
  "white-hole": "white-hole",
};

function companionFramePrefixes(videoPath: string): string[] {
  const paths = Array.from(
    new Set(
      [videoPath, remapLoopVideoPath(videoPath)].filter((p) => typeof p === "string" && p.startsWith("/loops/")),
    ),
  );
  const prefixes = new Set<string>();
  for (const p of paths) {
    const segs = p.split("/").filter(Boolean);
    if (segs.length < 3 || segs[0] !== "loops") continue;
    const folder = segs[1];
    const file = segs[2];
    if (!folder?.length || !file?.length) continue;
    prefixes.add(`/loops/${folder}-frames/`);
    const folderAlias = LOOP_FOLDER_FRAME_ALIASES[folder];
    if (folderAlias) prefixes.add(`/loops/${folderAlias}/`);
    const cohort = cohortPrefixFromLoopFile(file);
    if (cohort) {
      prefixes.add(`/loops/${cohort}-frames/`);
      const cohortAlias = LOOP_FOLDER_FRAME_ALIASES[cohort];
      if (cohortAlias) prefixes.add(`/loops/${cohortAlias}/`);
    }
  }
  return [...prefixes];
}

/** `/loops/point-cloud/` must not match sibling folders like `/loops/point-cloud-geometric/`. */
function loopCompanionPrefixMatchesFrameUrl(frameUrlLower: string, prefixLower: string): boolean {
  if (!frameUrlLower.startsWith(prefixLower)) return false;
  if (frameUrlLower.length <= prefixLower.length) return true;
  return frameUrlLower[prefixLower.length] !== "-";
}

/** Align `/loops/…-frames/` casing to the clip path so case-sensitive servers hit the on-disk folder. */
function canonicalizeFrameUrlForVideo(videoPath: string, frameUrl: string): string {
  if (!frameUrl.startsWith("/loops/")) return frameUrl;
  const lower = frameUrl.toLowerCase();

  const paths = Array.from(
    new Set(
      [videoPath, remapLoopVideoPath(videoPath)].filter((p) => typeof p === "string" && p.startsWith("/loops/")),
    ),
  );
  for (const p of paths) {
    const segs = p.split("/").filter(Boolean);
    if (segs.length < 3 || segs[0] !== "loops") continue;
    const folder = segs[1];
    if (!folder?.length) continue;
    const folderFrames = `/loops/${folder}-frames/`;
    const fl = folderFrames.toLowerCase();
    if (loopCompanionPrefixMatchesFrameUrl(lower, fl)) {
      return folderFrames + frameUrl.slice(fl.length);
    }
  }

  for (const videoRef of paths) {
    for (const pre of companionFramePrefixes(videoRef)) {
      const pl = pre.toLowerCase();
      if (!loopCompanionPrefixMatchesFrameUrl(lower, pl)) continue;
      return frameUrl.startsWith(pre) ? frameUrl : pre + frameUrl.slice(pl.length);
    }
  }
  return frameUrl;
}

/** Raw lookup only (keys / basename collisions); does not reconcile timestamps. */
function unarchiveLoopPathForLookup(videoPath: string): string | null {
  if (!videoPath.startsWith("/loops/archive/")) return null;
  const base = videoPath.slice("/loops/archive/".length);
  const sep = base.indexOf("__");
  if (sep <= 0) return null;
  const folder = base.slice(0, sep);
  const rest = base.slice(sep + 2);
  if (!folder || !rest || folder.endsWith("-frames")) return null;
  return `/loops/${folder}/${rest}`;
}

function loopPathLookupOrder(videoPath: string): string[] {
  const out: string[] = [];
  const add = (p: string | null | undefined) => {
    if (typeof p === "string" && p.length > 0 && !out.includes(p)) out.push(p);
  };
  add(remapLoopVideoPath(videoPath));
  add(videoPath);
  add(unarchiveLoopPathForLookup(videoPath));
  add(unarchiveLoopPathForLookup(remapLoopVideoPath(videoPath)));
  return out;
}

function matchLoopSourceFrameInMap(videoPath: string, map: Record<string, string>): string | null {
  for (const k of loopPathLookupOrder(videoPath)) {
    const u = map[k];
    if (typeof u === "string" && u.length > 0) return u;
  }
  const file = videoPath.split("/").pop();
  if (!file) return null;

  const basenameHits = Object.entries(map).filter(
    ([k, u]) => typeof u === "string" && u.length > 0 && k.endsWith(file),
  );
  if (basenameHits.length === 0) return null;
  if (basenameHits.length === 1) return basenameHits[0][1];

  const loopTs = parsePerfectLoopTimestampMs(videoPath);
  const vDir = videoPath.slice(0, Math.max(0, videoPath.lastIndexOf("/")));

  basenameHits.sort(([ka, ua], [kb, ub]) => {
    const score = (k: string, u: string) => {
      const kDir = k.slice(0, Math.max(0, k.lastIndexOf("/")));
      const frameTs = parseCompanionFrameTimestampMs(u);
      const absGap =
        loopTs != null && frameTs != null ? Math.abs(loopTs - frameTs) : Number.MAX_SAFE_INTEGER / 2;
      const dirPenalty = kDir === vDir ? 0 : 1;
      return [absGap, dirPenalty] as const;
    };
    const [absA, dirA] = score(ka, ua);
    const [absB, dirB] = score(kb, ub);
    if (absA !== absB) return absA - absB;
    return dirA - dirB;
  });

  return basenameHits[0][1];
}

export type ResolveLoopSourceFrameOpts = {
  libraryHint?: string | null;
};

/**
 * Preview frame URL: trusts explicit catalog keys, then optional library hint, then basename collision.
 */
function explicitLoopSourceFrameInMap(videoPath: string, map: Record<string, string>): string | null {
  for (const k of loopPathLookupOrder(videoPath)) {
    const u = map[k];
    if (typeof u === "string" && u.length > 0) return u;
  }
  return null;
}

/** Dev discover map merged under shipped catalog; drop legacy migration keys discover may invent. */
export function mergeLoopSourceFrameMaps(
  discovered: Record<string, string>,
  catalog: Record<string, string>,
): Record<string, string> {
  const sanitized: Record<string, string> = { ...discovered };
  const migrations = loopPathMigrations as Record<string, string>;
  for (const legacy of Object.keys(migrations)) {
    if (migrations[legacy] !== legacy) delete sanitized[legacy];
  }
  return { ...sanitized, ...catalog };
}

function resolveLoopSourceFrameAssetPath(
  videoPath: string | undefined,
  map: Record<string, string> | undefined,
  opts?: ResolveLoopSourceFrameOpts,
): string | null {
  if (!videoPath || !map || typeof map !== "object") return null;

  const explicit = explicitLoopSourceFrameInMap(videoPath, map);
  if (explicit) {
    return canonicalizeFrameUrlForVideo(videoPath, explicit);
  }

  const libraryHint = opts?.libraryHint ?? null;
  if (libraryHint) {
    return canonicalizeFrameUrlForVideo(videoPath, libraryHint);
  }

  const direct = matchLoopSourceFrameInMap(videoPath, map);
  if (direct) return canonicalizeFrameUrlForVideo(videoPath, direct);

  const mediaPath = remapLoopVideoPath(videoPath);
  if (mediaPath.startsWith("/loops/") && /\.mp4$/i.test(mediaPath)) {
    return canonicalizeFrameUrlForVideo(videoPath, mediaPath.replace(/\.mp4$/i, ".jpg"));
  }

  return null;
}

function publishLoopFrameUrl(
  videoPath: string,
  frameUrl: string | null,
): string | null {
  if (!frameUrl) return null;
  return resolveLoopThumbDisplayUrl(canonicalizeFrameUrlForVideo(videoPath, frameUrl));
}

export function resolveLoopSourceFrameUrl(
  videoPath: string | undefined,
  map: Record<string, string> | undefined,
  opts?: ResolveLoopSourceFrameOpts,
): string | null {
  if (!videoPath || !map || typeof map !== "object") return null;

  const explicit = explicitLoopSourceFrameInMap(videoPath, map);
  if (explicit) {
    return publishLoopFrameUrl(videoPath, explicit);
  }

  const libraryHint = opts?.libraryHint ?? null;
  if (libraryHint) {
    return publishLoopFrameUrl(videoPath, libraryHint);
  }

  const direct = matchLoopSourceFrameInMap(videoPath, map);
  if (direct) return publishLoopFrameUrl(videoPath, direct);

  const mediaPath = remapLoopVideoPath(videoPath);
  if (mediaPath.startsWith("/loops/") && /\.mp4$/i.test(mediaPath)) {
    return publishLoopFrameUrl(videoPath, mediaPath.replace(/\.mp4$/i, ".jpg"));
  }

  return null;
}

export function resolveLoopSourceFrameUrlCandidates(
  videoPath: string,
  map: Record<string, string>,
  opts?: ResolveLoopSourceFrameOpts,
): string[] {
  const urls: string[] = [];
  for (const path of loopPathLookupOrder(videoPath)) {
    const assetPath = resolveLoopSourceFrameAssetPath(path, map, opts);
    if (!assetPath) continue;
    for (const candidate of resolveLoopThumbDisplayUrlCandidates(assetPath)) {
      if (!urls.includes(candidate)) urls.push(candidate);
    }
  }
  return urls;
}

/** First playlist clip that resolves to a preview frame (order-stable for scene list rows). */
export function resolveScenePreviewClip(
  videoPaths: readonly string[],
  resolveFrame: (path: string) => string | null,
): { path: string; url: string } | null {
  const preview = resolveScenePreviewFrame(videoPaths, resolveFrame);
  return preview ? { path: preview.path, url: preview.url } : null;
}

/** Stable scene-row preview: tries every clip (and path spellings) until a frame URL exists. */
export function resolveScenePreviewFrame(
  videoPaths: readonly string[],
  resolveFrame: (path: string) => string | null,
  resolveCandidates?: (path: string) => string[],
): { path: string; url: string; fallbackSrcs: string[] } | null {
  const paths = [...videoPaths]
    .filter((p): p is string => typeof p === "string" && p.length > 0)
    .map((p) => remapLoopVideoPath(p))
    .filter((p, index, list) => list.indexOf(p) === index)
    .toSorted((a, b) => a.localeCompare(b));

  const seenUrls = new Set<string>();
  const urls: string[] = [];
  let path = "";

  for (const clipPath of paths) {
    const candidates = resolveCandidates
      ? resolveCandidates(clipPath)
      : [resolveFrame(clipPath)].filter((url): url is string => Boolean(url));
    for (const url of candidates) {
      if (seenUrls.has(url)) continue;
      seenUrls.add(url);
      urls.push(url);
      if (!path) path = clipPath;
    }
  }

  if (!urls.length) return null;
  return { path, url: urls[0], fallbackSrcs: urls.slice(1) };
}

function migratePresetsToGlobal(parsed: ParsedAppState) {
  const merged: Preset[] = [];
  const seen = new Set<string>();
  const push = (p: Preset) => {
    if (!p || typeof p.id !== "string" || seen.has(p.id)) return;
    seen.add(p.id);
    merged.push(p);
  };
  if (Array.isArray(parsed.global.fxPresets)) {
    for (const p of parsed.global.fxPresets) push(p as Preset);
  }
  for (const fk of Object.keys(parsed.folders)) {
    const folderRow = parsed.folders[fk];
    const list = folderRow?.savedPresets;
    if (Array.isArray(list)) {
      for (const p of list) push(p as Preset);
      delete folderRow.savedPresets;
    }
  }
  parsed.global.fxPresets = merged;
}

function shippedFxPresets(): Preset[] {
  return getMontreuil26FxPresets();
}

function shippedScenes(): Scene[] {
  return getMontreuil26Scenes();
}

/** Legacy demo/set ids still recognized for dismiss + template merge on saved state. */
function legacyShippedScenes(): Scene[] {
  return [...DEMO_MOOD_SCENES, ...MAI_FLORAL_SCENES];
}

function allShippedSceneTemplates(): Scene[] {
  return [...shippedScenes(), ...legacyShippedScenes()];
}

function allShippedSceneIdSet(): Set<string> {
  return new Set(allShippedSceneTemplates().map((sc) => sc.id));
}

export function recordDismissedShippedScene(
  global: AppState["global"],
  sceneId: string,
): AppState["global"] {
  if (!allShippedSceneIdSet().has(sceneId)) return global;
  const prev = global.dismissedShippedSceneIds ?? [];
  if (prev.includes(sceneId)) return global;
  return { ...global, dismissedShippedSceneIds: [...prev, sceneId] };
}

function sanitizeDismissedShippedSceneIds(global: AppState["global"]): void {
  if (!Array.isArray(global.dismissedShippedSceneIds)) return;
  global.dismissedShippedSceneIds = global.dismissedShippedSceneIds.filter((id) =>
    allShippedSceneIdSet().has(id),
  );
}

function hasMontreuil26Scenes(global: JsonRecord): boolean {
  const scenes = Array.isArray(global.scenes) ? (global.scenes as Scene[]) : [];
  return scenes.some((sc) => typeof sc?.id === "string" && sc.id.startsWith("montreuil26-track-"));
}

function ensureShippedSceneFxPresets(global: JsonRecord) {
  if (!isJsonRecord(global)) return;
  if (!hasMontreuil26Scenes(global)) return;
  const fxPresets = Array.isArray(global.fxPresets) ? (global.fxPresets as Preset[]) : [];
  global.fxPresets = fxPresets;
  const seen = new Set(fxPresets.map((p) => p?.id).filter(Boolean));
  for (const p of shippedFxPresets()) {
    if (seen.has(p.id)) continue;
    fxPresets.unshift(JSON.parse(JSON.stringify(p)));
    seen.add(p.id);
  }
  global.fxPresets = fxPresets.map((p) => migrateMontreuil26PresetSceneId(p));
}

function ensureShippedSceneTrackers(global: JsonRecord) {
  if (!isJsonRecord(global)) return;
  const sceneTrackers = Array.isArray(global.sceneTrackers)
    ? (global.sceneTrackers as SceneTrackerPattern[])
    : [];
  global.sceneTrackers = sceneTrackers;
  const seen = new Set(sceneTrackers.map((t) => t?.id).filter(Boolean));
  if (!seen.has(MAI_FLORAL_SCENE_TRACKER.id)) {
    sceneTrackers.unshift({
      ...MAI_FLORAL_SCENE_TRACKER,
      steps: [...MAI_FLORAL_SCENE_TRACKER.steps],
    });
  }
}

function sanitizeStudioSceneProgression(
  raw: unknown,
): StudioSceneProgression | undefined {
  if (!isJsonRecord(raw)) return undefined;
  const bundleKey = typeof raw.bundleKey === "string" ? raw.bundleKey.trim() : "";
  if (!bundleKey) return undefined;
  const modeRaw = raw.mode;
  const mode: StudioProgressionMode = modeRaw === "pattern" ? "pattern" : "tracks";
  const trackMap: Record<number, string | null> = {};
  if (isJsonRecord(raw.trackMap)) {
    for (const [k, v] of Object.entries(raw.trackMap)) {
      const n = Number(k);
      if (!Number.isFinite(n) || n < 1) continue;
      trackMap[n] = typeof v === "string" ? v : null;
    }
  }
  const patternId =
    typeof raw.patternId === "string" && raw.patternId.trim().length > 0
      ? raw.patternId.trim()
      : null;
  return { bundleKey, mode, trackMap, patternId };
}

function ensureShippedScenes(global: JsonRecord) {
  if (!isJsonRecord(global)) return;
  const scenes = Array.isArray(global.scenes) ? (global.scenes as Scene[]) : [];
  global.scenes = repairMontreuil26SceneVideoPaths(scenes);
  sanitizeDismissedShippedSceneIds(global as unknown as GlobalSettings);
}

export function ensureFolderRowsForLibrary(
  folders: Record<string, FolderPlaybackState>,
  videoLibrary: VideoLibrary,
): Record<string, FolderPlaybackState> {
  const next = { ...folders };
  for (const lib of videoLibrary) {
    const key = lib?.folder;
    if (typeof key !== "string" || !key || next[key]) continue;
    const first = lib.videos?.[0]?.path;
    next[key] = createDefaultFolderConfig(typeof first === "string" ? first : "");
  }
  if (!next[SELECTA_FOLDER]) {
    next[SELECTA_FOLDER] = createDefaultFolderConfig("");
  }
  if (!next[UNRATED_FOLDER]) {
    next[UNRATED_FOLDER] = createDefaultFolderConfig("");
  }
  return next;
}

function inferActiveFxListFromFx(fx: FolderConfig["fx"] | undefined): (keyof FolderConfig["fx"])[] {
  if (!fx || typeof fx !== "object") return [];
  return (Object.keys(fx) as (keyof FolderConfig["fx"])[]).filter(
    (k) => !isCoreFxKey(k as string) && fx[k]?.enabled,
  );
}

/** Chain order for Hydra: listed FX first, then any enabled FX missing from the list. */
export function resolveRenderFxList(
  fx: FolderConfig["fx"] | undefined,
  activeFxList: (keyof FolderConfig["fx"])[] | undefined,
): (keyof FolderConfig["fx"])[] {
  if (!fx) return [];
  const enabled = inferActiveFxListFromFx(fx);
  const listed = (activeFxList ?? []).filter((k) => !isCoreFxKey(k as string));
  if (listed.length === 0) return enabled;
  const seen = new Set(listed);
  const merged = [...listed];
  for (const key of enabled) {
    if (!seen.has(key)) merged.push(key);
  }
  return merged;
}

function ensureGlobalFxListCoherence(global: AppState["global"]): void {
  global.activeFxList = resolveRenderFxList(global.fx, global.activeFxList);
}

export function buildLiveSessionSnapshot(
  global: AppState["global"],
  folders: Record<string, FolderPlaybackState>,
  activeFolder?: string,
  savedAt = Date.now(),
): LiveSessionSnapshot {
  const folder =
    typeof activeFolder === "string" && activeFolder.trim()
      ? activeFolder.trim()
      : global.uiState?.lastActiveFolder;
  const folderRow = folder ? folders[folder] : undefined;
  return {
    fx: JSON.parse(JSON.stringify(global.fx)) as AppState["global"]["fx"],
    activeFxList: resolveRenderFxList(global.fx, global.activeFxList),
    activeChain: global.activeChain ? JSON.parse(JSON.stringify(global.activeChain)) : undefined,
    layerInstances: global.layerInstances
      ? JSON.parse(JSON.stringify(global.layerInstances))
      : undefined,
    fxGroups: global.fxGroups ? JSON.parse(JSON.stringify(global.fxGroups)) : undefined,
    bpm: global.bpm,
    ...(folder ? { activeFolder: folder } : {}),
    ...(typeof folderRow?.video === "string" ? { video: folderRow.video } : {}),
    isVideoPlaying: folderRow?.isVideoPlaying !== false,
    savedAt,
  };
}

export function touchLiveSessionGlobal(
  global: AppState["global"],
  folders: Record<string, FolderPlaybackState>,
  activeFolder?: string,
): AppState["global"] {
  const savedAt = Date.now();
  const liveSession = buildLiveSessionSnapshot(global, folders, activeFolder, savedAt);
  return {
    ...global,
    liveSession,
    activePresetId: null,
    uiState: {
      ...DEFAULT_GLOBAL_SETTINGS.uiState,
      ...global.uiState,
      liveSessionSavedAt: savedAt,
    },
  };
}

function reconcileActivePresetLink(global: AppState["global"]): AppState["global"] {
  const id = global.activePresetId;
  if (id == null || id === "") return global;
  const preset = (global.fxPresets ?? []).find((p) => p.id === id);
  if (!preset) return { ...global, activePresetId: null };
  const savedList = (global.activeFxList ?? [])
    .filter((k) => !isCoreFxKey(k as string))
    .join("|");
  const presetList = preset.activeFxList.filter((k) => !isCoreFxKey(k)).join("|");
  if (savedList !== presetList) return { ...global, activePresetId: null };
  return global;
}

function reconcileActiveSceneLink(global: AppState["global"]): AppState["global"] {
  const id = global.activeSceneId;
  if (id == null || id === "") return global;
  const scene = (global.scenes ?? []).find((s) => s.id === id);
  if (!scene) return { ...global, activeSceneId: null };
  return global;
}

function fxRowEquals(a: FXConfigLike, b: FXConfigLike): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

type FXConfigLike = FolderConfig["fx"][keyof FolderConfig["fx"]];

function slimFxMapForStorage(
  fx: Partial<FolderConfig["fx"]> | FolderConfig["fx"] | undefined,
): Partial<FolderConfig["fx"]> {
  const defaults = createDefaultHydraFxMap();
  const saved = fx && typeof fx === "object" ? fx : {};
  const out: Partial<FolderConfig["fx"]> = {};
  for (const k of Object.keys(defaults) as (keyof FolderConfig["fx"])[]) {
    const cur = saved[k];
    if (!cur || typeof cur !== "object") continue;
    const def = defaults[k];
    if (cur.enabled || !fxRowEquals(cur as FXConfigLike, def as FXConfigLike)) {
      out[k] = cur as FolderConfig["fx"][typeof k];
    }
  }
  return out;
}

function slimPresetForStorage(preset: Preset): Preset {
  const sceneId =
    typeof preset.sceneId === "string" && preset.sceneId.trim().length > 0
      ? preset.sceneId.trim()
      : undefined;
  return {
    ...preset,
    sceneId,
    fx: slimFxMapForStorage(preset.fx) as FolderConfig["fx"],
  };
}

function migrateGlobalModulationBindings(global: GlobalSettings): GlobalSettings {
  let modulation = normalizeModulation(global.modulation);

  const globalFx = migrateLegacyLfoOnFxMap(global.fx, modulation);
  modulation = globalFx.modulation;

  let fxPresets = global.fxPresets;
  if (Array.isArray(fxPresets)) {
    fxPresets = fxPresets.map((preset) => {
      const migrated = migrateLegacyLfoOnFxMap(preset.fx, modulation);
      modulation = migrated.modulation;
      return { ...preset, fx: migrated.fx };
    });
  }

  let liveSession = global.liveSession;
  if (liveSession?.fx && typeof liveSession.fx === "object") {
    const migrated = migrateLegacyLfoOnFxMap(liveSession.fx, modulation);
    modulation = migrated.modulation;
    liveSession = { ...liveSession, fx: migrated.fx };
  }

  return {
    ...global,
    fx: globalFx.fx,
    modulation,
    fxPresets,
    liveSession,
  };
}

function sanitizePreset(raw: unknown): Preset | null {
  if (!isJsonRecord(raw)) return null;
  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!id || !name) return null;
  if (!Array.isArray(raw.activeFxList) || !isJsonRecord(raw.fx)) return null;
  const sceneIdRaw = raw.sceneId;
  const sceneId =
    typeof sceneIdRaw === "string" && sceneIdRaw.trim().length > 0 ? sceneIdRaw.trim() : undefined;
  const sharedSourceRaw = raw.sharedSource;
  const sharedSource =
    isJsonRecord(sharedSourceRaw) &&
    typeof sharedSourceRaw.shareId === "string" &&
    sharedSourceRaw.shareId.trim() &&
    typeof sharedSourceRaw.creatorName === "string" &&
    sharedSourceRaw.creatorName.trim() &&
    typeof sharedSourceRaw.importedAt === "string" &&
    sharedSourceRaw.importedAt.trim()
      ? {
          shareId: sharedSourceRaw.shareId.trim().slice(0, 120),
          creatorName: sharedSourceRaw.creatorName.trim().slice(0, 80),
          importedAt: sharedSourceRaw.importedAt.trim().slice(0, 40),
        }
      : undefined;
  const thumbDataUrl = parseThumbDataUrl(raw.thumbDataUrl);
  const preset: Preset = {
    id,
    name,
    sceneId,
    sharedSource,
    activeFxList: raw.activeFxList.filter((k): k is keyof FolderConfig["fx"] => typeof k === "string"),
    fx: mergeGlobalFxMap(raw.fx),
    ...parseFxChainTreeSnapshot(raw),
    ...(thumbDataUrl ? { thumbDataUrl } : {}),
  };
  migrateLegacyTransitionType(preset.fx.transition);
  preset.activeFxList = migrateDitherFxActiveList(
    migrateSaturationFxActiveList(
      migrateScrollFxActiveList(preset.activeFxList as string[]),
    ),
  );
  return migrateMontreuil26PresetSceneId(preset);
}

function slimSceneForStorage(scene: Scene): Scene {
  if (typeof scene.fxPresetId === "string" && scene.fxPresetId.trim().length > 0) {
    const { fx: _fx, activeFxList: _list, activePresetId: _preset, ...rest } = scene;
    return rest;
  }
  if (!scene.fx) return scene;
  return {
    ...scene,
    fx: slimFxMapForStorage(scene.fx) as FolderConfig["fx"],
  };
}

function slimFoldersForStorage(
  folders: Record<string, FolderPlaybackState | FolderConfig>,
): Record<string, FolderPlaybackState> {
  const out: Record<string, FolderPlaybackState> = {};
  for (const [key, row] of Object.entries(folders ?? {})) {
    if (!row || typeof row !== "object") continue;
    out[key] = {
      video: typeof row.video === "string" ? row.video : "",
      isVideoPlaying: row.isVideoPlaying !== false,
    };
  }
  return out;
}

export function compactAppStateForStorage(state: AppState, activeFolder?: string): AppState {
  const payload = buildPersistedAppState(state, activeFolder);
  const global = { ...payload.global };
  delete global.videoRatings;

  if (global.liveSession?.fx) {
    global.liveSession = {
      ...global.liveSession,
      fx: slimFxMapForStorage(global.liveSession.fx) as FolderConfig["fx"],
    };
    delete global.fx;
    delete global.activeFxList;
  } else if (global.fx) {
    global.fx = slimFxMapForStorage(global.fx) as FolderConfig["fx"];
  }

  if (Array.isArray(global.fxPresets)) {
    global.fxPresets = global.fxPresets.map(slimPresetForStorage);
  }

  if (Array.isArray(global.scenes)) {
    global.scenes = global.scenes.map(slimSceneForStorage);
  }

  return {
    ...payload,
    global,
    folders: slimFoldersForStorage(payload.folders),
  };
}

function applyLiveSessionSnapshot(
  parsed: MigrationTarget,
  snap: LiveSessionSnapshot,
  detachScenePresetLinks: boolean,
): void {
  parsed.global.fx = mergeGlobalFxMap(snap.fx);
  if (Array.isArray(snap.activeFxList)) {
    parsed.global.activeFxList = [...snap.activeFxList];
  }
  parsed.global = applyFxChainTreeToGlobal(parsed.global as GlobalSettings, snap);
  if (typeof snap.bpm === "number" && Number.isFinite(snap.bpm)) {
    parsed.global.bpm = snap.bpm;
  }
  if (typeof snap.activeFolder === "string" && snap.activeFolder.trim()) {
    const folder = snap.activeFolder.trim();
    const priorUiState = asJsonRecord(
      isJsonRecord(parsed.global) ? parsed.global.uiState : parsed.global.uiState,
    );
    parsed.global.uiState = {
      ...DEFAULT_GLOBAL_SETTINGS.uiState,
      ...priorUiState,
      lastActiveFolder: folder,
      liveSessionSavedAt: snap.savedAt,
    };
    if (typeof snap.video === "string") {
      parsed.folders[folder] = {
        video: remapLoopVideoPath(snap.video),
        isVideoPlaying: snap.isVideoPlaying !== false,
      };
    }
  }
  if (detachScenePresetLinks) {
    parsed.global.activeSceneId = null;
    parsed.global.activePresetId = null;
  }
}

function applySavedLiveSession(parsed: ParsedAppState, detachScenePresetLinks = false): boolean {
  const snap = parsed.global.liveSession as LiveSessionSnapshot | undefined;
  if (!snap?.fx || typeof snap.fx !== "object") return false;
  applyLiveSessionSnapshot(parsed, snap, detachScenePresetLinks);
  return true;
}

export function buildPersistedAppState(state: AppState, activeFolder?: string): AppState {
  const folder =
    typeof activeFolder === "string" && activeFolder.trim()
      ? activeFolder.trim()
      : state.global.uiState?.lastActiveFolder;
  const folderRow = folder ? state.folders[folder] : undefined;
  const uiState = {
    ...DEFAULT_GLOBAL_SETTINGS.uiState,
    ...state.global.uiState,
    ...(folder ? { lastActiveFolder: folder } : {}),
  };

  if (!state.global.liveSession?.fx) {
    return {
      ...state,
      global: {
        ...state.global,
        uiState,
      },
    };
  }

  const liveSession: LiveSessionSnapshot = {
    ...state.global.liveSession,
    ...(folder ? { activeFolder: folder } : {}),
    ...(typeof folderRow?.video === "string" ? { video: folderRow.video } : {}),
    isVideoPlaying: folderRow?.isVideoPlaying !== false,
  };

  return {
    ...state,
    global: {
      ...state.global,
      liveSession,
      uiState: {
        ...uiState,
        liveSessionSavedAt: liveSession.savedAt,
      },
    },
  };
}

export function saveAppStateToStorage(state: AppState, activeFolder?: string): boolean {
  try {
    const payload = compactAppStateForStorage(state, activeFolder);
    localStorage.setItem(HYDRA_APP_STATE_STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (e) {
    console.warn("Failed to persist app state", e);
    return false;
  }
}

export function migrateAppState(parsed: JsonRecord, videoLibrary?: VideoLibrary): AppState {
  const state = asParsedAppState(parsed);
  if ((state.global as unknown) === DEFAULT_GLOBAL_SETTINGS) {
    state.global = cloneDefaultGlobalSettings() as unknown as JsonRecord;
  }
  const liveSessionFx = asJsonRecord(state.global.liveSession).fx;
  if (isJsonRecord(liveSessionFx)) {
    applySavedLiveSession(state);
  }
  migratePresetsToGlobal(state);
  ensureShippedSceneFxPresets(state.global);
  ensureShippedSceneTrackers(state.global);
  ensureShippedScenes(state.global);
  {
    const incoming = "VEO-incoming";
    const hole = "white-hole";
    if (state.folders[incoming] != null && state.folders[hole] == null) {
      state.folders[hole] = state.folders[incoming];
      delete state.folders[incoming];
    }
    const pointCloud = "point-cloud";
    const mergedSources = ["may", "pointcloud-waves-demo", "point-waves"];
    let pwRow = state.folders[pointCloud] ?? state.folders["point-waves"];
    for (const old of mergedSources) {
      const row = state.folders[old];
      if (!isJsonRecord(row)) continue;
      const video =
        typeof row.video === "string" ? remapLoopVideoPath(row.video) : "";
      if (!pwRow) {
        pwRow = {
          video,
          isVideoPlaying: row.isVideoPlaying !== false,
        };
      } else if (!pwRow.video && video) {
        pwRow = { ...pwRow, video };
      }
      delete state.folders[old];
    }
    if (pwRow) {
      state.folders[pointCloud] = pwRow;
      delete state.folders["point-waves"];
    }
    const uiState = asJsonRecord(state.global.uiState);
    if (uiState.lastActiveFolder === "may") {
      uiState.lastActiveFolder = pointCloud;
    }
    if (uiState.lastActiveFolder === "pointcloud-waves-demo") {
      uiState.lastActiveFolder = pointCloud;
    }
    if (uiState.lastActiveFolder === "point-waves") {
      uiState.lastActiveFolder = pointCloud;
    }
    state.global.uiState = uiState;
  }
  const defaultHydraFx = createDefaultHydraFxMap();
  Object.keys(state.folders).forEach((f) => {
    const folderRow = state.folders[f];
    if (!isJsonRecord(folderRow)) return;
    const folderFx = asJsonRecord(folderRow.fx);
    const legacyVideoSpeed = asJsonRecord(folderRow.videoSpeed);
    // Migrate old videoSpeed to new fx format
    if (
      Object.keys(legacyVideoSpeed).length > 0 &&
      (!isJsonRecord(folderRow.fx) || !isJsonRecord(folderFx.videoSpeed))
    ) {
      folderRow.fx = folderFx;
      folderFx.videoSpeed = {
        enabled: true,
        base: Math.max(
          0,
          legacyVideoSpeed.base !== undefined ? Number(legacyVideoSpeed.base) : 1.0,
        ),
        syncBand: "low",
        syncMultiplier:
          legacyVideoSpeed.lowMultiplier !== undefined
            ? Number(legacyVideoSpeed.lowMultiplier)
            : 2.0,
      };
      if (!Array.isArray(folderRow.activeFxList)) folderRow.activeFxList = [];
      delete folderRow.videoSpeed;
    }

    // Merge defaults into each folder's fx
    if (!isJsonRecord(folderRow.fx)) {
      folderRow.fx = JSON.parse(JSON.stringify(defaultHydraFx));
    } else {
      const fx = asJsonRecord(folderRow.fx);
      folderRow.fx = fx;
      // Migration for combined color adjustments
      const luma = asJsonRecord(fx.luminosity);
      const contrast = asJsonRecord(fx.contrast);
      const hue = asJsonRecord(fx.hue);
      if (
        Object.keys(luma).length > 0 ||
        Object.keys(contrast).length > 0 ||
        Object.keys(hue).length > 0
      ) {
         fx.colorAdjust = {
            ...defaultHydraFx.colorAdjust,
            enabled: Boolean(luma.enabled || contrast.enabled || hue.enabled),
            base: luma.base !== undefined ? Number(luma.base) : 0.0,
            syncBand: luma.syncBand ?? "mid",
            syncMultiplier: luma.syncMultiplier !== undefined ? Number(luma.syncMultiplier) : 0.3,
            params: {
               contrast: contrast.base !== undefined ? Number(contrast.base) : 1.0,
               hue: hue.base !== undefined ? Number(hue.base) : 0.0
            }
         };
         
         if (Array.isArray(folderRow.activeFxList)) {
            const activeList = folderRow.activeFxList as string[];
            const idx = activeList.findIndex((k) => k === 'luminosity' || k === 'contrast' || k === 'hue');
            if (idx !== -1 && !activeList.includes('colorAdjust')) {
               activeList[idx] = 'colorAdjust';
            }
            folderRow.activeFxList = activeList.filter((k) => k !== 'luminosity' && k !== 'contrast' && k !== 'hue');
         }
         
         delete fx.luminosity;
         delete fx.contrast;
         delete fx.hue;
      }

      migrateLegacySaturationFx(fx as Partial<FolderConfig["fx"]> & Record<string, unknown>);
      migrateLegacyDitherFx(fx as Partial<FolderConfig["fx"]> & Record<string, unknown>);
      if (Array.isArray(folderRow.activeFxList)) {
        folderRow.activeFxList = migrateDitherFxActiveList(
          migrateSaturationFxActiveList(folderRow.activeFxList as string[]),
        );
      }

      const legacyScrollX = asJsonRecord(fx.scrollX);
      const legacyScrollY = asJsonRecord(fx.scrollY);
      if (Object.keys(legacyScrollX).length > 0 || Object.keys(legacyScrollY).length > 0) {
        const migratedFx = mergeGlobalFxMap(fx as Partial<FolderConfig["fx"]>);
        fx.scroll = migratedFx.scroll;
        delete fx.scrollX;
        delete fx.scrollY;

        if (Array.isArray(folderRow.activeFxList)) {
          folderRow.activeFxList = migrateScrollFxActiveList(folderRow.activeFxList as string[]);
        }
      }

      (Object.keys(defaultHydraFx) as FxMapKey[]).forEach((fxKey) => {
        const defaultFx = defaultHydraFx[fxKey];
        if (isJsonRecord(fx[fxKey])) {
          const savedFx = asJsonRecord(fx[fxKey]);
          const merged = { ...defaultFx, ...savedFx };
          if (defaultFx.params || savedFx.params) {
            merged.params = {
              ...(defaultFx.params || {}),
              ...(isJsonRecord(savedFx.params)
                ? (savedFx.params as Record<string, number | string>)
                : {}),
            };
          }
          fx[fxKey] = merged;
        } else {
          fx[fxKey] = defaultFx;
        }
      });

      const vsMigrate = asJsonRecord(fx.videoSpeed);
      if (typeof vsMigrate.base === "number" && vsMigrate.base < 0) {
        fx.videoSpeed = { ...vsMigrate, base: 0 };
      }

      const am = asJsonRecord(fx.autoMix);
      if (Object.keys(am).length > 0) {
        const prevParams = asJsonRecord(am.params);
        let advanceMode = prevParams.advanceMode;
        if (advanceMode !== "sequential" && advanceMode !== "random") {
          advanceMode = "random";
        }
        let syncBand = typeof am.syncBand === "string" ? am.syncBand : "none";
        // Pulse advance requires explicit trigger mode; legacy defaults shipped syncBand without isTrigger.
        if (syncBand !== "none" && am.isTrigger !== true) {
          syncBand = "none";
        }
        const audioMapped = syncBand !== "none";
        let advanceWhen = prevParams.advanceWhen;
        if (advanceWhen !== "time" && advanceWhen !== "loop") {
          advanceWhen = "time";
        }
        let base = typeof am.base === "number" ? am.base : 12;
        if (base > 0 && base <= 1.05) {
          base = audioMapped ? 4 : 12;
        }
        if (audioMapped) {
          base = Math.max(1, Math.min(64, Math.round(base)));
        } else if (advanceWhen === "loop") {
          base = Math.max(1, Math.min(32, Math.round(base)));
        } else {
          base = Math.max(0, Math.min(600, base));
        }
        const isTrigger = audioMapped ? true : am.isTrigger === true;
        fx.autoMix = {
          ...am,
          base,
          syncBand,
          isTrigger,
          params: { ...prevParams, advanceMode, advanceWhen },
        };
      }

      // Trigger-only playback FX (Jump Cut, Boomerang, Slowmo, …): a mapped band
      // must stay in trigger/pulse mode — legacy rows sometimes kept follow.
      for (const fxKey of Object.keys(fx)) {
        if (!isTriggerOnlyFx(fxKey)) continue;
        const row = asJsonRecord(fx[fxKey as keyof typeof fx]);
        if (!Object.keys(row).length) continue;
        let syncBand = typeof row.syncBand === "string" ? row.syncBand : "none";
        const template = asJsonRecord(
          HYDRA_FX_TEMPLATE_RAW[fxKey as keyof typeof HYDRA_FX_TEMPLATE_RAW],
        );
        const templateBand =
          typeof template.syncBand === "string" && template.syncBand !== "none"
            ? template.syncBand
            : "kick";
        if (syncBand === "none" && row.enabled === true && row.isTrigger !== true) {
          const legacyCollapsedPulse =
            isTriggerOnlyPulseAmountFx(fxKey) &&
            row.base === 0 &&
            row.mapMin === 0 &&
            row.mapMax === 0;
          if (legacyCollapsedPulse || !isTriggerOnlyPulseAmountFx(fxKey)) {
            syncBand = templateBand;
          }
        }
        if (syncBand === "none") continue;
        const next: JsonRecord = { ...row, syncBand, isTrigger: true, syncMultiplier: 0 };
        if (isTriggerOnlyPulseAmountFx(fxKey)) {
          if (row.envelopeRef === null) delete next.envelopeRef;
          delete next.mapMin;
          delete next.mapMax;
          if (typeof row.base !== "number" || row.base <= 0) {
            next.base = typeof template.base === "number" ? template.base : 1;
          }
          const params = asJsonRecord(row.params);
          const templateParams = asJsonRecord(template.params);
          if (typeof params.duration !== "number") {
            params.duration =
              typeof templateParams.duration === "number" ? templateParams.duration : 0.5;
          }
          if (typeof params.motionBlur !== "number") {
            params.motionBlur =
              typeof templateParams.motionBlur === "number" ? templateParams.motionBlur : 0.65;
          }
          next.params = params;
        }
        fx[fxKey as keyof typeof fx] = next;
      }

      delete fx.parallax;
      delete fx.colorama;

      const noiseFx = asJsonRecord(fx.noise);
      const noiseParams = asJsonRecord(noiseFx.params);
      if (typeof noiseParams.speed === "number" && noiseParams.speed > 3) {
        noiseFx.params = {
          ...noiseParams,
          speed: Math.min(3, noiseParams.speed * (3 / 5)),
        };
        fx.noise = noiseFx;
      }

      const electricFx = asJsonRecord(fx.electricNoise);
      if (Object.keys(electricFx).length > 0) {
        const electricParams = asJsonRecord(electricFx.params);
        let touched = false;
        const nextParams = { ...electricParams };
        if (typeof nextParams.amount !== "number") {
          const legacyBase = typeof electricFx.base === "number" ? electricFx.base : 1;
          nextParams.amount = Math.max(0, Math.min(1, legacyBase > 0 ? legacyBase : 1));
          touched = true;
        }
        if (typeof nextParams.color !== "string") {
          nextParams.color = "#331a66";
          touched = true;
        }
        if (typeof nextParams.ringPower === "number" && nextParams.ringPower > 1.15) {
          nextParams.ringPower = 0.9;
          touched = true;
        }
        if (typeof nextParams.rings !== "number") {
          nextParams.rings = 0.85;
          touched = true;
        }
        if (typeof nextParams.noiseScale !== "number") {
          nextParams.noiseScale = 1.0;
          touched = true;
        }
        if (typeof nextParams.turbulence !== "number") {
          nextParams.turbulence = 0.2;
          touched = true;
        }
        if (typeof nextParams.detail !== "number") {
          nextParams.detail = 5;
          touched = true;
        }
        if (typeof nextParams.intensity !== "number") {
          nextParams.intensity = 1.4;
          touched = true;
        }
        if ("triggerRings" in nextParams) {
          delete nextParams.triggerRings;
          touched = true;
        }
        if (touched) {
          electricFx.params = nextParams;
          fx.electricNoise = electricFx;
        }
      }

      const pxOld = asJsonRecord(fx.pixelate);
      if (
        typeof pxOld.base === "number" &&
        pxOld.base >= 0 &&
        pxOld.base <= 1
      ) {
        pxOld.base = Math.max(4, Math.min(512, Math.round(32 + (1 - pxOld.base) * 480)));
        const sm = pxOld.syncMultiplier;
        if (typeof sm === "number" && sm >= 0 && sm <= 2.5) {
          pxOld.syncMultiplier = Math.max(8, Math.min(128, Math.round(sm * 72)));
        }
        fx.pixelate = pxOld;
      }

      migrateLegacyTransitionType(asJsonRecord(fx.transition) as { params?: { type?: number } });
    }

    const sanitizeActiveList = (list: unknown): FxMapKey[] | null => {
      if (!Array.isArray(list)) return null;
      return list.filter(
        (k): k is FxMapKey =>
          typeof k === "string" &&
          k in defaultHydraFx &&
          !(CORE_FX_KEYS as readonly string[]).includes(k),
      );
    };

    const folderFxForList = asJsonRecord(folderRow.fx);
    const enabledNonCoreKeys = Object.keys(folderFxForList).filter(
      (k) =>
        isJsonRecord(folderFxForList[k]) &&
        folderFxForList[k].enabled === true &&
        !(CORE_FX_KEYS as readonly string[]).includes(k),
    ) as FxMapKey[];

    const existing = sanitizeActiveList(folderRow.activeFxList);
    if (!existing) {
      // No active list saved: infer it from enabled FX.
      folderRow.activeFxList = enabledNonCoreKeys;
    } else {
      // Active list exists but could be empty/stale; ensure enabled FX are visible in the UI.
      const set = new Set(existing);
      for (const k of enabledNonCoreKeys) set.add(k);
      folderRow.activeFxList = [...set];
    }
  });

  if (Array.isArray(state.global.fxPresets)) {
    state.global.fxPresets = (state.global.fxPresets as unknown[])
      .map((p) => sanitizePreset(p))
      .filter((p): p is Preset => p != null);
    state.global.fxPresets = mergeArchivedFxPresets(state.global.fxPresets as Preset[]);
  }

  if (!Array.isArray(state.global.scenes)) {
    state.global.scenes = [];
  }
  if (Array.isArray(state.global.scenes)) {
    state.global.scenes = (state.global.scenes as unknown[]).map((sc: unknown) => {
      if (!isJsonRecord(sc)) return sc;
      const { presetId: _removed, thumbDataUrl: rawThumb, ...rest } = sc;
      const thumbDataUrl = parseThumbDataUrl(rawThumb);
      return thumbDataUrl ? { ...rest, thumbDataUrl } : rest;
    });
  }

  const shippedSceneById = new Map(allShippedSceneTemplates().map((d) => [d.id, d]));
  if (Array.isArray(state.global.scenes)) {
    state.global.scenes = (state.global.scenes as unknown[]).map((sc: unknown) => {
      if (!isJsonRecord(sc)) return sc;
      const id = sc.id;
      if (typeof id !== "string") return sc;
      const template = shippedSceneById.get(id);
      if (!template) return sc;
      const videoPaths = sc.videoPaths;
      return {
        ...template,
        ...sc,
        videoPaths: Array.isArray(videoPaths) && videoPaths.length > 0 ? videoPaths : [...template.videoPaths],
        fxPresetId: sc.fxPresetId ?? template.fxPresetId ?? null,
        bpm: sc.bpm ?? template.bpm,
      };
    });
  }

  const folderKeys = Object.keys(state.folders);
  const liftKey =
    folderKeys.find(
      (k) => isJsonRecord(state.folders[k]?.fx),
    ) ?? null;

  if (liftKey && isJsonRecord(state.folders[liftKey]?.fx) && !state.global.fx) {
    state.global.fx = JSON.parse(JSON.stringify(state.folders[liftKey].fx));
  }
  if (!state.global.fx) {
    state.global.fx = createDefaultHydraFxMap();
  } else {
    state.global.fx = mergeGlobalFxMap(state.global.fx as Partial<FolderConfig["fx"]>);
  }
  if (!Array.isArray(state.global.activeFxList)) {
    state.global.activeFxList = inferActiveFxListFromFx(state.global.fx as FolderConfig["fx"]);
  } else {
    state.global.activeFxList = migrateDitherFxActiveList(
      migrateSaturationFxActiveList(
        migrateScrollFxActiveList(state.global.activeFxList as string[]),
      ),
    );
  }

  state.global = migrateGlobalFxChainTree(
    state.global as unknown as GlobalSettings,
  ) as unknown as JsonRecord;

  for (const fk of folderKeys) {
    const row = state.folders[fk];
    const rawVideo = isJsonRecord(row) && typeof row.video === "string" ? row.video : "";
    state.folders[fk] = {
      video: remapLoopVideoPath(rawVideo),
      isVideoPlaying: !isJsonRecord(row) || row.isVideoPlaying !== false,
    };
  }

  if (
    Array.isArray(videoLibrary) &&
    videoLibrary.length === 1 &&
    typeof videoLibrary[0]?.folder === "string"
  ) {
    const soleFolder = videoLibrary[0].folder;
    const f = state.folders;
    const keys = Object.keys(f);
    const nonVirtual = keys.filter((k) => k !== "selecta" && k !== "unrated");
    if (nonVirtual.length !== 1 || nonVirtual[0] !== soleFolder) {
      const soleRow = f[soleFolder];
      const chosen: string =
        (isJsonRecord(soleRow) && typeof soleRow.video === "string" ? soleRow.video : "") ||
        nonVirtual
          .map((k) => f[k])
          .map((row) => (isJsonRecord(row) && typeof row.video === "string" ? row.video : ""))
          .find((v) => v.length > 0) ||
        (typeof videoLibrary[0]?.videos?.[0]?.path === "string" ? videoLibrary[0].videos[0].path : "") ||
        "";
      state.folders = {
        ...f,
        [soleFolder]: {
          video: remapLoopVideoPath(chosen),
          isVideoPlaying: !isJsonRecord(soleRow) || soleRow.isVideoPlaying !== false,
        },
      };
    }
  }

  let mergedGlobal = { ...DEFAULT_GLOBAL_SETTINGS, ...state.global } as GlobalSettings;
  const midiEnsureOpts = {
    activeFxList: mergedGlobal.activeFxList ?? [],
    scenes: mergedGlobal.scenes ?? [],
  };
  mergedGlobal.launchControlMidi = ensureLaunchControlSlots(
    mergedGlobal.launchControlMidi ?? defaultLaunchControlMidiMap(),
    midiEnsureOpts,
  );
  mergedGlobal.launchpadMiniMidi = ensureLaunchpadMiniSlots(
    mergedGlobal.launchpadMiniMidi ?? defaultLaunchpadMiniMidiMap(),
    midiEnsureOpts,
  );
  mergedGlobal.launchkeyMidi = ensureLaunchkeySlots(
    mergedGlobal.launchkeyMidi ?? defaultLaunchkeyMidiMap(),
  );
  mergedGlobal.fxMidiParamBindings = sanitizeFxMidiParamBindings(mergedGlobal.fxMidiParamBindings);
  mergedGlobal.exportSettings = normalizeExportSettings(mergedGlobal.exportSettings);
  mergedGlobal.outputMapping = normalizeOutputMapping(mergedGlobal.outputMapping);
  mergedGlobal.outputMapTemplates = normalizeOutputMapTemplates(mergedGlobal.outputMapTemplates);

  if (!Array.isArray(mergedGlobal.sceneTrackers) || mergedGlobal.sceneTrackers.length === 0) {
    mergedGlobal.sceneTrackers = (DEFAULT_GLOBAL_SETTINGS.sceneTrackers ?? []).map((t) => ({
      ...t,
      steps: [...t.steps],
    }));
  } else {
    mergedGlobal.sceneTrackers = (mergedGlobal.sceneTrackers as unknown[])
      .filter((t: unknown) => isJsonRecord(t))
      .map((t: JsonRecord): SceneTrackerPattern => ({
        id: typeof t.id === "string" ? t.id : `tracker-${Date.now()}`,
        name: typeof t.name === "string" ? t.name : "Pattern",
        beatsPerStep: Math.max(1, Math.min(32, Math.round(Number(t.beatsPerStep) || 4))),
        steps: Array.isArray(t.steps) ? t.steps.map((s: unknown) => (typeof s === "string" ? s : null)) : [],
      }))
      .filter((t) => t.steps.length > 0);
    if (mergedGlobal.sceneTrackers.length === 0) {
      mergedGlobal.sceneTrackers = (DEFAULT_GLOBAL_SETTINGS.sceneTrackers ?? []).map((x) => ({
        ...x,
        steps: [...x.steps],
      }));
    }
  }

  mergedGlobal.studioSceneProgression = sanitizeStudioSceneProgression(
    mergedGlobal.studioSceneProgression,
  );

  mergedGlobal.fx = mergeGlobalFxMap(mergedGlobal.fx);
  mergedGlobal = migrateGlobalModulationBindings(mergedGlobal);
  migrateLegacyVideoSpeedBase(mergedGlobal.fx);
  migrateLegacyTransitionType(mergedGlobal.fx.transition);
  mergedGlobal.activeFxList = migrateDitherFxActiveList(
    migrateSaturationFxActiveList(
      migrateScrollFxActiveList(
        (mergedGlobal.activeFxList ?? []).filter(
          (k: string) => typeof k === "string" && !isCoreFxKey(k),
        ),
      ),
    ),
  );
  mergedGlobal = migrateGlobalFxChainTree(mergedGlobal);
  Object.assign(mergedGlobal, reconcileActivePresetLink(mergedGlobal));
  Object.assign(mergedGlobal, reconcileActiveSceneLink(mergedGlobal));

  const libRows: VideoLibrary = videoLibrary ?? [];
  let folders = ensureFolderRowsForLibrary(
    state.folders as unknown as Record<string, FolderPlaybackState>,
    libRows,
  );

  const savedLiveSession = state.global.liveSession as LiveSessionSnapshot | undefined;
  if (savedLiveSession?.fx && typeof savedLiveSession.fx === "object") {
    applyLiveSessionSnapshot({ global: mergedGlobal, folders }, savedLiveSession, true);
    mergedGlobal.fx = mergeGlobalFxMap(mergedGlobal.fx);
    migrateLegacyVideoSpeedBase(mergedGlobal.fx);
    migrateLegacyTransitionType(mergedGlobal.fx.transition);
    mergedGlobal.activeFxList = migrateDitherFxActiveList(
      migrateSaturationFxActiveList(
        migrateScrollFxActiveList(
          (mergedGlobal.activeFxList ?? []).filter(
            (k: string) => typeof k === "string" && !isCoreFxKey(k),
          ),
        ),
      ),
    );
    mergedGlobal.liveSession = {
      ...savedLiveSession,
      fx: mergeGlobalFxMap(savedLiveSession.fx),
    };
    mergedGlobal = migrateGlobalModulationBindings(mergedGlobal);
  }

  ensureGlobalFxListCoherence(mergedGlobal);

  if (mergedGlobal.videoRatings && typeof mergedGlobal.videoRatings === "object") {
    const nextRatings: Record<string, number> = {};
    for (const [k, v] of Object.entries(mergedGlobal.videoRatings)) {
      if (typeof v !== "number" || v <= 0) continue;
      const canon = remapLoopVideoPath(k);
      if (!canon.startsWith("/loops/")) continue;
      const prev = nextRatings[canon];
      nextRatings[canon] = prev === undefined ? v : Math.max(prev, v);
    }
    mergedGlobal.videoRatings = nextRatings;
  }
  const selectaSeedVersion = mergedGlobal.uiState?.selectaRatingsSeedVersion ?? 0;
  if (selectaSeedVersion < SELECTA_RATINGS_SEED_VERSION) {
    mergedGlobal.videoRatings = seedSelectaRatingsFromCatalog(
      mergedGlobal.videoRatings,
      libRows,
    );
    mergedGlobal.uiState = {
      ...DEFAULT_GLOBAL_SETTINGS.uiState,
      ...mergedGlobal.uiState,
      selectaRatingsSeedVersion: SELECTA_RATINGS_SEED_VERSION,
    };
  }

  if (mergedGlobal.videoLoopTagOverrides && typeof mergedGlobal.videoLoopTagOverrides === "object") {
    const nextOv: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(mergedGlobal.videoLoopTagOverrides)) {
      if (!Array.isArray(v)) continue;
      const tags = v
        .filter((item): item is string => typeof item === "string")
        .map((s) => s.trim().slice(0, 48))
        .filter(Boolean);
      if (tags.length > 0) nextOv[remapLoopVideoPath(k)] = tags;
    }
    mergedGlobal.videoLoopTagOverrides = nextOv;
  }

  if (Array.isArray(mergedGlobal.scenes)) {
    mergedGlobal.scenes = mergedGlobal.scenes.map((sc) => {
      if (!sc || typeof sc !== "object") return sc;
      const playsetFolder =
        sc.playsetFolder === "may" ||
        sc.playsetFolder === "pointcloud-waves-demo" ||
        sc.playsetFolder === "point-waves"
          ? "point-cloud"
          : sc.playsetFolder;
      if (!Array.isArray(sc.videoPaths)) {
        return playsetFolder !== sc.playsetFolder ? { ...sc, playsetFolder } : sc;
      }
      return {
        ...sc,
        playsetFolder,
        videoPaths: sc.videoPaths.map((p) =>
          typeof p === "string" ? remapLoopVideoPath(p) : p,
        ),
      };
    });
    mergedGlobal.scenes = reconcileSceneVideoPathsAgainstLibrary(mergedGlobal.scenes, libRows);
    mergedGlobal.scenes = repairMontreuil26SceneVideoPaths(mergedGlobal.scenes);
  }

  const presetRows = mergedGlobal.fxPresets ?? [];
  const uiState = {
    ...DEFAULT_GLOBAL_SETTINGS.uiState,
    ...mergedGlobal.uiState,
  };
  if (
    uiState.presetScope !== "scene" &&
    globalPresets(presetRows).length === 0 &&
    countSceneScopedPresets(presetRows) > 0
  ) {
    uiState.presetScope = "scene";
  }
  mergedGlobal.uiState = uiState;

  return {
    global: mergedGlobal,
    folders,
  };
}

export const HYDRA_APP_STATE_STORAGE_KEY = "hydra-hexa-app-state";

export function loadInitialAppState(videoLibrary: VideoLibrary): AppState {
  const saved = localStorage.getItem(HYDRA_APP_STATE_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as JsonRecord;
      if (isJsonRecord(parsed.global)) {
        const migrated = migrateAppState(parsed, videoLibrary);
        syncAccountLoopRatingsFromAppState(migrated);
        syncAccountOutputMapTemplatesFromAppState(migrated);
        return withAccountOutputMapTemplates(withAccountLoopRatings(migrated));
      }
    } catch (e) {
      console.error("Failed to parse saved settings", e);
    }
  }

  const { folder: defaultFolder, video: defaultVideo } = starterPlaysetFromLibrary(videoLibrary);
  const fresh = migrateAppState(
    {
      global: cloneDefaultGlobalSettings() as unknown as JsonRecord,
      folders: {
        [defaultFolder]: createDefaultFolderConfig(defaultVideo),
      },
    } as JsonRecord,
    videoLibrary,
  );
  syncAccountLoopRatingsFromAppState(fresh);
  syncAccountOutputMapTemplatesFromAppState(fresh);
  return withAccountOutputMapTemplates(withAccountLoopRatings(fresh));
}
