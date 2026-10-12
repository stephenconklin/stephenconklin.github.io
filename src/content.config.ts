import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SKILL_KEYS, GROUP_KEYS } from './data/taxonomy';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One line for cards.
      tagline: z.string(),
      group: z.enum(GROUP_KEYS),
      // Lower numbers come first within a group.
      order: z.number().default(100),
      featured: z.boolean().default(false),
      // public: repo is on GitHub. upcoming: will be published; no repo link yet.
      // research: work without a standalone repo.
      status: z.enum(['public', 'upcoming', 'research']),
      repo: z.url().optional(),
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      context: z.string().optional(),
      role: z.string().optional(),
      credit: z.string().optional(),
      skills: z.array(z.enum(SKILL_KEYS)),
      stack: z.array(z.string()),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Optional caption shown under the main image on the project page.
      coverCaption: z.string().optional(),
      // By default the main image is left out of the Maps section to avoid showing it twice.
      coverInMaps: z.boolean().default(false),
      // Optional pair of matching images shown side by side as the main image, each with its own caption
      // (e.g. imagery and the result derived from it). `cover` is still used for cards and link previews.
      coverPanels: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .length(2)
        .optional(),
      // Optional rows of related images shown side by side under a heading, e.g. a before/after
      // or settings comparison. Rendered after the write-up, before the maps, unless placement is 'top'
      // (right under the main image, before the write-up).
      figureSets: z
        .array(
          z.object({
            title: z.string(),
            intro: z.string().optional(),
            // Show the figures as numbered steps with arrows between them.
            numbered: z.boolean().default(false),
            placement: z.enum(['top', 'bottom']).default('bottom'),
            // Keep the row narrower than the page, e.g. for tall portrait images.
            narrow: z.boolean().default(false),
            figures: z.array(
              z.object({ title: z.string(), caption: z.string().optional(), src: image(), alt: z.string() }),
            ),
          }),
        )
        .default([]),
      // Static map slots. A slot without `src` renders as a reserved placeholder.
      maps: z
        .array(
          z.object({
            title: z.string(),
            caption: z.string().optional(),
            src: image().optional(),
            alt: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

export const collections = { projects };
