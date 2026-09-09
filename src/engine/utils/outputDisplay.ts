/** Dual-window / extended-display metrics used to size the Hydra backing store. */

export const OUTPUT_BACKING_MAX_EDGE = 4096;

export type OutputDisplayMetrics = {
  screenWidth: number;
  screenHeight: number;
  dpr: number;
  innerWidth: number;
  innerHeight: number;
  fullscreen: boolean;
  label?: string;
};

export type OutputDisplayBacking = {
  width: number;
  height: number;
  dpr: number;
};

export type ScreenDetailedLike = {
  width: number;
  height: number;
  left?: number;
  top?: number;
  devicePixelRatio?: number;
  isInternal?: boolean;
  isPrimary?: boolean;
  label?: string;
};

export type ScreenDetailsLike = {
  screens: ScreenDetailedLike[];
  currentScreen?: ScreenDetailedLike;
};

export function parseOutputDisplayMetrics(data: unknown): OutputDisplayMetrics | null {
  if (!data || typeof data !== "object") return null;
  const raw = data as Record<string, unknown>;
  const screenWidth = Number(raw.screenWidth);
  const screenHeight = Number(raw.screenHeight);
  if (!Number.isFinite(screenWidth) || !Number.isFinite(screenHeight)) return null;
  if (screenWidth < 2 || screenHeight < 2) return null;
  const dprRaw = Number(raw.dpr);
  const dpr = Number.isFinite(dprRaw) && dprRaw > 0 ? dprRaw : 1;
  const innerWidth = Number(raw.innerWidth);
  const innerHeight = Number(raw.innerHeight);
  return {
    screenWidth,
    screenHeight,
    dpr,
    innerWidth: Number.isFinite(innerWidth) && innerWidth > 0 ? innerWidth : screenWidth,
    innerHeight: Number.isFinite(innerHeight) && innerHeight > 0 ? innerHeight : screenHeight,
    fullscreen: raw.fullscreen === true,
    label: typeof raw.label === "string" && raw.label.trim() ? raw.label.trim() : undefined,
  };
}

export function sameOutputDisplayMetrics(
  a: OutputDisplayMetrics | null,
  b: OutputDisplayMetrics | null,
): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    a.screenWidth === b.screenWidth &&
    a.screenHeight === b.screenHeight &&
    a.dpr === b.dpr &&
    a.innerWidth === b.innerWidth &&
    a.innerHeight === b.innerHeight &&
    a.fullscreen === b.fullscreen &&
    a.label === b.label
  );
}

export function clampOutputBacking(width: number, height: number): OutputDisplayBacking {
  const w = Math.max(2, Math.round(width));
  const h = Math.max(2, Math.round(height));
  const edge = Math.max(w, h);
  if (edge <= OUTPUT_BACKING_MAX_EDGE) return { width: w, height: h, dpr: 1 };
  const scale = OUTPUT_BACKING_MAX_EDGE / edge;
  return {
    width: Math.max(2, Math.round(w * scale)),
    height: Math.max(2, Math.round(h * scale)),
    dpr: 1,
  };
}

/** Native pixel size of the display the output window is on. */
export function outputDisplayBackingSize(metrics: OutputDisplayMetrics): OutputDisplayBacking {
  const backing = clampOutputBacking(metrics.screenWidth * metrics.dpr, metrics.screenHeight * metrics.dpr);
  return { ...backing, dpr: metrics.dpr };
}

export function screenToOutputMetrics(screen: ScreenDetailedLike): OutputDisplayMetrics {
  const dpr = screen.devicePixelRatio && screen.devicePixelRatio > 0 ? screen.devicePixelRatio : 1;
  return {
    screenWidth: screen.width,
    screenHeight: screen.height,
    dpr,
    innerWidth: screen.width,
    innerHeight: screen.height,
    fullscreen: false,
    label: screen.label,
  };
}

export function pickExtendedScreen(
  screens: ScreenDetailedLike[],
  current?: ScreenDetailedLike,
): ScreenDetailedLike | null {
  if (screens.length < 2) return null;
  const currentLeft = current?.left;
  const currentTop = current?.top;
  const others = screens.filter((screen) => {
    if (current && screen === current) return false;
    if (current && currentLeft != null && currentTop != null) {
      return screen.left !== currentLeft || screen.top !== currentTop;
    }
    return true;
  });
  const pool = others.length > 0 ? others : screens.filter((screen) => screen !== current);
  if (pool.length === 0) return null;
  const externals = pool.filter((screen) => screen.isInternal !== true && screen.isPrimary !== true);
  const candidates = externals.length > 0 ? externals : pool;
  return candidates.reduce((best, screen) => {
    const area = screen.width * screen.height;
    const bestArea = best.width * best.height;
    return area > bestArea ? screen : best;
  });
}

export function readLocalDisplayPing(): Omit<OutputDisplayMetrics, "label"> {
  const fullscreen =
    Boolean(typeof document !== "undefined" && document.fullscreenElement) ||
    (Math.abs(window.innerWidth - screen.width) < 8 && Math.abs(window.innerHeight - screen.height) < 8);
  return {
    screenWidth: screen.width,
    screenHeight: screen.height,
    dpr: window.devicePixelRatio || 1,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    fullscreen,
  };
}

export function outputDisplayPingPayload() {
  return { type: "hexa-output-ready" as const, ...readLocalDisplayPing() };
}
