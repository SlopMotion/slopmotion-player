import { resolvePublicAssetUrl } from "../utils/loopAssetUrl";

const STUDIO_SITE_PREFIX = "/audio/Recordings/Montreuil26_master/studio";

/** Shipped ParVagues demo — files listed in `public/.../studio/bundle-manifest.json`. */
export const PARVAGUES_SAMPLE_BUNDLE = {
  id: "montreuil26",
  label: "Montreuil26",
  setName: "Montreuil26",
  manifestUrl: `${STUDIO_SITE_PREFIX}/bundle-manifest.json`,
  baseUrl: STUDIO_SITE_PREFIX,
  /**
   * Per-orbit stem FLACs + per-track `_manifest.json` under tracks_bandcamp/stems/.
   * Local ParVagues folder loads only until published to Blob — flip `stemsRemotePublished`.
   */
  stemsRemotePublished: false,
  stemsBaseUrl: "/audio/Recordings/Montreuil26_master/tracks_bandcamp/stems",
  /** Loaded via Project Hub (Community → Piment brésilien), not on every Studio open. */
  autoLoadInStudio: false,
  /** Onboarding / community demo uses this album track only. */
  demoTrackNumber: 2,
} as const;

/** Production resolves to Vercel Blob when `VITE_LOOP_ASSETS_BASE_URL` is set. */
export function parVaguesSampleBundleUrls() {
  return {
    manifestUrl: resolvePublicAssetUrl(PARVAGUES_SAMPLE_BUNDLE.manifestUrl),
    baseUrl: resolvePublicAssetUrl(PARVAGUES_SAMPLE_BUNDLE.baseUrl),
  };
}

/** Remote stem playback/manifest base — undefined until stems are on Blob/CDN. */
export function parVaguesSampleStemRemoteBaseUrl(): string | undefined {
  if (!PARVAGUES_SAMPLE_BUNDLE.stemsRemotePublished) return undefined;
  return resolvePublicAssetUrl(PARVAGUES_SAMPLE_BUNDLE.stemsBaseUrl);
}

export type ParVaguesSampleManifest = {
  id: string;
  label: string;
  setName: string;
  rootFolder: string;
  masterFile: string;
  paths: string[];
};
