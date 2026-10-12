---
title: VI Phenology
tagline: Per-pixel datacubes, 19 phenological metric maps and model-ready rasters from vegetation index time series.
group: umces
order: 4
featured: true
status: public
repo: https://github.com/stephenconklin/VI_Phenology
links:
  - label: Documentation
    url: https://vi-phenology.readthedocs.io/en/latest/
context: GCE-SCIPE team, UMCES · NASA BioSCape, 2026
role: Pipeline architecture, orchestration and original code
credit: Built in collaboration with G. Burch Fisher, Ph.D., Associate Research Scientist, UMCES / GCE-SCIPE, who provided conceptual guidance and original per-pixel phenology code adapted here.
skills: [timeseries, remote-sensing, pipelines, docs]
stack: [Python, xarray, SciPy, NetCDF CF-1.8, GeoParquet, GeoTIFF, Plotly, Matplotlib]
cover: ../../assets/projects/vi-phenology/g5-15-annual.png
coverAlt: "Annual NDVI phenology for BioSCape flight box G5_15: each year from 2016 to 2025 on one calendar, with the ten-year mean"
figureSets:
  - title: "Phenology plots: one BioSCape flight box"
    intro: "Outputs of the phenology pipeline for LVIS flight box G5_15 in South Africa’s Cape, 2016–2025. Each plot is also produced as an interactive HTML version."
    figures:
      - title: "Ten-year time series"
        caption: "Region-average NDVI observations, the smoothed curve and a ±1 standard deviation band."
        src: ../../assets/projects/vi-phenology/g5-15-timeseries.png
        alt: "NDVI time series for flight box G5_15 from 2016 to 2025 with observations, a smoothed green curve and a shaded band"
      - title: "Annual phenology"
        caption: "Each year’s curve on one calendar, with the ten-year mean (dashed)."
        src: ../../assets/projects/vi-phenology/g5-15-annual.png
        alt: "NDVI by month for each year from 2016 to 2025 overlaid, with a dashed mean curve peaking in July and August"
      - title: "Annual anomaly"
        caption: "How each year departed from the ten-year mean, through the year."
        src: ../../assets/projects/vi-phenology/g5-15-anomaly.png
        alt: "NDVI anomaly by month for each year from 2016 to 2025, varying around zero"
---

The companion to the [HLS Vegetation Index Pipeline](/projects/hls-vi-pipeline/). It reads any CF-1.8 NetCDF with `time × y × x` dimensions and turns raw, irregularly sampled vegetation index observations into phenology science products.

## Four pipelines

| Pipeline | Produces |
|---|---|
| `netcdf_datacube` | Per-pixel CF-1.8 datacubes clipped to study polygons. This is the foundation for everything else. |
| `phenology` | ROI-mean time series, smoothing, phenological metrics, and PNG + interactive HTML plots |
| `pixel_phenology` | 19 per-pixel metric maps: peak, productivity, seasonality, variability, bimodality |
| `datacube_to_geotiff` | Per-year, per-month and per-day-of-year statistics as multi-band GeoTIFFs for downstream models |

## Science choices

- **Smoothing:** Savitzky-Golay, LOESS, harmonic, linear or Whittaker. Whittaker handles HLS's irregular revisit cadence without binning.
- **Metrics:** start, peak and end of season, season length, integrated VI, green-up and senescence rates, plus extended metrics (floor/ceiling NDVI, bimodality, coefficient of variation) taken directly from the smoothed curve, so no biome-specific day-of-year windows are needed.
- **Robust sampling:** fixed per-region pixel samples, NDVI and quality filters, and minimum-observation thresholds keep cloud masking and sparse years from biasing the metrics.

## Scale

Per-pixel work runs in parallel with a sparse SciPy solver that releases Python's GIL. GeoTIFF output is written band by band, so peak memory is one spatial band no matter how large the output is. The per-day-of-year product alone holds 1,095 bands.

## Where it's used

**NASA BioSCape:** VI Phenology builds the CF-1.8 NetCDF datacubes of time-series phenology that I delivered for this NASA-funded project in South Africa, which were used as model inputs for the project. The [BioSCape Phenology Explorer](/projects/bioscape-phenology-explorer/) lets researchers explore them.
