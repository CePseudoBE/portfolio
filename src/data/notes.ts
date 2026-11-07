export interface Note {
  slug: string;
  title: string;
  summary: string;
  published: boolean;
}

// Set published to true only once /notes/{slug} exists: the section links to it.
export const notes: Note[] = [
  {
    slug: 'cqrs-type-system',
    title: 'CQRS enforced by the type system',
    summary:
      "The API's backend bound includes only the read port, so a handler cannot write telemetry.",
    published: false,
  },
  {
    slug: 'device-status',
    title: 'A device status that cannot lie',
    summary:
      'Status is derived from the last reading, never stored, and the SQL filter is pinned to the same rule by a test.',
    published: false,
  },
  {
    slug: 'pki-rotation',
    title: 'Rotating internal-PKI certificates without cron',
    summary: 'A systemd path unit watches the certificate and restarts Traefik when it changes.',
    published: false,
  },
];

export const publishedNotes = notes.filter((note) => note.published);
