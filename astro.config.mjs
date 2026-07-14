// @ts-check
import { defineConfig } from 'astro/config';
import critters from 'astro-critters';

// https://astro.build/config
export default defineConfig({
  site: 'https://axel-hoffmann.dev',
  integrations: [critters()],
});
