import type { LayerId } from '../types';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  layer: LayerId;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: ProjectLink[];
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
    slug: 'sparc',
    name: 'SPARC',
    layer: 'infra',
    role: 'Sole engineer — backend, web app & infrastructure',
    summary:
      'Sensor Platform for Academic Research and Community — an IoT platform in production across ULB campuses. Carried end-to-end solo: Rust backend, Nuxt 4 web application, and OKD infrastructure.',
    highlights: [
      'Rust workspace of 8 crates, 673 automated tests',
      'Idempotent multi-protocol ingestion — LoRaWAN/ChirpStack, MQTT 5.0, HTTP — on NATS JetStream with dead-letter queue',
      'TimescaleDB storage: hypertables, continuous aggregates, compression',
      'Hexagonal architecture with CQRS separation enforced at compile time',
      'OIDC auth (Authentik, RS256/JWKS), fail-closed multi-tenant RBAC',
    ],
    stack: ['Rust', 'Axum', 'Nuxt 4', 'TimescaleDB', 'NATS JetStream', 'OKD'],
    links: [{ label: 'sparc.ulb.be', href: 'https://sparc.ulb.be' }],
  },
];
