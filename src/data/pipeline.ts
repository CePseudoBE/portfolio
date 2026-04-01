export interface PipelineStep {
  label: string;
  description: string;
  tech: string;
}

export const pipelineSteps: PipelineStep[] = [
  {
    label: 'Collect',
    description: 'Scheduled Collectors fetch data from external APIs and IoT sources',
    tech: 'Cron / Collectors',
  },
  {
    label: 'Queue',
    description: 'Jobs dispatched across 4 priority queues for async processing',
    tech: 'BullMQ / Redis',
  },
  {
    label: 'Process',
    description: 'Harvesters aggregate and transform collected data into new datasets',
    tech: 'Harvesters / EventBus',
  },
  {
    label: 'Store',
    description: 'Metadata and historical data persisted, raw files on S3-compatible storage',
    tech: 'PostgreSQL / OVH S3',
  },
  {
    label: 'Cache',
    description: 'Entity last-state and active subscriptions cached for sub-ms reads',
    tech: 'Redis',
  },
  {
    label: 'Serve',
    description: 'NGSI-LD API exposes entities with subscription-driven real-time notifications',
    tech: 'NGSI-LD / REST',
  },
];
