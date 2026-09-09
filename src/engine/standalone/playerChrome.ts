export type PlayerChromeHandlers = {
  title: string;
  clipCount: number;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => boolean;
  onToggleFullscreen: () => void;
};

export type PlayerChrome = {
  setClipIndex: (index: number) => void;
  setPlaying: (playing: boolean) => void;
  destroy: () => void;
};

const CHROME_CSS = `
.hexa-chrome{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;align-items:center;gap:14px;
padding:14px 18px;font:500 12px/1 ui-sans-serif,system-ui,-apple-system,sans-serif;letter-spacing:.06em;
color:rgba(255,255,255,.72);background:linear-gradient(to top,rgba(0,0,0,.62),transparent);
opacity:0;transition:opacity .25s ease;pointer-events:none;text-transform:uppercase}
.hexa-chrome[data-visible="true"]{opacity:1;pointer-events:auto}
.hexa-chrome__title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
color:rgba(255,255,255,.9)}
.hexa-chrome__count{font-variant-numeric:tabular-nums;color:rgba(255,255,255,.55)}
.hexa-chrome button{appearance:none;border:1px solid rgba(255,255,255,.16);background:rgba(0,0,0,.45);
color:inherit;font:inherit;letter-spacing:.08em;padding:7px 11px;cursor:pointer;backdrop-filter:blur(12px)}
.hexa-chrome button:hover{border-color:rgba(255,255,255,.4);color:#fff}
`;

/** Bottom bar for the exported page: clip transport, play state, fullscreen. */
export function mountPlayerChrome(
  container: HTMLElement,
  handlers: PlayerChromeHandlers,
): PlayerChrome {
  const style = document.createElement("style");
  style.textContent = CHROME_CSS;
  document.head.appendChild(style);

  const bar = document.createElement("div");
  bar.className = "hexa-chrome";

  const title = document.createElement("span");
  title.className = "hexa-chrome__title";
  title.textContent = handlers.title;

  const count = document.createElement("span");
  count.className = "hexa-chrome__count";

  const playButton = document.createElement("button");
  const prevButton = document.createElement("button");
  prevButton.textContent = "Prev";
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  const fullscreenButton = document.createElement("button");
  fullscreenButton.textContent = "Full";

  bar.append(title, count, prevButton, playButton, nextButton, fullscreenButton);
  container.appendChild(bar);

  const setPlaying = (playing: boolean) => {
    playButton.textContent = playing ? "Pause" : "Play";
  };
  const setClipIndex = (index: number) => {
    count.textContent = handlers.clipCount > 1 ? `${index + 1}/${handlers.clipCount}` : "";
  };

  prevButton.addEventListener("click", handlers.onPrevious);
  nextButton.addEventListener("click", handlers.onNext);
  playButton.addEventListener("click", () => setPlaying(handlers.onTogglePlay()));
  fullscreenButton.addEventListener("click", handlers.onToggleFullscreen);

  let hideTimer = 0;
  const reveal = () => {
    bar.dataset.visible = "true";
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      bar.dataset.visible = "false";
    }, 2600);
  };
  container.addEventListener("pointermove", reveal);
  container.addEventListener("pointerdown", reveal);
  reveal();

  return {
    setClipIndex,
    setPlaying,
    destroy: () => {
      window.clearTimeout(hideTimer);
      container.removeEventListener("pointermove", reveal);
      container.removeEventListener("pointerdown", reveal);
      bar.remove();
      style.remove();
    },
  };
}
