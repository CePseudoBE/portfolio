export interface PipelineStep {
  label: string;
  description: string;
  tech: string;
}

export const pipelineSteps: PipelineStep[] = [
  {
    label: 'Receive',
    description:
      'LoRaWAN uplinks from ChirpStack v4, MQTT 5.0 messages from Mosquitto, HTTP requests authenticated per device',
    tech: 'Rust / Axum / Tokio',
  },
  {
    label: 'Buffer',
    description: 'Every reading is published to a durable stream between ingestion and storage',
    tech: 'NATS JetStream',
  },
  {
    label: 'Consume',
    description:
      'Idempotent consumers store each reading once, even if it is delivered twice; poison messages go to a dead-letter queue',
    tech: 'JetStream consumers',
  },
  {
    label: 'Store',
    description: 'Time series in hypertables, with native compression',
    tech: 'TimescaleDB',
  },
  {
    label: 'Aggregate',
    description: 'Continuous aggregates pre-compute rollups for the read path',
    tech: 'TimescaleDB',
  },
  {
    label: 'Serve',
    description: 'Query API behind OIDC and RBAC, used by the Nuxt 4 web app',
    tech: 'Axum / Nuxt 4',
  },
];
