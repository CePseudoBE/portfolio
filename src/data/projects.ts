export interface ProjectLink {
  label: string;
  href: string;
}

export interface PackageLayer {
  label: string;
  packages: string[];
  description: string;
}

export interface ShippedProject {
  name: string;
  summary: string;
  stack: string;
  link?: ProjectLink;
}

export const digitalTwin = {
  name: 'Digital Twin Framework',
  license: 'open source, MIT',
  summary:
    'A TypeScript framework for building digital twins: you write Collectors, Harvesters, Handlers and Assets Managers, and the engine schedules them, queues the work and exposes the API. NGSI-LD native, built as an in-house alternative to FIWARE/Orion. It runs in production as the gateway that unifies digital-twin entities, IoT sensors, mobility and environment data for a Unity 3D visualisation.',
  layers: [
    { label: 'Layer 3', packages: ['engine'], description: 'scheduler, queues, loader, OpenAPI' },
    { label: 'Layer 2', packages: ['components', 'assets'], description: 'what users extend' },
    { label: 'Layer 1', packages: ['database', 'storage', 'auth'], description: 'adapters' },
    {
      label: 'Layer 0',
      packages: ['shared'],
      description: 'types, errors, utils, no internal deps',
    },
  ] satisfies PackageLayer[],
  stack: ['TypeScript', 'PostgreSQL', 'Redis', 'BullMQ', 'OVH S3'],
  link: {
    label: 'github.com/CePseudoBE/digitaltwin',
    href: 'https://github.com/CePseudoBE/digitaltwin',
  } satisfies ProjectLink,
};

export const alsoShipped: ShippedProject[] = [
  {
    name: 'Tandem',
    summary:
      'Language exchange platform for students and staff of three universities (ULB, VUB, UAntwerp).',
    stack: 'AdonisJS',
  },
  {
    name: 'IRIS',
    summary: 'Application and document submission platform for postdoctoral fellows.',
    stack: 'AdonisJS',
  },
  {
    name: 'Infofin',
    summary:
      "ULB's platform listing research funding opportunities: calls for projects, grants, mobility, events.",
    stack: 'Laravel',
    link: { label: 'infofin.ulb.be', href: 'https://infofin.ulb.be' },
  },
];
