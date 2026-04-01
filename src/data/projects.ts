import type { LayerId } from '../types';

export interface Project {
  slug: string;
  name: string;
  layer: LayerId;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const projects: Project[] = [
  {
    slug: 'digital-twin',
    name: 'Digital Twin Framework',
    layer: 'services',
    role: 'Lead developer',
    summary:
      'Custom micro-framework replacing FIWARE/Orion for NGSI-LD digital twins. Component-based architecture with Collectors, Harvesters, and Handlers — published as a monorepo on npm.',
    highlights: [
      'Monorepo: 9 packages, 4 dependency layers',
      'Native NGSI-LD entity management with subscription notifications',
      'Component model: Collectors, Harvesters, Handlers, Assets Managers',
      'Redis + PostgreSQL + BullMQ (4 priority queues)',
      'Presigned URL upload via OVH Object Storage',
      '~60% overhead reduction vs FIWARE/Orion',
    ],
    stack: ['TypeScript', 'PostgreSQL', 'Redis', 'BullMQ', 'NGSI-LD', 'OVH S3'],
  },
  {
    slug: 'smartcampus',
    name: 'SmartCampus',
    layer: 'infra',
    role: 'Infrastructure & backend engineer',
    summary:
      'FEDER-funded IoT platform managing 200+ sensors across a university campus. LoRaWAN ingestion pipeline in Rust with hexagonal architecture, time-series storage, and event streaming.',
    highlights: [
      '200+ sensors, LoRaWAN network',
      'Rust ingestion pipeline with hexagonal architecture',
      'TimescaleDB for time-series sensor data',
      'NATS JetStream for event streaming',
      'Proxmox VM provisioning, 4G/5G backhaul',
    ],
    stack: ['Rust', 'Actix-web', 'TimescaleDB', 'NATS JetStream', 'Proxmox', 'Docker'],
  },
];
