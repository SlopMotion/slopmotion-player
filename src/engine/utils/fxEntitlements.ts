import type { EngagementCounters, FxEntitlements } from "../types/settings";
import {
  AVAILABLE_FX,
  FX_TIER_ORDER,
  FX_TIER_LABEL,
  getFxTier,
  getFxUnlock,
  isCoreFxKey,
  type FxTier,
} from "../data/fxConfig";
import { getCollab } from "../data/fxCollabs";

export const DEFAULT_ENGAGEMENT: EngagementCounters = {
  presetsSaved: 0,
  loopsRated: 0,
  scenesCreated: 0,
  liveSeconds: 0,
  fxEverAdded: [],
  audioStarted: 0,
  maxFxChain: 0,
  newsletterSubscribed: 0,
};

export const DEFAULT_ENTITLEMENTS: FxEntitlements = {
  ownedTier: "starter",
  unlockedFx: [],
  claimedCollabs: [],
  zap: 0,
  completedQuests: [],
  engagement: { ...DEFAULT_ENGAGEMENT },
};

/** A quest milestone — completing it awards zap once. */
export interface QuestDefinition {
  id: string;
  label: string;
  /** Zap credited when the quest completes. */
  zap: number;
  /** Progress as `[current, target]` for a progress bar. */
  progress: (c: EngagementCounters) => [number, number];
}

export const QUESTS: Record<string, QuestDefinition> = {
  "add-first-fx": {
    id: "add-first-fx",
    label: "Add your first effect",
    zap: 10,
    progress: (c) => [Math.min(c.fxEverAdded.length, 1), 1],
  },
  "save-first-preset": {
    id: "save-first-preset",
    label: "Save your first preset",
    zap: 25,
    progress: (c) => [Math.min(c.presetsSaved, 1), 1],
  },
  "rate-first-loop": {
    id: "rate-first-loop",
    label: "Rate your first loop",
    zap: 10,
    progress: (c) => [Math.min(c.loopsRated, 1), 1],
  },
  "start-audio": {
    id: "start-audio",
    label: "Connect audio",
    zap: 15,
    progress: (c) => [Math.min(c.audioStarted, 1), 1],
  },
  "chain-3-fx": {
    id: "chain-3-fx",
    label: "Build a 3-effect chain",
    zap: 20,
    progress: (c) => [Math.min(c.maxFxChain, 3), 3],
  },
  "save-first-scene": {
    id: "save-first-scene",
    label: "Save your first scene",
    zap: 30,
    progress: (c) => [Math.min(c.scenesCreated, 1), 1],
  },
  "rate-10-loops": {
    id: "rate-10-loops",
    label: "Rate 10 loops",
    zap: 50,
    progress: (c) => [Math.min(c.loopsRated, 10), 10],
  },
  "play-30-min": {
    id: "play-30-min",
    label: "Play a 30-minute set",
    zap: 100,
    progress: (c) => [Math.min(c.liveSeconds, 1800), 1800],
  },
  "play-2-hours": {
    id: "play-2-hours",
    label: "Play a 2-hour set",
    zap: 200,
    progress: (c) => [Math.min(c.liveSeconds, 7200), 7200],
  },
  "subscribe-newsletter": {
    id: "subscribe-newsletter",
    label: "Subscribe to the newsletter",
    zap: 50,
    progress: (c) => [Math.min(c.newsletterSubscribed, 1), 1],
  },
};

function questDone(quest: QuestDefinition, c: EngagementCounters): boolean {
  const [cur, target] = quest.progress(c);
  return cur >= target;
}

/** Fill in any missing fields on a persisted entitlements blob. */
export function normalizeEntitlements(saved: Partial<FxEntitlements> | undefined): FxEntitlements {
  const engagement = {
    ...DEFAULT_ENGAGEMENT,
    ...(saved?.engagement ?? {}),
    fxEverAdded: Array.isArray(saved?.engagement?.fxEverAdded)
      ? [...saved!.engagement!.fxEverAdded]
      : [],
    newsletterSubscribed:
      typeof saved?.engagement?.newsletterSubscribed === "number"
        ? saved.engagement.newsletterSubscribed
        : DEFAULT_ENGAGEMENT.newsletterSubscribed,
  };
  const base: FxEntitlements = {
    ownedTier: saved?.ownedTier ?? "starter",
    unlockedFx: Array.isArray(saved?.unlockedFx) ? [...saved!.unlockedFx] : [],
    claimedCollabs: Array.isArray(saved?.claimedCollabs) ? [...saved!.claimedCollabs] : [],
    zap: typeof saved?.zap === "number" ? saved.zap : 0,
    completedQuests: Array.isArray(saved?.completedQuests) ? [...saved!.completedQuests] : [],
    engagement,
  };
  return syncQuestRewards(base);
}

/** Whether an FX key is unlocked for the user's owned tier (plus collab doors). */
export function isFxUnlocked(key: string, ent: FxEntitlements): boolean {
  if (isCoreFxKey(key)) return true;
  const required = getFxTier(key);
  if (FX_TIER_ORDER.indexOf(ent.ownedTier) >= FX_TIER_ORDER.indexOf(required)) return true;
  const collab = getFxUnlock(key)?.collab;
  if (collab && ent.claimedCollabs.includes(collab)) return true;
  return false;
}

// ── Profile summaries ───────────────────────────────────────────────────────

export interface TierAccess {
  tier: FxTier;
  label: string;
  unlocked: number;
  total: number;
}

export interface FxAccessSummary {
  ownedTier: FxTier;
  ownedTierLabel: string;
  unlocked: number;
  total: number;
  tiers: TierAccess[];
}

/** Catalog-wide unlocked/locked counts, overall and per tier. */
export function summarizeFxAccess(ent: FxEntitlements): FxAccessSummary {
  const counts: Record<FxTier, { unlocked: number; total: number }> = {
    starter: { unlocked: 0, total: 0 },
    plus: { unlocked: 0, total: 0 },
    pro: { unlocked: 0, total: 0 },
    labs: { unlocked: 0, total: 0 },
  };
  let unlocked = 0;
  let total = 0;
  for (const fx of AVAILABLE_FX) {
    const tier = getFxTier(fx.key);
    counts[tier].total += 1;
    total += 1;
    if (isFxUnlocked(fx.key, ent)) {
      counts[tier].unlocked += 1;
      unlocked += 1;
    }
  }
  return {
    ownedTier: ent.ownedTier,
    ownedTierLabel: FX_TIER_LABEL[ent.ownedTier],
    unlocked,
    total,
    tiers: FX_TIER_ORDER.map((tier) => ({
      tier,
      label: FX_TIER_LABEL[tier],
      unlocked: counts[tier].unlocked,
      total: counts[tier].total,
    })),
  };
}

export interface QuestProgress {
  id: string;
  label: string;
  current: number;
  target: number;
  done: boolean;
  claimed: boolean;
  zap: number;
}

/** Quests with progress and payout state. */
export function summarizeQuests(ent: FxEntitlements): QuestProgress[] {
  return Object.values(QUESTS).map((quest) => {
    const claimed = ent.completedQuests.includes(quest.id);
    const [rawCurrent, target] = quest.progress(ent.engagement);
    const current = claimed ? target : rawCurrent;
    const done = current >= target;
    return {
      id: quest.id,
      label: quest.label,
      current,
      target,
      done,
      claimed,
      zap: quest.zap,
    };
  });
}

/** Award zap for any newly completed quests. */
export function syncQuestRewards(ent: FxEntitlements): FxEntitlements {
  let zap = ent.zap;
  const completedQuests = [...ent.completedQuests];
  let changed = false;

  for (const quest of Object.values(QUESTS)) {
    if (completedQuests.includes(quest.id)) continue;
    if (!questDone(quest, ent.engagement)) continue;
    completedQuests.push(quest.id);
    zap += quest.zap;
    changed = true;
  }

  if (!changed && zap === ent.zap && completedQuests.length === ent.completedQuests.length) {
    return ent;
  }

  return { ...ent, zap, completedQuests };
}

// ── Pure reducers (return a new entitlements object) ────────────────────────

export function claimCollab(ent: FxEntitlements, collabId: string): FxEntitlements {
  const collab = getCollab(collabId);
  if (!collab || ent.claimedCollabs.includes(collabId)) return ent;
  return { ...ent, claimedCollabs: [...ent.claimedCollabs, collabId] };
}

export function setOwnedTier(ent: FxEntitlements, tier: FxTier): FxEntitlements {
  return { ...ent, ownedTier: tier };
}

export type EngagementDelta = Partial<
  Pick<
    EngagementCounters,
    | "presetsSaved"
    | "loopsRated"
    | "scenesCreated"
    | "liveSeconds"
    | "audioStarted"
    | "newsletterSubscribed"
  >
> & {
  fxEverAdded?: string[];
  maxFxChain?: number;
};

/** Bump engagement counters (additively) and sync quest payouts. */
export function recordEngagement(ent: FxEntitlements, delta: EngagementDelta): FxEntitlements {
  const fxEverAdded = [...ent.engagement.fxEverAdded];
  for (const key of delta.fxEverAdded ?? []) {
    if (!fxEverAdded.includes(key)) fxEverAdded.push(key);
  }

  const next: FxEntitlements = {
    ...ent,
    engagement: {
      presetsSaved: ent.engagement.presetsSaved + (delta.presetsSaved ?? 0),
      loopsRated: ent.engagement.loopsRated + (delta.loopsRated ?? 0),
      scenesCreated: ent.engagement.scenesCreated + (delta.scenesCreated ?? 0),
      liveSeconds: ent.engagement.liveSeconds + (delta.liveSeconds ?? 0),
      audioStarted: ent.engagement.audioStarted + (delta.audioStarted ?? 0),
      fxEverAdded,
      maxFxChain: Math.max(ent.engagement.maxFxChain, delta.maxFxChain ?? 0),
      newsletterSubscribed: Math.max(
        ent.engagement.newsletterSubscribed,
        delta.newsletterSubscribed ?? 0,
      ),
    },
  };
  return syncQuestRewards(next);
}

/** One-time migration: infer quest progress from existing app state. Returns null when unchanged. */
export function backfillEngagementFromAppState(
  ent: FxEntitlements,
  opts: {
    videoRatings?: Record<string, number>;
    activeFxList?: string[];
    presetsCount?: number;
    scenesCount?: number;
  },
): FxEntitlements | null {
  const delta: EngagementDelta = {};
  const ratedCount = Object.values(opts.videoRatings ?? {}).filter((s) => s > 0).length;
  if (ratedCount > ent.engagement.loopsRated) {
    delta.loopsRated = ratedCount - ent.engagement.loopsRated;
  }

  const activeFx = (opts.activeFxList ?? []).filter((k) => !isCoreFxKey(k));
  const missingFx = activeFx.filter((k) => !ent.engagement.fxEverAdded.includes(k));
  if (missingFx.length) delta.fxEverAdded = missingFx;
  if (activeFx.length > ent.engagement.maxFxChain) delta.maxFxChain = activeFx.length;

  if ((opts.presetsCount ?? 0) > ent.engagement.presetsSaved) {
    delta.presetsSaved = (opts.presetsCount ?? 0) - ent.engagement.presetsSaved;
  }
  if ((opts.scenesCount ?? 0) > ent.engagement.scenesCreated) {
    delta.scenesCreated = (opts.scenesCount ?? 0) - ent.engagement.scenesCreated;
  }

  const hasDelta =
    (delta.loopsRated ?? 0) > 0 ||
    (delta.presetsSaved ?? 0) > 0 ||
    (delta.scenesCreated ?? 0) > 0 ||
    (delta.maxFxChain ?? 0) > 0 ||
    (delta.fxEverAdded?.length ?? 0) > 0;
  if (!hasDelta) return null;
  return recordEngagement(ent, delta);
}
