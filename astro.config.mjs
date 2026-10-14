// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import annotations from './dev/annotations-plugin.mjs';

// User site on a custom domain (set in the repo's Settings → Pages), served from the root, so no `base`.
export default defineConfig({
  site: 'https://conklingeospatial.com',
  integrations: [
    sitemap({
      // Pages on this domain published from other repositories (GitHub project sites).
      customPages: ['https://conklingeospatial.com/Dolores_River_Geomorphic_Change_Detection/'],
    }),
  ],
  vite: {
    plugins: [annotations()],
  },
});
