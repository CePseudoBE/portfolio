export interface SkillCategory {
  label: string;
  items: string[];
}

export const coreLanguages: string[] = ['Rust', 'TypeScript', 'SQL'];

export const skills: SkillCategory[] = [
  {
    label: 'Languages',
    items: ['Rust', 'TypeScript', 'SQL', 'PHP'],
  },
  {
    label: 'Backend',
    items: ['Axum', 'Tokio', 'AdonisJS', 'Laravel'],
  },
  {
    label: 'Data & Messaging',
    items: ['PostgreSQL', 'TimescaleDB', 'NATS JetStream', 'MQTT', 'Redis', 'BullMQ', 'NGSI-LD'],
  },
  {
    label: 'Infrastructure',
    items: ['Kubernetes / OKD', 'GitOps', 'Podman', 'Docker', 'Traefik', 'Proxmox', 'GitLab CI'],
  },
  {
    label: 'Security & Observability',
    items: ['OIDC / OAuth2', 'Prometheus', 'Grafana'],
  },
  {
    label: 'IoT',
    items: ['LoRaWAN', 'ChirpStack'],
  },
];
