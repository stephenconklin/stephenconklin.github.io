import type { ImageMetadata } from 'astro';
import dragonBravo from '../assets/maps/dragon-bravo-fire.jpg';
import mandalay from '../assets/maps/mandalay-earthquake.jpg';
import dirtyDevil from '../assets/maps/dirty-devil-confluence.jpg';
import dolores from '../assets/maps/dolores-river-elevation-change.jpg';
import yosemite from '../assets/maps/yosemite-valley-lidar.jpg';

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
  home?: false; // leave off the home page's Cartography section
};

export const gallery: GalleryMap[] = [
  {
    id: 'yosemite-valley-lidar',
    title: 'Yosemite Valley',
    subtitle: 'Yosemite National Park, California, 2026',
    story:
      'A terrain, tree canopy, and river channel map from a 243-million-point airborne LiDAR survey: a 3D view up the valley past El Capitan and Half Dome, a detail map of the valley floor from Yosemite Village to Curry Village, and an exploded stack showing every layer from the raw point cloud to the finished map.',
    context: 'Fort Lewis College · 2026',
    highlights: ['NCALM airborne LiDAR', '1 m terrain model', 'Canopy height', '3D view', 'Processing stack'],
    related: { label: 'Yosemite Valley LiDAR Map', href: '/projects/yosemite-valley-lidar/' },
    src: yosemite,
    alt: '11 by 17 inch map of Yosemite Valley from a 243-million-point LiDAR survey, with a 3D view up the valley, a detail map from Yosemite Village to Curry Village, an overview map, and an exploded stack of the processing layers',
  },
  {
    id: 'dragon-bravo-fire',
    title: 'Dragon Bravo Fire',
    subtitle: 'Grand Canyon National Park & Kaibab National Forest, 2025',
    story:
      'A one-page story of the fire that burned 121,707 acres on the Grand Canyon’s North Rim: where it spread, how severely it burned, the landmarks it destroyed, and the debris flow that tore through Bright Angel Creek a year later.',
    context: 'Fort Lewis College · 2026',
    highlights: ['QGIS', 'Sentinel-2 & Landsat imagery', 'Burn severity (dNBR)', 'Terrain shading'],
    related: { label: 'Wildfire Analysis Toolkit', href: '/projects/qgis-wildfire-analysis-toolkit/' },
    src: dragonBravo,
    alt: 'Map of the 2025 Dragon Bravo Fire showing burn severity across Grand Canyon National Park and the Bright Angel Creek watershed, with photos, a severity chart, and before-and-after satellite images',
  },
  {
    id: 'dirty-devil-confluence',
    title: 'Confluence of the Colorado and Dirty Devil Rivers',
    subtitle: 'Southeast Utah, 2026',
    story:
      'As Lake Powell drops toward its minimum power pool, the Colorado and Dirty Devil Rivers are cutting back down through decades of sediment the reservoir left behind, nicknamed the “Dominy Formation.” A shaded-relief elevation map of erosion and deposition in action.',
    context: 'Fort Lewis College · 2026',
    highlights: ['USGS 3DEP 1/3 arc-second elevation', 'Shaded relief', 'Elevation color ramp'],
    src: dirtyDevil,
    alt: 'Shaded-relief elevation map of the confluence of the Colorado and Dirty Devil Rivers at the head of Lake Powell, southeast Utah, with the rivers cutting through exposed reservoir sediment',
  },
  {
    id: 'dolores-river-elevation-change',
    title: 'Dolores River Above Slick Rock',
    subtitle: 'Southwest Colorado, 2026',
    story:
      'In spring 2023, a large flood release from McPhee Dam reshaped the Dolores River. Drone surveys flown before and after show where the flood scoured the channel and where it laid down new sediment, in 3D over the post-flood drone imagery. Only change larger than the surveys’ measurement uncertainty is shown.',
    context: 'Fort Lewis College · 2026',
    highlights: ['Drone surveys (DSMs)', 'DSM of difference', '±20 cm level of detection', '3D view'],
    related: { label: 'Dolores River change detection', href: '/projects/dolores-river-change-detection/' },
    src: dolores,
    home: false, // the Dolores project is a web map; the home page shows it in Select projects
    alt: 'Oblique 3D map of a bend of the Dolores River above Slick Rock, Colorado, showing elevation change between April 2023 and February 2024 drone surveys: erosion in red and orange through the middle of a gravel bar, deposition in blue and purple along its edges, with Highway 141 above the river',
  },
  {
    id: 'mandalay-earthquake',
    title: 'Mandalay, Myanmar Earthquake',
    subtitle: 'Magnitude 7.7–7.9, March 28, 2025',
    story:
      'The strongest earthquake recorded in Myanmar since 1912, mapped for a general audience: how hard the ground shook, which cities felt it, how many buildings were damaged in Mandalay and Nay Pyi Taw, and where landslides and liquefaction were most likely.',
    context: 'Fort Lewis College · 2025',
    highlights: ['Shaking intensity (MMI)', 'Building damage', 'Landslide & liquefaction risk', 'Population data'],
    src: mandalay,
    alt: 'Map of the March 2025 Mandalay, Myanmar earthquake showing shaking intensity, affected cities, building damage insets, and landslide and liquefaction likelihood',
  },
  // Reserved for professional map layouts in preparation.
  { id: 'layout-2', title: 'Professional map layout', subtitle: 'In preparation' },
];

export const featuredMaps = gallery.filter((m) => m.src);
export const homeMaps = featuredMaps.filter((m) => m.home !== false);
