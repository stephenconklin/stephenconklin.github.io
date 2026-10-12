---
title: Pennsylvania Mountain Laurel & Rhododendron Mapping
tagline: Using leaf-off satellite phenology to find evergreen understory shrubs beneath Pennsylvania's deciduous forests.
group: umces
order: 6
status: research
context: UMCES, in cooperation with GCE-SCIPE, 2026, ongoing
role: Research Collaborator
credit: Done in collaboration with G. Burch Fisher, Ph.D., Associate Research Scientist, UMCES / GCE-SCIPE.
skills: [remote-sensing, timeseries, pipelines]
stack: [NASA HLS v2.0, NDVI, double-logistic phenology]
cover: ../../assets/projects/pa-mountain-laurel/pa-overview.jpg
coverAlt: "Map of Pennsylvania on satellite imagery: a leaf-off NDVI mosaic across the state, a grid of white HLS tile outlines, clusters of cyan and green vegetation survey sites, and many small points marking NDVI outliers"
coverCaption: "Leaf-off NDVI across Pennsylvania from NASA HLS (2015\u20132021), with the HLS tiles processed (white), the state boundary (red), vegetation survey sites (cyan and green), and observations the pipeline flagged as NDVI outliers, colored by date. Imagery: Esri World Imagery."
maps:
  - title: "Pennsylvania study area: leaf-off NDVI, survey sites and outliers"
    caption: "Leaf-off NDVI from NASA HLS (2015\u20132021), HLS tiles, vegetation survey sites and NDVI outliers colored by date. Imagery: Esri World Imagery."
    src: ../../assets/projects/pa-mountain-laurel/pa-overview.jpg
    alt: "Map of Pennsylvania on satellite imagery: a leaf-off NDVI mosaic, white HLS tile outlines, cyan and green vegetation survey sites, and NDVI outlier points"
  - title: Predicted mountain laurel / rhododendron cover
    caption: In preparation.
---

Mountain laurel (*Kalmia latifolia*) and rosebay rhododendron are evergreen shrubs that form dense understory thickets across Pennsylvania's forests. They shape forest regeneration, wildlife habitat and fire behavior, but they're hidden under the canopy for most of the year.

The thickets' dense evergreen cover shelters birds and small mammals, especially in winter, so the maps matter beyond botany: ornithologists are using the mountain laurel data to map habitat for particular bird species.

## Approach

When the deciduous canopy drops its leaves, evergreen understory becomes visible to satellites. This project uses the [HLS Vegetation Index Pipeline](/projects/hls-vi-pipeline/) to build statewide **leaf-off** NDVI composites from 2015–2021. It then fits per-pixel phenology curves to separate evergreen shrub signals from the surrounding forest.

## What's next

Ongoing work aims to integrate **TorchGeo** and **GeoAI foundation models**, combined with NDVI and LiDAR, to sharpen species-level identification.
