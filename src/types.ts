export type LayerId = 'surface' | 'interface' | 'services' | 'data' | 'infra' | 'core';

export interface LayerConfig {
  id: LayerId;
  index: number;
  label: string;
  accent: string;
  heading: string;
  text: string;
  bg: string;
}

export const LAYERS: LayerConfig[] = [
  { id: 'surface', index: 0, label: 'Surface', accent: '#8fa8c2', heading: '#c8d5e2', text: '#8a95a5', bg: '#0c1018' },
  { id: 'interface', index: 1, label: 'Interface', accent: '#5e8a8a', heading: '#a8ccc8', text: '#7e9494', bg: '#0a0e12' },
  { id: 'services', index: 2, label: 'Services', accent: '#4a7263', heading: '#8fbdaa', text: '#7a9e8e', bg: '#080c0e' },
  { id: 'data', index: 3, label: 'Data', accent: '#6b6243', heading: '#b5a87a', text: '#8e8670', bg: '#0a0908' },
  { id: 'infra', index: 4, label: 'Infrastructure', accent: '#5c4035', heading: '#a88072', text: '#8a7068', bg: '#0a0807' },
  { id: 'core', index: 5, label: 'Core', accent: '#3d2828', heading: '#9a7070', text: '#806464', bg: '#080606' },
];
