/** Dedicated Hydra output for Gray-Scott state (A/B in RG). */
export const REACTION_DIFF_OUTPUT_INDEX = 1;

/** Sim frames to force re-seed after reset (flushes both ping-pong buffers). */
export const REACTION_DIFF_FORCE_SEED_FRAMES = 2;

type HydraOutputFbo = {
  getCurrent?: () => unknown;
  getTexture?: () => unknown;
};

/** Read the non-write FBO while the sim pass is drawing. */
export function hydraOutputSimReadSampler(
  getOutput: () => HydraOutputFbo | undefined,
): { getTexture: () => unknown } {
  return {
    getTexture: () => getOutput()?.getTexture?.(),
  };
}

/** Sample the FBO written by the latest sim tick (for the display overlay). */
export function hydraOutputDisplaySampler(
  getOutput: () => HydraOutputFbo | undefined,
): { getTexture: () => unknown } {
  return {
    getTexture: () => getOutput()?.getCurrent?.(),
  };
}
