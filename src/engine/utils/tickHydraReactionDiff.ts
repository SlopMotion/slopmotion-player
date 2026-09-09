type HydraOutputTickHost = {
  o: Array<{ tick: (props: Record<string, unknown>) => void; getCurrent?: () => unknown }>;
};

export type SimBufferTickConfig = {
  outputIndex: number;
  isActive: () => boolean;
  simSteps: () => number;
  maxSteps?: number;
  afterSimFrame?: () => void;
};

/** Tick feedback sim buffers before o0 so display passes read fresh state. */
export function tickHydraOutputsWithSimBuffers(
  hydra: HydraOutputTickHost,
  props: Record<string, unknown>,
  sims: SimBufferTickConfig[],
): void {
  const deferredOutputs = new Set<number>();

  for (const sim of sims) {
    if (!sim.isActive()) continue;
    const out = hydra.o[sim.outputIndex];
    if (!out) continue;
    deferredOutputs.add(sim.outputIndex);
    const cap = sim.maxSteps ?? 4;
    const steps = Math.max(1, Math.min(cap, Math.round(sim.simSteps())));
    for (let step = 0; step < steps; step++) {
      out.tick(props);
    }
    sim.afterSimFrame?.();
  }

  for (let i = 0; i < hydra.o.length; i++) {
    if (deferredOutputs.has(i)) continue;
    hydra.o[i].tick(props);
  }
}

type HydraTickHost = HydraOutputTickHost & {
  sandbox: { tick: () => void; set: (key: string, value: number) => void };
  synth: {
    time: number;
    speed: number;
    fps?: number;
    stats: { fps: number };
    mouse: unknown;
    bpm: number;
    a?: { tick: () => void };
    update?: (dt: number) => void;
    afterUpdate?: (dt: number) => void;
  };
  detectAudio?: boolean;
  s: Array<{ tick: (time: number) => void }>;
  canvas: HTMLCanvasElement;
  timeSinceLastUpdate: number;
  isRenderingAll: boolean;
  renderAll: (props: Record<string, unknown>) => void;
  renderFbo: (props: Record<string, unknown>) => void;
  output: { getCurrent: () => unknown };
  saveFrame: boolean;
  canvasToImage: () => void;
};

/** Hydra tick with feedback sim passes ordered before the main o0 display pass. */
export function wrapHydraTickForSimBuffers(
  hydra: HydraTickHost,
  sims: SimBufferTickConfig[],
): (dt: number, uniforms?: unknown) => void {
  return function patchedHydraTick(dt: number) {
    try {
      const clockSpeed = hydra.synth.speed;
      hydra.sandbox.tick();
      if (clockSpeed === 0) hydra.synth.speed = 0;
      if (hydra.detectAudio === true) hydra.synth.a?.tick();
      hydra.sandbox.set("time", (hydra.synth.time += dt * 0.001 * hydra.synth.speed));
      hydra.timeSinceLastUpdate += dt;
      if (!hydra.synth.fps || hydra.timeSinceLastUpdate >= 1000 / hydra.synth.fps) {
        hydra.synth.stats.fps = Math.ceil(1000 / hydra.timeSinceLastUpdate);
        if (hydra.synth.update) {
          try {
            hydra.synth.update(hydra.timeSinceLastUpdate);
          } catch {
            /* noop */
          }
        }
        for (let i = 0; i < hydra.s.length; i++) {
          hydra.s[i].tick(hydra.synth.time);
        }
        const props = {
          time: hydra.synth.time,
          mouse: hydra.synth.mouse,
          bpm: hydra.synth.bpm,
          resolution: [hydra.canvas.width, hydra.canvas.height],
        };
        tickHydraOutputsWithSimBuffers(hydra, props, sims);
        if (hydra.isRenderingAll) {
          hydra.renderAll({
            tex0: hydra.o[0].getCurrent?.() ?? hydra.o[0],
            tex1: hydra.o[1].getCurrent?.() ?? hydra.o[1],
            tex2: hydra.o[2].getCurrent?.() ?? hydra.o[2],
            tex3: hydra.o[3].getCurrent?.() ?? hydra.o[3],
            resolution: [hydra.canvas.width, hydra.canvas.height],
          });
        } else {
          hydra.renderFbo({
            tex0: hydra.output.getCurrent(),
            resolution: [hydra.canvas.width, hydra.canvas.height],
          });
        }
        if (hydra.synth.afterUpdate) {
          try {
            hydra.synth.afterUpdate(hydra.timeSinceLastUpdate);
          } catch {
            /* noop */
          }
        }
        hydra.timeSinceLastUpdate = 0;
      }
      if (hydra.saveFrame === true) {
        hydra.canvasToImage();
        hydra.saveFrame = false;
      }
    } catch (e) {
      console.warn("Error during tick():", e);
    }
  };
}

