import { generateBlueNoiseTile } from "./generateBlueNoiseTile";

type ReglTexture = unknown;

export type NoiseTextureId = "value256" | "blue64";

type FileNoiseEntry = {
  kind: "file";
  path: string;
  wrap: "repeat" | "clamp";
  mag: "linear" | "nearest";
  min: "linear" | "nearest";
};

type GeneratedNoiseEntry = {
  kind: "generated";
  size: number;
  wrap: "repeat" | "clamp";
  mag: "linear" | "nearest";
  min: "linear" | "nearest";
  generate: (size: number) => Uint8Array;
};

type NoiseCatalogEntry = FileNoiseEntry | GeneratedNoiseEntry;

/** Tileable GPU noise assets — shared across FX for perf + consistent look. */
export const NOISE_TEXTURE_CATALOG: Record<NoiseTextureId, NoiseCatalogEntry> = {
  /** Shadertoy-style value noise (256×256). Ridged FBM + height fields + 3D-ish sampling. */
  value256: {
    kind: "file",
    path: "/textures/shadertoy-noise256.jpg",
    wrap: "repeat",
    mag: "linear",
    min: "linear",
  },
  /** Ranked blue-noise dither (64×64, generated at init). Stipple / threshold jitter. */
  blue64: {
    kind: "generated",
    size: 64,
    wrap: "repeat",
    mag: "nearest",
    min: "nearest",
    generate: generateBlueNoiseTile,
  },
};

type NoiseSampler = { getTexture: () => ReglTexture };

const samplers = new Map<NoiseTextureId, NoiseSampler>();
let loadPromise: Promise<void> | null = null;

const missingSampler = (id: NoiseTextureId): NoiseSampler => ({
  getTexture: () => {
    console.warn(`[noise] texture "${id}" not loaded yet`);
    return null;
  },
});

export function getNoiseTextureSampler(id: NoiseTextureId): NoiseSampler {
  return samplers.get(id) ?? missingSampler(id);
}

function loadFile(
  regl: { texture: (opts: object) => ReglTexture },
  id: NoiseTextureId,
  entry: FileNoiseEntry,
): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const fallback = () => {
      samplers.set(id, {
        getTexture: () =>
          regl.texture({
            data: new Uint8Array([128, 128, 128, 255]),
            shape: [1, 1],
          }),
      });
      resolve();
    };
    img.addEventListener(
      "load",
      () => {
        try {
          const tex = regl.texture({
            data: img,
            wrap: entry.wrap,
            mag: entry.mag,
            min: entry.min,
          });
          samplers.set(id, { getTexture: () => tex });
        } catch {
          fallback();
        }
        resolve();
      },
      { once: true },
    );
    img.addEventListener("error", fallback, { once: true });
    img.src = entry.path;
  });
}

function loadGenerated(
  regl: { texture: (opts: object) => ReglTexture },
  id: NoiseTextureId,
  entry: GeneratedNoiseEntry,
): Promise<void> {
  try {
    const tex = regl.texture({
      data: entry.generate(entry.size),
      shape: [entry.size, entry.size],
      wrap: entry.wrap,
      mag: entry.mag,
      min: entry.min,
    });
    samplers.set(id, { getTexture: () => tex });
  } catch {
    samplers.set(id, {
      getTexture: () =>
        regl.texture({
          data: new Uint8Array([128, 128, 128, 255]),
          shape: [1, 1],
        }),
    });
  }
  return Promise.resolve();
}

function loadOne(
  regl: { texture: (opts: object) => ReglTexture },
  id: NoiseTextureId,
  entry: NoiseCatalogEntry,
): Promise<void> {
  if (entry.kind === "file") return loadFile(regl, id, entry);
  return loadGenerated(regl, id, entry);
}

/** Load all catalog textures once regl is ready. Safe to call multiple times. */
export function initNoiseTextureLibrary(
  regl: { texture: (opts: object) => ReglTexture },
): Promise<void> {
  const pending = Object.entries(NOISE_TEXTURE_CATALOG).filter(
    ([id]) => !samplers.has(id as NoiseTextureId),
  ) as [NoiseTextureId, NoiseCatalogEntry][];
  if (pending.length === 0) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = Promise.all(pending.map(([id, entry]) => loadOne(regl, id, entry))).then(
    () => undefined,
  );
  return loadPromise;
}
