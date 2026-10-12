// Copy for the alternate home-page presentations (Scholar, Case Studies, Journey).

export const researchStatement =
  'My work sits between Earth observation data and the scientists who need answers from it. I build reproducible pipelines that turn NASA Harmonized Landsat and Sentinel-2 imagery into vegetation phenology products, and the tools — GIS plugins, dashboards and web maps — that put those products in front of ecologists, land managers and the public.';

export const interests = [
  'Vegetation phenology from dense satellite time series',
  'Biodiversity remote sensing (NASA BioSCape)',
  'Species mapping with GeoAI foundation models',
  'Wildfire burn severity',
  'Fluvial geomorphology and terrain analysis',
  'Reproducible open-source geospatial tooling',
];

export type CaseStudy = {
  problem: string;
  built: string;
  result: string;
  metric: { value: string; label: string };
};

export const caseStudies: Record<string, CaseStudy> = {
  'hls-vi-pipeline': {
    problem: 'Going from raw HLS granules to a clean, study-area-wide vegetation index time series meant days of manual downloading, masking and mosaicking for every new region.',
    built: 'An 11-step Bash/Python pipeline with tile-by-tile processing, bitwise Fmask quality masking, CF-1.8 NetCDF stacks and outlier detection, driven by one config file.',
    result: 'Runs end to end with one command, at state scale (Pennsylvania) and biodiversity-hotspot scale (South Africa); it is the first building block of the NetCDF phenology datacubes delivered to NASA BioSCape.',
    metric: { value: '1', label: 'command for all 11 steps' },
  },
  'vi-phenology': {
    problem: 'HLS observations are irregular and cloud-gapped, so standard phenology tools either need binning or produce unstable metrics.',
    built: 'Four pipelines — datacubes, ROI phenology, per-pixel metric maps and model-ready GeoTIFFs — with Whittaker smoothing and robust pixel sampling.',
    result: 'Spatially explicit phenology for every 30 m pixel, with memory use bounded to a single band regardless of output size.',
    metric: { value: '19', label: 'per-pixel phenology metrics' },
  },
  'bioscape-phenology-explorer': {
    problem: 'BioSCape, a NASA-funded project with scientists from around the world, needed per-pixel phenology for South Africa’s Cape: as model-ready data, and as something researchers could explore.',
    built: 'NetCDF time-series phenology datacubes built with my HLS VI Pipeline and VI Phenology tools, and a Plotly Dash + Leaflet dashboard that reads them lazily, smoothing any clicked pixel on the fly.',
    result: 'The datacubes were used as model inputs for the BioSCape project; the Explorer is live on NSF Jetstream2 for researchers studying one of the world’s 36 biodiversity hotspots.',
    metric: { value: '30 m', label: 'per-pixel phenology datacubes, delivered' },
  },
  'jetstream2-dashboard-deploy': {
    problem: 'Research dashboards die on laptops: deploying them means containers, proxies, TLS and a server most researchers were never trained to run.',
    built: 'Framework detection from imports, laptop-habit checks, automatic dependency handling, nginx with TLS, a watchdog, and a desktop app over the same scripts.',
    result: 'One repeatable path from project folder to a public URL on NSF’s research cloud — the path the BioSCape Explorer ships on.',
    metric: { value: '4', label: 'dashboard frameworks, no Docker required' },
  },
  'qgis-wildfire-analysis-toolkit': {
    problem: 'A burn severity summary took about a dozen manual GIS steps, and calibrating each satellite scene by hand is easy to get wrong.',
    built: 'A QGIS plugin modeled on MTBS: image-pair selection, calibrated NBR from HLS, Landsat or Sentinel-2, dNBR/RdNBR/RBR, MTBS classes, summaries, report and map.',
    result: 'Perimeter and dates in, map and report out in about two minutes, validated pixel by pixel against published MTBS fires.',
    metric: { value: 'κ 0.78', label: 'mean agreement with MTBS classes' },
  },
  'qgis-stacked-terrain-builder': {
    problem: 'The popular stacked-paper terrain look was an ArcGIS Pro technique with no native QGIS equivalent.',
    built: 'A Processing script that builds true nested slabs from a DEM and styles them with one geometry generator, plus shaded faces and an ArcGIS Pro export.',
    result: 'Stacked terrain art in QGIS with oblique and nadir views, nine ramps and adjustable styling — layers about ten times lighter than the raw contours.',
    metric: { value: '~10×', label: 'lighter layers after simplification' },
  },
  'qgis-rem': {
    problem: 'A useful floodplain-mapping plugin did not run on QGIS 4: its raster calculator failed on macOS and its SAGA/GRASS chain was unavailable.',
    built: 'A port to Qt6 with an in-process GDAL/numpy REM calculation and WhiteboxTools stream extraction.',
    result: 'Relative Elevation Models work again on QGIS 4, with full credit to the original author.',
    metric: { value: 'QGIS 4', label: 'compatibility restored' },
  },
  'dolores-river-change-detection': {
    problem: 'Centimeter drone surveys of a dam-release flood were locked in desktop GIS files that few people could open.',
    built: 'A MapLibre 3D web map with change values colored live in the browser and a custom protocol that merges the drone DSM into global terrain.',
    result: 'Anyone can fly the reach and adjust the change threshold, with no software to install.',
    metric: { value: '1.8 cm', label: 'drone DSM change, in 3D' },
  },
  'naip-harvest-m2m': {
    problem: 'Downloading NAIP imagery for a study area through EarthExplorer is slow and manual.',
    built: 'An AOI-driven command-line pipeline on the USGS M2M API with size estimates, aria2c parallel downloads, checkpoints and band extraction.',
    result: 'Bulk NAIP for any boundary and date range, resumable after interruptions.',
    metric: { value: 'aria2c', label: 'parallel, resumable downloads' },
  },
};

export type Chapter = {
  years: string;
  title: string;
  text: string;
  projects?: string[];
};

export const journey: Chapter[] = [
  {
    years: '1995–2001',
    title: 'Reading rivers',
    text: 'U.S. National Team whitewater slalom athlete and USA Canoe/Kayak board member. Years of Class V water taught me to read terrain, flow and risk — and to perform when it counts.',
  },
  {
    years: '1999–2018',
    title: 'Building data systems',
    text: 'Web manager for the Worldwatch Institute and independent developer for environmental nonprofits: LAMP servers, CMS migrations and publishing environmental research to a global audience.',
  },
  {
    years: '2003–2012',
    title: 'Real-time, no second chances',
    text: 'Designed and ran timing and results systems for international whitewater events, including Olympic Trials and the Pan American Games.',
  },
  {
    years: '2016 · 2023',
    title: 'Into the field',
    text: 'Field technician in the San Juan Mountains after the Gold King Mine spill: a climate station at 11,700 ft near Silverton and modified automated water samplers.',
  },
  {
    years: '2024–2025',
    title: 'Back to school, into science',
    text: 'Returned to Fort Lewis College for Environmental Conservation and Management and a GIS certificate. Co-investigated fecal indicator bacteria at alpine lakes in Colorado’s San Juan Mountains, combining field sampling, ArcGIS Pro and R.',
  },
  {
    years: '2026',
    title: 'Satellites to scientists',
    text: 'Research Collaborator with the National Science Foundation–funded GCE-SCIPE team at UMCES, working with Associate Research Scientist G. Burch Fisher: phenology datacubes for BioSCape, a NASA-funded biodiversity project in South Africa, built with my own HLS and phenology tools, and a dashboard so researchers can explore them.',
    projects: ['bioscape-phenology-explorer', 'hls-vi-pipeline', 'vi-phenology', 'jetstream2-dashboard-deploy', 'pa-mountain-laurel', 'naip-harvest-m2m'],
  },
  {
    years: 'Now',
    title: 'Tools for the next analyst',
    text: 'Packaging what I learn into open tools: GIS plugins for burn severity, terrain art and floodplains, plus web maps.',
    projects: ['qgis-wildfire-analysis-toolkit', 'qgis-stacked-terrain-builder', 'qgis-rem', 'dolores-river-change-detection'],
  },
];
