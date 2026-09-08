#!/usr/bin/env npx tsx
/**
 * Scaffolds a Vite + TypeScript host that imports slopmotion-player and a scene JSON.
 *
 *   npx tsx src/install.ts --out ./player --scene ./hexa-scene.json
 *   npx tsx src/install.ts --out ./player --local
 */
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const demoScene = resolve(packageRoot, "examples/demo-scene.json");
const GITHUB_SPEC = "github:SlopMotion/slopmotion-player";

export type InstallScenePlayerOptions = {
  outDir: string;
  scenePath?: string;
  local?: boolean;
};

const MAIN_TS = `import { mountPlayer } from "slopmotion-player";
import scene from "./scene.json";

const container = document.getElementById("hexa-stage");
if (!container) throw new Error("Missing #hexa-stage");

mountPlayer({ scene, container });
`;

const INDEX_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <title>Hexa scene</title>
  <style>
    html, body { margin: 0; height: 100%; background: #000; overflow: hidden; }
    #hexa-stage { position: fixed; inset: 0; }
  </style>
</head>
<body>
  <div id="hexa-stage"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

const TSCONFIG = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "strict": true,
    "noEmit": true,
    "lib": ["ES2022", "DOM"]
  },
  "include": ["src"]
}
`;

const VITE_CONFIG = `import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 4177 },
});
`;

function hostPackageJson(playerSpec: string) {
  return `${JSON.stringify(
    {
      name: "hexa-scene",
      private: true,
      type: "module",
      scripts: { dev: "vite", build: "vite build" },
      dependencies: { "slopmotion-player": playerSpec },
      devDependencies: { typescript: "~5.6.2", vite: "^8.0.8" },
    },
    null,
    2,
  )}\n`;
}

export async function installScenePlayer(options: InstallScenePlayerOptions) {
  const outDir = resolve(options.outDir);
  const srcDir = resolve(outDir, "src");
  await mkdir(srcDir, { recursive: true });

  const sceneFrom = options.scenePath ? resolve(options.scenePath) : demoScene;
  await copyFile(sceneFrom, resolve(srcDir, "scene.json"));

  const playerSpec = options.local ? `file:${packageRoot}` : GITHUB_SPEC;

  await Promise.all([
    writeFile(resolve(outDir, "package.json"), hostPackageJson(playerSpec)),
    writeFile(resolve(outDir, "tsconfig.json"), TSCONFIG),
    writeFile(resolve(outDir, "vite.config.ts"), VITE_CONFIG),
    writeFile(resolve(outDir, "index.html"), INDEX_HTML),
    writeFile(resolve(srcDir, "main.ts"), MAIN_TS),
  ]);

  return { outDir, scene: resolve(srcDir, "scene.json"), playerSpec };
}

async function main() {
  const { values } = parseArgs({
    options: {
      out: { type: "string", default: "hexa-scene" },
      scene: { type: "string" },
      local: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });
  if (values.help) {
    console.log(
      "Usage: npx tsx src/install.ts --out ./player [--scene ./scene.json] [--local]",
    );
    return;
  }
  const result = await installScenePlayer({
    outDir: values.out,
    scenePath: values.scene,
    local: values.local,
  });
  console.log(`scene player host → ${result.outDir}`);
  console.log(`scene source      → ${result.scene}`);
  console.log(`player            → ${result.playerSpec}`);
  console.log(`next: cd ${relative(process.cwd(), result.outDir) || "."} && npm install && npm run dev`);
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  await main();
}
