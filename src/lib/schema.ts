// schema.org structured data (JSON-LD) for search engines. Passed to Base as `schema`.
import { profile } from '../data/profile';

const SITE = import.meta.env.SITE.replace(/\/$/, '');
const abs = (path: string) => `${SITE}${path}`;

export const person = () => ({
  '@type': 'Person',
  '@id': abs('/#person'),
  name: profile.name,
  url: abs('/'),
  jobTitle: profile.title,
  description: profile.intro,
  sameAs: [profile.github],
  knowsAbout: ['Remote sensing', 'Cartography', 'GIS', 'QGIS plugin development', 'Web mapping', 'Phenology'],
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': abs('/#website'),
  name: profile.name,
  alternateName: profile.site,
  url: abs('/'),
  publisher: { '@id': abs('/#person') },
});

/** Breadcrumb trail, e.g. breadcrumbs([['Projects', '/projects/'], ['Wildfire Analysis Toolkit', '/projects/…/']]). */
export const breadcrumbs = (trail: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...trail].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: abs(path),
  })),
});

export const graph = (...items: Record<string, unknown>[]) => ({ '@context': 'https://schema.org', '@graph': items });
