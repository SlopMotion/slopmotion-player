import {
  getNoiseTextureSampler,
  initNoiseTextureLibrary,
  type NoiseTextureId,
} from "./noiseTextureLibrary";

const ELECTRIC_NOISE_TEX: NoiseTextureId = "value256";

export function getElectricNoiseTextureSampler() {
  return getNoiseTextureSampler(ELECTRIC_NOISE_TEX);
}

export function initElectricNoiseTexture(
  regl: Parameters<typeof initNoiseTextureLibrary>[0],
) {
  return initNoiseTextureLibrary(regl);
}
