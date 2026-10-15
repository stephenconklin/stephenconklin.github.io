---
title: QGIS Stacked Terrain Builder
tagline: Turns any DEM into offset "stacked paper" terrain art, natively in QGIS, with an ArcGIS Pro export.
group: qgis
order: 2
featured: true
status: public
repo: https://github.com/stephenconklin/QGIS_Stacked_Terrain_Builder
context: QGIS Processing script, 2026
role: Design and development
credit: "Inspired by John Nelson's ArcGIS Pro technique \"Make this AI-inspired topo landscape please\" (Adventures in Mapping), which draws on Tanaka and Pauliny illuminated contours. The Teal-Orange and Lime-Orange ramps are modeled on John Nelson's maps."
skills: [qgis-dev, cartography, terrain]
stack: [PyQGIS, GDAL, QGIS geometry generators, QML styling, ArcGIS Pro .lyrx, Copernicus GLO-30 DEM]
cover: ../../assets/projects/qgis-stacked-terrain-builder/lead-oblique.jpg
coverAlt: "The Grand Canyon around Bright Angel Creek as stacked paper terrain: layered slabs from red rock at the Colorado River up to green forest on the North Rim"
coverCaption: "The Grand Canyon around Bright Angel Creek, from a run for my map of the Dragon Bravo Fire: oblique view, Paper layers style, Grand Canyon Light ramp, shaded faces and a paper texture. Copernicus GLO-30 DEM."
figureSets:
  - title: "How it runs"
    placement: top
    intro: "A DEM in, a styled map out. The tool runs from the QGIS Processing Toolbox, and everything after the run is adjustable on the layer itself."
    numbered: true
    figures:
      - title: "Set up"
        caption: "One dialog: a DEM, an optional outline to clip to, a style, a color ramp, a view and the light. These are the settings of the run above."
        src: ../../assets/projects/qgis-stacked-terrain-builder/run-1-dialog.png
        alt: "The Stacked terrain dialog in QGIS, set to the Copernicus DEM, the Grand Canyon and Kaibab outline, Paper layers, Grand Canyon Light and an oblique view"
      - title: "Results in QGIS"
        caption: "Slabs, shading and paper texture load as one styled group. The style is embedded in the GeoPackage, so the layer opens styled anywhere."
        src: ../../assets/projects/qgis-stacked-terrain-builder/run-2-qgis.jpg
        alt: "QGIS with the stacked terrain group in the Layers panel and the Grand Canyon on the map"
      - title: "Adjust without rerunning"
        caption: "Lift, view and light direction, walls, shadow, edges and ramp are layer variables: change one and the map redraws."
        src: ../../assets/projects/qgis-stacked-terrain-builder/run-3-variables.png
        alt: "The Variables page of the stacked terrain layer's properties, listing the stack_ variables"
      - title: "Use it in a map"
        caption: "Grand Canyon Light runs are the relief under both maps of my Dragon Bravo Fire map."
        src: ../../assets/maps/dragon-bravo-fire.jpg
        alt: "The Dragon Bravo Fire map, with stacked terrain as the relief under the burn severity layers"
  - title: "From DEM to stacked terrain"
    placement: top
    intro: "The same 16 by 10 km of canyon around Bright Angel Creek at each stage. The lifted stages are framed a little further north, because the oblique view moves higher ground up the page."
    numbered: true
    figures:
      - title: "The DEM"
        caption: "Copernicus GLO-30 elevation, shown here as an ordinary hillshade."
        src: ../../assets/projects/qgis-stacked-terrain-builder/method-1-dem.jpg
        alt: "Grayscale hillshade of the Copernicus elevation model for the Bright Angel area"
      - title: "Nested slabs"
        caption: "The DEM is generalized and cut into slabs, each holding all ground at or above its level, colored by elevation."
        src: ../../assets/projects/qgis-stacked-terrain-builder/method-2-slabs.jpg
        alt: "Flat colored elevation bands with pale outlines, before any lift or shading"
      - title: "Lift and walls"
        caption: "Each slab is shifted away from the viewer by its height, and a darker wall shows beneath it."
        src: ../../assets/projects/qgis-stacked-terrain-builder/method-3-lift.jpg
        alt: "The same slabs lifted northward in proportion to their height, with walls showing beneath each one"
      - title: "Shading and paper"
        caption: "A hillshade that follows each slab's lift, plus a paper texture, both blended with Multiply."
        src: ../../assets/projects/qgis-stacked-terrain-builder/method-4-final.jpg
        alt: "The lifted slabs with shaded faces and a paper texture"
  - title: "Two views"
    intro: "Oblique lifts the slabs so their walls show. Nadir keeps every slab in its true position, so the map can still be measured and overlaid, with depth from shadows and lit edges. Same area, same settings otherwise."
    figures:
      - title: "Oblique"
        caption: "Slabs lifted north, walls facing the viewer in the south."
        src: ../../assets/projects/qgis-stacked-terrain-builder/view-oblique.jpg
        alt: "Oblique stacked terrain of the Grand Canyon, slabs lifted with walls showing"
      - title: "Nadir"
        caption: "Slabs in place: depth from shadows falling away from the light and lit edges facing it."
        src: ../../assets/projects/qgis-stacked-terrain-builder/view-nadir.jpg
        alt: "Nadir stacked terrain of the same area, slabs in place with soft shadows"
  - title: "Clipped to any outline"
    narrow: true
    intro: "An optional area of interest clips the slabs exactly to its outline, so the edges follow a park boundary or a watershed instead of the DEM's rectangle."
    figures:
      - title: "Grand Canyon National Park and Kaibab National Forest"
        caption: "Nadir view, clipped to the combined park and forest outline."
        src: ../../assets/projects/qgis-stacked-terrain-builder/clip-gcnp-kaibab.jpg
        alt: "Stacked terrain clipped to the combined outline of Grand Canyon National Park and the Kaibab National Forest"
      - title: "Bright Angel Creek watershed"
        caption: "Nadir view, clipped to the watershed used in my Dragon Bravo Fire map."
        src: ../../assets/projects/qgis-stacked-terrain-builder/clip-bright-angel.jpg
        alt: "Stacked terrain clipped to the Bright Angel Creek watershed"
  - title: "Styles"
    intro: "Three styles set the lift, walls, edges and shadow. Shown on a 16 km square around Bright Angel Canyon with the Spectral ramp."
    figures:
      - title: "Offset slabs"
        caption: "Tall, dark walls: the original offset look."
        src: ../../assets/projects/qgis-stacked-terrain-builder/style_slabs.png
        alt: "Offset slabs style: tall dark walls under every slab"
      - title: "Paper layers"
        caption: "Thin sheets, pale edges, soft shadows."
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_spectral.png
        alt: "Paper layers style: thin sheets with pale edges and soft shadows"
      - title: "Cut card"
        caption: "Thick card, dark edges, deep shadows."
        src: ../../assets/projects/qgis-stacked-terrain-builder/style_card.png
        alt: "Cut card style: dark edges and deep shadows"
      - title: "Cut card, nadir"
        caption: "Slabs in place, depth from shadows."
        src: ../../assets/projects/qgis-stacked-terrain-builder/style_nadir_card.png
        alt: "Cut card in a nadir view: slabs in place, depth from shadows"
  - title: "Nine color ramps"
    intro: "Switch ramps on an existing layer without rerunning. The two Grand Canyon ramps are pinned to real elevations, so their colors mark life zones: red rock at the river, desert scrub and woodland, then forest on the rim."
    figures:
      - title: "Magma"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_magma.png
        alt: "Stacked terrain of Bright Angel Canyon with the Magma ramp"
      - title: "Inferno"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_inferno.png
        alt: "Stacked terrain of Bright Angel Canyon with the Inferno ramp"
      - title: "Plasma"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_plasma.png
        alt: "Stacked terrain of Bright Angel Canyon with the Plasma ramp"
      - title: "Viridis"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_viridis.png
        alt: "Stacked terrain of Bright Angel Canyon with the Viridis ramp"
      - title: "Spectral"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_spectral.png
        alt: "Stacked terrain of Bright Angel Canyon with the Spectral ramp"
      - title: "Teal-Orange"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_teal_orange.png
        alt: "Stacked terrain of Bright Angel Canyon with the Teal-Orange ramp"
      - title: "Lime-Orange"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_lime_orange.png
        alt: "Stacked terrain of Bright Angel Canyon with the Lime-Orange ramp"
      - title: "Grand Canyon"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_grand_canyon.png
        alt: "Stacked terrain of Bright Angel Canyon with the Grand Canyon ramp"
      - title: "Grand Canyon Light"
        src: ../../assets/projects/qgis-stacked-terrain-builder/ramp_grand_canyon_light.png
        alt: "Stacked terrain of Bright Angel Canyon with the Grand Canyon Light ramp"
maps:
  - title: Grand Canyon in stacked relief
    caption: "Oblique view, Paper layers style, Grand Canyon Light ramp, 100 m interval: the Colorado River in red rock at the bottom, side canyons cutting up into the North Rim forest. Copernicus GLO-30 DEM."
    src: ../../assets/projects/qgis-stacked-terrain-builder/canyon-wide.jpg
    alt: "The Grand Canyon as stacked paper terrain in oblique view: the Colorado River winding through red rock, side canyons cutting up into the green forest of the North Rim"
  - title: Below the North Rim
    caption: "A 30 km view: side canyons drop from the forest on the Kaibab Plateau to the Colorado River."
    src: ../../assets/projects/qgis-stacked-terrain-builder/canyon-north-rim.jpg
    alt: "Oblique stacked paper terrain of side canyons below the North Rim of the Grand Canyon, green forest above and red rock toward the river"
  - title: The western edge
    caption: "Where the park and forest outline clips the slabs, the paper layers show in profile along the edge."
    src: ../../assets/projects/qgis-stacked-terrain-builder/canyon-west-edge.jpg
    alt: "Oblique stacked paper terrain at the western end of the area, with the layered edges of the clipped slabs visible along the boundary"
---

<div class="part-overview">

Each elevation level becomes a solid slab laid over the ones below it, so the landscape reads like layers of cut paper. Pick a view, a light direction, one of three styles and one of nine color ramps, and the tool does the rest: no manual contouring, no hand-built symbology.

## How it works

The DEM is averaged to a coarser grid, which gives soft, sinuous outlines instead of noise, and GDAL cuts it into contour bands. Each band is then rebuilt as a true **nested slab**, all ground at or above that level, so lifted slabs never leave gaps at the map edge. Outlines are smoothed and then simplified, which makes the layer about ten times lighter to draw.

All the styling is one QGIS **geometry generator** that offsets each slab by its elevation and draws its highlight, wall, shadow and face. Shaded faces can't use an ordinary hillshade, because every slab is shifted by its own lift. Instead, the tool pastes hillshade under each slab at that slab's lifted position, the same way the renderer stacks them.

</div>

<div class="part-details">

## Built to travel

Each run gets its own folder: a GeoPackage with the style embedded, sidecar styles, and a `.qlr` layer file that drops the whole stack into another project in the right order. An optional **ArcGIS Pro export** writes a matching `.lyrx`, with the lift and walls built into the geometry, since Pro's symbols can't do what the QGIS geometry generator does.

A single Processing script with no extra installs. Developed and tested on QGIS 4.2.

## Inspiration and credits

- **John Nelson**, [*Make this AI-inspired topo landscape please*](https://adventuresinmapping.com/2023/12/19/make-this-ai-inspired-topo-landscape-please/) (Adventures in Mapping, December 2023). The oblique "offset stacked" look is adapted from this ArcGIS Pro technique, and the built-in **Teal-Orange** and **Lime-Orange** ramps are modeled on his maps. This tool re-implements the idea natively in QGIS.
- **Tanaka and Pauliny illuminated contours**, the classic relief-shading methods Nelson's technique draws on. The nadir view is closest to those.
- **Copernicus GLO-30** elevation data, used for every image on this page.

</div>
