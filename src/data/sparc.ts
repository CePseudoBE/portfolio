export interface Metric {
  value: string;
  label: string;
}

export interface NamedItem {
  name: string;
  description: string;
}

export interface DiagramPath {
  label: string;
  nodes: NamedItem[];
}

export interface FailureCase {
  scenario: string;
  behavior: string;
}

export const sparcMetrics: Metric[] = [
  { value: 'Jan 2026', label: 'In production since' },
  { value: '2', label: 'ULB campuses' },
  { value: '~50', label: 'Devices' },
  { value: '3', label: 'LoRaWAN gateways' },
  { value: '673', label: 'Automated tests' },
  { value: '8', label: 'Rust crates' },
];

export const sparcConstraints: string[] = [
  'One engineer, from design to production',
  'Reuse the LoRaWAN gateways already on campus',
  'Three device protocols: LoRaWAN, MQTT and HTTP',
  'Several tenants, each with isolated data',
  'University infrastructure: Authentik for identity, an internal PKI for certificates',
];

export const architecturePaths: DiagramPath[] = [
  {
    label: 'Write path',
    nodes: [
      { name: 'Devices', description: 'LoRaWAN via ChirpStack v4, MQTT 5.0 via Mosquitto, HTTP' },
      { name: 'Ingestion', description: 'Rust adapters, idempotent' },
      { name: 'NATS JetStream', description: 'Durable buffer, dead-letter queue' },
      { name: 'TimescaleDB', description: 'Hypertables, compression' },
    ],
  },
  {
    label: 'Read path',
    nodes: [
      { name: 'Users', description: 'CIREM, ULB infrastructure department' },
      { name: 'Nuxt 4 web app', description: 'Device status, alerts, exports' },
      { name: 'Query API', description: 'Axum, OIDC and RBAC' },
      { name: 'TimescaleDB', description: 'Continuous aggregates' },
    ],
  },
];

export const sparcIngestion: NamedItem[] = [
  {
    name: 'LoRaWAN',
    description:
      'Sensors reach the 3 existing campus gateways, with ChirpStack v4 as the network server. Traffic from gateway to network server is encrypted with TLS.',
  },
  {
    name: 'MQTT 5.0',
    description: 'Devices publish to a Mosquitto broker over TLS.',
  },
  {
    name: 'HTTP',
    description:
      'Each device pushes readings with its own API key, so one key can be revoked without touching the rest of the fleet.',
  },
  {
    name: 'Access',
    description:
      'Users sign in through Authentik (OIDC). The API verifies RS256 tokens against the JWKS, with no shared secret, and multi-tenant RBAC fails closed.',
  },
];

export const sparcDecisions: NamedItem[] = [
  {
    name: 'Rust, because I build it alone',
    description:
      'With no second reviewer, the compiler is my first safety net. Trade-off: slower prototyping than in TypeScript.',
  },
  {
    name: 'A modular monolith, not microservices',
    description:
      'One engineer runs it, so the backend ships as one Rust service. Hexagonal boundaries keep the domain independent of Axum, NATS and TimescaleDB.',
  },
  {
    name: 'Light CQRS, checked by the compiler',
    description:
      'Write and read paths are separate. The API layer cannot write telemetry: only the ingestion path can, and the types enforce it at compile time.',
  },
  {
    name: 'A durable buffer before the database',
    description:
      'Ingestion publishes to NATS JetStream instead of writing straight to TimescaleDB, which decouples receiving data from storing it. Trade-off: one more component to run and monitor.',
  },
  {
    name: 'TimescaleDB, not a separate time-series store',
    description:
      'Time series stay in PostgreSQL and plain SQL: hypertables for ingestion, continuous aggregates for reads, native compression for storage.',
  },
  {
    name: 'The backend on a VM, not the cluster',
    description:
      "SPARC's scale does not justify Kubernetes for the backend: Podman and Traefik on a VM are simpler to run and to debug. The Nuxt 4 front-end ships through our OKD GitOps chain.",
  },
];

export const sparcFeatures: string[] = [
  'Threshold alerts, sent by email',
  'Asynchronous CSV exports',
  'Device status derived from last activity',
  'LoRaWAN fleet management through the API',
  "Nuxt 4 web app for CIREM researchers and ULB's infrastructure department",
];

export const failureCases: FailureCase[] = [
  {
    scenario: 'A reading arrives twice',
    behavior: 'Idempotent consumers store it once.',
  },
  {
    scenario: 'A payload cannot be processed',
    behavior: 'It goes to a dead-letter queue instead of blocking the stream.',
  },
  {
    scenario: 'The database slows down',
    behavior: 'JetStream keeps readings buffered between ingestion and storage.',
  },
  {
    scenario: 'A sensor goes silent',
    behavior: 'Device status is derived from last activity, so a silent sensor stands out.',
  },
  {
    scenario: 'A reading crosses a threshold',
    behavior: 'An alert goes out by email.',
  },
  {
    scenario: 'The TLS certificate is renewed',
    behavior: 'A systemd path unit sees the new certificate and restarts Traefik. No cron job.',
  },
  {
    scenario: 'A user asks for data outside their tenant',
    behavior: 'RBAC fails closed: no matching permission, no access.',
  },
];

export const sparcInfra: NamedItem[] = [
  {
    name: 'Proxmox VM + Podman',
    description: 'The backend stack (Rust API, NATS, TimescaleDB, ChirpStack, Traefik) runs as containers on a VM.',
  },
  {
    name: 'Traefik + internal PKI',
    description:
      "TLS termination with a certificate from the university's internal PKI. A systemd path unit restarts Traefik when the certificate is renewed.",
  },
  {
    name: 'GitLab CI',
    description: 'Build and test pipeline.',
  },
  {
    name: 'Prometheus + Grafana',
    description: 'Metrics and dashboards for the platform.',
  },
];
