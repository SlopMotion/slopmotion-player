import type { FolderConfig } from "../types/settings";

/** How a fan claims a collab drop. All claims are permanent once made. */
export type CollabClaimKind = "code" | "link" | "window";

export interface FxCollab {
  /** Stable campaign id — referenced by `FxUnlock.collab` and `entitlements.claimedCollabs`. */
  id: string;
  /** Artist / partner display name. */
  artist: string;
  /** Short drop title (shown on the unlock sheet and the provenance badge). */
  title: string;
  /** Permanent badge label on unlocked cards, e.g. "ParVagues EP · 2026". */
  badge: string;
  /** FX keys this drop grants when claimed. */
  fxKeys: (keyof FolderConfig["fx"])[];
  /** How fans redeem it. */
  claim: CollabClaimKind;
  /** Redemption codes (claim === "code"). Compared case-insensitively. */
  codes?: string[];
  /** URL param value that auto-claims (claim === "link"): `?drop=<value>`. */
  dropParam?: string;
  /** Optional ISO date after which the claim door closes (already-claimed fans keep it forever). */
  claimableUntil?: string;
  /** Optional Playset folder + preset shipped alongside the signature FX. */
  playsetFolder?: string;
  presetId?: string;
}

/**
 * Pilot drop: the ParVagues EP release unlocks the "waves" signature warp (`liquix`).
 * Reuses the ParVagues bundle the app already ships as community content.
 */
export const FX_COLLABS: FxCollab[] = [
  {
    id: "parvagues-ep-2026",
    artist: "ParVagues",
    title: "ParVagues × Shipow",
    badge: "ParVagues × Shipow · 2026",
    fxKeys: ["liquix"],
    claim: "code",
    codes: ["PARVAGUES", "VAGUES2026"],
    dropParam: "parvagues-ep",
    playsetFolder: "parvagues",
  },
];

const COLLAB_BY_ID = new Map(FX_COLLABS.map((c) => [c.id, c]));
const COLLAB_BY_DROP_PARAM = new Map(
  FX_COLLABS.filter((c) => c.dropParam).map((c) => [c.dropParam as string, c]),
);

export function getCollab(id: string | undefined | null): FxCollab | undefined {
  return id ? COLLAB_BY_ID.get(id) : undefined;
}

/** Resolve a `?drop=<value>` param to a campaign. */
export function getCollabByDropParam(value: string | undefined | null): FxCollab | undefined {
  return value ? COLLAB_BY_DROP_PARAM.get(value) : undefined;
}

/** Find a campaign a redemption code unlocks (case-insensitive). */
export function getCollabByCode(code: string): FxCollab | undefined {
  const norm = code.trim().toUpperCase();
  if (!norm) return undefined;
  return FX_COLLABS.find((c) => (c.codes ?? []).some((k) => k.toUpperCase() === norm));
}

/** Whether the claim window for a campaign is still open (no window = always open). */
export function isCollabClaimable(collab: FxCollab, now: number = Date.now()): boolean {
  if (!collab.claimableUntil) return true;
  const until = Date.parse(collab.claimableUntil);
  return Number.isNaN(until) ? true : now <= until;
}
