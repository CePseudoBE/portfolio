export type LayerId = 'surface' | 'interface' | 'services' | 'data' | 'infra' | 'core';

export interface LayerConfig {
  id: LayerId;
  index: number;
  label: string;
}

// Colors live in src/styles/global.css (--layer-{id}-*) — single source
// of truth. This list only drives layer identity and ordering.
export const LAYERS: LayerConfig[] = [
  { id: 'surface', index: 0, label: 'Intro' },
  { id: 'interface', index: 1, label: 'SPARC' },
  { id: 'services', index: 2, label: 'Architecture' },
  { id: 'data', index: 3, label: 'Pipeline' },
  { id: 'infra', index: 4, label: 'Infrastructure' },
  { id: 'core', index: 5, label: 'Work & contact' },
];
