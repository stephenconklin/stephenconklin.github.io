---
name: storm-hex-map
description: Build an interactive 3D H3 hex map of a storm's PRISM precipitation for the website, from a PRISM Data Wrangler run folder, with towns, rivers, day buttons, and stills for the project page. Use when the user wants a hex map, 3D storm map, or interactive precipitation map of a watershed for the site, or wants to update the San Juan one.
---

# Storm hex map

Turns a PRISM Data Wrangler run (daily 800 m precipitation clipped to a watershed) into a page at
`public/viz/<slug>/` that shows the storm as extruded H3 hexagons over a basemap. Height and color show depth.
Buttons switch between the storm total and single days, and towns and rivers ride on the column tops.
The San Juan storm of October 2026 is the worked example: `dev/h3/maps/san-juan-2026-10.json`, shown on
`/projects/prism-storm-analysis/`.

## What it's built with

- **Data:** a PRISM Data Wrangler run folder (`/Users/stephenconklin/Documents/ConklinGeospatial/Projects/GITHub/PRISM_Data_Wrangler`).
  It needs `clipped/ppt_800m_YYYYMMDD_clip.tif` for each day, a volume raster from
  `storm_total.py --volume-tif`, and the basin outline (`wbd_huc<code>.geojson` or `boundary.geojson`).
- **Python** (`dev/h3/build_storm_h3.py`): rasterio and numpy read the clips; the `h3` library assigns each 800 m
  cell to an H3 hexagon by its center and averages them. Hex outlines are written into `data.json`, so the page needs
  no H3 library.
- **Rivers** (`dev/h3/fetch_rivers.py`): USGS NHDPlus small-scale flowlines from
  `hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/4`, named rivers above a drainage-area threshold.
- **Page** (`dev/h3/template.html`, copied to `<out>/index.html`): MapLibre GL 4.7.1 with the CARTO Positron or
  Dark Matter basemap, and deck.gl 9.0.38 layers on top. Hexes are an extruded `PolygonLayer`, rivers are `PathLayer`s,
  and names are `TextLayer`s. Everything specific to a storm comes from `data.json`.
- **Stills** (`dev/h3/capture_stills.py`): headless Chrome with SwiftShader WebGL renders the page with `?still`
  (no panel) and `?day=N`, and Pillow crops the result.

## Steps

1. **Python env.** Use one with `h3`, `rasterio`, and `numpy`. Don't add packages to the user's conda envs; make a
   throwaway venv in the scratchpad: `python3 -m venv <scratch>/h3env && <scratch>/h3env/bin/pip install h3 rasterio numpy`.
2. **Config.** Copy `dev/h3/maps/san-juan-2026-10.json` to `dev/h3/maps/<slug>.json` and set:
   - `title`: name the watershed, e.g. "San Juan watershed storm, October 2026".
   - `run`, `boundary`, `volume_tif`, `start`, `end`: the run folder and its files, and the storm window.
   - `days_shown`: the day buttons. Show the days that carry the storm (check `daily_basin_summary.csv`; for the San
     Juan, Oct 22–25 held 95%). The total always covers every day, and the panel says how much the other days add.
   - `day_note`: PRISM days are the 24 hours ending 12:00 UTC on their date. Give the local equivalent for the basin
     and season (MDT 6 a.m. to 6 a.m. in October; MST 5 a.m. after the November time change).
   - `out`: `public/viz/<slug>`.
   - `towns`: [name, lat, lng] for the main towns in and at the edge of the basin, largest first. Confirm
     coordinates with the user if any are uncertain. `town_labels` can move a crowded name `above` or `below` its dot.
   - `rivers.names`, `rivers.min_drainage_km2`: the main stem and main tributaries. A threshold near 300 km² carries
     mountain tributaries up into their headwaters. Avoid names that only tag short reaches, such as arroyos at confluences.
3. **Rivers.** `python3 dev/h3/fetch_rivers.py dev/h3/maps/<slug>.json` writes `<slug>.rivers.geojson` next to the
   config. It needs the network; the build after it doesn't.
4. **Build.** From the repo root: `<scratch>/h3env/bin/python dev/h3/build_storm_h3.py dev/h3/maps/<slug>.json`.
   **Check that the printed volume matches the run's `storm_total.py` volume.** For the San Juan, 4.6846e+09 m³ =
   4.685 km³. A mismatch means cells were dropped or double counted.
5. **Look at it** at `http://localhost:4321/viz/<slug>/index.html` (start the dev server with `astro dev --background`).
   The page loads slowly in a hidden browser pane, so screenshot after a few seconds. Then fix label collisions:
   - move river names with `rivers.label_at` (0 = smallest reach, 1 = largest; `null` hides the name);
   - move town names with `town_labels`;
   - rebuild after each change.
   deck.gl's `CollisionFilterExtension` hid most labels raised above the columns, so placement is manual.
6. **Stills.** `python3 dev/h3/capture_stills.py dev/h3/maps/<slug>.json src/assets/projects/<project>` writes
   `hex-storm-total.jpg` (card image) and one `hex-<mon><dd>.jpg` per shown day. Read a couple to check crops and labels.
7. **Project page.** In the project's Markdown:
   - set `coverEmbed: { src: /viz/<slug>/index.html, title: ... }` to show the live map as the main image;
   - keep `cover:` as the hex still for cards and link previews;
   - link the full-screen page with a site path (`/viz/<slug>/index.html`), not a full URL, so it works before deploy;
   - the day stills fit a numbered `figureSets` row ("Day by day").
   Follow the site's copy rules in CLAUDE.md: serial comma, and describe the work.
8. **Check** the project page at desktop and phone width (`resize_window` mobile), then run `npx astro build`.

## Page details worth keeping

- One color scale for all days (the wettest hex-day), so the days can be compared; the total has its own scale.
- Elevation scale 350 for the total and 1200 for single days. Rivers and labels are lifted to the column top
  under each point (the hex index is stored per point), so they sit on the surface.
- Basin means are weighted by each hex's 800 m cell count (`h[5]`), since edge hexes are only partly in the basin.
- Embedded in a page, the map uses MapLibre `cooperativeGestures`, so scrolling moves the page. The view fits around
  the panel: beside it on wide screens, below it on narrow ones.
- The deck.gl standalone bundle's `H3HexagonLayer` failed to find `h3-js` from the CDN, which is why hex outlines
  are precomputed in Python.
