# slopmotion-player

Hydra Synth player for a SlopMotion **scene source**. The player is this package. The scene is a JSON file you import.

```ts
import { mountPlayer } from "slopmotion-player";
import scene from "./scene.json";

mountPlayer({
  scene,
  container: document.getElementById("hexa-stage")!,
});
```

## Install

```bash
npm install github:SlopMotion/slopmotion-player
```

Or clone this repo and link it locally.

## Scaffold a host

From a clone, the TypeScript installer writes a Vite app that already imports the player and a scene:

```bash
npx tsx src/install.ts --out ./player --scene ./hexa-scene.json
cd player && npm install && npm run dev
```

`--scene` is optional — without it the installer copies `examples/demo-scene.json`.  
`--local` links this clone with a `file:` dependency instead of `github:SlopMotion/slopmotion-player`.

## Scene source

A scene is JSON: `title`, absolute `clips`, `clipIndex`, pruned `fx`, and `activeFxList`. SlopMotion Studio exports one from **Output → Scene source**.

Clips stream from their public URLs — this package carries no media. Audio-mapped parameters render at their base amount; the player has no analyzer.

## API

```ts
import { mountPlayer, type StandaloneScene, type MountedPlayer } from "slopmotion-player";

const player: MountedPlayer = mountPlayer({
  scene,          // StandaloneScene
  container,      // HTMLElement, default document.body
  chrome: true,   // transport bar; pass false to hide it
});

player.host.nextClip();
player.host.setPlaying(false);
player.destroy();
```

Keyboard: space play/pause, arrows change clip, `F` fullscreen.
