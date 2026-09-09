const IN_KEY = "hydra-midi-debug-in-v1";
export const MIDI_DEBUG_LOG_CAP = 120;

const PERSIST_DEBOUNCE_MS = 400;

function loadKey(key: string): string[] {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return [];
    return arr.filter((x): x is string => typeof x === "string").slice(-MIDI_DEBUG_LOG_CAP);
  } catch {
    return [];
  }
}

function saveKey(key: string, lines: string[]) {
  try {
    sessionStorage.setItem(key, JSON.stringify(lines));
  } catch {
    /* private mode / quota */
  }
}

let inLines = loadKey(IN_KEY);

let persistTimer = 0;

function flushPersist() {
  if (persistTimer !== 0 && typeof window !== "undefined") {
    window.clearTimeout(persistTimer);
    persistTimer = 0;
  }
  saveKey(IN_KEY, inLines);
}

function schedulePersist() {
  if (typeof window === "undefined") {
    saveKey(IN_KEY, inLines);
    return;
  }
  if (persistTimer !== 0) window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(() => {
    persistTimer = 0;
    saveKey(IN_KEY, inLines);
  }, PERSIST_DEBOUNCE_MS);
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", flushPersist);
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushPersist();
  });
}

export function getMidiDebugInLinesSnapshot(): string[] {
  return inLines.slice();
}

export function pushMidiDebugInLine(line: string) {
  inLines = [...inLines.slice(-(MIDI_DEBUG_LOG_CAP - 1)), line];
  schedulePersist();
}

export function clearMidiDebugPersisted() {
  if (persistTimer !== 0 && typeof window !== "undefined") {
    window.clearTimeout(persistTimer);
    persistTimer = 0;
  }
  inLines = [];
  try {
    sessionStorage.removeItem(IN_KEY);
  } catch {
    /* ignore */
  }
}

declare global {
  interface Window {
    __HYDRA_MIDI_DEBUG__?: { in: () => string[] };
  }
}

if (typeof window !== "undefined") {
  window.__HYDRA_MIDI_DEBUG__ = {
    in: getMidiDebugInLinesSnapshot,
  };
}
