export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  protocol: string;
}

export const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/ngsi-ld/v1/entities',
    description: 'Query digital twin entities with NGSI-LD filtering',
    protocol: 'NGSI-LD',
  },
  {
    method: 'POST',
    path: '/api/v1/devices/provision',
    description: 'Register a new LoRaWAN sensor on the network',
    protocol: 'LoRaWAN',
  },
  {
    method: 'POST',
    path: '/oauth2/token',
    description: 'Issue access token via client credentials flow',
    protocol: 'OAuth2',
  },
  {
    method: 'PUT',
    path: '/api/v1/twins/:id/attributes',
    description: 'Update entity attributes with temporal context',
    protocol: 'REST',
  },
  {
    method: 'GET',
    path: '/api/v1/metrics/campus',
    description: 'Aggregate sensor readings across campus zones',
    protocol: 'REST',
  },
  {
    method: 'DELETE',
    path: '/api/v1/subscriptions/:id',
    description: 'Remove a real-time notification subscription',
    protocol: 'NGSI-LD',
  },
];
