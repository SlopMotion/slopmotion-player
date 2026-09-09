import type {
  NormPoint,
  OutputMapMaskOp,
  OutputMapMaskPoly,
  OutputMapTemplate,
  OutputMapVertex,
  OutputMapping,
} from "../types/settings";

export const IDENTITY_OUTPUT_CORNERS: [NormPoint, NormPoint, NormPoint, NormPoint] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

export const IDENTITY_OUTPUT_GRID: NormPoint[] = [0, 0.5, 1].flatMap((y) =>
  [0, 0.5, 1].map((x) => ({ x, y })),
);

export const OUTPUT_MAP_TRANSFORM_GRID_POINTS = 9;
export const MAX_OUTPUT_MAP_TRANSFORM_POINTS = OUTPUT_MAP_TRANSFORM_GRID_POINTS;
export const MAX_OUTPUT_MAP_MASK_POINTS = 64;
export const OUTPUT_MAP_SHADER_MASK_POINTS = MAX_OUTPUT_MAP_MASK_POINTS;
export const MAX_OUTPUT_MAP_MASK_POLYS = 8;
export const MAX_OUTPUT_MAP_MASK_EXTRAS = MAX_OUTPUT_MAP_MASK_POLYS - 1;
export const MIN_OUTPUT_MAP_MASK_POLY_POINTS = 3;
export const MAX_OUTPUT_MAP_TEMPLATES = 32;

/** Hydra FBO for the unwarped FX chain (o1 = reaction-diffusion sim). */
export const OUTPUT_MAP_SOURCE_INDEX = 0;
/** Hydra FBO for corner-pinned canvas output. */
export const OUTPUT_MAP_DISPLAY_INDEX = 2;

export function identityOutputMapPoints(): OutputMapVertex[] {
  return IDENTITY_OUTPUT_CORNERS.map((corner) => ({
    dest: { ...corner },
    src: { ...corner },
  }));
}

export function identityOutputMapMask(): NormPoint[] {
  return IDENTITY_OUTPUT_CORNERS.map((corner) => ({ ...corner }));
}

export function identityOutputMapGrid(): OutputMapVertex[] {
  return IDENTITY_OUTPUT_GRID.map((point) => ({
    dest: { ...point },
    src: { ...point },
  }));
}

export const DEFAULT_OUTPUT_MAPPING: OutputMapping = {
  enabled: false,
  points: identityOutputMapPoints(),
  mask: identityOutputMapMask(),
  maskPolys: [],
};

export function createOutputMapMaskPoly(op: OutputMapMaskOp = "add"): OutputMapMaskPoly {
  return {
    op,
    points: [
      { x: 0.38, y: 0.38 },
      { x: 0.62, y: 0.38 },
      { x: 0.62, y: 0.62 },
      { x: 0.38, y: 0.62 },
    ],
  };
}

function clamp01(value: unknown, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(1, n));
}

function normalizePoint(raw: unknown, fallback: NormPoint): NormPoint {
  if (!raw || typeof raw !== "object") return { ...fallback };
  const point = raw as Partial<NormPoint>;
  return {
    x: clamp01(point.x, fallback.x),
    y: clamp01(point.y, fallback.y),
  };
}

function normalizeVertex(raw: unknown, fallback: OutputMapVertex): OutputMapVertex {
  if (!raw || typeof raw !== "object") {
    return { dest: { ...fallback.dest }, src: { ...fallback.src } };
  }
  const vertex = raw as Partial<OutputMapVertex> & Partial<NormPoint>;
  const destSource = vertex.dest ?? vertex;
  return {
    dest: normalizePoint(destSource, fallback.dest),
    src: normalizePoint(vertex.src, fallback.src),
  };
}

export function projectPointOnSegment(point: NormPoint, a: NormPoint, b: NormPoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const denom = dx * dx + dy * dy;
  if (denom < 1e-10) return 0.5;
  const t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / denom;
  return Math.max(0.05, Math.min(0.95, t));
}

function midDest(a: OutputMapVertex, b: OutputMapVertex): NormPoint {
  return {
    x: (a.dest.x + b.dest.x) * 0.5,
    y: (a.dest.y + b.dest.y) * 0.5,
  };
}

export function subdivideOutputMapTransform(points: OutputMapVertex[]): OutputMapVertex[] {
  if (points.length >= OUTPUT_MAP_TRANSFORM_GRID_POINTS) return points;
  const [tl, tr, br, bl] = takeFourTransform(points);
  return [
    { dest: { ...tl.dest }, src: { x: 0, y: 0 } },
    { dest: midDest(tl, tr), src: { x: 0.5, y: 0 } },
    { dest: { ...tr.dest }, src: { x: 1, y: 0 } },
    { dest: midDest(bl, tl), src: { x: 0, y: 0.5 } },
    {
      dest: {
        x: (tl.dest.x + tr.dest.x + br.dest.x + bl.dest.x) * 0.25,
        y: (tl.dest.y + tr.dest.y + br.dest.y + bl.dest.y) * 0.25,
      },
      src: { x: 0.5, y: 0.5 },
    },
    { dest: midDest(tr, br), src: { x: 1, y: 0.5 } },
    { dest: { ...bl.dest }, src: { x: 0, y: 1 } },
    { dest: midDest(br, bl), src: { x: 0.5, y: 1 } },
    { dest: { ...br.dest }, src: { x: 1, y: 1 } },
  ];
}

export function collapseOutputMapTransform(points: OutputMapVertex[]): OutputMapVertex[] {
  if (points.length < OUTPUT_MAP_TRANSFORM_GRID_POINTS) return takeFourTransform(points);
  return takeFourTransform([points[0]!, points[2]!, points[8]!, points[6]!]);
}

export function insertMaskPoint(mask: NormPoint[], edgeIndex: number, dest: NormPoint): NormPoint[] {
  if (mask.length >= MAX_OUTPUT_MAP_MASK_POINTS) return mask;
  const a = mask.at(edgeIndex);
  const b = mask.at((edgeIndex + 1) % mask.length);
  if (!a || !b) return mask;
  const next = mask.slice();
  next.splice(edgeIndex + 1, 0, { x: dest.x, y: dest.y });
  return next;
}

export function removeMaskPoint(mask: NormPoint[], index: number): NormPoint[] {
  if (mask.length <= 4) return mask;
  if (index < 0 || index >= mask.length) return mask;
  return mask.filter((_, pointIndex) => pointIndex !== index);
}

export function outputMapMaskPolyList(mapping: OutputMapping): OutputMapMaskPoly[] {
  return [
    { op: "add" as const, points: mapping.mask },
    ...mapping.maskPolys,
  ].filter((poly) => poly.points.length >= MIN_OUTPUT_MAP_MASK_POLY_POINTS);
}

export function outputMapMaskPointCount(mapping: OutputMapping): number {
  return outputMapMaskPolyList(mapping).reduce((sum, poly) => sum + poly.points.length, 0);
}

export type OutputMapMaskLink = {
  next: number;
  end: boolean;
  exclude: boolean;
};

export function outputMapMaskAtlasLayout(mapping: OutputMapping): {
  points: NormPoint[];
  links: OutputMapMaskLink[];
} {
  const points: NormPoint[] = [];
  const links: OutputMapMaskLink[] = [];
  let polyCount = 0;
  for (const poly of outputMapMaskPolyList(mapping)) {
    const start = points.length;
    const take = Math.min(poly.points.length, MAX_OUTPUT_MAP_MASK_POINTS - start);
    if (take < MIN_OUTPUT_MAP_MASK_POLY_POINTS) break;
    for (let index = 0; index < take; index += 1) {
      points.push(poly.points[index]!);
      links.push({
        next: index + 1 < take ? start + index + 1 : start,
        end: index + 1 === take,
        exclude: poly.op === "exclude",
      });
    }
    polyCount += 1;
    if (polyCount >= MAX_OUTPUT_MAP_MASK_POLYS) break;
  }
  return { points, links };
}

/** x = next point index. y = 0 mid-edge, ~0.6 last+add, 1 last+exclude. */
export function encodeOutputMapMaskLink(link: OutputMapMaskLink): NormPoint {
  return {
    x: link.next / MAX_OUTPUT_MAP_MASK_POINTS,
    y: link.end ? (link.exclude ? 1 : 0.6) : 0,
  };
}

function readMaskPolyPoints(mapping: OutputMapping, polyIndex: number): NormPoint[] | null {
  if (polyIndex === 0) return mapping.mask;
  return mapping.maskPolys[polyIndex - 1]?.points ?? null;
}

function writeMaskPolyPoints(
  mapping: OutputMapping,
  polyIndex: number,
  points: NormPoint[],
): OutputMapping {
  if (polyIndex === 0) return { ...mapping, mask: points };
  return {
    ...mapping,
    maskPolys: mapping.maskPolys.map((poly, index) =>
      index === polyIndex - 1 ? { ...poly, points } : poly,
    ),
  };
}

export function insertMaskPolyPoint(
  mapping: OutputMapping,
  polyIndex: number,
  edgeIndex: number,
  dest: NormPoint,
): OutputMapping {
  if (outputMapMaskPointCount(mapping) >= MAX_OUTPUT_MAP_MASK_POINTS) return mapping;
  const points = readMaskPolyPoints(mapping, polyIndex);
  if (!points) return mapping;
  return writeMaskPolyPoints(mapping, polyIndex, insertMaskPoint(points, edgeIndex, dest));
}

export function removeMaskPolyPoint(
  mapping: OutputMapping,
  polyIndex: number,
  pointIndex: number,
): OutputMapping {
  if (polyIndex === 0) {
    return { ...mapping, mask: removeMaskPoint(mapping.mask, pointIndex) };
  }
  const poly = mapping.maskPolys[polyIndex - 1];
  if (!poly) return mapping;
  if (pointIndex < 0 || pointIndex >= poly.points.length) return mapping;
  const next = poly.points.filter((_, index) => index !== pointIndex);
  if (next.length < MIN_OUTPUT_MAP_MASK_POLY_POINTS) {
    return {
      ...mapping,
      maskPolys: mapping.maskPolys.filter((_, index) => index !== polyIndex - 1),
    };
  }
  return writeMaskPolyPoints(mapping, polyIndex, next);
}

export function addOutputMapMaskPoly(
  mapping: OutputMapping,
  op: OutputMapMaskOp = "add",
): OutputMapping {
  if (mapping.maskPolys.length >= MAX_OUTPUT_MAP_MASK_EXTRAS) return mapping;
  const poly = createOutputMapMaskPoly(op);
  if (outputMapMaskPointCount(mapping) + poly.points.length > MAX_OUTPUT_MAP_MASK_POINTS) {
    return mapping;
  }
  return { ...mapping, maskPolys: [...mapping.maskPolys, poly] };
}

export function setOutputMapMaskPolyOp(
  mapping: OutputMapping,
  polyIndex: number,
  op: OutputMapMaskOp,
): OutputMapping {
  if (polyIndex <= 0) return mapping;
  return {
    ...mapping,
    maskPolys: mapping.maskPolys.map((poly, index) =>
      index === polyIndex - 1 ? { ...poly, op } : poly,
    ),
  };
}

export function moveMaskPolyPoint(
  mapping: OutputMapping,
  polyIndex: number,
  pointIndex: number,
  dest: NormPoint,
): OutputMapping {
  const points = readMaskPolyPoints(mapping, polyIndex);
  if (!points || pointIndex < 0 || pointIndex >= points.length) return mapping;
  return writeMaskPolyPoints(
    mapping,
    polyIndex,
    points.map((point, index) => (index === pointIndex ? dest : point)),
  );
}

export function translateNormPoints(points: NormPoint[], dx: number, dy: number): NormPoint[] {
  if (points.length === 0) return points;
  let minX = 1;
  let maxX = 0;
  let minY = 1;
  let maxY = 0;
  for (const point of points) {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }
  const shiftX = Math.max(-minX, Math.min(1 - maxX, dx));
  const shiftY = Math.max(-minY, Math.min(1 - maxY, dy));
  if (shiftX === 0 && shiftY === 0) return points;
  return points.map((point) => ({ x: point.x + shiftX, y: point.y + shiftY }));
}

export function translateOutputMapTransform(
  mapping: OutputMapping,
  dx: number,
  dy: number,
): OutputMapping {
  const dests = translateNormPoints(
    mapping.points.map((point) => point.dest),
    dx,
    dy,
  );
  return {
    ...mapping,
    points: mapping.points.map((point, index) => ({
      ...point,
      dest: dests[index] ?? point.dest,
    })),
  };
}

export function translateMaskPoly(
  mapping: OutputMapping,
  polyIndex: number,
  dx: number,
  dy: number,
): OutputMapping {
  const points = readMaskPolyPoints(mapping, polyIndex);
  if (!points) return mapping;
  return writeMaskPolyPoints(mapping, polyIndex, translateNormPoints(points, dx, dy));
}

export function resetOutputMappingPoints(mapping: OutputMapping): OutputMapping {
  return {
    ...DEFAULT_OUTPUT_MAPPING,
    enabled: mapping.enabled,
    points: identityOutputMapPoints(),
    mask: identityOutputMapMask(),
    maskPolys: [],
  };
}

function near(value: number, target: number): boolean {
  return Math.abs(value - target) < 1e-4;
}

function isIdentityQuad(dests: NormPoint[]): boolean {
  if (dests.length !== 4) return false;
  return IDENTITY_OUTPUT_CORNERS.every((corner, index) => {
    const dest = dests[index];
    return dest != null && near(dest.x, corner.x) && near(dest.y, corner.y);
  });
}

function isIdentityGrid(dests: NormPoint[]): boolean {
  if (dests.length !== OUTPUT_MAP_TRANSFORM_GRID_POINTS) return false;
  return IDENTITY_OUTPUT_GRID.every((point, index) => {
    const dest = dests[index];
    return dest != null && near(dest.x, point.x) && near(dest.y, point.y);
  });
}

export function isIdentityOutputMapMask(mask: NormPoint[]): boolean {
  return isIdentityQuad(mask);
}

export function isIdentityOutputMapClip(mapping: OutputMapping): boolean {
  return isIdentityOutputMapMask(mapping.mask) && mapping.maskPolys.length === 0;
}

export function isIdentityOutputMapping(mapping: OutputMapping): boolean {
  const dests = mapping.points.map((point) => point.dest);
  const transformOk = dests.length === OUTPUT_MAP_TRANSFORM_GRID_POINTS ? isIdentityGrid(dests) : isIdentityQuad(dests);
  return transformOk && isIdentityOutputMapClip(mapping);
}

export function outputMappingShouldWarp(mapping: OutputMapping): boolean {
  return mapping.enabled && !isIdentityOutputMapping(mapping);
}

export function outputMapTransformCorners(
  mapping: OutputMapping,
): [NormPoint, NormPoint, NormPoint, NormPoint] {
  const pts = mapping.points;
  if (pts.length >= OUTPUT_MAP_TRANSFORM_GRID_POINTS) {
    return [
      pts[0]?.dest ?? IDENTITY_OUTPUT_CORNERS[0],
      pts[2]?.dest ?? IDENTITY_OUTPUT_CORNERS[1],
      pts[8]?.dest ?? IDENTITY_OUTPUT_CORNERS[2],
      pts[6]?.dest ?? IDENTITY_OUTPUT_CORNERS[3],
    ];
  }
  return [
    pts[0]?.dest ?? IDENTITY_OUTPUT_CORNERS[0],
    pts[1]?.dest ?? IDENTITY_OUTPUT_CORNERS[1],
    pts[2]?.dest ?? IDENTITY_OUTPUT_CORNERS[2],
    pts[3]?.dest ?? IDENTITY_OUTPUT_CORNERS[3],
  ];
}

export function outputMapShaderVertex(mapping: OutputMapping, index: number): OutputMapVertex {
  const fallback = mapping.points.at(-1) ?? identityOutputMapPoints()[0]!;
  return mapping.points[index] ?? fallback;
}

export function outputMapShaderMaskPoint(mapping: OutputMapping, index: number): NormPoint {
  const flat = outputMapMaskAtlasLayout(mapping).points;
  const fallback = flat.at(-1) ?? IDENTITY_OUTPUT_CORNERS[0]!;
  return flat[index] ?? fallback;
}

function verticesFromLegacyCorners(raw: unknown): OutputMapVertex[] | null {
  if (!Array.isArray(raw) || raw.length < 4) return null;
  return IDENTITY_OUTPUT_CORNERS.map((fallback, index) => ({
    dest: normalizePoint(raw[index], fallback),
    src: { ...fallback },
  }));
}

function takeFourTransform(vertices: OutputMapVertex[]): OutputMapVertex[] {
  const identity = identityOutputMapPoints();
  return identity.map((fallback, index) => {
    const vertex = vertices[index];
    return vertex
      ? { dest: { ...vertex.dest }, src: { ...fallback.src } }
      : fallback;
  });
}

function takeNineTransform(vertices: OutputMapVertex[]): OutputMapVertex[] {
  const identity = identityOutputMapGrid();
  return identity.map((fallback, index) => {
    const vertex = vertices[index];
    return vertex
      ? { dest: { ...vertex.dest }, src: { ...fallback.src } }
      : fallback;
  });
}

function normalizeTransformPoints(vertices: OutputMapVertex[]): OutputMapVertex[] {
  if (vertices.length >= OUTPUT_MAP_TRANSFORM_GRID_POINTS) return takeNineTransform(vertices);
  return takeFourTransform(vertices);
}

function transformFromLegacyPoints(points: OutputMapVertex[]): OutputMapVertex[] {
  return IDENTITY_OUTPUT_CORNERS.map((src) => {
    const match = points.find((point) => near(point.src.x, src.x) && near(point.src.y, src.y));
    return match
      ? { dest: { ...match.dest }, src: { ...src } }
      : { dest: { ...src }, src: { ...src } };
  });
}

function normalizeMaskPoints(
  raw: unknown,
  fallback: NormPoint[],
  minPoints = 4,
): NormPoint[] {
  if (!Array.isArray(raw) || raw.length < minPoints) return fallback.map((point) => ({ ...point }));
  return raw.slice(0, MAX_OUTPUT_MAP_MASK_POINTS).map((row, index) =>
    normalizePoint(row, fallback[Math.min(index, Math.max(fallback.length - 1, 0))] ?? IDENTITY_OUTPUT_CORNERS[0]!),
  );
}

function normalizeMaskPoly(raw: unknown): OutputMapMaskPoly | null {
  if (!raw || typeof raw !== "object") return null;
  const source = raw as Partial<OutputMapMaskPoly>;
  const points = normalizeMaskPoints(source.points, [], MIN_OUTPUT_MAP_MASK_POLY_POINTS);
  if (points.length < MIN_OUTPUT_MAP_MASK_POLY_POINTS) return null;
  return {
    op: source.op === "exclude" ? "exclude" : "add",
    points,
  };
}

function normalizeMaskPolys(raw: unknown, usedByPrimary: number): OutputMapMaskPoly[] {
  if (!Array.isArray(raw)) return [];
  const extras: OutputMapMaskPoly[] = [];
  let used = usedByPrimary;
  for (const row of raw) {
    if (extras.length >= MAX_OUTPUT_MAP_MASK_EXTRAS) break;
    const poly = normalizeMaskPoly(row);
    if (!poly) continue;
    const room = MAX_OUTPUT_MAP_MASK_POINTS - used;
    if (room < MIN_OUTPUT_MAP_MASK_POLY_POINTS) break;
    const points = poly.points.slice(0, room);
    if (points.length < MIN_OUTPUT_MAP_MASK_POLY_POINTS) continue;
    extras.push({ op: poly.op, points });
    used += points.length;
  }
  return extras;
}

export function normalizeOutputMapping(raw: unknown): OutputMapping {
  const source = raw && typeof raw === "object" ? (raw as Partial<OutputMapping> & { corners?: unknown }) : {};
  const identity = identityOutputMapPoints();
  const fromPoints = Array.isArray(source.points)
    ? source.points.slice(0, MAX_OUTPUT_MAP_TRANSFORM_POINTS).map((row, index) =>
        normalizeVertex(row, identity[Math.min(index, identity.length - 1)]!),
      )
    : null;
  const hasMask = Array.isArray(source.mask) && source.mask.length >= 4;
  const legacy = fromPoints && fromPoints.length >= 4 ? fromPoints : verticesFromLegacyCorners(source.corners);

  let points: OutputMapVertex[];
  let mask: NormPoint[];
  if (hasMask) {
    points = normalizeTransformPoints(legacy ?? identity);
    mask = normalizeMaskPoints(source.mask, identityOutputMapMask());
  } else if (legacy && legacy.length > 4) {
    points = transformFromLegacyPoints(legacy);
    mask = legacy.map((vertex) => ({ ...vertex.dest }));
  } else if (legacy && legacy.length >= 4) {
    points = takeFourTransform(legacy);
    mask = points.map((vertex) => ({ ...vertex.dest }));
  } else {
    points = identity;
    mask = identityOutputMapMask();
  }

  return {
    enabled: source.enabled === true,
    points,
    mask,
    maskPolys: normalizeMaskPolys(source.maskPolys, mask.length),
  };
}

export function normalizeOutputMapTemplate(raw: unknown): OutputMapTemplate | null {
  if (!raw || typeof raw !== "object") return null;
  const source = raw as Partial<OutputMapTemplate>;
  const name = typeof source.name === "string" ? source.name.trim() : "";
  const id = typeof source.id === "string" ? source.id.trim() : "";
  if (!name || !id) return null;
  const updatedAt =
    typeof source.updatedAt === "number" && Number.isFinite(source.updatedAt)
      ? source.updatedAt
      : 0;
  return {
    id,
    name: name.slice(0, 48),
    updatedAt,
    mapping: normalizeOutputMapping(source.mapping),
  };
}

export function normalizeOutputMapTemplates(raw: unknown): OutputMapTemplate[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const templates: OutputMapTemplate[] = [];
  for (const row of raw) {
    const template = normalizeOutputMapTemplate(row);
    if (!template || seen.has(template.id)) continue;
    seen.add(template.id);
    templates.push(template);
    if (templates.length >= MAX_OUTPUT_MAP_TEMPLATES) break;
  }
  return templates.toSorted((a, b) => b.updatedAt - a.updatedAt);
}

export function nextOutputMapTemplateName(templates: OutputMapTemplate[]): string {
  const used = new Set(templates.map((template) => template.name.toLowerCase()));
  let index = templates.length + 1;
  let name = `Map ${index}`;
  while (used.has(name.toLowerCase())) {
    index += 1;
    name = `Map ${index}`;
  }
  return name;
}

export function upsertOutputMapTemplate(
  templates: OutputMapTemplate[],
  name: string,
  mapping: OutputMapping,
): OutputMapTemplate[] {
  const trimmed = name.trim().slice(0, 48);
  const label = trimmed || nextOutputMapTemplateName(templates);
  const existing = templates.find((template) => template.name.toLowerCase() === label.toLowerCase());
  const next: OutputMapTemplate = {
    id: existing?.id ?? `map-${Date.now()}`,
    name: label,
    updatedAt: Date.now(),
    mapping: normalizeOutputMapping(mapping),
  };
  return [next, ...templates.filter((template) => template.id !== next.id)].slice(
    0,
    MAX_OUTPUT_MAP_TEMPLATES,
  );
}
