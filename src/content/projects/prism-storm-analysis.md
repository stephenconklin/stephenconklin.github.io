---
title: PRISM Storm Analysis
tagline: Python and QGIS tools that total precipitation over any US watershed, for one storm or any run of days, and check the result against rain gauges, streamflow, and snowpack.
group: tools
order: 1
featured: true
status: public
repo: https://github.com/stephenconklin/PRISM_Storm_Analysis
links:
  - label: Open the 3D map full screen
    url: /viz/san-juan-storms-2026/index.html
context: Python and QGIS tools, 2026
role: Design and development
credit: "Precipitation, temperature, and 1991–2020 normals from the PRISM Climate Group, Oregon State University. Watershed boundaries, streamflow, and gauge basins from the USGS (Watershed Boundary Dataset, Water Data API, and NLDI); rain gauges from RCC-ACIS; SNOTEL from NRCS; dams from the National Inventory of Dams."
skills: [pipelines, cartography, web-mapping, docs]
stack: [Python, rasterio, GeoPandas, NumPy, NetCDF CF-1.10, PyQGIS, QML styling, H3, deck.gl, pytest, GitHub Actions, PRISM 800 m]
cover: ../../assets/projects/prism-storm-analysis/hex-storms-both.jpg
thumb: ../../assets/projects/prism-storm-analysis/hex-thumb.jpg
coverAlt: "The San Juan watershed as extruded hexagons for both late-2026 storms together, taller and darker blue where more precipitation fell, highest along the San Juan Mountains in the northeast, with the main towns and rivers"
coverEmbed:
  src: /viz/san-juan-storms-2026/index.html
  title: "3D hex map of the two San Juan River storms, October–November 2026"
coverCaption: "PRISM precipitation over the San Juan River basin for two storms: the remnants of Hurricane Trudy (October 20–27, 2026) and an atmospheric river (November 1–3), averaged into H3 hexagons of about 36 km². Height and color show depth. Drag the slider or click a day's bar to choose any run of days from October 20 to November 4, or pick a storm with the buttons; the totals follow the selection. Hover over a hex for its depth and volume. All of these days are early PRISM releases, which PRISM revises for about six months."
maps:
  - title: "San Juan watershed storms, October 20–November 3, 2026"
    caption: "Both storms together, PRISM days October 20 to November 3, averaged into H3 hexagons of about 36 km², with the main towns and rivers. Height and color show depth: 7.987 km³ of water (range 7.95–8.27 km³), a basin mean of 123.7 mm, and 95% of it rain. These are early PRISM releases, so the totals will shift a little as PRISM revises them. The project page has the interactive 3D version, with a slider for any run of days."
    src: ../../assets/projects/prism-storm-analysis/hex-storms-both.jpg
    alt: "The San Juan watershed as extruded hexagons for October 20 to November 3, 2026, taller and darker blue where more precipitation fell, highest along the San Juan Mountains in the northeast, with smaller peaks near Monticello and east of Chinle, and towns from Kayenta to Pagosa Springs and the San Juan River and its tributaries"
figureSets:
  - title: "What a run produces"
    placement: top
    intro: "One basin, one storm window. The San Juan River basin (HUC 1408), 64,558 km² across four states, for the first of its two storms, the remnants of Hurricane Trudy in late October 2026."
    numbered: true
    figures:
      - title: "Storm report"
        caption: "A self-contained HTML report opens with the totals, here for Trudy: 4.685 km³ of water (range 4.65–4.92 km³), a basin mean of 72.6 mm, and 944% of normal for those days. Its charts follow, each with its data table."
        src: ../../assets/projects/prism-storm-analysis/report-header.jpg
        alt: "The top of the storm report: tiles for storm volume, basin mean, PRISM release, percent of normal, snow share, and QC status"
        link: { href: /reports/san-juan-2026/storm_report_20261020_20261027.html, label: "Open the full report" }
      - title: "QGIS project"
        caption: "A styled QGIS project builds itself from the outputs: storm totals, daily grids, subbasins, rain gauges, and USGS gauges in organized groups."
        src: ../../assets/projects/prism-storm-analysis/qgis-project.jpg
        alt: "QGIS with the San Juan storm project open: the layers panel grouped into validation, storm totals, daily precipitation, and boundaries, and the precipitation map with gauges"
      - title: "Where it fell"
        caption: "Depth and volume for every HUC10 subbasin. The Navajo River subbasin took the most water, 2.8% of the basin's total."
        src: ../../assets/projects/prism-storm-analysis/map-subbasins.jpg
        alt: "Map of the San Juan basin's HUC10 subbasins shaded by storm depth, darkest along the eastern edge, with volume labels"
  - title: "Two storms, one basin"
    intro: "The same map for each storm and for both together. The volumes are the run's totals, with ranges that combine the gauge comparison, the basin boundary, and PRISM's revisions; every day here is still an early PRISM release."
    numbered: true
    figures:
      - title: "Trudy, October 20–27"
        caption: "The remnants of Hurricane Trudy: 4.685 km³ of water (range 4.65–4.92 km³), a basin mean of 72.6 mm, over eight PRISM days."
        src: ../../assets/projects/prism-storm-analysis/hex-storm-trudy.jpg
        alt: "Hex map of the San Juan basin for October 20–27, with the tallest, darkest columns along the San Juan Mountains in the northeast"
      - title: "Nov 1 storm, November 1–3"
        caption: "An atmospheric river, with no named tropical system behind it: 2.833 km³ (range 2.83–3.17 km³), a basin mean of 43.9 mm, and 93% rain."
        src: ../../assets/projects/prism-storm-analysis/hex-storm-nov1.jpg
        alt: "Hex map of the San Juan basin for November 1–3, tallest along the San Juan Mountains, with a smaller cluster of taller columns east of Chinle"
      - title: "Both storms, October 20–November 3"
        caption: "7.987 km³ (range 7.95–8.27 km³), a basin mean of 123.7 mm, and 95% rain. The quiet days between the storms add rain that fell mostly on October 31, outside either storm window."
        src: ../../assets/projects/prism-storm-analysis/hex-storms-both.jpg
        alt: "Hex map of the San Juan basin for October 20 to November 3, with tall columns across the northeast and moderate ones across the rest of the basin"
  - title: "Day by day"
    intro: "Single PRISM days from the same map, each the 24 hours ending at 12:00 UTC on its date: 6 a.m. to 6 a.m. MDT, then 5 a.m. to 5 a.m. MST after the November 1 time change. Each view scales its columns and colors to that day's wettest hex, so the captions, not the heights, compare the days."
    numbered: true
    figures:
      - title: "October 22"
        caption: "Trudy arrives: rain across most of the basin, heaviest in the west and over the mountains, with a basin mean of 25.2 mm."
        src: ../../assets/projects/prism-storm-analysis/hex-oct22.jpg
        alt: "Hex map of the San Juan basin for October 22, with moderate columns across the basin and taller ones along the western and northern edges"
      - title: "October 23"
        caption: "Trudy's wettest day, with a basin mean of 31.4 mm, heaviest along the San Juan Mountains. The San Juan at Pagosa Springs crested that day."
        src: ../../assets/projects/prism-storm-analysis/hex-oct23.jpg
        alt: "Hex map for October 23, with the tallest, darkest columns along the northeastern edge of the basin"
      - title: "October 25"
        caption: "A second, smaller pulse over the mountains after a lull: a basin mean of 10.2 mm."
        src: ../../assets/projects/prism-storm-analysis/hex-oct25.jpg
        alt: "Hex map for October 25, with tall columns in the northeast and low, pale ones across the rest of the basin"
      - title: "November 2"
        caption: "The wettest single day of both storms: a basin mean of 33.1 mm and 2.137 km³ of water in one PRISM day, heaviest along the San Juan Mountains, with a smaller peak east of Chinle."
        src: ../../assets/projects/prism-storm-analysis/hex-nov02.jpg
        alt: "Hex map for November 2, with tall columns along the northeastern edge and a smaller cluster east of Chinle"
  - title: "Checking the numbers"
    intro: "A gridded total is an estimate. Each run compares it with what was measured on the ground, then reports the volume with a range instead of a single number. These checks are from the report for the November 1–3 storm; all three days are still PRISM's first release. Each chart opens at its place in that report."
    figures:
      - title: "When it fell, and how the rivers answered"
        caption: "Basin precipitation per PRISM day, split into rain and snow, above 15-minute discharge at four USGS gauges. In local time (MST), the San Juan at Pagosa Springs peaked at 11,200 cfs on the evening of November 1, the Animas at Durango at 13,000 cfs the next morning, and the San Juan at Four Corners at 35,300 cfs on the evening of November 3. The shaded area above the baseflow line is the event runoff."
        src: ../../assets/projects/prism-storm-analysis/chart-timeline.jpg
        alt: "Daily basin precipitation bars for November 1–3, tallest at 33 mm on November 2, above discharge curves for the San Juan at Pagosa Springs, the Animas at Durango, and the San Juan at Four Corners and near Bluff, each rising between November 2 and 4"
        link: { href: /reports/san-juan-2026/storm_report_20261101_20261103.html#timeline, label: "Open in the report" }
      - title: "PRISM against rain gauges"
        caption: "Storm totals at 73 gauges in the basin and a 10 km buffer. PRISM runs 1.3% below the gauges overall, with r = 0.96, and 10.6% below the six gauges it did not use. Most gauges are PRISM inputs, so the overall agreement is optimistic; the independent gauges are the fairer test."
        src: ../../assets/projects/prism-storm-analysis/chart-gauges.jpg
        alt: "Scatter plot of PRISM storm totals against gauge totals from 30 to 105 mm, clustered along the 1:1 line, with a few independent gauges below it"
        link: { href: /reports/san-juan-2026/storm_report_20261101_20261103.html#gauges, label: "Open in the report" }
      - title: "Where the water went"
        caption: "Runoff ratio at 30 USGS gauges in the basin, colored by how much dam storage sits upstream. Unregulated mountain streams returned the most, 0.38 at Pagosa Springs; the regulated main stem returned under 0.1. The thin lines divide runoff by rain only, leaving out snow. The flow record still ends before the recession is over, so these ratios will be rerun."
        src: ../../assets/projects/prism-storm-analysis/chart-runoff.jpg
        alt: "Runoff ratio ranges for 30 gauges, low for gauges below large reservoirs and higher for unregulated mountain streams, with rain-only ratios well above the all-precipitation ratios near Silverton"
        link: { href: /reports/san-juan-2026/storm_report_20261101_20261103.html#runoff, label: "Open in the report" }
      - title: "Rain or snow"
        caption: "PRISM's rain and snow split, from daily mean temperature, against the snow-water gained at 25 SNOTEL stations. The gain is a lower bound, since some snow melts, and PRISM's snow comes to 1.37 times the observed gain."
        src: ../../assets/projects/prism-storm-analysis/chart-snow.jpg
        alt: "Snow share of precipitation against station elevation, mostly under 20% below 2,900 m and 20% to 90% above 3,250 m, with PRISM's split above the observed share at most stations"
        link: { href: /reports/san-juan-2026/storm_report_20261101_20261103.html#snow, label: "Open in the report" }
      - title: "Volume and its uncertainty"
        caption: "The range combines the gauge comparison and the basin boundary: 2.83 to 3.17 km³ around the reported 2.833 km³. Nearly all of it comes from the independent gauges, where PRISM ran low. Revisions are not assessed yet, since no day has a second release."
        src: ../../assets/projects/prism-storm-analysis/chart-uncertainty.jpg
        alt: "Bars showing each uncertainty component: gauges from +0% to +11.8%, the boundary near zero, revisions and other products not assessed, and a total range from +0% to +11.9% of the reported volume"
        link: { href: /reports/san-juan-2026/storm_report_20261101_20261103.html#uncertainty, label: "Open in the report" }
---

<div class="part-overview">

How much water fell on a watershed during a storm? PRISM, Oregon State University's gridded climate dataset, gives daily precipitation on an 800 m grid for the whole country. These tools take a watershed code or any outline and a range of dates, download and clip each day's grid, and add up the depth and the volume of water that fell, cell by cell.

The first use was the San Juan River basin (HUC 1408, 64,558 km²) in late 2026, when two storms crossed it about ten days apart. The remnants of Hurricane Trudy brought rain for most of October 20–27, and the San Juan at Pagosa Springs crested on October 23: 4.685 km³ of water, about 3.8 million acre-feet, with a basin mean of 72.6 mm. An atmospheric river followed on November 1–3 with another 2.833 km³ and a basin mean of 43.9 mm, nearly all of it rain; November 2 alone delivered 2.137 km³. From October 20 to November 3 the basin took 7.987 km³ in all, a mean of 123.7 mm. These are early PRISM releases, which PRISM revises for about six months, so the totals will move a little.

The 3D map above shows both storms as H3 hexagons. Its slider totals any run of days, from a single day to the whole sixteen.

## How it works

Each day's PRISM grid is downloaded once and cached, clipped to the basin on its native grid, and stacked into a NetCDF cube. Volumes use each cell's true area on the ellipsoid, so nothing is reprojected or resampled before the totals. Any window inside the cube can then be totaled by date, by HUC10 or HUC12 subbasin, or split into rain and snow with PRISM's daily mean temperature.

Every run ends with quality checks on completeness, grid consistency, physical limits, and whether the totals reconcile. It also writes a manifest of what was downloaded and produced, with checksums. PRISM revises each day's grid up to eight times over about six months, so a refresh downloads only the days with a newer release and records how much each revision moved the total.

</div>

<div class="part-details">

## Checked against the ground

The comparisons use data that PRISM's grids don't: rain gauges from COOP, CoCoRaHS, airports, and SNOTEL, 15-minute streamflow at every USGS gauge in the basin, and snow-water gained at SNOTEL stations. Gauges whose basins hold large reservoirs are flagged, since a dam can store most of a storm's runoff. The whole workflow was also run on three very different basins, the Upper Skagit in Washington and British Columbia, the Elkhorn in Nebraska, and the Upper St. Johns in Florida, to test borders, time zones, flat wetlands, and canals.

## Code and tests

The tools are command-line Python scripts with offline tests that run on GitHub Actions. They work for any watershed in the contiguous US, chosen by name, by USGS hydrologic unit code, or from any polygon file. The code is on [GitHub](https://github.com/stephenconklin/PRISM_Storm_Analysis).

</div>
