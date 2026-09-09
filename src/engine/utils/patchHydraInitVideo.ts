import { resolveLoopAssetUrl } from "./loopAssetUrl";
import { notifyVideoElementCommitted, shouldPrimaryVideoPlay } from "./videoPlaybackSpeed";
import { resolveLoopVideoMediaUrls } from "./videoUtils";

type HydraSourceLike = {
  _hydraVideoLoadSeq?: number;
  src: unknown;
  dynamic: boolean;
  tex: { subimage?: (src: unknown) => void; width?: number; height?: number; resize?: (w: number, h: number) => void };
  regl: { texture: (opts: object) => unknown };
};

function videoHasFrame(v: HTMLVideoElement): boolean {
  return v.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && v.videoWidth > 0 && v.videoHeight > 0;
}

export function patchHydraSourceInitVideo(): void {
  const win = window as unknown as { s0?: object; __hydraInitVideoPatched?: boolean };
  if (win.__hydraInitVideoPatched) return;
  const s0 = win.s0;
  if (!s0) return;
  const hydraProto = Object.getPrototypeOf(s0) as
    | (object & {
        initVideo?: (url?: string, params?: object) => void;
        tick?: (time: number) => void;
      })
    | null;
  if (!hydraProto || typeof hydraProto.initVideo !== "function") return;

  win.__hydraInitVideoPatched = true;

  const origTick = hydraProto.tick;
  if (typeof origTick === "function") {
    hydraProto.tick = function tickGuarded(this: HydraSourceLike, time: number) {
      const src = this.src;
      if (this.dynamic && src instanceof HTMLVideoElement && !videoHasFrame(src)) {
        return;
      }
      return origTick.call(this, time);
    };
  }

  hydraProto.initVideo = function initVideoSequential(url = "", params?: object) {
    const self = this as HydraSourceLike;
    self.dynamic = false;

    const prev = self.src;
    self.src = null;

    if (prev instanceof HTMLVideoElement) {
      try {
        prev.pause();
        prev.removeAttribute("src");
        prev.load();
      } catch {
        /* noop */
      }
    }

    if (!url) {
      self.tex = self.regl.texture({ shape: [1, 1] }) as typeof self.tex;
      return;
    }

    const loadId = (self._hydraVideoLoadSeq = (self._hydraVideoLoadSeq ?? 0) + 1);
    const vid = document.createElement("video");
    vid.crossOrigin = "anonymous";
    vid.autoplay = false;
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "auto";

    const finishCommit = () => {
      if (self._hydraVideoLoadSeq !== loadId) return;
      if (!videoHasFrame(vid)) {
        requestAnimationFrame(finishCommit);
        return;
      }
      self.src = vid;
      notifyVideoElementCommitted(vid);
      self.tex = self.regl.texture({ data: vid, ...params }) as typeof self.tex;
      self.dynamic = true;
      try {
        self.tex.subimage?.(vid);
      } catch {
        /* noop */
      }
    };

    const finalizeStopped = () => {
      if (self._hydraVideoLoadSeq !== loadId) return;
      try {
        vid.currentTime = 0;
      } catch {
        /* metadata may still be loading */
      }
      vid.pause();
      finishCommit();
    };

    const onLoaded = () => {
      if (self._hydraVideoLoadSeq !== loadId) return;
      if (shouldPrimaryVideoPlay()) {
        void vid.play().then(finishCommit).catch(finishCommit);
        return;
      }
      if (videoHasFrame(vid)) {
        finalizeStopped();
        return;
      }
      requestAnimationFrame(finalizeStopped);
    };

    vid.addEventListener("loadeddata", onLoaded, { once: true });

    const candidates = resolveLoopVideoMediaUrls(url);
    const mediaUrls =
      candidates.length > 0 ? candidates : [resolveLoopAssetUrl(url)];

    const loadCandidate = (index: number) => {
      if (self._hydraVideoLoadSeq !== loadId) return;
      if (index >= mediaUrls.length) {
        self.dynamic = false;
        return;
      }
      vid.src = mediaUrls[index]!;
      vid.addEventListener(
        "error",
        () => {
          if (self._hydraVideoLoadSeq !== loadId) return;
          loadCandidate(index + 1);
        },
        { once: true },
      );
    };

    loadCandidate(0);
  };
}
