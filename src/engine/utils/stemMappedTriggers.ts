import type { AudioBand } from "../types/settings";
import type { ParVaguesDiscreteEvent } from "../types/parVaguesBundle";
import {
  isStemMappedBand,
  orbitNumberFromBand,
  stemRoleFromBand,
} from "./orbitTriggerBands";

export function stemEventKey(ev: Pick<ParVaguesDiscreteEvent, "t" | "orbit">): string {
  return `${ev.t}:${ev.orbit}`;
}

function seenEntry(consumerKey: string, eventKey: string): string {
  return `${consumerKey}|${eventKey}`;
}

function eventKeyFromSeenEntry(entry: string): string {
  const sep = entry.indexOf("|");
  return sep === -1 ? entry : entry.slice(sep + 1);
}

/** Prefer playhead-step events; fall back to pulse-window list. */
export function stemMappedHitEvents(
  stepEvents: ParVaguesDiscreteEvent[] | undefined,
  windowEvents: ParVaguesDiscreteEvent[] | undefined,
): ParVaguesDiscreteEvent[] {
  if (stepEvents?.length) return stepEvents;
  return windowEvents ?? [];
}

/** Count discrete stem/orbit hits not yet consumed by this mapping. */
export function countNewStemMappedHits(
  band: AudioBand,
  threshold: number,
  events: ParVaguesDiscreteEvent[] | undefined,
  seen: Set<string>,
  consumerKey: string,
): number {
  if (!isStemMappedBand(band) || !events?.length) return 0;

  const orbit = orbitNumberFromBand(band);
  const role = stemRoleFromBand(band);

  let hits = 0;
  for (const ev of events) {
    if (ev.bleed) continue;
    if (orbit != null && ev.orbit !== orbit) continue;
    if (role != null && ev.role !== role) continue;
    if (ev.v <= threshold) continue;
    const entry = seenEntry(consumerKey, stemEventKey(ev));
    if (seen.has(entry)) continue;
    seen.add(entry);
    hits += 1;
  }
  return hits;
}

/** Drop seen keys for events that left the pulse window so scrub/loop can re-trigger. */
export function pruneStemMappedSeen(
  seen: Set<string>,
  stepEvents: ParVaguesDiscreteEvent[] | undefined,
  windowEvents?: ParVaguesDiscreteEvent[] | undefined,
): void {
  const merged = [...(stepEvents ?? []), ...(windowEvents ?? [])];
  if (!merged.length) {
    seen.clear();
    return;
  }
  const active = new Set(merged.filter((ev) => !ev.bleed).map((ev) => stemEventKey(ev)));
  for (const entry of seen) {
    if (!active.has(eventKeyFromSeenEntry(entry))) seen.delete(entry);
  }
}
