---
title: Wildfire Analysis Toolkit
tagline: A QGIS plugin that takes an MTBS fire's name, or a fire perimeter and dates, and produces calibrated satellite imagery, MTBS-style burn severity, area summaries, a map, and a report.
group: qgis
order: 1
featured: true
status: public
repo: https://github.com/stephenconklin/QGIS_Wildfire_Analysis_Toolkit
links:
  - label: QGIS plugin repository
    url: https://plugins.qgis.org/plugins/wildfire_analysis_toolkit/
context: QGIS plugin, 2026 (version 2.1)
role: Design and development
skills: [qgis-dev, remote-sensing, cartography, pipelines]
stack: [PyQGIS, GDAL, numpy, NASA HLS v2.0, Microsoft Planetary Computer (STAC), Landsat C2 L2, Sentinel-2 L2A, "USGS MTBS fire records and perimeters, USFS MTBS map and image services"]
icon: ../../assets/projects/qgis-wildfire-analysis-toolkit/icon.png
iconAlt: "Wildfire Analysis Toolkit icon"
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
  - title: "Measuring burn severity"
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
  - title: "Extended assessment"
    intro: "The toolkit runs two kinds of assessment, as MTBS does: one soon after the fire, and an extended one in the next growing season, when the landscape’s response is clearer. MTBS’s own extended assessment of this fire uses a post-fire image from June 20, 2026, close to the June 30 one here."
    figures:
      - title: "Initial assessment"
        caption: "Post-fire image September 15, 2025."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/assessment-initial.jpg
        alt: "Initial burn severity assessment of the Dragon Bravo Fire, with large areas of high severity"
      - title: "Extended assessment"
        caption: "Post-fire image June 30, 2026: more of the fire maps as moderate or low."
        src: ../../assets/projects/qgis-wildfire-analysis-toolkit/assessment-extended.jpg
        alt: "Extended burn severity assessment of the Dragon Bravo Fire a growing season later, with more moderate and low severity"
  - title: "Fires in Arizona, Utah, and Colorado"
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

The toolkit started as a single Processing script. It was built as a companion to a manual burn severity analysis and used to compare the 2025 **Dragon Bravo Fire** on the North Rim of Grand Canyon National Park with the Bright Angel Creek watershed inside it. The toolkit grew into a full fire analysis pipeline modeled on the USGS/USFS [MTBS QGIS Fire Mapping Tool](https://www.mtbs.gov/qgis-fire-mapping-tool).

## The pipeline

1. **Imagery:** suggests pre- and post-fire image pairs using MTBS rules, then fetches calibrated, cloud-masked NBR for only the area of interest. Sources are NASA HLS, Microsoft Planetary Computer (Landsat back to 1982, Sentinel-2) or locally downloaded scenes.
2. **Severity:** builds dNBR, RdNBR and RBR, measures the unburned offset in a ring outside the fire, can draft a burned-area perimeter when none exists, and classifies into MTBS thematic classes with given or estimated thresholds.
3. **Summary and map:** percent, hectares, and acres per class for the fire and any sub-areas, an HTML report, and an A4 PDF map layout.

One dialog, **Burn severity (whole pipeline)**, runs it all in about two minutes. It can also read fire names and dates directly from NIFC/WFIGS interagency perimeters, or start from an MTBS fire's name alone (below).

The plugin has 13 Processing tools in four groups: **Fire records** (Find MTBS fires), **Pipeline** (the whole pipeline and a severity map PDF), **Imagery** (find and fetch HLS, find and fetch Landsat or Sentinel-2 from Planetary Computer, prepare local scenes, and suggest image pairs), and **Severity** (build dNBR, draft a burned-area perimeter, classify severity, and burn severity summary).

## MTBS fire records, fetched automatically

New in version 2.1. [MTBS](https://www.mtbs.gov) (Monitoring Trends in Burn Severity, from USGS and USFS) has mapped more than 31,000 US fires since 1984: 31,514 in its fire records file on November 8, 2026. For each fire it publishes the name, ignition date, assessment type, the pre- and post-fire satellite scenes it used, the dNBR offset, and the analyst's severity thresholds.

The plugin downloads that records file from USGS (about 3.5 MB) the first time it's needed, caches it in the QGIS profile, checks at most once a day for a newer copy, and keeps working offline from the cache. Nobody has to download or load MTBS data by hand.

- **Find MTBS fires** looks up fires by name ("Dragon Bravo 2025"), MTBS fire id, years, or area, and returns the whole MTBS record as perimeters or points.
- **The whole pipeline from a fire's name.** Type an MTBS fire's id, or its name and year, into the *MTBS fire* field of *Burn severity (whole pipeline)* and leave everything else empty. The pipeline fetches the fire's perimeter, uses MTBS's own image dates and assessment type, applies MTBS's thresholds (adjusted to this image pair's unburned offset), and compares the result with MTBS's published classes. The Tunnel Fire (Arizona, 2022, 17,641 acres), run from its fire id alone, took 23 seconds to about 3.5 minutes, depending on the imagery servers, and agreed with MTBS's published classes on 87% of pixels (Cohen's kappa 0.75).
- **Your own perimeter, matched to its record.** A perimeter you give is matched to its MTBS record automatically: a NIFC/WFIGS perimeter by its IRWIN incident id, any other by an MTBS fire inside it that ignited between the fire's dates.
- **Perimeters.** They come from the USFS MTBS map service. The newest fires, from the last year or so, are only in the full USGS perimeter file; for those you can allow a one-time 420 MB download, which is then cached.
- **Imagery.** MTBS's image pair comes from NASA HLS when HLS has those scenes. When it lacks one (a missing tile, or Landsat 4–7) or its search service is down, both scenes come from Microsoft Planetary Computer, so a pair is always processed the same way. Sentinel-2C scenes, which MTBS uses for 2025 fires such as Dragon Bravo, are supported.
- **Threshold estimates.** For fires MTBS hasn't mapped, nearby-fire threshold estimates now come from the cached records. They're more current than the map service (420 fires from 2025 on, against 90 there) and no longer depend on it staying up.

<!-- Screenshot placeholder: the Burn severity (whole pipeline) dialog with only the MTBS fire field filled in. Goes here, after the list above. -->

<!-- Screenshot placeholder: Find MTBS fires results on the map. Goes here, with the Find MTBS fires item above or beside the dialog screenshot. -->

### Dragon Bravo, from its name

MTBS has now published the Dragon Bravo Fire (AZ3623811210320250704): an extended assessment from Sentinel-2B (June 20, 2025) and Sentinel-2C (June 20, 2026) scenes, 148,455 acres, with thresholds of 66, 216, and 471 (dNBR × 1000). From its name alone, "Dragon Bravo 2025", the pipeline fetched MTBS's perimeter (from the one-time 420 MB file), took MTBS's own Sentinel-2B and Sentinel-2C scenes from Microsoft Planetary Computer (NASA HLS lacks one of the tiles MTBS used for that date), and applied MTBS's thresholds. In about three minutes it classified the 148,539 acres as 8.6% unburned to low, 27.4% low, 40.6% moderate, and 23.4% high. MTBS hasn't yet published its class map for 2025 fires, so there's no pixel comparison for this fire yet.

<!-- Screenshot placeholder: the report's MTBS record and comparison section. Goes here, after the Dragon Bravo paragraph. -->

</div>

<div class="part-details">

## Validation

> **Checked against the official maps.** Given the same images, perimeters, and thresholds as MTBS, the federal burn-severity program, the toolkit reproduces MTBS's severity classes with substantial agreement: an average Cohen's kappa of 0.775 across 17 fires, where 1 is perfect and 0 is chance.

A validation harness reruns the pipeline on published [MTBS](https://www.mtbs.gov) fires using MTBS's own dates, perimeters, and thresholds, then compares the classes pixel by pixel.

- **17 fires over 15,000 acres** in Arizona, New Mexico, Colorado, and Utah, 2022–2024, from NASA HLS: mean kappa 0.775 (range 0.711–0.864), 88.7% of pixels in the same class, and at least 99.8% within one class.
- **6 fires from 2000–2012**, from Planetary Computer Landsat: mean kappa 0.69.
- **Estimated thresholds**, for fires MTBS hasn't mapped, are a starting point: kappa about 0.56 with the plain nearby-fire median on the 17 fires, and 0.61 with the offset adjustment on 21 fires.
- **Drafted perimeters**: mean IoU 0.69–0.73 against 18 MTBS perimeters with a fixed threshold, and 0.78 with the offset-aware draft inside a generous outline.

## Calibration and time saved

The summary tool alone replaces about a dozen manual GIS steps. And because the toolkit calibrates every scene from its own metadata (Landsat scale factors, Sentinel-2 offsets), the results don't depend on anyone remembering to apply them by hand.

Built only on QGIS's own Processing framework, GDAL, and numpy, with no extra installs. Tested on QGIS 3.44 and 4.2.

## Get it

[Version 2.1.2](https://github.com/stephenconklin/QGIS_Wildfire_Analysis_Toolkit/releases/tag/v2.1.2) is in the [QGIS plugin repository](https://plugins.qgis.org/plugins/wildfire_analysis_toolkit/), free and open source under GPL-2.0-or-later. It needs QGIS 3.44 or later, including QGIS 4.

Install it in QGIS from **Plugins › Manage and Install Plugins** by searching for "Wildfire Analysis Toolkit" and clicking **Install Plugin**. The code, README, and issue tracker are on [GitHub](https://github.com/stephenconklin/QGIS_Wildfire_Analysis_Toolkit).

</div>
