// Skill areas shown in the skills matrix and on project pages.
export const SKILLS = {
  'remote-sensing': 'Satellite remote sensing',
  timeseries: 'Time series & phenology',
  pipelines: 'Data pipeline engineering',
  'qgis-dev': 'GIS plugin development',
  terrain: 'Terrain, LiDAR & drone data',
  cartography: 'Cartography & map design',
  'web-mapping': 'Web mapping',
  dashboards: 'Interactive dashboards',
  devops: 'Cloud deployment & DevOps',
  docs: 'Technical documentation',
} as const;

export type SkillKey = keyof typeof SKILLS;
export const SKILL_KEYS = Object.keys(SKILLS) as [SkillKey, ...SkillKey[]];

// Project groups, in display order.
export const GROUPS = {
  umces: {
    title: 'Research with G. Burch Fisher, Ph.D. · GCE-SCIPE, UMCES · NASA BioSCape',
    short: 'Research',
    blurb:
      'Work as a Research Collaborator with G. Burch Fisher, Ph.D., an Associate Research Scientist with the National Science Foundation–funded GCE-SCIPE program at the University of Maryland Center for Environmental Science, on BioSCape, a NASA-funded US–South Africa biodiversity project. Two tools I wrote turn satellite imagery into NetCDF phenology datacubes that were used as model inputs for BioSCape, and the BioSCape Phenology Explorer puts them in front of researchers.',
  },
  webmap: {
    title: 'Maps & cartography',
    short: 'Web maps',
    blurb: 'Maps for screens and for print: interactive 3D web maps, and map layouts that tell a story at a glance.',
  },
  qgis: {
    title: 'GIS plugins & processing tools',
    short: 'GIS plugins',
    blurb:
      'Plugins and processing tools for desktop GIS, built for QGIS on PyQGIS, GDAL and numpy, so analysts can run complete workflows from the Processing Toolbox, in models and in batch mode.',
  },
  tools: {
    title: 'Data tools',
    short: 'Tools',
    blurb: 'Command-line utilities for getting geospatial data at scale.',
  },
} as const;

export type GroupKey = keyof typeof GROUPS;
export const GROUP_KEYS = Object.keys(GROUPS) as [GroupKey, ...GroupKey[]];
