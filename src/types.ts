export type LayerId = 'surface' | 'interface' | 'services' | 'data' | 'infra' | 'core';

export interface LayerConfig {
  id: LayerId;
  index: number;
  label: string;
}

// Colors live in src/styles/global.css (--layer-{id}-*) — single source
// of truth. This list only drives layer identity and ordering.
export const LAYERS: LayerConfig[] = [
  { id: 'surface', index: 0, label: 'Surface' },
  { id: 'interface', index: 1, label: 'Interface' },
  { id: 'services', index: 2, label: 'Services' },
  { id: 'data', index: 3, label: 'Data' },
  { id: 'infra', index: 4, label: 'Infrastructure' },
  { id: 'core', index: 5, label: 'Core' },
];
