export type PerfTier = "auto" | "low" | "medium" | "high";

export type ResolvedPerfTier = Exclude<PerfTier, "auto">;

export interface PerfProfile {
  tier: ResolvedPerfTier;
  /** Max devicePixelRatio for Hydra canvas backing store. */
  dprCap: number;
  fftSize: 2048 | 4096;
  /** Run full FFT every N animation frames (1 = every frame). */
  audioFrameSkip: number;
  /** Upper bound for boomerang frame capture rate (user param still applies below this). */
  boomerangCaptureFpsCap: number;
  /** Upper bound for boomerang frame buffer length. */
  boomerangMaxFramesCap: number;
}

const TIER_PROFILES: Record<ResolvedPerfTier, Omit<PerfProfile, "tier">> = {
  low: {
    dprCap: 1,
    fftSize: 2048,
    audioFrameSkip: 2,
    boomerangCaptureFpsCap: 15,
    boomerangMaxFramesCap: 48,
  },
  medium: {
    dprCap: 1.5,
    fftSize: 2048,
    audioFrameSkip: 1,
    boomerangCaptureFpsCap: 24,
    boomerangMaxFramesCap: 72,
  },
  high: {
    dprCap: 2,
    fftSize: 4096,
    audioFrameSkip: 1,
    boomerangCaptureFpsCap: 60,
    boomerangMaxFramesCap: 180,
  },
};

export function detectAutoPerfTier(): ResolvedPerfTier {
  if (typeof navigator === "undefined") return "medium";
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (cores <= 4 || (mem !== undefined && mem <= 4)) return "low";
  if (cores <= 6 || (mem !== undefined && mem <= 8)) return "medium";
  return "high";
}

export function resolvePerfProfile(tier: PerfTier | undefined): PerfProfile {
  const resolved = tier === "auto" || tier === undefined ? detectAutoPerfTier() : tier;
  return { tier: resolved, ...TIER_PROFILES[resolved] };
}

/** CSS pixel size of the visible viewport (visualViewport when available). */
export function readViewportCssSize(): { width: number; height: number } {
  if (typeof window === "undefined") return { width: 1920, height: 1080 };
  const vv = window.visualViewport;
  const width = vv?.width && vv.width > 0 ? vv.width : window.innerWidth;
  const height = vv?.height && vv.height > 0 ? vv.height : window.innerHeight;
  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}

/** Match Hydra backing store to an element's laid-out CSS box (preferred over window metrics). */
export function hydraElementBackingDimensions(
  el: HTMLElement | null | undefined,
  dprCap: number,
) {
  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, dprCap);
  const cssW = el?.clientWidth ?? 0;
  const cssH = el?.clientHeight ?? 0;
  const { width, height } =
    cssW > 0 && cssH > 0 ? { width: cssW, height: cssH } : readViewportCssSize();
  return {
    width: Math.max(2, Math.round(width * dpr)),
    height: Math.max(2, Math.round(height * dpr)),
    dpr,
  };
}
