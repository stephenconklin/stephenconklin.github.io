---
title: "Relative Elevation Model (REM): QGIS 4 port"
tagline: A floodplain-mapping plugin that measures how high every cell sits above the nearest river, ported to QGIS 4.
group: qgis
order: 3
status: upcoming
context: QGIS plugin, 2026
role: QGIS 4 port and toolchain replacement (v1.1.0)
credit: Original plugin, workflows, documentation and color styling by Ishiba RO, part of the EAMENA project (University of Leicester, Durham University, University of Oxford). GPL-3.0.
skills: [qgis-dev, terrain]
stack: [PyQGIS, GDAL, numpy, WhiteboxTools (Whitebox Workflows), Qt6]
maps:
  - title: Relative Elevation Model of a meandering river
    caption: Height above river, 0–10 m. Reveals levees, palaeochannels and terraces.
  - title: DEM vs. REM comparison
    caption: The same valley, absolute elevation vs. height above channel.
---

A normal DEM stores absolute elevation, so a river flowing downhill makes its whole valley look tilted. That hides the small height differences that matter on a floodplain. A **Relative Elevation Model** re-references each cell to the elevation of the nearest point on the river:

```
REM = DEM − river_surface
```

Removing the regional slope this way reveals levees, point bars, oxbows, palaeochannels and low terraces that are invisible in the DEM.

## The two tools

1. **Create River Line from DEM:** fill depressions, D8 flow pointer, flow accumulation, stream extraction and vectorization, as a semi-automatic starting point to clean by hand.
2. **Generate REM:** samples DEM elevation along the river line, interpolates a smooth river surface (IDW) and subtracts it from the DEM. The result is styled with a 0–10 m floodplain ramp.

## My contribution

[Ishiba RO's plugin](https://github.com/ishibaro/rem-plugin) didn't run on QGIS 4. I ported it:

- Declared Qt6 / QGIS 4 compatibility.
- Replaced `gdal:rastercalculator`, which fails in the macOS QGIS 4 build, with an in-process GDAL/numpy calculation.
- Replaced the SAGA and GRASS river-extraction chain, which isn't available for QGIS 4, with WhiteboxTools through the Whitebox Workflows plugin.

The plugin's design, workflows, documentation and color styling are Ishiba RO's work.
