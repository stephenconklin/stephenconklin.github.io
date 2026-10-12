import type { ImageMetadata } from 'astro';
import dragonBravo from '../assets/maps/dragon-bravo-fire.jpg';
import mandalay from '../assets/maps/mandalay-earthquake.jpg';
import dirtyDevil from '../assets/maps/dirty-devil-confluence.jpg';

// Stand-alone cartography for the map gallery and the home page.
// To add a map: put the image in src/assets/maps/, import it above, and add an entry.
// An entry without `src` shows as a reserved "Map in preparation" slot.
export type GalleryMap = {
  id: string;
  title: string;
  subtitle?: string;
  story?: string; // plain-language description for non-technical visitors
  context?: string;
  highlights?: string[];
  related?: { label: string; href: string };
  src?: ImageMetadata;
  alt?: string;
};

export const gallery: GalleryMap[] = [
  {
    id: 'dragon-bravo-fire',
    title: 'Dragon Bravo Fire',
    subtitle: 'Grand Canyon National Park & Kaibab National Forest, 2025',
    story:
      'A one-page story of the fire that burned 121,707 acres on the Grand Canyon’s North Rim: where it spread, how severely it burned, the landmarks it destroyed, and the debris flow that tore through Bright Angel Creek a year later.',
    context: 'Fort Lewis College · GEOG 400 Raster GIS · 2026',
    highlights: ['QGIS', 'Sentinel-2 & Landsat imagery', 'Burn severity (dNBR)', 'Terrain shading'],
    related: { label: 'Wildfire Analysis Toolkit', href: '/projects/qgis-wildfire-analysis-toolkit/' },
    src: dragonBravo,
    alt: 'Map of the 2025 Dragon Bravo Fire showing burn severity across Grand Canyon National Park and the Bright Angel Creek watershed, with photos, a severity chart and before-and-after satellite images',
  },
  {
    id: 'dirty-devil-confluence',
    title: 'Confluence of the Colorado and Dirty Devil Rivers',
    subtitle: 'Southeast Utah, 2026',
    story:
      'As Lake Powell drops toward its minimum power pool, the Colorado and Dirty Devil Rivers are cutting back down through decades of sediment the reservoir left behind, nicknamed the “Dominy Formation.” A shaded-relief elevation map of erosion and deposition in action.',
    context: 'Fort Lewis College · GEOG 400 Raster GIS · 2026',
    highlights: ['USGS 3DEP 1/3 arc-second elevation', 'Shaded relief', 'Elevation color ramp'],
    related: { label: 'Dolores River change detection', href: '/projects/dolores-river-change-detection/' },
    src: dirtyDevil,
    alt: 'Shaded-relief elevation map of the confluence of the Colorado and Dirty Devil Rivers at the head of Lake Powell, southeast Utah, with the rivers cutting through exposed reservoir sediment',
  },
  {
    id: 'mandalay-earthquake',
    title: 'Mandalay, Myanmar Earthquake',
    subtitle: 'Magnitude 7.7–7.9, March 28, 2025',
    story:
      'The strongest earthquake recorded in Myanmar since 1912, mapped for a general audience: how hard the ground shook, which cities felt it, how many buildings were damaged in Mandalay and Nay Pyi Taw, and where landslides and liquefaction were most likely.',
    context: 'Fort Lewis College · GEOG 350 Vector GIS final project · Spring 2025',
    highlights: ['Shaking intensity (MMI)', 'Building damage', 'Landslide & liquefaction risk', 'Population data'],
    src: mandalay,
    alt: 'Map of the March 2025 Mandalay, Myanmar earthquake showing shaking intensity, affected cities, building damage insets, and landslide and liquefaction likelihood',
  },
  // Reserved for professional map layouts in preparation.
  { id: 'layout-1', title: 'Professional map layout', subtitle: 'In preparation' },
  { id: 'layout-2', title: 'Professional map layout', subtitle: 'In preparation' },
];

export const featuredMaps = gallery.filter((m) => m.src);
