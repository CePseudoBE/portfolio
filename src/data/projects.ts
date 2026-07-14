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
    slug: 'api-gateway',
    name: 'Unified API Gateway',
    layer: 'interface',
    role: 'Backend engineer',
    summary:
      'The Digital Twin Framework in production: a single gateway unifying heterogeneous urban data sources — digital twin entities, IoT sensors, mobility and environment data — behind one consistent API, feeding a Unity-based 3D visualization of the city.',
    highlights: [
      'Built on my open-source Digital Twin Framework',
      'One contract over four heterogeneous source families',
      'Consumed by a Unity 3D urban visualization client',
    ],
    stack: ['TypeScript', 'NGSI-LD', 'PostgreSQL', 'Redis', 'BullMQ'],
    links: [{ label: 'github.com/CePseudoBE/digitaltwin', href: 'https://github.com/CePseudoBE/digitaltwin' }],
  },
  {
    slug: 'digital-twin',
    name: 'Digital Twin Framework',
    layer: 'services',
    role: 'Author — open source, MIT',
    summary:
      'Component-based TypeScript framework for building NGSI-LD digital twins, built as an in-house replacement for FIWARE/Orion. Structured as a layered monorepo, open source under the MIT license.',
    highlights: [
      'Component model: Collectors, Harvesters, Handlers, Assets Managers',
      'Native NGSI-LD entity management with subscription notifications',
      'Redis + PostgreSQL + BullMQ (4 priority queues)',
      'Presigned URL upload via OVH Object Storage',
    ],
    stack: ['TypeScript', 'PostgreSQL', 'Redis', 'BullMQ', 'NGSI-LD', 'OVH S3'],
    links: [{ label: 'github.com/CePseudoBE/digitaltwin', href: 'https://github.com/CePseudoBE/digitaltwin' }],
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
  {
    slug: 'infofin',
    name: 'Infofin',
    layer: 'services',
    role: 'Backend engineer',
    summary: 'Laravel platform delivered and running in production at ULB.',
    highlights: [],
    stack: ['PHP', 'Laravel'],
    links: [{ label: 'infofin.ulb.be', href: 'https://infofin.ulb.be' }],
  },
  {
    slug: 'tandem',
    name: 'Tandem',
    layer: 'services',
    role: 'Backend engineer',
    summary: 'Language-exchange platform matching learners for tandem practice.',
    highlights: [],
    stack: ['TypeScript', 'AdonisJS'],
  },
  {
    slug: 'iris',
    name: 'IRIS',
    layer: 'services',
    role: 'Backend engineer',
    summary: 'Application submission platform handling candidate files end-to-end.',
    highlights: [],
    stack: ['TypeScript', 'AdonisJS'],
  },
];
