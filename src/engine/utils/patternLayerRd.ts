import type { FXConfig, FolderConfig } from "../types/settings";

export const PATTERN_LAYER_TURING_TYPE = 4;
export const PATTERN_LAYER_GEOMETRY_TYPE = 5;
export const PATTERN_LAYER_MAX_TYPE = PATTERN_LAYER_GEOMETRY_TYPE;

/** Dedicated Hydra FBO for Pattern Turing (Labs React Diff keeps o1). */
export const PATTERN_RD_OUTPUT_INDEX = 3;

/** Extra seed frames so the noisy disc writes both ping-pong buffers. */
export const PATTERN_RD_FORCE_SEED_FRAMES = 4;

/**
 * Lattice ceiling. Cell count does not change what the sim costs — every fragment
 * runs either way — so this is bounded by how few texels a cell can own before
 * neighbour reads stop landing on the cell they asked for.
 */
export const PATTERN_RD_MAX_CELLS = 960;

/**
 * Feed per Look. Only a narrow slice of the Pearson map survives Hydra's 8-bit
 * state — outside `feed` 0.038-0.078 with `kill` 0.060-0.066 the field either
 * floods solid or decays to nothing, which is why these are not the textbook
 * coral/labyrinth/mitosis constants.
 */
const TURING_LOOK_FEED = [0.042, 0.052, 0.062, 0.075] as const;

/** Gap walks `kill` across the structured band: dense growth to sparse dots. */
const TURING_KILL_DENSE = 0.06;
const TURING_KILL_SPARSE = 0.0665;

/** One-click defaults when switching Pattern family to Turing (Photism morphogen). */
export const MORPHOGEN_TURING_PARAMS = {
  variant: 2,
  mode: 0,
  scale: 2.5,
  speed: 0.8,
  warp: 0.5,
  symmetry: 3,
  seedSize: 0.18,
  gap: 0.5,
  colorA: "#030306",
  colorB: "#f0abfc",
} as const;

export function patternLayerIsTuring(fx: FXConfig | undefined): boolean {
  if (!fx?.enabled) return false;
  return Math.round(Number(fx.params?.type ?? 1)) === PATTERN_LAYER_TURING_TYPE;
}

export function patternLayerTuringLive(fxMap: FolderConfig["fx"] | undefined): boolean {
  return patternLayerIsTuring(fxMap?.patternLayer);
}

/**
 * Lattice width in cells. Density trades feature size against detail; the curve
 * keeps the whole slider useful instead of saturating in its top half.
 */
export function patternTuringCells(density: number): number {
  const zoom = Math.max(0.25, density);
  return Math.round(Math.max(96, Math.min(PATTERN_RD_MAX_CELLS, 300 * Math.pow(zoom, 0.79))));
}

export function patternTuringRdParams(
  look: number,
  density: number,
  speed: number,
  warp: number,
  symmetry = 2,
  seedSize = 0.18,
  gap = 0.35,
) {
  const variant = Math.max(0, Math.min(3, Math.round(look)));
  const g = Math.max(0, Math.min(1, gap));
  return {
    look: variant,
    feed: TURING_LOOK_FEED[variant] ?? TURING_LOOK_FEED[1],
    kill: TURING_KILL_DENSE + (TURING_KILL_SPARSE - TURING_KILL_DENSE) * g,
    cells: patternTuringCells(density),
    speed: Math.max(0, Math.min(2, speed)),
    styleMap: Math.max(0, Math.min(1, warp)),
    symmetry: Math.max(0, Math.min(3, Math.round(symmetry))),
    seedSize: Math.max(0.08, Math.min(0.55, seedSize)),
    gap: g,
  };
}
