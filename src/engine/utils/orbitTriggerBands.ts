import { isLfoBand, lfoBandSortKey } from "./lfoBands";
import type { AudioBand, StemRoleBand } from "../types/settings";
import type { ParVaguesBundleMeta, ParVaguesOrbitRole } from "../types/parVaguesBundle";
import { PARVAGUES_ROLE_COLOR } from "../types/parVaguesBundle";
import {
  PARVAGUES_ROLE_ORDER,
  orbitDisplayName,
  parVaguesRoleLabel,
  parVaguesRoleShortLabel,
} from "./studioParVaguesLanes";

export const ORBIT_TRIGGER_COUNT = 12;

export type OrbitBand = `orbit${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`;

export type OrbitTriggerOption = {
  band: OrbitBand;
  orbit: number;
  label: string;
  short: string;
  role: string;
  color: string;
};

export type StemRoleTriggerOption = {
  band: StemRoleBand;
  role: ParVaguesOrbitRole | "other";
  label: string;
  short: string;
  color: string;
};

const ORBIT_NUMBERS = Array.from({ length: ORBIT_TRIGGER_COUNT }, (_, i) => i + 1);

const STEM_ROLE_PREFIX = "role:" as const;

export function isOrbitBand(band: string): band is OrbitBand {
  return /^orbit([1-9]|1[0-2])$/.test(band);
}

export function isStemRoleBand(band: string): band is StemRoleBand {
  return /^role:(rhythm|bass|lead|pad|riser|other)$/.test(band);
}

/** Orbit or stem role — studio ParVagues sources that behave as short pulse hits. */
export function isStemMappedBand(band: string): boolean {
  return isOrbitBand(band) || isStemRoleBand(band);
}

export function stemRoleBandId(role: string): StemRoleBand {
  const key = (role || "other") as ParVaguesOrbitRole;
  if (PARVAGUES_ROLE_ORDER.includes(key as (typeof PARVAGUES_ROLE_ORDER)[number])) {
    return `${STEM_ROLE_PREFIX}${key}` as StemRoleBand;
  }
  return "role:other";
}

export function stemRoleFromBand(band: string): string | null {
  if (!isStemRoleBand(band)) return null;
  return band.slice(STEM_ROLE_PREFIX.length);
}

export function orbitBandId(orbit: number): OrbitBand {
  return `orbit${orbit}` as OrbitBand;
}

export function orbitNumberFromBand(band: string): number | null {
  const m = /^orbit([1-9]|1[0-2])$/.exec(band);
  return m ? parseInt(m[1]!, 10) : null;
}

function roleSortIndex(role: string): number {
  const i = PARVAGUES_ROLE_ORDER.indexOf(role as (typeof PARVAGUES_ROLE_ORDER)[number]);
  return i === -1 ? PARVAGUES_ROLE_ORDER.length : i;
}

export function orbitTriggerShort(label: string, orbit: number): string {
  const compact = label.replace(/[^a-zA-Z0-9:]/g, "").slice(0, 2);
  if (compact.length >= 2) return compact.toUpperCase();
  if (compact.length === 1) return compact.toUpperCase();
  return `O${orbit}`;
}

export function buildOrbitTriggerOptions(
  bundleMeta: ParVaguesBundleMeta | null,
  playheadTrackNumber: number | null,
): OrbitTriggerOption[] {
  if (!bundleMeta) return [];

  const track = playheadTrackNumber
    ? bundleMeta.tracks.find((t) => t.track === playheadTrackNumber)
    : null;

  if (track?.stems.length) {
    return [...track.stems]
      .toSorted((a, b) => a.orbit - b.orbit)
      .map((stem) => {
        const label = orbitDisplayName(stem);
        return {
          band: orbitBandId(stem.orbit),
          orbit: stem.orbit,
          label,
          short: orbitTriggerShort(label, stem.orbit),
          role: stem.role,
          color: PARVAGUES_ROLE_COLOR[stem.role] ?? PARVAGUES_ROLE_COLOR.other!,
        };
      });
  }

  return ORBIT_NUMBERS.map((orbit) => ({
    band: orbitBandId(orbit),
    orbit,
    label: `Orbit ${orbit}`,
    short: `O${orbit}`,
    role: "other",
    color: PARVAGUES_ROLE_COLOR.other!,
  }));
}

export function buildStemRoleTriggerOptions(
  bundleMeta: ParVaguesBundleMeta | null,
  playheadTrackNumber: number | null,
): StemRoleTriggerOption[] {
  if (!bundleMeta) return [];

  const track = playheadTrackNumber
    ? bundleMeta.tracks.find((t) => t.track === playheadTrackNumber)
    : null;

  const roles = new Set<string>();
  if (track?.stems.length) {
    for (const stem of track.stems) roles.add(stem.role || "other");
  } else {
    for (const role of PARVAGUES_ROLE_ORDER) roles.add(role);
  }

  return [...roles]
    .toSorted((a, b) => roleSortIndex(a) - roleSortIndex(b) || a.localeCompare(b))
    .map((role) => {
      const key = (role || "other") as ParVaguesOrbitRole;
      return {
        band: stemRoleBandId(role),
        role: key,
        label: parVaguesRoleLabel(role),
        short: parVaguesRoleShortLabel(role),
        color: PARVAGUES_ROLE_COLOR[key] ?? PARVAGUES_ROLE_COLOR.other!,
      };
    });
}
export function orbitBandSortKey(band: AudioBand): number {
  if (isLfoBand(band)) return lfoBandSortKey(band);
  const orbit = orbitNumberFromBand(band);
  if (orbit != null) return 20 + orbit;
  const role = stemRoleFromBand(band);
  if (role != null) return 10 + roleSortIndex(role);
  const core: Record<string, number> = {
    kick: 0,
    low: 1,
    mid: 2,
    high: 3,
    beat: 4,
    master: 5,
    none: 99,
  };
  return core[band] ?? 50;
}

export function findOrbitTriggerOption(
  band: string,
  options: OrbitTriggerOption[],
): OrbitTriggerOption | undefined {
  return options.find((o) => o.band === band);
}

export function findStemRoleTriggerOption(
  band: string,
  options: StemRoleTriggerOption[],
): StemRoleTriggerOption | undefined {
  return options.find((o) => o.band === band);
}
