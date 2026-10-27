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
    title: 'Research with GCE-SCIPE, UMCES',
    short: 'Research',
    blurb:
      'I work as a Research Collaborator with G. Burch Fisher, Ph.D., an Associate Research Scientist with the National Science Foundation–funded GCE-SCIPE program at the University of Maryland Center for Environmental Science. Our projects span remote sensing and research software. For BioSCape, a NASA-funded US–South Africa biodiversity project, two of my tools turn satellite imagery into phenology datacubes used as model inputs, and the BioSCape Phenology Explorer lets researchers browse them. Other work automates NAIP aerial imagery downloads, deploys research dashboards on Jetstream2, and maps evergreen understory shrubs in Pennsylvania.',
  },
  webmap: {
    title: 'Maps & cartography',
    short: 'Maps & cartography',
    blurb:
      'Maps for screens and for print: an interactive 3D web map of drone-measured river change, and LiDAR terrain mapping in 2D and 3D. More print and story maps are in the map gallery.',
  },
  qgis: {
    title: 'GIS plugins & processing tools',
    short: 'GIS plugins',
    blurb:
      'Plugins and processing tools for desktop GIS, built for QGIS on PyQGIS, GDAL, and numpy, so analysts can run complete workflows from the Processing Toolbox, in models, and in batch mode.',
  },
  tools: {
    title: 'Data tools',
    short: 'Tools',
    blurb: 'Command-line utilities for getting geospatial data at scale.',
  },
} as const;

export type GroupKey = keyof typeof GROUPS;
export const GROUP_KEYS = Object.keys(GROUPS) as [GroupKey, ...GroupKey[]];
