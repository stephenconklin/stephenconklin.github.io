---
title: HLS Vegetation Index Pipeline
tagline: An 11-step pipeline that turns NASA Harmonized Landsat & Sentinel-2 imagery into analysis-ready vegetation index time series.
group: umces
order: 3
featured: true
status: public
repo: https://github.com/stephenconklin/HLS_VI_Pipeline
links:
  - label: Documentation
    url: https://hls-vi-pipeline.readthedocs.io/en/latest/overview.html
context: GCE-SCIPE team, UMCES · NASA BioSCape, 2026
role: Pipeline architecture, orchestration and original code
credit: Built in collaboration with G. Burch Fisher, Ph.D., Associate Research Scientist, UMCES / GCE-SCIPE, who provided conceptual guidance and original VI-calculation and NetCDF-assembly code adapted here.
skills: [remote-sensing, timeseries, pipelines, docs]
stack: [Python, Bash, xarray, Dask, rasterio, GDAL, NetCDF CF-1.8, GeoPackage, NASA HLS v2.0]
cover: ../../assets/projects/hls-vi-pipeline/BioSCape_NDVI_MEAN-1280.jpg
coverAlt: NDVI temporal mean mosaic across South Africa's Greater Cape Floristic Region, 2015–2025
maps:
  - title: NDVI temporal mean, South Africa (2015–2025)
    caption: BioSCape study area. EPSG:9221, Viridis.
    src: ../../assets/projects/hls-vi-pipeline/BioSCape_NDVI_MEAN-1280.jpg
    alt: NDVI temporal mean mosaic of the Greater Cape Floristic Region
  - title: NDVI “leaf-off” temporal mean, Pennsylvania (2015–2021)
    caption: Mountain laurel / rhododendron study area. EPSG:6350, Viridis.
    src: ../../assets/projects/hls-vi-pipeline/PA_NDVI_MEAN-1280.jpg
    alt: Leaf-off NDVI temporal mean mosaic of Pennsylvania
  - title: Valid observations, Pennsylvania
    caption: Count of cloud-free NDVI observations per pixel. Lighter = more observations.
    src: ../../assets/projects/hls-vi-pipeline/PA_Count_Valid-1280.jpg
    alt: Map of valid NDVI observation counts across Pennsylvania
  - title: Valid observations, South Africa
    caption: Count of cloud-free NDVI observations per pixel. Lighter = more observations.
    src: ../../assets/projects/hls-vi-pipeline/BioSCape_Count_Valid-1280.jpg
    alt: Map of valid NDVI observation counts across the BioSCape study area
  - title: NDVI outlier points, Pennsylvania
    caption: Anomalous pixels exported to a searchable GeoPackage.
    src: ../../assets/projects/hls-vi-pipeline/PA_Outlier_Gpkg-1280.jpg
    alt: Map of NDVI outlier points across Pennsylvania
---

NASA's [Harmonized Landsat and Sentinel-2](https://hls.gsfc.nasa.gov/) (HLS v2.0) product merges two satellite constellations into one 30 m surface-reflectance record with a 2–3 day revisit. That's powerful for vegetation science, but getting from raw granules to a clean, study-area-wide time series takes a lot of work. This pipeline automates all of it with a single command.

## What it does

- **Acquisition:** queries and downloads only the MGRS tiles a study area needs, adapted from NASA's bulk-download script.
- **Quality masking:** bitwise Fmask decoding with configurable cloud, shadow, snow/ice, water and aerosol flags.
- **Indices:** NDVI, EVI2 and NIRv per granule, written as cloud-masked GeoTIFFs.
- **Time series:** CF-1.8 compliant NetCDF stacks per tile, with sensor metadata.
- **Mosaics and composites:** study-area temporal-mean mosaics, reprojected to a target CRS, plus user-defined seasonal stacks.
- **Outlier detection:** raster summaries and a GeoPackage of anomalous pixels for QA.

## Engineering

Steps 01–03 work one tile at a time to keep peak disk use low. Dask-chunked xarray and streaming rasterio mosaics let the same code run on a state-sized study area (Pennsylvania) and on a biodiversity hotspot (South Africa's Cape Floristic Region). Any subset of steps can be re-run by name, and the whole thing is driven by one config file per project.

## Where it's used

- **NASA BioSCape:** the first building block of the NetCDF phenology datacubes I delivered for this NASA-funded project in South Africa, which were used as model inputs for the project. See the [BioSCape Phenology Explorer](/projects/bioscape-phenology-explorer/).
- **Pennsylvania mountain laurel and rhododendron mapping:** leaf-off composites that separate evergreen understory shrubs from the deciduous canopy.
