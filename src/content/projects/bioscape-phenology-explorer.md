---
title: BioSCape Phenology Explorer
tagline: An interactive dashboard over the phenology datacubes I built for BioSCape, a NASA-funded biodiversity project in South Africa.
group: umces
order: 1
featured: true
status: public
repo: https://github.com/stephenconklin/BioSCape_Phenology_Explorer
links:
  - label: Live dashboard
    url: http://149.165.155.71
context: With G. Burch Fisher, Ph.D. (GCE-SCIPE, UMCES) · NASA BioSCape, 2026
role: Data pipelines, datacube and dashboard deliverables, design and development, deployment
credit: Done in collaboration with G. Burch Fisher, Ph.D., Associate Research Scientist, GCE-SCIPE program, UMCES.
skills: [dashboards, timeseries, remote-sensing, pipelines, web-mapping, devops]
stack: [Python, Plotly Dash, Dash-Leaflet, Dask, Zarr v3, NetCDF, Docker, Gunicorn, Google Cloud Storage]
cover: ../../assets/projects/bioscape-phenology-explorer/app-overview.jpg
coverAlt: The BioSCape Phenology Explorer showing all LVIS flight boxes across South Africa's Cape and a ten-year NDVI time series for one pixel
maps:
  - title: LVIS flight boxes over the Cape Floristic Region
    caption: The study regions, selectable in the dashboard, on a satellite basemap.
    src: ../../assets/projects/bioscape-phenology-explorer/map-overview.jpg
    alt: Satellite map of South Africa's Cape with the LVIS flight boxes outlined
  - title: Green-up rate, flight box G5_5
    caption: How fast vegetation greens up each season, mapped pixel by pixel.
    src: ../../assets/projects/bioscape-phenology-explorer/map-greenup.jpg
    alt: Map of mean green-up rate across flight box G5_5, from dark purple (slow) to yellow (fast)
  - title: Mean NDVI, flight box G5_6
    caption: Average vegetation greenness along the south coast, 2016–2025.
    src: ../../assets/projects/bioscape-phenology-explorer/map-g5-6.jpg
    alt: Map of mean NDVI across flight box G5_6 on South Africa's south coast
  - title: Mean NDVI, region G5_25
    caption: Fine-scale vegetation patterns in mountain terrain.
    src: ../../assets/projects/bioscape-phenology-explorer/map-g5-25.jpg
    alt: Map of mean NDVI for region G5_25 in mountainous terrain
---

[BioSCape](https://www.bioscape.io/), the Biodiversity Survey of the Cape, uses remote sensing and field data to understand biodiversity on land and in the water across South Africa's Greater Cape Floristic Region, one of the world's 36 biodiversity hotspots. It's a US–South Africa collaboration funded by NASA, South Africa's NRF/SAEON and UNESCO, with scientists from around the world.

I did this work as a Research Collaborator with [G. Burch Fisher, Ph.D.](https://burchfisher.github.io/), an Associate Research Scientist with the **National Science Foundation–funded GCE-SCIPE program at the University of Maryland Center for Environmental Science (UMCES)**. There were two deliverables: a set of **NetCDF datacubes holding time-series phenology for every 30 m pixel**, which were used as model inputs for the BioSCape project, and the **BioSCape Phenology Explorer**, a dashboard that lets scientists visually explore and navigate the project's regions and metrics.

## How it fits together

1. **NASA HLS 2.0** imagery (Landsat 8/9 and Sentinel-2) provides the 30 m spectral time series.
2. My **[HLS VI Pipeline](/projects/hls-vi-pipeline/)** downloads, cloud-masks and turns that imagery into vegetation index time series for each LVIS flight box.
3. My **[VI Phenology](/projects/vi-phenology/)** toolkit smooths those series and builds the **CF-1.8 NetCDF phenology datacubes**, with 19 per-pixel metrics. These were the first deliverable, used as model inputs for BioSCape.
4. **BioSCape Phenology Explorer**, this dashboard and the second deliverable, puts the datacubes in front of researchers, running on NSF Jetstream2 and deployed with my [Jetstream2 Dashboard Deploy](/projects/jetstream2-dashboard-deploy/) tooling.

## What researchers can do

- Pick a study region on an interactive map of the LVIS flight boxes.
- See phenology metric maps (peak NDVI, mean VI, data coverage and 19 precomputed metrics) at near-native 30 m resolution.
- Click any pixel to extract its full time series, with Whittaker smoothing applied on the fly.
- Compare raw time series, annual-cycle composites, interannual trends and phenology scatter plots.

## A tour of the dashboard

![The Annual Cycles tab: each year's smoothed NDVI curve for one pixel, with the ten-year mean](../../assets/projects/bioscape-phenology-explorer/app-annual-cycles.jpg)

*Annual cycles: every year's smoothed curve for one pixel, overlaid so unusual years stand out.*

![The Metric Trends tab over a green-up rate map: year-by-year integrated NDVI, green-up rate, floor and ceiling NDVI](../../assets/projects/bioscape-phenology-explorer/app-greenup.jpg)

*Metric trends: phenology metrics year by year, over a map of green-up rate.*

![The Phenology Scatter tab: ten years of observations for one pixel by day of year, with the mean fit](../../assets/projects/bioscape-phenology-explorer/app-scatter.jpg)

*Phenology scatter: a decade of observations folded onto one calendar year, with the mean seasonal fit.*

![The sidebar listing all per-pixel phenology metrics, with a pixel's raw and smoothed NDVI time series](../../assets/projects/bioscape-phenology-explorer/app-metrics.jpg)

*Pixel metrics: the full set of precomputed phenology metrics for the selected pixel — peak, productivity, seasonality, variability and bimodality.*

## Engineering

The datacubes are rechunked to Zarr v3 for fast single-pixel reads and loaded lazily with Dask, so full cubes never sit in memory. The same code reads from a local volume or straight from Google Cloud Storage. Production runs in Docker on an NSF Jetstream2 instance.
