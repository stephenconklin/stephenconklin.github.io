---
title: Yosemite Valley LiDAR Map
tagline: A 243-million-point airborne LiDAR survey turned into a detail map, a 3D view, and a layer-by-layer processing stack.
group: webmap
order: 0
featured: true
status: map
links:
  - label: LiDAR dataset (OpenTopography)
    url: https://doi.org/10.5069/G9GQ6VP3
context: Fort Lewis College, 2026
role: LiDAR processing, terrain analysis, and cartography
credit: "LiDAR: National Center for Airborne Laser Mapping (NCALM), distributed by OpenTopography (doi:10.5069/G9GQ6VP3). NCALM funding from NSF's Division of Earth Sciences, Instrumentation and Facilities Program (EAR-1043051); OpenTopography services supported by NSF awards 2410799, 2410800, and 2410801. Roads, trails, and buildings © OpenStreetMap contributors. California outline: U.S. Census."
skills: [terrain, cartography]
stack: [QGIS, PDAL, GDAL, OpenTopography, NCALM airborne LiDAR, OpenStreetMap]
cover: ../../assets/projects/yosemite-valley-lidar/view-3d.jpg
coverAlt: "3D view looking east up Yosemite Valley from above the valley floor: the walls of El Capitan on the left and Middle Cathedral Rock on the right, labeled peaks including Half Dome and Glacier Point, and forest drawn tree by tree from LiDAR"
coverCaption: "Looking east up Yosemite Valley from about 1,100 m above the valley floor. Each tree is drawn from LiDAR points and colored by height. Panel A of the map."
figureSets:
  - title: "The steps as layers"
    placement: top
    narrow: true
    intro: "The eight steps above, stacked from the point cloud at the bottom to the finished map at the top, for an area around Yosemite Village. Rendered in Blender from layers exported out of QGIS."
    figures:
      - title: "The processing stack"
        src: ../../assets/projects/yosemite-valley-lidar/processing-stack.jpg
        alt: "Exploded 3D stack of eight map layers over the same patch of Yosemite Valley: classified point cloud, DTM, hillshade, slope, contours, canopy height, vector layers, and the final map"
  - title: "Two more views of the same survey"
    placement: top
    intro: "The 2D maps from the same layout: a detail map of the valley floor and an overview of the full survey."
    figures:
      - title: "Detail map: Yosemite Village to Curry Village"
        caption: "Canopy height, steep cliff faces, contours, and the LiDAR-traced Merced River channel, with roads and trails. Panel B of the map."
        src: ../../assets/projects/yosemite-valley-lidar/detail-map.jpg
        alt: "Detail map of the valley floor from Yosemite Village to Curry Village: green tree canopy, the blue Merced River channel, orange roads and dashed trails, brown contours, and shaded cliffs"
      - title: "Overview of the survey"
        caption: "The full NCALM coverage of the valley, with the 3D viewpoint (A) and the detail map extent (B)."
        src: ../../assets/projects/yosemite-valley-lidar/overview-map.jpg
        alt: "Overview map of the LiDAR survey of Yosemite Valley, with El Capitan, Half Dome, North Dome, and Glacier Point labeled, the 3D view's field of view and the detail map's extent outlined in red"
  - title: "Trees from the point cloud"
    intro: "A low 3D view across the valley floor. Every tree is drawn from the LiDAR points themselves rather than from a symbol."
    figures:
      - title: "The valley floor in 3D"
        caption: "Forest, meadows, and cliff walls, all from the same survey."
        src: ../../assets/projects/yosemite-valley-lidar/canopy-3d.jpg
        alt: "Low 3D view across the forested floor of Yosemite Valley toward its granite walls, with individual trees drawn from LiDAR points"
maps:
  - title: "Yosemite Valley: terrain, tree canopy, and river channel (11×17 layout)"
    caption: "The full map: a 3D view, a detail map, an overview map, and the processing stack on one 11×17 sheet."
    src: ../../assets/maps/yosemite-valley-lidar.jpg
    alt: "11 by 17 inch map of Yosemite Valley from a 243-million-point LiDAR survey, with a 3D view up the valley, a detail map from Yosemite Village to Curry Village, an overview map, and an exploded stack of the processing layers"
  - title: The valley floor in 3D
    caption: Trees drawn from LiDAR points, looking across the valley floor.
    src: ../../assets/projects/yosemite-valley-lidar/canopy-3d.jpg
    alt: Low 3D view across the forested floor of Yosemite Valley with trees drawn from LiDAR points
---

<div class="part-overview">

An airborne LiDAR survey of Yosemite Valley, flown by the National Center for Airborne Laser Mapping (NCALM), holds about 243 million laser returns, classified into two classes: ground and unclassified. This map turns those points into three views on one sheet: a 3D view up the valley, a detail map of the valley floor, and an exploded stack that shows how each layer was made.

## How it was made

1. **Point cloud.** The classified NCALM points (242.9 million in the selected area), downloaded from OpenTopography.
2. **Digital terrain model (DTM).** A 1 m elevation raster, triangulated from the ground points with PDAL in QGIS.
3. **Hillshade.** GDAL multidirectional shading of the DTM, so cliff detail is clear from differing perspectives.
4. **Slope.** Steepness from the DTM, used to highlight cliff faces with slopes from 45° to 90°.
5. **Contours.** Every 50 m, with index contours every 250 m.
6. **Canopy height.** Each point's height above the ground, from PDAL, rasterized for the 2D (nadir) maps and limited to trees over 3 m on slopes under 50° so cliff edges aren't mistaken for forest.
7. **River channel and vectors.** The Merced River's channel outlined from a LiDAR analysis and relative elevation model (REM), with roads, trails, and buildings from OpenStreetMap.
8. **Final map.** All layers combined and styled in QGIS, in 2D for the detail and overview maps and in 3D for the view up the valley.

</div>

<div class="part-details">

## Reading the map

- **Elevation** runs from 1,091 m on the valley floor to 2,661 m on the rim.
- **Canopy height** runs from 3 m to 68 m; taller trees are darker green.
- **Cliff faces** steeper than 45° are shaded from tan to rust.

All layers are in UTM Zone 11N (EPSG:26911).

</div>
