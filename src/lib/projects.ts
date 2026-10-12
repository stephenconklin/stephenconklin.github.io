import { getCollection, type CollectionEntry } from 'astro:content';
import { GROUP_KEYS } from '../data/taxonomy';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort(
    (a, b) =>
      GROUP_KEYS.indexOf(a.data.group) - GROUP_KEYS.indexOf(b.data.group) ||
      a.data.order - b.data.order,
  );
}

export const STATUS_LABEL: Record<Project['data']['status'], string> = {
  public: 'Open source',
  upcoming: '',
  research: 'Ongoing research',
};
