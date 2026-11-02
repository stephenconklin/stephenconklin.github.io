---
title: "Alpine Lakes: Recreation and Water Quality"
tagline: Does heavier hiker traffic mean more fecal bacteria in alpine lakes? Water sampling at seven lakes in the San Juan Mountains, with trail use measured from activity heatmaps.
group: field
order: 1
status: study
context: Fort Lewis College, 2025
role: Co-investigator, three-person team
credit: "Research by Steve Conklin, Sofie Hill, and Analyn Hoffner, advised by Dr. Kaitlin Mattos, Department of Environment and Sustainability, Fort Lewis College. AllTrails page-view data through the San Juan Mountains Association. Photos by the project team."
skills: [fieldwork, cartography]
stack: [EPA Method 1603.1 (membrane filtration), Compact Dry EC plates, YSI multiparameter meters, ImageJ, Photoshop, ArcGIS Pro, QGIS, R, USGS 3DEP, AllTrails, Strava]
cover: ../../assets/maps/alpine-lakes-results.jpg
coverAlt: "Map of seven alpine lakes around Silverton, Colorado, on shaded relief. Each lake is outlined, with a circle beside it sized by its mean total coliform count and colored by trail use. Papoose Lake, white for no mapped trail use, has the largest circle; the busy Ice Lake and Columbine Lake circles are small."
coverCaption: "Results map: each lake is outlined, with its circle beside it. Circle size is the lake's mean total coliforms, and color is its trail use intensity. The busiest lakes were not the most contaminated."
figureSets:
  - title: "The lakes"
    intro: "Seven lakes from 2,597 to 3,875 m, chosen across three levels of use from AllTrails page views."
    figures:
      - title: "Dollar Lake"
        caption: "Low use: most visitors stop at the overlook above the lake."
        src: ../../assets/projects/alpine-lakes-water-quality/dollar-lake.jpg
        alt: "Dollar Lake in a steep talus bowl, with peaks reflected in still water"
      - title: "Columbine Lake"
        caption: "Highest use, and among the lowest bacteria counts."
        src: ../../assets/projects/alpine-lakes-water-quality/columbine-lake.jpg
        alt: "Columbine Lake's turquoise water below rocky peaks with patches of snow"
  - title: "In the field"
    intro: "Three replicate samples at each lake's inflow and outflow, then water parameters with a YSI meter, logged with GPS."
    figures:
      - title: "Samples and position"
        caption: "Sample tubes labeled by lake and location, with the GPS position recorded at Ice Lake."
        src: ../../assets/projects/alpine-lakes-water-quality/field-gps-samples.jpg
        alt: "A GPS unit between two labeled sample tubes on a rock at Ice Lake"
      - title: "Water parameters"
        caption: "Temperature, pH, dissolved oxygen, conductivity, turbidity, and nitrates, recorded after sampling so the probes wouldn't stir up sediment first."
        src: ../../assets/projects/alpine-lakes-water-quality/field-gps-meter.jpg
        alt: "A GPS unit beside a YSI multiparameter meter showing water readings"
  - title: "In the lab"
    intro: "Each sample was filtered, incubated for 24 hours, and its colonies counted, with results reported per 100 mL."
    numbered: true
    figures:
      - title: "Filter"
        caption: "Vacuum filtration through a 0.45 µm gridded membrane."
        src: ../../assets/projects/alpine-lakes-water-quality/lab-filtration.jpg
        alt: "A vacuum flask filtration setup connected to a small pump on a lab bench"
      - title: "Incubate"
        caption: "The membrane on a Compact Dry EC plate after 24 hours at 36 °C. Blue colonies are E. coli; pink-purple are other coliforms."
        src: ../../assets/projects/alpine-lakes-water-quality/plate-before.jpg
        alt: "An incubated Compact Dry EC plate with many purple and a few blue colonies on a gridded membrane"
      - title: "Count"
        caption: "Each colony marked and counted with ImageJ's multi-point tool."
        src: ../../assets/projects/alpine-lakes-water-quality/plate-counted.jpg
        alt: "The same plate with every colony marked by a colored point in ImageJ"
  - title: "Measuring trail use from heatmaps"
    intro: "Trail counter data weren't available for these lakes, so trail use was measured from AllTrails and Strava heatmaps covering October 2024 to October 2025. Screenshots at a fixed scale were thresholded by color in ImageJ, cleaned into a binary mask, and the trail pixels counted and divided by the trail's length."
    figures:
      - title: "AllTrails heatmap, Ice Lakes"
        caption: "Heatmap: AllTrails (© AllTrails, © Mapbox, © OpenStreetMap)."
        src: ../../assets/projects/alpine-lakes-water-quality/heatmap-alltrails.jpg
        alt: "AllTrails heatmap of the Ice Lakes trail, purple lines on a green topographic map"
      - title: "The trail-use mask"
        caption: "Color thresholding in ImageJ, cleaned in Photoshop: white pixels are trail use."
        src: ../../assets/projects/alpine-lakes-water-quality/heatmap-mask.jpg
        alt: "Black image with the Ice Lakes trail network in white"
      - title: "Strava heatmap, the second source"
        caption: "Heatmap: Strava. The two sources were averaged for each lake."
        src: ../../assets/projects/alpine-lakes-water-quality/heatmap-strava.jpg
        alt: "Strava heatmap of the same trails, blue lines on a gray map"
maps:
  - title: "San Juan Mountain Lake Study Sites"
    caption: "Circle size is a lake's mean total coliforms (CFU/100 mL); color is trail use intensity from AllTrails and Strava heatmaps. USGS 3DEP elevation and OpenStreetMap context; Colorado outline from the U.S. Census Bureau."
    src: ../../assets/maps/alpine-lakes-results.jpg
    alt: "Map of seven alpine lakes around Silverton, Colorado, with circles sized by total coliforms and colored by trail use"
---

Visits to alpine lakes in Colorado's San Juan Mountains keep growing, and with them the worry that human waste is reaching the water. In early October 2025 we sampled seven lakes, from busy day hikes near Silverton to lakes with almost no visitors, to ask whether more trail use means more fecal indicator bacteria.

We designed the study, sampled the lakes, and analyzed the results as a three-person team. My parts: helping lead the planning, much of the fieldwork, the lab work (vacuum filtration, incubation, and colony counts), and the method for measuring trail use from heatmap imagery.

## Fieldwork and lab

- **Sampling.** At each lake's inflow and outflow: three replicate 200 mL water samples, a YSI multiparameter reading, and a 10 by 3 m shoreline belt transect recording trash, tracks, and feces. Plus a field blank and a lab blank per lake.
- **Lab.** Samples were processed within eight hours (with one exception), based on U.S. EPA Method 1603.1 with Compact Dry EC plates: membrane filtration, 24-hour incubation at 36 °C, and colony counts in ImageJ.
- **In all:** 42 lake samples, 84 water-parameter readings, and 14 shoreline transects.

## Measuring trail use

AllTrails page views set the use levels for choosing lakes, but page views aren't visitors. For a measure tied to the ground, I built a method from AllTrails and Strava heatmaps covering October 2024 to October 2025: screenshots at the same scale, ImageJ macros that threshold the heatmap colors into a binary mask, manual cleanup, and a pixel count divided by the trail's length to the lake (pixels per meter). Lake areas and basin slopes came from a USGS 3DEP elevation model in ArcGIS Pro.

## What we found

- **No significant link between trail use and bacteria.** Ice Lake and Columbine Lake, two of the busiest, had *E. coli* below the detection limit in every sample.
- **Papoose Lake stood out.** With no mapped trail use, it had the highest counts: up to 182 CFU/100 mL of *E. coli* and 1,950 of total coliforms, along with abundant wildlife sign, warm water, and no flowing inlet or outlet. It was left out of the statistical analysis as an outlier.
- **Elevation mattered.** Among the other six lakes, each lake's highest single-sample *E. coli* (p = 0.0013) and total coliform (p = 0.0048) counts were significantly related to elevation, with lower counts at higher lakes. The highest total coliform counts were also related to dissolved oxygen (p = 0.0227) and conductivity (p = 0.0426).
- **Recreation limits.** Only one sample, from Papoose Lake's outlet, exceeded the EPA's recreational *E. coli* limit of 126 CFU/100 mL, and every sample was under Colorado's limit of 235. Lake water should still be filtered before drinking.
- **A baseline.** Some of these lakes had no public *E. coli* or coliform records before this study.

The result suggests that ecological conditions such as elevation, wildlife, and water flow may play a larger role in bacteria levels than visitor numbers. Shoreline trash was sparse even at the busiest lakes, which may reflect the stewardship and visitor education already under way.

## Limits

Each lake was sampled once, after the peak summer season, so the results are a snapshot. Seven lakes is a small set, the methods couldn't tell human from animal sources, and heatmaps miss hikers who don't use tracking apps. Repeated sampling through the season, more lakes, microbial source tracking, and trail counter data would test the result further.
