import type { ExportSettings, ExportVideoFitMode } from "../types/settings";

export type ExportAspectRatioId = ExportSettings["aspectRatio"];

export type ExportResolutionPreset = {
  id: string;
  label: string;
  width: number;
  height: number;
};

export type ExportAspectPreset = {
  id: ExportAspectRatioId;
  label: string;
  shortLabel: string;
  ratio: number;
  resolutions: ExportResolutionPreset[];
};

export const EXPORT_ASPECT_PRESETS: ExportAspectPreset[] = [
  {
    id: "16:9",
    label: "16∶9",
    shortLabel: "Wide",
    ratio: 16 / 9,
    resolutions: [
      { id: "16:9-720", label: "720p", width: 1280, height: 720 },
      { id: "16:9-1080", label: "1080p", width: 1920, height: 1080 },
      { id: "16:9-1440", label: "1440p", width: 2560, height: 1440 },
      { id: "16:9-4k", label: "4K", width: 3840, height: 2160 },
    ],
  },
  {
    id: "4:3",
    label: "4∶3",
    shortLabel: "Classic",
    ratio: 4 / 3,
    resolutions: [
      { id: "4:3-768", label: "768p", width: 1024, height: 768 },
      { id: "4:3-1080", label: "1080p", width: 1440, height: 1080 },
      { id: "4:3-1536", label: "1536p", width: 2048, height: 1536 },
    ],
  },
  {
    id: "9:16",
    label: "9∶16",
    shortLabel: "Story / Reel",
    ratio: 9 / 16,
    resolutions: [
      { id: "9:16-720", label: "720p", width: 720, height: 1280 },
      { id: "9:16-1080", label: "1080p", width: 1080, height: 1920 },
      { id: "9:16-1440", label: "1440p", width: 1440, height: 2560 },
    ],
  },
];

export const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  enabled: false,
  aspectRatio: "16:9",
  resolutionId: "16:9-1080",
  videoFit: "contain",
  cropGuide: true,
};

const aspectById = new Map(EXPORT_ASPECT_PRESETS.map((a) => [a.id, a]));

export function getExportAspectPreset(id: ExportAspectRatioId): ExportAspectPreset {
  return aspectById.get(id) ?? EXPORT_ASPECT_PRESETS[0]!;
}

export function getExportResolutionPreset(
  aspectRatio: ExportAspectRatioId,
  resolutionId: string,
): ExportResolutionPreset {
  const aspect = getExportAspectPreset(aspectRatio);
  return aspect.resolutions.find((r) => r.id === resolutionId) ?? aspect.resolutions[0]!;
}

export function normalizeExportSettings(raw?: Partial<ExportSettings> | null): ExportSettings {
  const aspectRatio =
    raw?.aspectRatio && aspectById.has(raw.aspectRatio)
      ? raw.aspectRatio
      : DEFAULT_EXPORT_SETTINGS.aspectRatio;
  const aspect = getExportAspectPreset(aspectRatio);
  const resolutionId =
    aspect.resolutions.find((r) => r.id === raw?.resolutionId)?.id ?? aspect.resolutions[0]!.id;
  const videoFit: ExportVideoFitMode =
    raw?.videoFit === "cover" ? "cover" : "contain";
  const cropGuide = raw?.cropGuide !== false;
  const enabled = raw?.enabled === true;
  return { enabled, aspectRatio, resolutionId, videoFit, cropGuide };
}

export function exportFramingEnabled(settings: ExportSettings | null | undefined): boolean {
  return normalizeExportSettings(settings).enabled === true;
}

export function exportOutputDimensions(settings: ExportSettings): { width: number; height: number } {
  const res = getExportResolutionPreset(settings.aspectRatio, settings.resolutionId);
  return { width: res.width, height: res.height };
}

export function exportPreviewAspect(settings: ExportSettings): number {
  return getExportAspectPreset(settings.aspectRatio).ratio;
}

export function exportAspectRatioValue(settings: ExportSettings): number {
  return exportPreviewAspect(settings);
}

/** Record Matte `aspect` param → width/height ratio. 0 = follow `exportSettings`. */
export function recordMatteAspectRatio(aspectParam: number, exportSettings?: ExportSettings | null): number {
  const mode = Math.round(aspectParam);
  if (mode === 1) return 16 / 9;
  if (mode === 2) return 4 / 3;
  if (mode === 3) return 9 / 16;
  return exportAspectRatioValue(normalizeExportSettings(exportSettings));
}

export type RecordMatteBox = {
  width: number;
  height: number;
  aspect: number;
  /** When true, box uses export pixel dimensions centered on the canvas. */
  usePixelBox: boolean;
};

/** Centered export crop rect in canvas pixel space (may shrink when canvas is smaller than export). */
export function exportCropBox(
  exportSettings: ExportSettings | null | undefined,
  canvasWidth: number,
  canvasHeight: number,
): RecordMatteBox {
  return recordMatteBox(0, exportSettings, canvasWidth, canvasHeight);
}

/** @deprecated Use exportCropBox — kept for layout helper parity. */
export function recordMatteBox(
  aspectParam: number,
  exportSettings: ExportSettings | null | undefined,
  canvasWidth: number,
  canvasHeight: number,
): RecordMatteBox {
  const mode = Math.round(aspectParam);
  const aspect = recordMatteAspectRatio(aspectParam, exportSettings);
  const canvasW = Math.max(1, canvasWidth);
  const canvasH = Math.max(1, canvasHeight);

  if (mode === 0) {
    const { width, height } = exportOutputDimensions(normalizeExportSettings(exportSettings));
    const fit = Math.min(1, canvasW / width, canvasH / height);
    return {
      width: width * fit,
      height: height * fit,
      aspect,
      usePixelBox: true,
    };
  }

  return {
    width: canvasW,
    height: canvasH,
    aspect,
    usePixelBox: false,
  };
}

/** Aspect-correct video as a centered fraction of the canvas (before export fit). */
export function videoNormRectOnCanvas(videoAspect: number, canvasAspect: number): { w: number; h: number } {
  const v = Math.max(0.01, videoAspect);
  const c = Math.max(0.01, canvasAspect);
  if (v >= c) return { w: 1, h: c / v };
  return { w: v / c, h: 1 };
}

/** Non-uniform scale so aspect-correct video fills the render canvas; `zoom` 1 = edge-to-edge fit. */
export function videoStretchToRenderScale(
  videoAspect: number,
  canvasWidth: number,
  canvasHeight: number,
  zoom = 1,
): { scaleX: number; scaleY: number } {
  const canvasAspect = canvasWidth / Math.max(1, canvasHeight);
  const { w: vw, h: vh } = videoNormRectOnCanvas(videoAspect, canvasAspect);
  const z = Math.max(0.25, zoom);
  return { scaleX: z / vw, scaleY: z / vh };
}

/** Undo Hydra src stretch so clip keeps native aspect on the canvas. */
export function sourceAspectCorrectScale(
  videoAspect: number,
  canvasWidth: number,
  canvasHeight: number,
): { scaleX: number; scaleY: number } {
  const canvasAspect = canvasWidth / Math.max(1, canvasHeight);
  const v = Math.max(0.01, videoAspect);
  if (canvasAspect > v) return { scaleX: canvasAspect / v, scaleY: 1 };
  return { scaleX: 1, scaleY: v / canvasAspect };
}
export type ExportMatteLayout = {
  safeW: number;
  safeH: number;
  contentHalfW: number;
  contentHalfH: number;
  /** Signed offset from canvas center for fitted content (top-align in contain). */
  contentOffsetY: number;
  usePixelBox: boolean;
  targetWidth: number;
  targetHeight: number;
  targetAspect: number;
};

/** Normalized crop + fitted video half-extents for export matte / UV remap. */
export function exportMatteLayout(params: {
  exportSettings: ExportSettings | null | undefined;
  canvasWidth: number;
  canvasHeight: number;
  videoAspect: number;
  inset?: number;
}): ExportMatteLayout {
  const inset = params.inset ?? 0.025;
  const box = exportCropBox(params.exportSettings, params.canvasWidth, params.canvasHeight);
  const canvasW = Math.max(1, params.canvasWidth);
  const canvasH = Math.max(1, params.canvasHeight);

  let safeW: number;
  let safeH: number;
  if (box.usePixelBox) {
    safeW = Math.min(1, box.width / canvasW);
    safeH = Math.min(1, box.height / canvasH);
  } else {
    const frameAspect = canvasW / canvasH;
    const targetAspect = Math.max(0.01, box.aspect);
    if (frameAspect > targetAspect) {
      safeH = 1;
      safeW = targetAspect / frameAspect;
    } else {
      safeW = 1;
      safeH = frameAspect / targetAspect;
    }
  }

  const insetVal = Math.max(0, Math.min(0.25, inset));
  safeW = Math.max(0.01, safeW - insetVal * 2);
  safeH = Math.max(0.01, safeH - insetVal * 2);

  const exportSettings = normalizeExportSettings(params.exportSettings);
  const fit = exportSettings.videoFit ?? "contain";
  const canvasAspect = canvasW / canvasH;
  const { w: vw, h: vh } = videoNormRectOnCanvas(params.videoAspect, canvasAspect);
  const fitScale =
    fit === "cover" ? Math.max(safeW / vw, safeH / vh) : Math.min(safeW / vw, safeH / vh);
  const contentHalfW = (vw * fitScale) / 2;
  const contentHalfH = (vh * fitScale) / 2;
  const cropHalfH = safeH / 2;
  const contentOffsetY =
    fit === "contain" && contentHalfH < cropHalfH - 1e-6 ? -cropHalfH + contentHalfH : 0;

  return {
    safeW,
    safeH,
    contentHalfW,
    contentHalfH,
    contentOffsetY,
    usePixelBox: box.usePixelBox,
    targetWidth: box.width,
    targetHeight: box.height,
    targetAspect: box.aspect,
  };
}

export function exportVideoFitLabel(fit: ExportVideoFitMode | undefined): string {
  return fit === "cover" ? "Crop" : "Show all";
}
