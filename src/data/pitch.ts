// Home page copy. Tone: describe the work and let the evidence carry it; invite questions rather than business.

export const headline = 'Remote sensing, cartography, and geospatial tools';
export const subline =
  'Geospatial analyst, cartographer, and developer. I process satellite, drone, and field data into analysis-ready datasets, maps, and web apps.';

// Organizations and programs the work was done with or for. Plain text, no logos.
export const workedWith = [
  'University of Maryland Center for Environmental Science (with G. Burch Fisher, Ph.D., GCE-SCIPE program)',
  'NASA BioSCape',
  'Fort Lewis College',
  'Worldwatch Institute',
];

export const services = [
  {
    title: 'Remote sensing & climate pipelines',
    text: 'Python pipelines that turn HLS, Landsat, Sentinel-2, NAIP, and PRISM data into analysis-ready time series and datacubes.',
  },
  {
    title: 'Web maps & dashboards',
    text: 'MapLibre and Plotly Dash apps for exploring rasters, time series, and 3D survey data in a browser.',
  },
  {
    title: 'Maps & cartography',
    text: 'Maps of wildfires, earthquakes, terrain, and landscape change.',
  },
  {
    title: 'GIS plugins & automation',
    text: 'QGIS plugins and processing tools that run multistep workflows from one dialog.',
  },
];

// The three projects shown up front, with a one-line result each.
export const flagship = [
  {
    id: 'qgis-wildfire-analysis-toolkit',
    label: 'GIS plugin',
    result: 'Builds dNBR, RdNBR, and RBR burn-severity layers, a report, and a print map from a fire perimeter and dates in about two minutes. Its severity classes match MTBS with a mean Cohen’s kappa of 0.775 across 17 fires.',
  },
  {
    id: 'dolores-river-change-detection',
    label: 'Web map',
    result: 'A 3D web map of erosion and deposition measured by drone surveys before and after a 2023 dam-release flood.',
  },
  {
    id: 'prism-storm-analysis',
    label: 'Data analysis · 3D web map',
    result: 'Totals a storm over any US watershed, then checks it against rain gauges, streamflow, and snowpack.',
  },
];

export const shortBio =
  'Based in Durango, Colorado, I’m a Research Collaborator with G. Burch Fisher, Ph.D., an Associate Research Scientist with the National Science Foundation–funded GCE-SCIPE program at the University of Maryland Center for Environmental Science. Most recently, I’ve built remote sensing tools and a dashboard for BioSCape, a NASA-funded biodiversity project in South Africa. Before GIS I spent over two decades building web and data systems and worked as a field technician in the San Juan Mountains.';
