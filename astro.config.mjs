// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import annotations from './dev/annotations-plugin.mjs';

// User site: served from the domain root, so no `base` is needed.
export default defineConfig({
  site: 'https://stephenconklin.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [annotations()],
  },
});
