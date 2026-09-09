import { standaloneSceneToFolderConfig, type StandaloneScene } from "../utils/standaloneScene";
import { startAutoAdvance } from "./autoAdvance";
import { mountPlayerChrome } from "./playerChrome";
import { startSceneHost, type SceneHost } from "./sceneHost";

export type { StandaloneScene };

export type MountedPlayer = { host: SceneHost; destroy: () => void };

export type MountOptions = {
  scene: StandaloneScene;
  container?: HTMLElement;
  chrome?: boolean;
};

function createCanvas(container: HTMLElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.id = "hexa-canvas";
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  container.appendChild(canvas);
  return canvas;
}

function isPlayerHot(container: HTMLElement): boolean {
  if (document.fullscreenElement === container) return true;
  if (container.contains(document.activeElement)) return true;
  return container.matches(":hover");
}

async function toggleFullscreen(container: HTMLElement) {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }
  await container.requestFullscreen();
}

export function mountPlayer(options: MountOptions): MountedPlayer {
  const container = options.container ?? document.body;
  if (getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }
  container.style.overflow = container.style.overflow || "hidden";
  container.style.background = container.style.background || "#000";
  const canvas = createCanvas(container);
  const config = standaloneSceneToFolderConfig(options.scene);

  const host = startSceneHost({
    canvas,
    config,
    clips: options.scene.clips,
    clipIndex: options.scene.clipIndex,
  });

  const chrome =
    options.chrome === false
      ? null
      : mountPlayerChrome(container, {
          title: options.scene.title,
          clipCount: host.clipCount,
          onPrevious: () => {
            host.previousClip();
            chrome?.setClipIndex(host.clipIndex());
          },
          onNext: () => {
            host.nextClip();
            chrome?.setClipIndex(host.clipIndex());
          },
          onTogglePlay: () => {
            const next = !host.isPlaying();
            host.setPlaying(next);
            return next;
          },
          onToggleFullscreen: () => {
            void toggleFullscreen(container);
          },
        });
  chrome?.setClipIndex(host.clipIndex());
  chrome?.setPlaying(host.isPlaying());

  const autoAdvance = startAutoAdvance({
    autoMix: config.fx?.autoMix,
    clipCount: host.clipCount,
    currentIndex: () => host.clipIndex(),
    selectClip: (index) => {
      host.selectClip(index);
      chrome?.setClipIndex(host.clipIndex());
    },
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (!isPlayerHot(container)) return;
    if (event.key === " ") {
      event.preventDefault();
      const next = !host.isPlaying();
      host.setPlaying(next);
      chrome?.setPlaying(next);
    } else if (event.key === "ArrowRight") {
      host.nextClip();
      chrome?.setClipIndex(host.clipIndex());
    } else if (event.key === "ArrowLeft") {
      host.previousClip();
      chrome?.setClipIndex(host.clipIndex());
    } else if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      void toggleFullscreen(container);
    }
  };
  window.addEventListener("keydown", onKeyDown);

  return {
    host,
    destroy: () => {
      window.removeEventListener("keydown", onKeyDown);
      autoAdvance.stop();
      chrome?.destroy();
      host.dispose();
      canvas.remove();
    },
  };
}
