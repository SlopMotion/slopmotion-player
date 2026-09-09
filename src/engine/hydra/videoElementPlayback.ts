export function playIfVideo(el: unknown) {
  if (el instanceof HTMLVideoElement && el.paused) {
    void el.play().catch(() => {});
  }
}

export function pauseIfVideo(el: unknown) {
  if (el instanceof HTMLVideoElement && !el.paused) el.pause();
}
