export interface SkillCategory {
  label: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    label: 'Languages',
    items: ['Rust', 'TypeScript', 'PHP', 'SQL'],
  },
  {
    label: 'Backend',
    items: ['Axum', 'Tokio', 'AdonisJS', 'Laravel'],
  },
  {
    label: 'Data & Messaging',
    items: ['PostgreSQL', 'TimescaleDB', 'NATS JetStream', 'MQTT', 'Redis', 'NGSI-LD'],
  },
  {
    label: 'Infrastructure',
    items: ['Kubernetes / OKD', 'GitOps', 'Docker', 'Proxmox', 'LoRaWAN'],
  },
];
