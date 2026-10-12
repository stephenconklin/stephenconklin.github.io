---
title: NAIP Harvest M2M
tagline: Bulk NAIP aerial imagery download through the USGS Machine-to-Machine API, with parallel transfers, resume and band extraction.
group: umces
order: 5
status: public
repo: https://github.com/stephenconklin/NAIP-Harvest-M2M
context: UMCES / GCE-SCIPE, 2026
role: Design and development
credit: Written for G. Burch Fisher, Ph.D., Associate Research Scientist, UMCES / GCE-SCIPE.
skills: [pipelines, remote-sensing]
stack: [Python, USGS M2M API, aria2c, GDAL, YAML, conda]
cover: ../../assets/projects/naip-harvest-m2m/dolly-sods-wilderness-footprints.jpg
coverAlt: "Map of the nine NAIP tiles, labeled by tile ID, that NAIP Harvest M2M found and downloaded for the Dolly Sods Wilderness area of interest in West Virginia (orange)"
coverCaption: "The 9 NAIP tiles (dashed, labeled by tile ID) that a test run found for the Dolly Sods Wilderness area of interest in West Virginia (orange): 2020 imagery at 60 cm."
coverInMaps: true
figureSets:
  - title: "How it runs"
    numbered: true
    intro: "One YAML file configures a run; the pipeline finds the scenes, stages them with USGS and reports the download size before anything is transferred, and the results open straight into a GIS."
    figures:
      - title: "Configure"
        caption: "Credentials, area of interest, date ranges, resolution, band extraction, parallel downloads, resume and logging. Every setting can also be overridden on the command line."
        src: ../../assets/projects/naip-harvest-m2m/config-vscode.png
        alt: "The example configuration file open in VS Code, split into two panes"
      - title: "Run: Dolly Sods Wilderness, West Virginia"
        caption: "Loads and reprojects the area of interest, signs in to USGS M2M, finds 9 NAIP scenes for 2020, retrieves their download links and estimates the download size, then asks before downloading."
        src: ../../assets/projects/naip-harvest-m2m/test-run-vscode.png
        alt: "Terminal output of a NAIP Harvest M2M run ending with a download summary of 9 scenes, an estimated size and a proceed prompt"
      - title: "Use: open the results in GIS"
        caption: "The downloads open straight into QGIS: each scene as a 4-band image plus its extracted RGB and near-infrared versions, over the Dolly Sods Wilderness area of interest."
        src: ../../assets/projects/naip-harvest-m2m/qgis-window.jpg
        alt: "QGIS with the nine downloaded NAIP scenes and their RGB and near-infrared versions in the Layers panel, the imagery and Dolly Sods Wilderness outline on the map, and band settings in the Layer Styling panel"
  - title: "Beyond visible light"
    intro: "NAIP records near-infrared as well as color, and the pipeline can extract true-color, near-infrared and color-infrared versions of each scene. The same 2.4 km patch of the Dolly Sods Wilderness, two ways."
    figures:
      - title: "True color"
        caption: "Red, green and blue, as the eye sees it."
        src: ../../assets/projects/naip-harvest-m2m/dolly-sods-truecolor.jpg
        alt: "True-color NAIP image of forest, open heath barrens and a winding stream in the Dolly Sods Wilderness"
      - title: "Color-infrared"
        caption: "Near-infrared shown as red: healthy vegetation glows red, while open heath and bare ground turn pale."
        src: ../../assets/projects/naip-harvest-m2m/dolly-sods-cir.jpg
        alt: "The same area in color-infrared: forest in deep red, open heath in pale cyan, the stream dark"
  - title: "Detail at 60 cm"
    intro: "Each NAIP pixel is 60 cm across, enough to pick out individual trees, a meandering stream and faint trails."
    figures:
      - title: "Close-up, about 1:1,600"
        caption: "A stream meandering through open heath and scattered trees, about 850 m across."
        src: ../../assets/projects/naip-harvest-m2m/dolly-sods-closeup.jpg
        alt: "Close-up NAIP image of a meandering stream through open heath with scattered trees and trails"
maps:
  - title: "NAIP coverage: Dolly Sods Wilderness, West Virginia"
    caption: "The 2020 NAIP imagery (60 cm) downloaded for the Dolly Sods Wilderness area of interest (orange), shown in QGIS. At the left edge the tiles end and the basemap shows through."
    src: ../../assets/projects/naip-harvest-m2m/dolly-sods-coverage.jpg
    alt: "NAIP 2020 aerial imagery mosaic covering the Dolly Sods Wilderness area of interest in West Virginia, outlined in orange, over an OpenStreetMap basemap"
  - title: "Nine scenes, one area of interest"
    caption: "The 9 NAIP quarter-quad tiles the run found (dashed, labeled by tile ID) covering the Dolly Sods Wilderness area of interest (orange)."
    src: ../../assets/projects/naip-harvest-m2m/dolly-sods-wilderness-footprints.jpg
    alt: "Map of nine NAIP tile footprints in a three-by-three grid with tile IDs, over imagery and a basemap, with the Dolly Sods Wilderness boundary in orange"
---

The [National Agriculture Imagery Program](https://www.fsa.usda.gov/programs-and-services/aerial-photography/imagery-programs/naip-imagery/) provides 60 cm–1 m four-band aerial imagery of the continental U.S. Downloading it in bulk for a study area through the USGS EarthExplorer interface is slow and manual. This pipeline does it from the command line.

## Features

- **AOI-driven:** pass a GeoJSON or Shapefile boundary and one or more date ranges.
- **Size estimate first:** reports the scene count and total size, then asks before transferring anything.
- **Fast:** multi-connection, concurrent downloads with aria2c.
- **Checkpoint and resume:** interrupted runs pick up where they left off.
- **Band extraction:** optional GDAL extraction of RGB, NIR or color-infrared subsets.
- Uses the current token-based M2M authentication (the password login was retired in 2025), with a YAML config whose settings can all be overridden on the command line.
