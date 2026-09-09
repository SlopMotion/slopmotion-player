/** Veo / perfect-loop clip frame rate (ffprobe `avg_frame_rate`). */
export const LOOP_SOURCE_FPS = 24;

/** Default motion cadence for loop playback (30 fps effective at base speed). */
export const LOOP_TARGET_PRESENTATION_FPS = 30;

/** Video Speed `base` when unset — scales 24 fps source to ~30 fps presentation. */
export const DEFAULT_VIDEO_SPEED_BASE =
  LOOP_TARGET_PRESENTATION_FPS / LOOP_SOURCE_FPS;
