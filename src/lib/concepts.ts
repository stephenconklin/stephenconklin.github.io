import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { getProjects, STATUS_LABEL } from './projects';
import { SKILLS, GROUPS } from '../data/taxonomy';

// Flattened project data with optimized image URLs, for concept pages that render on the client.
export type ConceptProject = {
  id: string;
  href: string;
  title: string;
  tagline: string;
  group: string;
  groupTitle: string;
  status: string;
  statusLabel: string;
  context?: string;
  repo?: string;
  links: { label: string; url: string }[];
  skills: string[];
  stack: string[];
  cover?: string;
  images: { title: string; url: string }[];
};

const url = async (src: ImageMetadata, width = 1000) => (await getImage({ src, width, format: 'webp' })).src;

export async function conceptProjects(): Promise<ConceptProject[]> {
  const projects = await getProjects();
  return Promise.all(
    projects.map(async (p) => {
      const d = p.data;
      const images = await Promise.all(
        d.maps.filter((m) => m.src).map(async (m) => ({ title: m.title, url: await url(m.src!) })),
      );
      return {
        id: p.id,
        href: `/projects/${p.id}/`,
        title: d.title,
        tagline: d.tagline,
        group: d.group,
        groupTitle: GROUPS[d.group].short,
        status: d.status,
        statusLabel: STATUS_LABEL[d.status],
        context: d.context,
        repo: d.repo,
        links: d.links,
        skills: d.skills.map((s) => SKILLS[s]),
        stack: d.stack,
        cover: d.cover ? await url(d.cover) : images[0]?.url,
        images,
      };
    }),
  );
}
