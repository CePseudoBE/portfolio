export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  protocol: string;
}

// Illustrative endpoints — representative of the APIs I build (SPARC,
// digital twin, unified gateway), not a public API reference.
export const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/ngsi-ld/v1/entities',
    description: 'Query digital twin entities with NGSI-LD filtering',
    protocol: 'NGSI-LD',
  },
  {
    method: 'POST',
    path: '/api/v1/ingest/lorawan',
    description: 'ChirpStack uplink webhook — idempotent ingestion into NATS JetStream',
    protocol: 'LoRaWAN',
  },
  {
    method: 'GET',
    path: '/api/v1/sensors/:id/timeseries',
    description: 'Time-series readings served from TimescaleDB continuous aggregates',
    protocol: 'REST',
  },
  {
    method: 'POST',
    path: '/oauth2/token',
    description: 'OIDC token endpoint — RS256-signed JWTs, validated via JWKS',
    protocol: 'OIDC',
  },
  {
    method: 'GET',
    path: '/api/v1/mobility/flows',
    description: 'Mobility data unified by the gateway for 3D visualization',
    protocol: 'REST',
  },
  {
    method: 'DELETE',
    path: '/api/v1/subscriptions/:id',
    description: 'Remove a real-time notification subscription',
    protocol: 'NGSI-LD',
  },
];
