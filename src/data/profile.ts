export const profile = {
  name: 'Stephen Conklin',
  title: 'Geospatial Analyst & Developer',
  // The site's name, after the domain; also the home page title and the WebSite alternate name.
  site: 'Conklin Geospatial',
  location: 'Durango, Colorado',
  // Shown on the site through src/components/Email.astro, which keeps it out of the page source.
  email: 'steve@conklingeospatial.com',
  github: 'https://github.com/stephenconklin',
  intro:
    'Geospatial analyst, cartographer, and developer. Visualizing spatial data as maps and web apps, and building remote sensing workflows and research tools for satellite, aerial, and drone imagery.',
  summary:
    'Research Collaborator with G. Burch Fisher, Ph.D., an Associate Research Scientist with the National Science Foundation–funded GCE-SCIPE program at the University of Maryland Center for Environmental Science. With Dr. Fisher, I build remote sensing workflows and research tools for satellite imagery, most recently for BioSCape, a NASA-funded biodiversity project in South Africa. Before that: over two decades of web development and data systems work, and fieldwork in Colorado’s San Juan Mountains.',
};

export const experience = [
  {
    role: 'Research Collaborator',
    org: 'With G. Burch Fisher, Ph.D., Associate Research Scientist, National Science Foundation–funded GCE-SCIPE program, University of Maryland Center for Environmental Science (UMCES)',
    when: '2026 – present',
    points: [
      'Engineered an 11-step Bash/Python pipeline for NASA Harmonized Landsat/Sentinel-2 (HLS 2.0) data, enabling reproducible time-series vegetation index analysis.',
      'Delivered NetCDF datacubes of time-series phenology for BioSCape, a NASA-funded US–South Africa biodiversity project in the Greater Cape Floristic Region; the datacubes were used as model inputs for the project.',
      'Built and delivered the BioSCape Phenology Explorer, an interactive dashboard that lets scientists visually explore and navigate the project’s regions and phenology metrics, deployed on the NSF Jetstream2 research cloud.',
      'Built a per-pixel phenology pipeline producing CF-1.8 NetCDF and GeoParquet datacubes, metric maps, and interactive visualizations.',
      'Mapping mountain laurel and rhododendron across Pennsylvania with leaf-off phenology, and work toward TorchGeo and GeoAI foundation models, for ecologists and ornithologists mapping habitat.',
    ],
  },
  {
    role: 'Co-Investigator, Alpine Lake Water Quality',
    org: 'Fort Lewis College, Undergraduate Research',
    when: 'Fall 2025',
    points: [
      'Sampled fecal indicator bacteria and water chemistry at alpine lakes in Colorado’s San Juan Mountains; analyzed in ArcGIS Pro and R.',
      'Derived trail-use intensity metrics from AllTrails and Strava heatmap imagery using color thresholding and zonal analysis.',
    ],
  },
  {
    role: 'Contract Field Technician',
    org: 'Rider Resources, Durango, CO',
    when: '2016, 2023',
    points: [
      'Installed a high-altitude climate monitoring station near Silverton, CO, following the 2015 Gold King Mine spill.',
      'Modified peristaltic water samplers for more precise automated sampling.',
    ],
  },
  {
    role: 'Web Manager; Web Consultant',
    org: 'Worldwatch Institute, Washington, DC',
    when: '2002 – 2018',
    points: [
      'Ran the LAMP servers and CMS publishing environmental research to a global audience; led the move from static HTML to Drupal and WordPress.',
      'Built custom web applications, including a customized email click-tracking system.',
      'Managed and grew the Institute’s e-commerce.',
      'Managed and delivered the Institute’s e-newsletter and email campaigns to a global subscriber base.',
    ],
  },
  {
    role: 'Independent Web Developer',
    org: 'Washington, DC & Durango, CO',
    when: '1999 – 2024',
    points: ['Built and supported servers and web applications for environmental and nonprofit clients.'],
  },
  {
    role: 'Sports Timing Software Developer & Operator',
    org: 'Animas Timing',
    when: '2003 – 2012',
    points: [
      'Built and operated real-time timing and results systems for whitewater slalom, including Olympic Trials and the Pan American Games.',
    ],
  },
];

export const education = [
  {
    what: 'B.A., Environmental Conservation and Management',
    where: 'Fort Lewis College, Durango, CO',
    when: '2026',
    roles: [
      {
        role: 'Teaching Assistant / Peer Educator',
        course: 'ENV 110: Introduction to Environmental Science',
        when: 'Spring 2025',
      },
    ],
  },
  {
    what: 'Geographic Information Systems Certificate',
    where: 'Fort Lewis College, Durango, CO',
    when: '2026',
    roles: [
      {
        role: 'Teaching Assistant',
        course: 'GEOG 315: GIS Programming and Web Mapping',
        when: 'Fall 2026',
      },
    ],
  },
];

export const coursework = [
  'Remote Sensing',
  'Raster GIS',
  'Vector GIS',
  'GIS Python Programming',
  'Environmental Geography',
  'Research Methods & Design',
  'Statistics',
];

export const toolbox = [
  {
    area: 'Geospatial & remote sensing',
    items: ['QGIS / PyQGIS', 'ArcGIS Pro', 'GDAL', 'PDAL', 'Google Earth Engine', 'NASA HLS 2.0', 'Landsat & Sentinel-2', 'LiDAR'],
  },
  {
    area: 'Data & science',
    items: ['Python', 'xarray / Dask', 'rasterio', 'NetCDF CF-1.8', 'Zarr', 'GeoParquet', 'R', 'SQL', 'Bash'],
  },
  {
    area: 'Web & visualization',
    items: ['MapLibre GL JS', 'Plotly Dash', 'Leaflet', 'Astro', 'HTML / CSS / JS', 'Drupal / WordPress'],
  },
  {
    area: 'Infrastructure',
    items: ['Docker', 'nginx', 'Apache', 'Linux', 'NSF Jetstream2', 'Google Cloud Storage', 'Read the Docs / MkDocs'],
  },
  {
    area: 'Field',
    items: ['Water quality sampling', 'Environmental monitoring', 'Drone survey data', 'Wilderness navigation'],
  },
];
