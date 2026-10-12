// Where the work happened, for the map concept. Coordinates are approximate centers, [lng, lat].
export type Place = {
  id: string;
  name: string;
  region: string;
  center: [number, number];
  zoom: number;
  story: string;
  projects: string[];
};

export const places: Place[] = [
  {
    id: 'cape',
    name: 'Greater Cape Floristic Region',
    region: 'South Africa',
    center: [20.2, -33.7],
    zoom: 5.6,
    story: 'One of the world’s 36 biodiversity hotspots, and home to BioSCape, a NASA-funded US–South Africa biodiversity project. As a Research Collaborator with the National Science Foundation–funded GCE-SCIPE team at UMCES, working with Associate Research Scientist G. Burch Fisher, I built phenology datacubes for every 30 m pixel here, used as model inputs for BioSCape, and the dashboard researchers use to explore them.',
    projects: ['bioscape-phenology-explorer', 'hls-vi-pipeline', 'vi-phenology'],
  },
  {
    id: 'pennsylvania',
    name: 'Pennsylvania',
    region: 'USA',
    center: [-77.6, 41.0],
    zoom: 6.2,
    story: 'Leaf-off satellite composites across the whole state, hunting for evergreen mountain laurel and rhododendron hidden under the deciduous canopy.',
    projects: ['pa-mountain-laurel', 'hls-vi-pipeline'],
  },
  {
    id: 'grand-canyon',
    name: 'Grand Canyon, North Rim',
    region: 'Arizona',
    center: [-112.05, 36.2],
    zoom: 9.4,
    story: 'The 2025 Dragon Bravo Fire and the Bright Angel Creek watershed inside it — the test case for my wildfire toolkit, and the terrain behind my stacked-paper maps.',
    projects: ['qgis-wildfire-analysis-toolkit', 'qgis-stacked-terrain-builder'],
  },
  {
    id: 'dolores',
    name: 'Dolores River',
    region: 'Southwest Colorado',
    center: [-108.8753, 38.0314],
    zoom: 13.5,
    story: 'Centimeter drone surveys before and after a dam-release flood, turned into a 3D web map of erosion and deposition.',
    projects: ['dolores-river-change-detection'],
  },
  {
    id: 'durango',
    name: 'Durango',
    region: 'Colorado',
    center: [-107.88, 37.275],
    zoom: 10.5,
    story: 'Home base. Fort Lewis College, where I finished a B.S. in Environmental Conservation and Management and a GIS certificate.',
    projects: [],
  },
  {
    id: 'san-juans',
    name: 'San Juan Mountains',
    region: 'Colorado',
    center: [-107.75, 37.82],
    zoom: 10,
    story: 'Field country: a climate station at 11,700 ft near Silverton after the Gold King Mine spill, and water-quality sampling at alpine lakes in the San Juans.',
    projects: [],
  },
  {
    id: 'jetstream2',
    name: 'NSF Jetstream2',
    region: 'Indiana University, Bloomington',
    center: [-86.52, 39.17],
    zoom: 9,
    story: 'The research cloud where the BioSCape Phenology Explorer runs, deployed with my own tooling.',
    projects: ['jetstream2-dashboard-deploy', 'bioscape-phenology-explorer'],
  },
  {
    id: 'dc',
    name: 'Washington, DC',
    region: 'USA',
    center: [-77.03, 38.9],
    zoom: 10,
    story: 'Nearly two decades building the web and data systems that carried the Worldwatch Institute’s environmental research to a global audience.',
    projects: [],
  },
];

// Tools that work anywhere rather than in one place.
export const anywhere = ['naip-harvest-m2m', 'qgis-rem'];
