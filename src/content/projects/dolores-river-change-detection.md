---
title: Dolores River Geomorphic Change Detection
tagline: An interactive 3D web map of drone-measured erosion and deposition after a dam-release flood in Southwest Colorado.
group: webmap
order: 1
featured: true
status: public
repo: https://github.com/stephenconklin/Dolores_River_Geomorphic_Change_Detection
links:
  - label: Live map
    url: https://conklingeospatial.com/Dolores_River_Geomorphic_Change_Detection/
context: Fort Lewis College, DRAMS project data, 2026
role: Web map design and development; tile processing
credit: Drone survey data (orthomosaic, DSMs, change raster) from research by Jonathan Harvey, Ph.D., Fort Lewis College, collected for the DRAMS project. All rights to the data remain with its owners.
skills: [web-mapping, terrain, cartography]
stack: [MapLibre GL JS, GDAL, Python (rasterio, numpy, SciPy, Pillow), Terrarium tiles, WebP tiles, AWS Terrain Tiles, Esri World Imagery]
cover: ../../assets/projects/dolores-river-change-detection/oblique.jpg
coverAlt: 3D view of the Dolores River survey reach with erosion in red and deposition in blue draped over the drone imagery
figureSets:
  - title: "Comparing settings: what the change layer adds"
    intro: "The same top-down view of the flood bar, with and without the elevation-change layer."
    figures:
      - title: "Drone imagery only"
        caption: "February 2024 orthomosaic, change layer off."
        src: ../../assets/projects/dolores-river-change-detection/controls/imagery-only.jpg
        alt: "Top-down drone image of the Dolores River bar with the change layer turned off"
      - title: "Change layer on (default settings)"
        caption: "Red and orange is erosion, blue and purple is deposition."
        src: ../../assets/projects/dolores-river-change-detection/controls/default.jpg
        alt: "The same view with elevation change colored: erosion in the channel at top right, deposition across the bar"
  - title: "Hiding change within measurement uncertainty"
    intro: "Small differences between two drone surveys are mostly measurement error, not real change. The minimum level of detection hides everything smaller than a threshold you choose."
    figures:
      - title: "Nothing hidden (0 cm)"
        caption: "A blanket of tiny “changes”, mostly survey noise, buries the real pattern."
        src: ../../assets/projects/dolores-river-change-detection/controls/lod-0.jpg
        alt: "Change map with no threshold: the whole bar is covered in small yellow changes"
      - title: "Default: ±20 cm hidden"
        caption: "Change smaller than ±20 cm falls within the surveys’ uncertainty and is hidden."
        src: ../../assets/projects/dolores-river-change-detection/controls/default.jpg
        alt: "Change map with a 20 cm threshold: noise removed, erosion and deposition patterns clear"
      - title: "Only change over ±50 cm"
        caption: "What remains is the scoured channel and the thickest deposits."
        src: ../../assets/projects/dolores-river-change-detection/controls/lod-50.jpg
        alt: "Change map with a 50 cm threshold: only the strongest erosion and deposition remain"
  - title: "Setting the stretch (the color ramp’s min and max)"
    intro: "The stretch decides which amount of change gets the strongest colors. Change beyond it takes the end colors."
    figures:
      - title: "±0.5 m stretch"
        caption: "Subtle change stands out, but large change all looks the same."
        src: ../../assets/projects/dolores-river-change-detection/controls/range-0.5.jpg
        alt: "Change map stretched to plus or minus 0.5 m: saturated reds and purples"
      - title: "Default: ±1.5 m"
        caption: "About 90% of the shown change falls within the stretch."
        src: ../../assets/projects/dolores-river-change-detection/controls/default.jpg
        alt: "Change map stretched to plus or minus 1.5 m"
      - title: "±2 m stretch"
        caption: "The full range of the data, but most erosion (median 0.37 m) turns pale."
        src: ../../assets/projects/dolores-river-change-detection/controls/range-2.jpg
        alt: "Change map stretched to plus or minus 2 m: pale colors"
  - title: "Choosing colors"
    intro: "Four diverging ColorBrewer ramps, all centered on zero: warm for erosion, cool for deposition."
    figures:
      - title: "Spectral (default)"
        caption: "The widest range of hues."
        src: ../../assets/projects/dolores-river-change-detection/controls/default.jpg
        alt: "Change map in the Spectral color ramp"
      - title: "Red–Blue"
        caption: "A classic two-color diverging ramp, generally easier for colorblind viewers."
        src: ../../assets/projects/dolores-river-change-detection/controls/ramp-RdBu.jpg
        alt: "Change map in the Red–Blue color ramp"
      - title: "Brown–Teal"
        caption: "Earth tones, also generally colorblind-friendly."
        src: ../../assets/projects/dolores-river-change-detection/controls/ramp-BrBG.jpg
        alt: "Change map in the Brown–Teal color ramp"
maps:
  - title: 3D view of the survey reach
    caption: Elevation change draped on the February 2024 drone orthomosaic and DSM. Red is erosion, blue is deposition.
    src: ../../assets/projects/dolores-river-change-detection/oblique.jpg
    alt: Oblique 3D view of the river bend with elevation change colored over drone imagery
  - title: DSM of difference, February 2024 − April 2023
    caption: Top-down view of the whole reach. ±0.2 m level of detection, ±1.5 m stretch.
    src: ../../assets/projects/dolores-river-change-detection/overview.jpg
    alt: Top-down map of elevation change along the Dolores River survey reach
  - title: Looking across the bend
    caption: The scoured channel and new deposits from the opposite side, with 3D terrain.
    src: ../../assets/projects/dolores-river-change-detection/reverse.jpg
    alt: Reverse-angle 3D view of the river bend showing erosion and deposition
---

In spring 2023, a heavy winter snowpack forced a large flood release from McPhee Dam down the Dolores River. Drone surveys flown before (April 2023) and after (February 2024) the release capture the reshaping of the channel at centimeter resolution. This map lets anyone explore that change in 3D.

## What you can do

- Toggle the **elevation-change layer**: the post-flood DSM minus the pre-flood DSM, with a selectable color ramp and stretch and an adjustable minimum level of detection.
- Fly over the reach in **3D**, with the February 2024 drone orthomosaic draped over the drone DSM.
- Switch basemaps between Esri World Imagery and OpenFreeMap.

## Seeing real change, not noise

Two drone surveys never line up perfectly, so a raw elevation difference is full of small, false changes. The map's panel gives you the controls to separate real change from noise:

- **Hide change smaller than ± X cm.** The minimum level of detection, 20 cm by default. Change smaller than this falls within the surveys' measurement uncertainty and is hidden.
- **Range (the stretch).** Sets the minimum and maximum of the color ramp: ±0.5, ±1, ±1.5 (default) or ±2 m. A narrow stretch makes subtle change stand out; a wide one shows the full range but washes out the rest.
- **Color ramp.** Four diverging ramps (Spectral, Red–Blue, Brown–Teal, Red–Yellow–Blue), all centered on zero.
- **Always excluded:** change beyond ±2 m, which is likely survey artifacts rather than real change.
- **Opacity and terrain:** fade the change layer or the drone imagery, and exaggerate the terrain.

The comparisons below show the same view under different settings.

## Engineering

- **Change values are colored in the browser, not baked in.** The change raster is encoded as Terrarium tiles (zoom 14–21) and colored by a MapLibre `color-relief` layer, so the ramp, stretch and detection threshold are all live controls.
- **Merged terrain:** MapLibre allows only one terrain source, so a custom `sitedem://` protocol serves the 1.8 cm drone DSM inside the survey area and falls back to AWS Terrain Tiles everywhere else.
- **No build step:** plain HTML and ES modules with a pinned MapLibre version, hosted on GitHub Pages.

Source rasters are 1.5–1.8 cm cells in NAD83(2011) / UTM 12N, tiled with GDAL and custom Python scripts.
