import {
  applyHydraResolution,
  isHydraFboResizePending,
  isHydraRenderPaused,
  recoverStuckHydraResize,
  type HydraResolutionHost,
} from "./hydraResizeGate";

function setResolutionQuiet(this: HydraResolutionHost, width: number, height: number) {
  if (
    this.width === width &&
    this.height === height &&
    this.canvas.width === width &&
    this.canvas.height === height
  ) {
    if (isHydraFboResizePending()) {
      applyHydraResolution(this, width, height);
    } else if (isHydraRenderPaused()) {
      recoverStuckHydraResize();
    }
    return;
  }

  applyHydraResolution(this, width, height);
}

/** hydra-synth 1.3.x still logs canvas sizes from setResolution on every resize. */
export function patchHydraSynthDebug(hydra: object): void {
  const win = window as unknown as { __hydraSynthDebugPatched?: boolean };
  if (win.__hydraSynthDebugPatched) return;

  const hydraProto = Object.getPrototypeOf(hydra) as
    | (object & { setResolution?: (width: number, height: number) => void })
    | null;
  if (!hydraProto || typeof hydraProto.setResolution !== "function") return;

  win.__hydraSynthDebugPatched = true;
  hydraProto.setResolution = setResolutionQuiet;
}
