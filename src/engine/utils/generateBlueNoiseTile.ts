/** Toroidal void-and-cluster — ranked dither tile (typically 64×64). Runs once at init. */
export function generateBlueNoiseTile(size: number): Uint8Array {
  const n = size * size;
  const energy = new Float32Array(n);
  const placed = new Uint8Array(n);
  const data = new Uint8Array(n * 4);

  const r = 3;
  const bumps: Array<[number, number, number]> = [];
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const d2 = dx * dx + dy * dy;
      if (d2 === 0) continue;
      bumps.push([dx, dy, 1 / d2]);
    }
  }

  const addBump = (idx: number) => {
    const ix = idx % size;
    const iy = (idx / size) | 0;
    for (const [dx, dy, w] of bumps) {
      const nx = (ix + dx + size) % size;
      const ny = (iy + dy + size) % size;
      energy[ny * size + nx] += w;
    }
  };

  for (let i = 0; i < n; i++) {
    if (Math.random() < 0.045) {
      placed[i] = 1;
      addBump(i);
    }
  }

  for (let step = 0; step < n; step++) {
    let best = 0;
    let bestE = Infinity;
    for (let i = 0; i < n; i++) {
      if (placed[i]) continue;
      const e = energy[i];
      if (e < bestE) {
        bestE = e;
        best = i;
      }
    }
    placed[best] = 1;
    addBump(best);
    const rank = Math.floor((step / Math.max(1, n - 1)) * 255);
    const alt = Math.floor(((rank * 97) % 256) * 0.92);
    const o = best * 4;
    data[o] = rank;
    data[o + 1] = alt;
    data[o + 2] = rank;
    data[o + 3] = 255;
  }

  return data;
}
