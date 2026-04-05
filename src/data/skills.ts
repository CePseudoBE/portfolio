export interface SkillCategory {
  label: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    label: 'Languages',
    items: ['Rust', 'TypeScript', 'Java'],
  },
  {
    label: 'Frameworks',
    items: ['AdonisJS', 'Spring Boot', 'Axum'],
  },
  {
    label: 'Data',
    items: ['PostgreSQL', 'TimescaleDB', 'Redis', 'BullMQ', 'NATS JetStream', 'NGSI-LD'],
  },
  {
    label: 'Infrastructure',
    items: ['Proxmox', 'Docker', 'LoRaWAN'],
  },
];
