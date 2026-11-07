export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: 'digital-twin',
    name: 'Digital Twin Framework',
    role: 'Author · open source (MIT)',
    summary:
      'Component-based TypeScript framework for NGSI-LD digital twins, developed for FARI and designed as an in-house alternative to FIWARE/Orion. In production as the gateway that unifies digital twin entities, IoT sensors, mobility and environmental data behind one API for a Unity-based 3D city visualization.',
    highlights: [
      'Components: Collectors, Harvesters, Handlers, Assets Managers',
      'Native NGSI-LD entities with subscription notifications',
      'Redis, PostgreSQL and BullMQ (4 queues); presigned-URL uploads to OVH Object Storage',
    ],
    stack: ['TypeScript', 'NGSI-LD', 'PostgreSQL', 'Redis', 'BullMQ'],
    links: [
      {
        label: 'github.com/CePseudoBE/digitaltwin',
        href: 'https://github.com/CePseudoBE/digitaltwin',
      },
    ],
  },
  {
    slug: 'tandem',
    name: 'Tandem',
    role: 'Backend engineer',
    summary: 'Language-exchange platform matching learners across three universities.',
    highlights: [],
    stack: ['AdonisJS'],
  },
  {
    slug: 'iris',
    name: 'IRIS',
    role: 'Backend engineer',
    summary: 'Platform for submitting applications and their supporting documents.',
    highlights: [],
    stack: ['AdonisJS'],
  },
  {
    slug: 'infofin',
    name: 'Infofin',
    role: 'Backend engineer',
    summary:
      "ULB's platform listing research funding opportunities (calls for projects, grants, mobility, events).",
    highlights: [],
    stack: ['Laravel'],
    links: [{ label: 'infofin.ulb.be', href: 'https://infofin.ulb.be' }],
  },
];
