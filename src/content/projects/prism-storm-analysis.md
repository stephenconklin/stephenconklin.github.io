---
title: PRISM Storm Analysis
tagline: Python and QGIS tools that total a storm's precipitation over any US watershed and check the result against rain gauges, streamflow, and snowpack.
group: tools
order: 1
featured: true
status: upcoming
links:
  - label: Open the 3D map full screen
    url: /viz/san-juan-storm-h3/index.html
context: Python and QGIS tools, 2026
role: Design and development
credit: "Precipitation, temperature, and 1991–2020 normals from the PRISM Climate Group, Oregon State University. Watershed boundaries, streamflow, and gauge basins from the USGS (Watershed Boundary Dataset, Water Data API, and NLDI); rain gauges from RCC-ACIS; SNOTEL from NRCS; dams from the National Inventory of Dams."
skills: [pipelines, cartography, web-mapping, docs]
stack: [Python, rasterio, GeoPandas, NumPy, NetCDF CF-1.10, PyQGIS, QML styling, H3, deck.gl, pytest, GitHub Actions, PRISM 800 m]
cover: ../../assets/projects/prism-storm-analysis/hex-storm-total.jpg
thumb: ../../assets/projects/prism-storm-analysis/hex-thumb.jpg
coverAlt: "The San Juan watershed as extruded hexagons, taller and darker blue where more precipitation fell, highest along the San Juan Mountains in the northeast, with the main towns and rivers"
coverEmbed:
  src: /viz/san-juan-storm-h3/index.html
  title: "3D hex map of the San Juan River storm, October 2026"
coverCaption: "Storm-total precipitation over the San Juan River basin, PRISM days October 20–27, 2026, averaged into H3 hexagons of about 36 km². Height and color show depth, from about 30 mm in the west to over 200 mm along the San Juan Mountains. Choose a day to see the storm move across the basin, and hover over a hex for its depth and volume."
maps:
  - title: "San Juan watershed storm, October 20–27, 2026"
    caption: "Storm-total PRISM precipitation averaged into H3 hexagons of about 36 km², with the main towns and rivers. Height and color show depth: 4.685 km³ of water, from about 30 mm in the west to over 200 mm along the San Juan Mountains. The project page has the interactive 3D version, day by day."
    src: ../../assets/projects/prism-storm-analysis/hex-storm-total.jpg
    alt: "The San Juan watershed as extruded hexagons, taller and darker blue where more precipitation fell, highest along the San Juan Mountains in the northeast, with towns from Kayenta to Pagosa Springs and the San Juan River and its tributaries"
figureSets:
  - title: "What a run produces"
    placement: top
    intro: "One basin, one storm window. The San Juan River basin (HUC 1408), 64,558 km² across four states, for the storm of late October 2026."
    numbered: true
    figures:
      - title: "Storm report"
        caption: "A self-contained HTML report opens with the totals: 4.685 km³ of water, a basin mean of 72.6 mm, and 944% of normal for those days."
        src: ../../assets/projects/prism-storm-analysis/report-header.jpg
        alt: "The top of the storm report: tiles for storm volume, basin mean, PRISM release, percent of normal, snow share, and QC status"
      - title: "QGIS project"
        caption: "A styled QGIS project builds itself from the outputs: storm totals, daily grids, subbasins, rain gauges, and USGS gauges in organized groups."
        src: ../../assets/projects/prism-storm-analysis/qgis-project.jpg
        alt: "QGIS with the San Juan storm project open: the layers panel grouped into validation, storm totals, daily precipitation, and boundaries, and the precipitation map with gauges"
      - title: "Where it fell"
        caption: "Depth and volume for every HUC10 subbasin. The Navajo River subbasin took the most water, 2.8% of the basin's total."
        src: ../../assets/projects/prism-storm-analysis/map-subbasins.jpg
        alt: "Map of the San Juan basin's HUC10 subbasins shaded by storm depth, darkest along the eastern edge, with volume labels"
  - title: "Day by day"
    intro: "The same hex map for four PRISM days, each the 24 hours ending at 12:00 UTC on its date, on one shared scale. The storm built over the San Juan Mountains, paused, and came back."
    numbered: true
    figures:
      - title: "October 22"
        caption: "Rain across most of the basin, heaviest in the west and over the mountains: a basin mean of 25 mm."
        src: ../../assets/projects/prism-storm-analysis/hex-oct22.jpg
        alt: "Hex map of the San Juan basin for October 22, with moderate columns across the basin and taller ones along the western and northern edges"
      - title: "October 23"
        caption: "The wettest day, with 31 mm on average and up to 94 mm in a hex along the San Juan Mountains. The San Juan at Pagosa Springs crested that day."
        src: ../../assets/projects/prism-storm-analysis/hex-oct23.jpg
        alt: "Hex map for October 23, with the tallest, darkest columns along the northeastern edge of the basin"
      - title: "October 24"
        caption: "A lull: 2 mm on average, nearly all of it in the northeast."
        src: ../../assets/projects/prism-storm-analysis/hex-oct24.jpg
        alt: "Hex map for October 24, almost flat and pale across the basin"
      - title: "October 25"
        caption: "A second, smaller pulse over the mountains: 10 mm on average and up to 51 mm in a hex."
        src: ../../assets/projects/prism-storm-analysis/hex-oct25.jpg
        alt: "Hex map for October 25, with medium columns in the northeast and low ones elsewhere"
  - title: "Checking the numbers"
    intro: "A gridded total is an estimate. Each run compares it with what was measured on the ground, then reports the volume with a range instead of a single number."
    figures:
      - title: "When it fell, and how the rivers answered"
        caption: "Basin precipitation per PRISM day above 15-minute discharge at three USGS gauges. The shaded area above the baseflow line is the event runoff."
        src: ../../assets/projects/prism-storm-analysis/chart-timeline.jpg
        alt: "Daily basin precipitation bars peaking at 31 mm on October 23, above discharge curves for the San Juan at Pagosa Springs and the Animas at Durango and Tall Timber"
      - title: "PRISM against rain gauges"
        caption: "Storm totals at 88 gauges in and around the basin. PRISM runs 4% below the gauges overall and 0.5% above the seven gauges it did not use, with r = 0.96."
        src: ../../assets/projects/prism-storm-analysis/chart-gauges.jpg
        alt: "Scatter plot of PRISM storm totals against gauge totals, clustered along the 1:1 line"
      - title: "Where the water went"
        caption: "Runoff ratio at every USGS gauge in the basin, colored by how much dam storage sits upstream. The thin lines divide runoff by rain only, leaving out snow."
        src: ../../assets/projects/prism-storm-analysis/chart-runoff.jpg
        alt: "Runoff ratio ranges for about 30 gauges, low for gauges below large reservoirs and higher for unregulated mountain streams"
      - title: "Rain or snow"
        caption: "PRISM's rain and snow split, from daily mean temperature, against the snow-water gained at 23 SNOTEL stations."
        src: ../../assets/projects/prism-storm-analysis/chart-snow.jpg
        alt: "Snow share of precipitation against station elevation, rising from near zero at 2,600 m to about 60% at 3,500 m, for observed and PRISM values"
      - title: "Volume and its uncertainty"
        caption: "The range combines the gauge comparison, the basin boundary, and PRISM's revisions so far: 4.63 to 4.92 km³."
        src: ../../assets/projects/prism-storm-analysis/chart-uncertainty.jpg
        alt: "Bars showing each uncertainty component, with a total range from -1.3% to +4.9% of the reported volume"
---

<div class="part-overview">

How much water fell on a watershed during a storm? PRISM, Oregon State University's gridded climate dataset, gives daily precipitation on an 800 m grid for the whole country. These tools take a watershed code or any outline and a range of dates, download and clip each day's grid, and add up the depth and the volume of water that fell, cell by cell.

The first use was the San Juan River storm of late October 2026, when rain fell for most of a week and the San Juan at Pagosa Springs crested on October 23. Over the eight PRISM days of October 20–27, the basin took 4.685 km³ of water, about 3.8 million acre-feet, with a mean of 72.6 mm and up to 228 mm in a single cell.

## How it works

Each day's PRISM grid is downloaded once and cached, clipped to the basin on its native grid, and stacked into a NetCDF cube. Volumes use each cell's true area on the ellipsoid, so nothing is reprojected or resampled before the totals. Any window inside the cube can then be totaled by date, by HUC10 or HUC12 subbasin, or split into rain and snow with PRISM's daily mean temperature.

Every run ends with quality checks on completeness, grid consistency, physical limits, and whether the totals reconcile. It also writes a manifest of what was downloaded and produced, with checksums. PRISM revises each day's grid up to eight times over about six months, so a refresh downloads only the days with a newer release and records how much each revision moved the total.

</div>

<div class="part-details">

## Checked against the ground

The comparisons use data that PRISM's grids don't: rain gauges from COOP, CoCoRaHS, airports, and SNOTEL, 15-minute streamflow at every USGS gauge in the basin, and snow-water gained at SNOTEL stations. Gauges whose basins hold large reservoirs are flagged, since a dam can store most of a storm's runoff. The whole workflow was also run on three very different basins, the Upper Skagit in Washington and British Columbia, the Elkhorn in Nebraska, and the Upper St. Johns in Florida, to test borders, time zones, flat wetlands, and canals.

## Built to rerun

The tools are command-line Python scripts with offline tests that run on GitHub Actions. They work for any watershed in the conterminous US, chosen by name, by USGS hydrologic unit code, or from any polygon file. The code will be published on GitHub.

</div>
