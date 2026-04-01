const LAYER_IDS = ['surface', 'interface', 'services', 'data', 'infra', 'core'] as const;

interface DepthState {
  progress: number;
  activeLayer: number;
  activeLayerId: string;
}

type DepthListener = (state: DepthState) => void;

const listeners: DepthListener[] = [];

export function onDepthChange(fn: DepthListener): () => void {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notify(state: DepthState): void {
  for (const fn of listeners) fn(state);
}

export function initDepthTracker(): void {
  const sections = LAYER_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  if (sections.length === 0) return;

  let ticking = false;

  function update(): void {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? Math.round((scrollY / totalHeight) * 100) : 0;

    let activeLayer = 0;
    let maxVisible = 0;

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(window.innerHeight, rect.bottom);
      const visible = Math.max(0, visibleBottom - visibleTop);

      if (visible > maxVisible) {
        maxVisible = visible;
        activeLayer = i;
      }
    }

    notify({
      progress,
      activeLayer,
      activeLayerId: LAYER_IDS[activeLayer],
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // Defer initial read to avoid layout thrashing during page load
  requestAnimationFrame(() => requestAnimationFrame(update));
}
