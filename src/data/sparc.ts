export interface NamedItem {
  name: string;
  description: string;
}

export interface FailureCase {
  scenario: string;
  behavior: string;
}

export const sparcDiagramAlt =
  "LoRaWAN sensors reach the campus gateways and ChirpStack v4 on a separate VM, which publishes over MQTT with TLS to the platform's Mosquitto broker. MQTT 5.0 devices connect to Mosquitto over TLS 1.3 with authentication and ACLs. HTTP devices go through Traefik. The Rust iot-ingestion binary reads Mosquitto on the internal network, maps ChirpStack payloads to FIWARE, checks per-device API keys for HTTP, and publishes to the NATS JetStream stream OBSERVATIONS. The Rust iot-processing binary validates each reading against the metric registry, stores it in TimescaleDB and evaluates alert thresholds, sending emails through an SMTP relay; invalid readings go to the DLQ_OBSERVATIONS stream. Users open the Nuxt 4 web app on OKD, sign in with Authentik, and call the Rust iot-api binary, which checks tokens against the JWKS, applies RBAC, reads TimescaleDB continuous aggregates, runs the CSV export workers and manages the LoRaWAN fleet through ChirpStack's gRPC API. Grafana reads the aggregates directly and Prometheus scrapes the three Rust binaries.";

export const sparcExplorerAlt =
  "SPARC web app, Explorer page: one room sensor's temperature over 7 days, hourly averages, between 17.8 and 21.1 °C";

export const sparcDatasheet: NamedItem[] = [
  { name: 'Users', description: 'CIREM, ULB infrastructure department' },
  {
    name: 'Fleet',
    description: '34 registered sensors, 3 LoRaWAN gateways, 2 campuses (November 2026)',
  },
  { name: 'Protocols', description: 'LoRaWAN (ChirpStack v4), MQTT 5.0, HTTP' },
  { name: 'Data model', description: 'FIWARE Smart Data Models, NGSI-LD ids' },
  { name: 'Backend', description: 'Rust, 8 crates, 673 automated tests' },
  { name: 'Runs on', description: 'Podman + Traefik on a VM; front-end on OKD' },
];

export const sparcConstraints: string[] = [
  'One engineer, from design to production',
  'Reuse the LoRaWAN gateways already on campus',
  'Three device protocols: LoRaWAN, MQTT and HTTP',
  'Several tenants, each with isolated data',
  'University infrastructure: Authentik for identity, an internal PKI for certificates',
];

export const sparcDecisions: NamedItem[] = [
  {
    name: 'Rust, because I build it alone',
    description:
      'With no second reviewer, the compiler is my first safety net. Trade-off: slower prototyping than in TypeScript.',
  },
  {
    name: 'One workspace, not microservices',
    description:
      'One engineer runs it, so the backend is one Rust workspace (8 crates) built into one image and run as three binaries: iot-ingestion, iot-processing and iot-api. Hexagonal boundaries keep the domain independent of Axum, NATS and TimescaleDB.',
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
    description:
      'The backend stack (the three Rust binaries, NATS, TimescaleDB, Traefik) runs as containers on a VM. ChirpStack v4 runs on a separate VM.',
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
