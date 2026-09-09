import {
  outputDisplayBackingSize,
  parseOutputDisplayMetrics,
  pickExtendedScreen,
  sameOutputDisplayMetrics,
  screenToOutputMetrics,
  type OutputDisplayBacking,
  type OutputDisplayMetrics,
  type ScreenDetailsLike,
} from "./outputDisplay";

type Listener = () => void;

let outputWindowMetrics: OutputDisplayMetrics | null = null;
let extendedScreenMetrics: OutputDisplayMetrics | null = null;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeOutputDisplayTarget(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getResolvedOutputDisplayMetrics() {
  return outputWindowMetrics ?? extendedScreenMetrics;
}

export function getResolvedOutputBacking(): OutputDisplayBacking | null {
  const metrics = getResolvedOutputDisplayMetrics();
  return metrics ? outputDisplayBackingSize(metrics) : null;
}

export function setOutputWindowMetrics(next: OutputDisplayMetrics | null) {
  if (sameOutputDisplayMetrics(outputWindowMetrics, next)) return;
  outputWindowMetrics = next;
  notify();
}

export function ingestOutputDisplayPing(data: unknown) {
  const parsed = parseOutputDisplayMetrics(data);
  if (parsed) setOutputWindowMetrics(parsed);
}

export function setExtendedScreenMetrics(next: OutputDisplayMetrics | null) {
  if (sameOutputDisplayMetrics(extendedScreenMetrics, next)) return;
  extendedScreenMetrics = next;
  notify();
}

export function applyScreenDetails(details: ScreenDetailsLike) {
  const picked = pickExtendedScreen(details.screens, details.currentScreen);
  setExtendedScreenMetrics(picked ? screenToOutputMetrics(picked) : null);
}

export function resetOutputDisplayTarget() {
  outputWindowMetrics = null;
  extendedScreenMetrics = null;
  notify();
}

export async function probeExtendedDisplay(): Promise<OutputDisplayMetrics | null> {
  const getScreenDetails = (
    window as Window & {
      getScreenDetails?: () => Promise<ScreenDetailsLike>;
    }
  ).getScreenDetails;
  if (typeof getScreenDetails !== "function") return getResolvedOutputDisplayMetrics();
  try {
    const details = await getScreenDetails();
    applyScreenDetails(details);
    const detailsWithEvents = details as ScreenDetailsLike & {
      addEventListener?: (type: string, listener: () => void) => void;
    };
    if (typeof detailsWithEvents.addEventListener === "function" && !screenDetailsBound) {
      screenDetailsBound = true;
      const sync = () => applyScreenDetails(details);
      detailsWithEvents.addEventListener("screenschange", sync);
      detailsWithEvents.addEventListener("currentscreenchange", sync);
    }
    return getResolvedOutputDisplayMetrics();
  } catch {
    return getResolvedOutputDisplayMetrics();
  }
}

let screenDetailsBound = false;
