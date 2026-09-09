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

Released packages will land on npm. Until then, install from GitHub `main` (last promoted release):

```bash
npm install github:SlopMotion/slopmotion-player
```

Pre-release work lives on `staging`:

```bash
npm install github:SlopMotion/slopmotion-player#staging
```

Or clone this repo and link it locally.

## Branching and releases

- **`staging`** — integration line. Open feature PRs here. Maintainers can squash-merge their own PRs after CI.
- **`main`** — public default and upcoming npm source. Only squash-merges from `staging`, with one approving review and green CI. Direct pushes, force-pushes, and deletion are blocked.
- **`vX.Y.Z` tags** — created by repository admins on `main`. A `v*` tag runs `.github/workflows/publish.yml` against the `publish` environment.

npm is not live yet (`private: true` in `package.json` keeps the publish job from shipping). When it is:

1. Register the GitHub repo as an npm Trusted Publisher for workflow `publish.yml`, stage-only.
2. Set `"private": false`.
3. Open a `staging` → `main` PR, bump `version`, merge.
4. Tag from `main`: `git tag v0.1.0 && git push origin v0.1.0`
5. Approve the GitHub `publish` environment, then approve the staged package on npm.

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

## License

[AGPL-3.0-only](LICENSE). The player bundles [hydra-synth](https://github.com/ojack/hydra-synth) (AGPL). Attribution and corresponding-source layout are in [NOTICE](NOTICE). `src/engine/` is the TypeScript/GLSL snapshot compiled into `dist/index.js`.
