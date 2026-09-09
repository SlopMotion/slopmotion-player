export interface MaskVideoRectLayout {
  cx: number;
  cy: number;
  halfWx: number;
  halfHy: number;
  zoom: number;
  panX: number;
  panY: number;
}

const ZOOM_MIN = 1.0;
const ZOOM_MAX = 2.0;
const ZONE_EDGE = 0.02;

/** Disjoint viewport bands — rects placed inside cannot touch siblings. */
const ZONES: Array<{ minX: number; maxX: number; minY: number; maxY: number }> = [
  { minX: 0.04, maxX: 0.44, minY: 0.04, maxY: 0.44 },
  { minX: 0.56, maxX: 0.96, minY: 0.04, maxY: 0.44 },
  { minX: 0.18, maxX: 0.82, minY: 0.56, maxY: 0.96 },
];

/** Width ÷ height presets: 16∶9, 4∶3, 1∶1, 9∶16. */
const FORMAT_RATIOS = [16 / 9, 4 / 3, 1, 9 / 16] as const;

function hash01(seed: number): number {
  const t = Math.sin(seed) * 43758.5453;
  return t - Math.floor(t);
}

function pickFormatRatio(seed: number): number {
  const idx = Math.floor(hash01(seed + 60) * FORMAT_RATIOS.length) % FORMAT_RATIOS.length;
  return FORMAT_RATIOS[idx]!;
}

function rectZoomPan(seed: number): Pick<MaskVideoRectLayout, "zoom" | "panX" | "panY"> {
  return {
    zoom: ZOOM_MIN + hash01(seed + 1) * (ZOOM_MAX - ZOOM_MIN),
    panX: (hash01(seed + 2) - 0.5) * 0.55,
    panY: (hash01(seed + 3) - 0.5) * 0.55,
  };
}

function fitRectInZone(
  zone: (typeof ZONES)[number],
  baseSize: number,
  aspect: number,
  posSeed: number,
  detailSeed: number,
): Pick<MaskVideoRectLayout, "cx" | "cy" | "halfWx" | "halfHy"> {
  const size = Math.max(0.06, Math.min(0.55, baseSize));
  const formatRatio = pickFormatRatio(detailSeed);
  const zoneW = zone.maxX - zone.minX;
  const zoneH = zone.maxY - zone.minY;
  const zoneHalfW = (zoneW - ZONE_EDGE * 2) * 0.5;
  const zoneHalfH = (zoneH - ZONE_EDGE * 2) * 0.5;

  const maxHalfHy = Math.min(zoneHalfH, zoneHalfW * aspect / formatRatio, size * 1.05);
  const halfHy = maxHalfHy * (0.5 + hash01(detailSeed + 45.6) * 0.5);
  const halfWx = halfHy * (formatRatio / aspect);

  const cxMin = zone.minX + halfWx + ZONE_EDGE;
  const cxMax = zone.maxX - halfWx - ZONE_EDGE;
  const cyMin = zone.minY + halfHy + ZONE_EDGE;
  const cyMax = zone.maxY - halfHy - ZONE_EDGE;

  const cx = cxMin + hash01(posSeed + 78.9) * Math.max(1e-4, cxMax - cxMin);
  const cy = cyMin + hash01(posSeed + 91.2) * Math.max(1e-4, cyMax - cyMin);

  return { cx, cy, halfWx, halfHy };
}

/** Three non-overlapping viewport rects in fixed zones; `posSeg` re-seeds placement only. */
export function layoutMaskVideoRects(
  posSeg: number,
  baseSize: number,
  aspect: number,
): MaskVideoRectLayout[] {
  return ZONES.map((zone, i) => {
    const detailSeed = i * 17;
    const posSeed = i * 17 + posSeg * 1.31;
    return {
      ...fitRectInZone(zone, baseSize, aspect, posSeed, detailSeed),
      ...rectZoomPan(detailSeed),
    };
  });
}
