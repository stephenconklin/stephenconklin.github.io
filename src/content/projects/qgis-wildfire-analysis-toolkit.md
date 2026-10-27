---
title: Wildfire Analysis Toolkit
tagline: A QGIS plugin that goes from a fire perimeter and dates to calibrated satellite imagery, MTBS-style burn severity, area summaries, a map, and a report.
group: qgis
order: 1
featured: true
status: upcoming
context: QGIS plugin, 2026 (version 2.0 in development)
role: Design and development
skills: [qgis-dev, remote-sensing, cartography, pipelines]
stack: [PyQGIS, GDAL, numpy, NASA HLS v2.0, Microsoft Planetary Computer (STAC), Landsat C2 L2, Sentinel-2 L2A, MTBS]
cover: ../../assets/projects/qgis-wildfire-analysis-toolkit/lead-postfire-falsecolor.jpg
coverAlt: "Post-fire false-color satellite image of the 2025 Dragon Bravo Fire on the Grand Canyon's North Rim: the burn scar in red-brown against green forest, with the burned area outlined"
coverCaption: "The 2025 Dragon Bravo Fire on the Grand Canyon's North Rim, from NASA HLS imagery. Black line: the burned-area boundary."
coverPanels:
  - src: ../../assets/projects/qgis-wildfire-analysis-toolkit/cover-falsecolor.jpg
    alt: "Post-fire false-color satellite image of the Dragon Bravo Fire: the burn scar in red-brown against green forest, with the burned area outlined"
    caption: "Post-fire false color (shortwave infrared, near-infrared, red), October 2025: burned ground shows red-brown, unburned forest green."
  - src: ../../assets/projects/qgis-wildfire-analysis-toolkit/cover-severity.jpg
    alt: "The toolkit's burn severity classes for the same area: large red high-severity patches in the center of the burn, yellow moderate, and aquamarine low toward the edges"
    caption: "The toolkit's burn severity classes for the same area: red high, yellow moderate, aquamarine low, dark green unburned to low."
figureSets:
  - title: "How it runs"
    placement: top
    intro: "Give the pipeline a fire perimeter and dates; it picks the satellite images, builds the burn-severity layers, loads them into QGIS styled, and writes a report and a print-ready map."
    numbered: true
    figures:
      - title: "Set up"
        caption: "One dialog: the fire perimeter (here from the WFIGS interagency perimeters), name, dates, and assessment type."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/run-1-dialog.png
        alt: "The Burn severity (whole pipeline) dialog in QGIS filled in for the Dragon Bravo Fire, with a help panel listing the pipeline steps"
      - title: "Results in QGIS"
        caption: "Severity classes, dNBR, RdNBR, RBR, post-fire reflectance, and pre/post NBR load styled in one group."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/run-2-qgis.jpg
        alt: "QGIS showing the Dragon Bravo Fire output layers in the Layers panel and the burn-severity classes on the map"
      - title: "Report"
        caption: "Fire record from WFIGS, images, calibration, thresholds, and the severity breakdown, in one HTML report."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/run-3-report.png
        alt: "The burn severity report for the Dragon Bravo Fire, with the fire record table and severity percentages by class"
      - title: "Map"
        caption: "An A4 severity map with legend, scale bar, summary table, and a note of the images and thresholds."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/run-4-map.png
        alt: "A4 burn severity map of the Dragon Bravo Fire produced by the toolkit"
  - title: "From satellite to severity"
    placement: top
    intro: "How burn severity is measured, step by step, for the Dragon Bravo Fire. The Normalized Burn Ratio (NBR) is high for healthy vegetation and drops where fire burned; the difference before and after (dNBR) shows how severely."
    numbered: true
    figures:
      - title: "Pre-fire NBR"
        caption: "October 2024: healthy forest is bright."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/method-1-nbr-pre.jpg
        alt: "Pre-fire Normalized Burn Ratio for the Dragon Bravo area, bright over forest"
      - title: "Post-fire NBR"
        caption: "October 2025: the burned area turns dark."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/method-2-nbr-post.jpg
        alt: "Post-fire Normalized Burn Ratio, dark across the burned area"
      - title: "dNBR"
        caption: "Pre minus post: the bigger the drop, the redder."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/method-3-dnbr.jpg
        alt: "Differenced Normalized Burn Ratio, red where the change was greatest"
      - title: "Severity classes"
        caption: "dNBR classified into MTBS classes: low, moderate, and high."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/method-4-severity.jpg
        alt: "MTBS burn severity classes for the Dragon Bravo Fire"
  - title: "A growing season later"
    intro: "The toolkit runs two kinds of assessment, as MTBS does: one soon after the fire, and an extended one in the next growing season, when the landscape’s response is clearer."
    figures:
      - title: "Initial assessment"
        caption: "Post-fire image September 15, 2025."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/assessment-initial.jpg
        alt: "Initial burn severity assessment of the Dragon Bravo Fire, with large areas of high severity"
      - title: "Extended assessment"
        caption: "Post-fire image June 30, 2026: more of the fire maps as moderate or low."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/assessment-extended.jpg
        alt: "Extended burn severity assessment of the Dragon Bravo Fire a growing season later, with more moderate and low severity"
  - title: "One tool, many fires"
    intro: "The same pipeline, run on fires across Arizona, Utah, and Colorado from 2018 to 2026. Each map shows the MTBS severity classes inside the burned area."
    figures:
      - title: "Mangum Fire, Arizona, 2020"
        caption: "71,448 acres reported."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/fire-mangum.jpg
        alt: "Burn severity map of the 2020 Mangum Fire in Arizona"
      - title: "White Sage Fire, Arizona, 2025"
        caption: "58,985 acres reported."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/fire-white-sage.jpg
        alt: "Burn severity map of the 2025 White Sage Fire in Arizona"
      - title: "Babylon Fire, Utah, 2026"
        caption: "107,189 acres reported. White patches are clouds (non-mapping area)."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/fire-babylon.jpg
        alt: "Burn severity map of the 2026 Babylon Fire in Utah"
      - title: "Ferris Fire, Colorado, 2026"
        caption: "64,881 acres reported."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/fire-ferris.jpg
        alt: "Burn severity map of the 2026 Ferris Fire in Colorado"
      - title: "Gold Mountain Fire, Colorado, 2026"
        caption: "39,747 acres reported."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/fire-gold-mountain.jpg
        alt: "Burn severity map of the 2026 Gold Mountain Fire in Colorado"
      - title: "416 Fire, Colorado, 2018"
        caption: "Burned area drafted from dNBR. White patches are clouds."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/fire-fire-416.jpg
        alt: "Burn severity map of the 2018 416 Fire in Colorado"
      - title: "Elkhorn Fire, Colorado, 2025"
        caption: "298 acres reported, small enough that the 30 m pixels show."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/fire-elkhorn.jpg
        alt: "Burn severity map of the small 2025 Elkhorn Fire in Colorado"
      - title: "Dragon Bravo Fire, Arizona, 2025"
        caption: "145,504 acres reported."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/fire-dragon-bravo.jpg
        alt: "Burn severity map of the 2025 Dragon Bravo Fire in Arizona"
maps:
  - title: "Dragon Bravo Fire, 2025: extended assessment"
    caption: "Next-growing-season image pair."
    src: ../../assets/projects/qgis-wildfire-analysis-toolkit/dragon_extended_map.png
    alt: "Burn severity map of the Dragon Bravo Fire, extended assessment"
  - title: "Dragon Bravo test area with Bright Angel watershed"
    caption: "HLS imagery, thresholds estimated from nearby MTBS fires."
    src: ../../assets/projects/qgis-wildfire-analysis-toolkit/pipeline_map.png
    alt: "Burn severity map of the Dragon Bravo test area"
  - title: "Burn severity by zone"
    caption: "Percent of burned area per class, fire vs. watershed."
    src: ../../assets/projects/qgis-wildfire-analysis-toolkit/chart.png
    alt: "Bar chart comparing burn severity classes for the fire and the Bright Angel watershed"
---

<div class="part-overview">

The toolkit started as a single Processing script. It was built to compare the 2025 **Dragon Bravo Fire** on the North Rim of Grand Canyon National Park with the Bright Angel Creek watershed inside it, and it grew into a full fire analysis pipeline modeled on the USGS/USFS [MTBS QGIS Fire Mapping Tool](https://www.mtbs.gov/qgis-fire-mapping-tool).

## The pipeline

1. **Imagery:** suggests pre- and post-fire image pairs using MTBS rules, then fetches calibrated, cloud-masked NBR for only the area of interest. Sources are NASA HLS, Microsoft Planetary Computer (Landsat back to 1982, Sentinel-2) or locally downloaded scenes.
2. **Severity:** builds dNBR, RdNBR and RBR, measures the unburned offset in a ring outside the fire, can draft a burned-area perimeter when none exists, and classifies into MTBS thematic classes with given or estimated thresholds.
3. **Summary and map:** percent, hectares, and acres per class for the fire and any sub-areas, an HTML report, and an A4 PDF map layout.

One dialog, **Burn severity (whole pipeline)**, runs it all in about two minutes. It can also read fire names and dates directly from NIFC/WFIGS interagency perimeters.

</div>

<div class="part-details">

## Validation

> **Checked against the official maps.** Given the same images, perimeters, and thresholds as MTBS, the federal burn-severity program, the toolkit reproduces MTBS's severity classes with substantial agreement: an average Cohen's kappa of 0.78, where 1 is perfect and 0 is chance.

A validation harness reruns the pipeline on published [MTBS](https://www.mtbs.gov) fires using MTBS's own dates, perimeters, and thresholds, then compares the classes pixel by pixel. Drafted perimeters reach a mean IoU of 0.78 against MTBS perimeters.

## Why it matters

The summary tool alone replaces about a dozen manual GIS steps. And because the toolkit calibrates every scene from its own metadata (Landsat scale factors, Sentinel-2 offsets), the results don't depend on anyone remembering to apply them by hand.

Built only on QGIS's own Processing framework, GDAL, and numpy, with no extra installs. Tested on QGIS 3.44 and 4.2.

</div>
