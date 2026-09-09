/** Poll interval when the tab is in the background. */
export const BACKGROUND_TICK_MS = 500;

/** Poll interval when transport is paused and no reactive work is pending. */
export const IDLE_TICK_MS = 250;

/** hydra-synth `synth.fps` when the tab is hidden. */
export const HYDRA_FPS_BACKGROUND = 2;

/** hydra-synth `synth.fps` when transport is paused and nothing reactive is running. */
export const HYDRA_FPS_IDLE = 4;

/** hydra-synth `synth.fps` when paused but pulse envelopes / reactive FX need updates. */
export const HYDRA_FPS_REACTIVE_IDLE = 30;
