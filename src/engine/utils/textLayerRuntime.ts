import type { ParamBinding } from "./paramBinding";
import { bindingIsTriggered } from "./paramBinding";
import type { FXConfig } from "../types/settings";
import type { AudioBands } from "../hooks/useAudioAnalyzer";
import {
  createTextLayerAnimState,
  syncTextLayerTexture,
  textLayerDrawFromFx,
  type TextLayerAnimState,
  type TextLayerBundle,
  type TextLayerTexSource,
} from "./textLayerOverlay";
import {
  bindOverlayCanvasSource,
  type OverlayCanvasOwner,
} from "./overlayCanvasSource";


export type TextLayerRuntimeState = TextLayerAnimState & {
  prevEnvelope: number;
};

export function createTextLayerRuntimeState(): TextLayerRuntimeState {
  return { ...createTextLayerAnimState(), prevEnvelope: 0 };
}

export type AdvanceTextLayerOpts = {
  bundle: TextLayerBundle;
  s3: TextLayerTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  fxCfg: FXConfig | undefined;
  bands: (AudioBands & Record<string, number>) | undefined;
  amount: number;
  now: number;
  envelope: number;
  binding: ParamBinding;
  runtime: TextLayerRuntimeState;
  shouldBind: boolean;
};

export function advanceTextLayerFrame(opts: AdvanceTextLayerOpts): void {
  const {
    bundle,
    s3,
    bindState,
    fxCfg,
    bands,
    amount,
    now,
    envelope,
    binding,
    runtime,
    shouldBind,
  } = opts;

  if (!s3?.tex) return;
  if (amount < 0.004) return;

  const parsed = textLayerDrawFromFx(fxCfg, bands);
  const messageChanged = parsed.message !== runtime.lastMessage;
  const animChanged = parsed.anim !== runtime.lastAnim;
  const envEdge = envelope > 0.02 && runtime.prevEnvelope <= 0.02;

  if (messageChanged || animChanged || runtime.animStartMs <= 0) {
    runtime.animStartMs = now;
    runtime.lastMessage = parsed.message;
    runtime.lastAnim = parsed.anim;
  } else if (bindingIsTriggered(binding) && envEdge) {
    runtime.animStartMs = now;
  }
  runtime.prevEnvelope = envelope;

  if (shouldBind) {
    bindOverlayCanvasSource(s3, bundle.canvas, "textLayer", bindState);
  }

  syncTextLayerTexture(
    s3,
    bundle,
    {
      message: parsed.message,
      size: parsed.size,
      positionX: parsed.positionX,
      positionY: parsed.positionY,
      align: parsed.align,
      font: parsed.font,
      weight: parsed.weight,
      tracking: parsed.tracking,
      color: parsed.color,
      glow: parsed.glow,
      shadow: parsed.shadow,
      anim: parsed.anim,
      animSpeed: parsed.animSpeed,
      amount,
      nowMs: now,
      animStartMs: runtime.animStartMs,
    },
    now,
    12,
  );
}
