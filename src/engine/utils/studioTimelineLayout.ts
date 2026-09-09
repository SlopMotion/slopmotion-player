/** Shared Studio timeline row geometry (canvas + sticky labels). */

export const STUDIO_TIMELINE_LABEL_W = 58;
export const STUDIO_TRACK_OUTER_PAD = 2;
export const STUDIO_TRACK_GAP = 3;

/** Scene / pattern tracker row. */
export const STUDIO_PATTERN_TRACK_HEIGHT = 42;

export const STUDIO_TRACKER_CONTROLS_PX = 34;

/** Trigger sub-lanes inside the trigger track. */
export const STUDIO_TIMELINE_LANE_HEIGHT = 14;
/** ParVagues moment/orbit lanes — compact rows for exhaustive stem lists. */
export const STUDIO_EVENT_LANE_HEIGHT = 16;
export const STUDIO_TIMELINE_LANE_GAP = 2;
export const STUDIO_TRIGGER_TRACK_PAD = 3;

export function studioTimelineLaneStep(laneHeight = STUDIO_TIMELINE_LANE_HEIGHT) {
  return laneHeight + STUDIO_TIMELINE_LANE_GAP;
}

export const STUDIO_SPECTRUM_TRACK_MIN = 40;

export type StudioTimelineTrack = "pattern" | "trigger" | "spectrum";

export function studioTriggerTrackHeight(
  laneCount: number,
  laneHeight = STUDIO_TIMELINE_LANE_HEIGHT,
) {
  if (laneCount <= 0) return STUDIO_TRIGGER_TRACK_PAD * 2;
  return (
    STUDIO_TRIGGER_TRACK_PAD * 2 +
    laneCount * laneHeight +
    Math.max(0, laneCount - 1) * STUDIO_TIMELINE_LANE_GAP
  );
}

export function studioPatternTrackTop() {
  return STUDIO_TRACK_OUTER_PAD;
}

export function studioTrackerLaneY() {
  return studioPatternTrackTop();
}

export function studioTriggerTrackTop(withTracker: boolean) {
  if (!withTracker) return STUDIO_TRACK_OUTER_PAD;
  return studioPatternTrackTop() + STUDIO_PATTERN_TRACK_HEIGHT + STUDIO_TRACK_GAP;
}

export function studioTimelineLaneY(
  laneIndex: number,
  withTracker = false,
  laneHeight = STUDIO_TIMELINE_LANE_HEIGHT,
) {
  return (
    studioTriggerTrackTop(withTracker) +
    STUDIO_TRIGGER_TRACK_PAD +
    laneIndex * studioTimelineLaneStep(laneHeight)
  );
}

export function studioSpectrumTrackTop(
  laneCount: number,
  withTracker: boolean,
  laneHeight = STUDIO_TIMELINE_LANE_HEIGHT,
) {
  return studioTriggerTrackTop(withTracker) + studioTriggerTrackHeight(laneCount, laneHeight) + STUDIO_TRACK_GAP;
}

export function studioTrackRect(
  track: StudioTimelineTrack,
  laneCount: number,
  withTracker: boolean,
  canvasHeight: number,
  laneHeight = STUDIO_TIMELINE_LANE_HEIGHT,
): { top: number; height: number } {
  if (track === "pattern") {
    if (!withTracker) return { top: 0, height: 0 };
    return { top: studioPatternTrackTop(), height: STUDIO_PATTERN_TRACK_HEIGHT };
  }
  if (track === "trigger") {
    return {
      top: studioTriggerTrackTop(withTracker),
      height: studioTriggerTrackHeight(laneCount, laneHeight),
    };
  }
  const top = studioSpectrumTrackTop(laneCount, withTracker, laneHeight);
  return {
    top,
    height: Math.max(STUDIO_SPECTRUM_TRACK_MIN, canvasHeight - top - STUDIO_TRACK_OUTER_PAD),
  };
}

export function studioTimelineMinCanvasHeight(
  laneCount: number,
  withTracker: boolean,
  laneHeight = STUDIO_TIMELINE_LANE_HEIGHT,
) {
  return (
    studioSpectrumTrackTop(laneCount, withTracker, laneHeight) +
    STUDIO_SPECTRUM_TRACK_MIN +
    STUDIO_TRACK_OUTER_PAD
  );
}
