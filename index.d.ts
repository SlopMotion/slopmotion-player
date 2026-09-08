export type StandaloneScene = {
  version: number;
  title: string;
  clips: string[];
  clipIndex: number;
  fx: Record<string, unknown>;
  activeFxList: string[];
  activeChain?: unknown[];
  fxGroups?: Record<string, unknown>;
  layerInstances?: Record<string, unknown>;
};

export type SceneHost = {
  clipCount: number;
  clipIndex: () => number;
  selectClip: (index: number) => void;
  nextClip: () => void;
  previousClip: () => void;
  setPlaying: (playing: boolean) => void;
  isPlaying: () => boolean;
  resize: () => void;
  dispose: () => void;
};

export type MountedPlayer = {
  host: SceneHost;
  destroy: () => void;
};

export type MountOptions = {
  scene: StandaloneScene;
  container?: HTMLElement;
  chrome?: boolean;
};

export function mountPlayer(options: MountOptions): MountedPlayer;
