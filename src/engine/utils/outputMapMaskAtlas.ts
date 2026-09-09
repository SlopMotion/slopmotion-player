import {
  encodeOutputMapMaskLink,
  MAX_OUTPUT_MAP_MASK_POINTS,
  MAX_OUTPUT_MAP_TRANSFORM_POINTS,
  outputMapMaskAtlasLayout,
  outputMapShaderVertex,
} from "../data/outputMapping";
import type { OutputMapping } from "../types/settings";

type ReglTexture = {
  subimage?: (arg: Uint8Array | { data: Uint8Array; width: number; height: number }) => void;
};

type MaskAtlasState = {
  data: Uint8Array;
  tex: ReglTexture;
};

let state: MaskAtlasState | null = null;

export const OUTPUT_MAP_ATLAS_TRANSFORM0 = 0;
export const OUTPUT_MAP_ATLAS_MASK0 = MAX_OUTPUT_MAP_TRANSFORM_POINTS;
export const OUTPUT_MAP_ATLAS_LINK0 = OUTPUT_MAP_ATLAS_MASK0 + MAX_OUTPUT_MAP_MASK_POINTS;
export const OUTPUT_MAP_ATLAS_WIDTH =
  MAX_OUTPUT_MAP_TRANSFORM_POINTS + MAX_OUTPUT_MAP_MASK_POINTS * 2;

export function encodeOutputMapAxis(value: number): [number, number] {
  const n = Math.round(Math.max(0, Math.min(1, value)) * 65535);
  return [n >> 8, n & 255];
}

export function decodeOutputMapAxis(hi: number, lo: number): number {
  return (hi * 256 + lo) / 65535;
}

function writePoint(data: Uint8Array, index: number, x: number, y: number): void {
  const [xh, xl] = encodeOutputMapAxis(x);
  const [yh, yl] = encodeOutputMapAxis(y);
  const o = index * 4;
  data[o] = xh;
  data[o + 1] = xl;
  data[o + 2] = yh;
  data[o + 3] = yl;
}

export function initOutputMapMaskAtlas(regl: { texture: (opts: object) => ReglTexture }): void {
  if (state?.data.length === OUTPUT_MAP_ATLAS_WIDTH * 4) return;
  const data = new Uint8Array(OUTPUT_MAP_ATLAS_WIDTH * 4);
  const identity = [0, 0.5, 1].flatMap((y) => [0, 0.5, 1].map((x) => ({ x, y })));
  identity.forEach((point, index) => writePoint(data, OUTPUT_MAP_ATLAS_TRANSFORM0 + index, point.x, point.y));
  writePoint(data, OUTPUT_MAP_ATLAS_MASK0, 0, 0);
  writePoint(data, OUTPUT_MAP_ATLAS_MASK0 + 1, 1, 0);
  writePoint(data, OUTPUT_MAP_ATLAS_MASK0 + 2, 1, 1);
  writePoint(data, OUTPUT_MAP_ATLAS_MASK0 + 3, 0, 1);
  const identityLinks = [
    { next: 1, end: false, exclude: false },
    { next: 2, end: false, exclude: false },
    { next: 3, end: false, exclude: false },
    { next: 0, end: true, exclude: false },
  ];
  identityLinks.forEach((link, index) => {
    const encoded = encodeOutputMapMaskLink(link);
    writePoint(data, OUTPUT_MAP_ATLAS_LINK0 + index, encoded.x, encoded.y);
  });
  const tex = regl.texture({
    data,
    shape: [OUTPUT_MAP_ATLAS_WIDTH, 1],
    wrap: "clamp",
    mag: "nearest",
    min: "nearest",
  });
  state = { data, tex };
}

export function getOutputMapMaskAtlasSampler(): { getTexture: () => unknown } {
  return {
    getTexture: () => state?.tex ?? null,
  };
}

export function isOutputMapMaskAtlasReady(): boolean {
  return state != null && state.data.length === OUTPUT_MAP_ATLAS_WIDTH * 4;
}

export function uploadOutputMapMaskAtlas(mapping: OutputMapping): void {
  if (!state) return;
  const { data, tex } = state;
  for (let index = 0; index < MAX_OUTPUT_MAP_TRANSFORM_POINTS; index += 1) {
    const dest = outputMapShaderVertex(mapping, index).dest;
    writePoint(data, OUTPUT_MAP_ATLAS_TRANSFORM0 + index, dest.x, dest.y);
  }
  const layout = outputMapMaskAtlasLayout(mapping);
  const fallback = layout.points.at(-1) ?? { x: 0, y: 0 };
  const fallbackLink = layout.links.at(-1) ?? { next: 0, end: true, exclude: false };
  for (let index = 0; index < MAX_OUTPUT_MAP_MASK_POINTS; index += 1) {
    const point = layout.points[index] ?? fallback;
    writePoint(data, OUTPUT_MAP_ATLAS_MASK0 + index, point.x, point.y);
    const encoded = encodeOutputMapMaskLink(layout.links[index] ?? fallbackLink);
    writePoint(data, OUTPUT_MAP_ATLAS_LINK0 + index, encoded.x, encoded.y);
  }
  tex.subimage?.({
    data,
    width: OUTPUT_MAP_ATLAS_WIDTH,
    height: 1,
  });
}
