// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import annotations from './dev/annotations-plugin.mjs';

// User site on a custom domain (set in the repo's Settings → Pages), served from the root, so no `base`.
export default defineConfig({
  site: 'https://conklingeospatial.com',
  integrations: [sitemap()],
  vite: {
    plugins: [annotations()],
  },
});
