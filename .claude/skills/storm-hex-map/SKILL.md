---
name: storm-hex-map
description: Build an interactive 3D H3 hex map of a storm's PRISM precipitation for the website, from a PRISM Storm Analysis run folder, with towns, rivers, day buttons or a two-handle date-range slider, and stills for the project page. Use when the user wants a hex map, 3D storm map, or interactive precipitation map of a watershed for the site, or wants to update the San Juan ones.
---

# Storm hex map

Turns a PRISM Storm Analysis run (daily 800 m precipitation clipped to a watershed) into a page at
`public/viz/<slug>/` that shows precipitation as extruded H3 hexagons over a basemap. Height and color show depth, and
towns and rivers ride on the column tops. There are two page templates:

- **Range** (`dev/h3/template_range.html`, the default choice): a two-handle date slider over daily bars that totals
  any run of days, with buttons for the run's storms. Use it for anything with more than one storm, or when people
  will want to pick their own window. See "Range slider" below.
- **Buttons** (`dev/h3/template.html`): buttons for the storm total and a few single days. Simpler, for one storm.

The worked example is the two late-2026 San Juan storms (remnants of Hurricane Trudy, Oct 20–27, and an atmospheric
river, Nov 1–3): config `dev/h3/maps/san-juan-2026-oct-nov.json`, page `public/viz/san-juan-storms-2026/`, shown on
`/projects/prism-storm-analysis/`. The old October-only map's address, `/viz/san-juan-storm-h3/`, is now a redirect
to it; keep that file so old links work.

## What it's built with

- **Data:** a PRISM Storm Analysis run folder (made by `/Users/stephenconklin/Documents/ConklinGeospatial/Projects/GITHub/PRISM_Storm_Analysis`;
  the San Juan run is on the data drive, `/Volumes/ConklinGeospatialData/Data/PRISM_data/San_Juan_Watershed`).
  - Always: `clipped/ppt_800m_YYYYMMDD_clip.tif` for each day, a volume raster from `storm_total.py --volume-tif`,
    and the basin outline (`wbd_huc<code>.geojson` or `boundary.geojson`).
  - Used when present: `daily_basin_summary.csv` (each day's basin mean, cell max, and PRISM release),
    `totals.gpkg` (the run's basin totals), `storm.toml` (named events and the rain/snow ramp), and
    `ppt_800m_uncertainty_<start>_<end>.json` (each event's volume range).
  - With `rain_snow`: `clipped/tmean_800m_YYYYMMDD_clip.tif` for each day.
- **Python** (`dev/h3/build_storm_h3.py`): rasterio and numpy read the clips; the `h3` library assigns each 800 m
  cell to an H3 hexagon by its center and averages them. Hex outlines are written into `data.json`, so the page needs
  no H3 library. The build also copies the chosen template to `<out>/index.html`.
- **Rivers** (`dev/h3/fetch_rivers.py`): USGS NHDPlus small-scale flowlines from
  `hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/4`, named rivers above a drainage-area threshold.
- **Page:** MapLibre GL 4.7.1 with the CARTO Positron or Dark Matter basemap (following the viewer's color scheme),
  and deck.gl 9.0.38 layers on top. Hexes are an extruded `PolygonLayer`, rivers are `PathLayer`s, and names are
  `TextLayer`s. Everything specific to a storm comes from `data.json`, so the same template serves every map.
- **Stills** (`dev/h3/capture_stills.py`): headless Chrome with SwiftShader WebGL renders the page with `?still`
  (no panel), and Pillow crops the result.

## Steps

1. **Python env.** Use one with `h3`, `rasterio`, and `numpy`. Don't add packages to the user's conda envs; make a
   throwaway venv in the scratchpad: `python3 -m venv <scratch>/h3env && <scratch>/h3env/bin/pip install h3 rasterio numpy`.
   The build needs the data drive mounted. Rebuilding is only needed when the data, towns, or rivers change; a
   template change alone just needs the template copied to `<out>/index.html` (the build does exactly that copy).
2. **Config.** Copy `dev/h3/maps/san-juan-2026-oct-nov.json` to `dev/h3/maps/<slug>.json` and set:
   - `title`: name the watershed, e.g. "San Juan watershed storms, October–November 2026". It is the page's title
     and panel heading. `description` is stored in `data.json` but not shown.
   - `run`, `boundary`, `volume_tif`, `start`, `end`: the run folder and its files, and the days the map covers.
   - `day_note`: PRISM days are the 24 hours ending 12:00 UTC on their date. Give the local equivalent for the basin
     and season (MDT 6 a.m. to 6 a.m. in October; MST 5 a.m. to 5 a.m. after the November time change).
   - `out`: `public/viz/<slug>`.
   - `res` (default 6, about 36 km² hexes) and `view` (`pitch`, `bearing`; the San Juan uses 50 and -12).
   - `towns`: [name, lat, lng] for the main towns in and at the edge of the basin, largest first. Confirm
     coordinates with the user if any are uncertain. `town_labels` can move a crowded name `above` or `below` its dot.
   - `rivers.names`, `rivers.min_drainage_km2`: the main stem and main tributaries. A threshold near 300 km² carries
     mountain tributaries up into their headwaters. Avoid names that only tag short reaches, such as arroyos at confluences.
   - Range map: keep `"template": "template_range.html"` and set `initial`, `rain_snow`, `event_labels`, `stills`,
     and `thumb_center` (see "Range slider" and step 6).
   - Button map: drop `template`, `initial`, `rain_snow`, `event_labels`, and `stills`, and set `days_shown`, the day
     buttons. Show the days that carry the storm (check `daily_basin_summary.csv`; for Trudy, Oct 22–25 held 95%).
     The total always covers every day, and the panel says how much the other days add.
3. **Rivers.** `python3 dev/h3/fetch_rivers.py dev/h3/maps/<slug>.json` writes `<slug>.rivers.geojson` next to the
   config, where the build finds it. It needs the network; the build after it doesn't.
4. **Build.** From the repo root: `<scratch>/h3env/bin/python dev/h3/build_storm_h3.py dev/h3/maps/<slug>.json`.
   It prints the hex count and the volume for the config's `start`–`end` two ways (hex volume sum and daily depth ×
   area). Both should match each other and the run's `storm_total.py` volume for those days. A mismatch means cells
   were dropped or double counted. For a range map, also check each event's figures (see "Range slider"); the San
   Juan's are 4.685 km³ for Oct 20–27 (Trudy), 2.833 km³ for Nov 1–3, and 7.987 km³ for Oct 20–Nov 3.
5. **Look at it** at `http://localhost:4321/viz/<slug>/index.html` (start the dev server with `astro dev --background`,
   or `npx astro dev --background` if `astro` isn't on the PATH).
   - **Visuals:** take headless Chrome screenshots. The built-in browser pane is often hidden, and a hidden pane
     doesn't paint the WebGL map reliably:
     `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars --window-size=1280,800 --virtual-time-budget=25000 --screenshot=<scratch>/map.png "<url>"`.
     Check at 1280 px and at 500 px (headless Chrome won't go narrower; a 390 px shot crops the page and looks
     broken when it isn't).
   - **Behavior:** use the browser pane's `read_page`, clicks, and `javascript_tool`. The panel text and the
     `?start=&end=` address update a moment late while the pane is hidden, so wait a second or two before reading
     them. For a range map, click a bar, a storm button, and drag a handle, and check that the totals follow.
   - **Labels:** fix collisions, then rebuild after each change.
     - Move river names with `rivers.label_at` (0 = smallest reach, 1 = largest; `null` hides the name).
     - Move town names with `town_labels`.
     - Placement is manual: deck.gl's `CollisionFilterExtension` hid most labels raised above the columns.
6. **Stills.** `python3 dev/h3/capture_stills.py dev/h3/maps/<slug>.json src/assets/projects/<project>`, with the
   dev server running. Every still uses `?still` (no panel). The script also writes `hex-thumb.jpg`, a 640 px square
   `?bare` crop (no towns or rivers) for the home page ring. Center it on the wettest corner with `thumb_center`
   (fractions of the frame; the San Juan uses [0.75, 0.33] so the tallest columns aren't cut off at the top).
   - **Range maps:** one image per entry in the config's `stills` list, `[[start, end, filename], ...]`, each loaded
     with `?start=..&end=..` (start = end for one day). The thumbnail uses the `initial` window, or `thumb_window`.
     The San Juan list has the both-storms cover (`hex-storms-both.jpg`), each storm (`hex-storm-trudy.jpg`,
     `hex-storm-nov1.jpg`), and four single days (`hex-oct22.jpg`, `hex-oct23.jpg`, `hex-oct25.jpg`, `hex-nov02.jpg`).
   - **Button maps:** `hex-storm-total.jpg` (card image) and one `hex-<mon><dd>.jpg` per shown day, loaded with `?day=N`.
   - Read every still to check crops and labels. Nothing should be cut off at the top or the sides.
7. **Project page.** In the project's Markdown:
   - set `coverEmbed: { src: /viz/<slug>/index.html, title: ... }` to show the live map as the main image;
   - set `cover:` to the main still for cards and link previews, `coverAlt` to describe it, and `thumb:` to
     `hex-thumb.jpg`;
   - link the full-screen page with a site path (`/viz/<slug>/index.html`), not a full URL, so it works before deploy;
   - the stills fit numbered `figureSets` rows (for the San Juan, "Two storms, one basin" and "Day by day").
   - **Range-map captions compare days by their numbers, not their heights.** Each still is scaled to its own
     wettest hex, so a dry day's columns stand as tall as a wet day's. Say so in the row's intro.
   - Get every figure from the run (or the panel at that window); don't carry numbers over from an older map. Where
     totals appear, say briefly that early PRISM releases are revised for about six months.
   - Follow the site's copy rules in CLAUDE.md: serial comma, and describe the work.
8. **Check** the project page and the home page (the `thumb` in the ring) at 1280 px and 500 px, using the same
   headless Chrome screenshots, then run `npx astro build`.

## Range slider (several storms)

Set `"template": "template_range.html"` in the config for a page where two handles on one track pick any run of
days, over bars of the daily basin mean (click a bar for one day). The info box follows the selection: volume (km³
and acre-feet), basin mean and cell max, rain and snow shares, the share of all the map's days, and the PRISM
release of those days. `?start=YYYY-MM-DD&end=YYYY-MM-DD` opens on a window (start = end for one day), and the page
keeps the address in step. `?still` hides the panel and `?bare` hides towns and rivers.
- `start`/`end`: every day the slider covers (the run's download window); `volume_tif`: any of the run's volume
  rasters (it only fixes which cells are in the basin); `initial`: the [start, end] window it opens on.
- `"rain_snow": true` adds daily rain depths per hex from the run's `clipped/tmean_*` tifs, with the run's
  `storm.toml` ramp (or a `{"all_snow_c", "all_rain_c"}` object in the config).
- The run's `storm.toml` events that fall inside `start`–`end` become buttons, plus "All N days"; `event_labels`
  renames them (the San Juan: `trudy` → "Trudy", `nov1` → "Nov 1 storm", `oct_nov` → "Both storms"). An event
  that runs past `end` is skipped.
- When the slider matches an event, the box shows the run's own figures from `totals.gpkg`
  (`basin_total_<start>_<end>`) and the uncertainty range from `ppt_800m_uncertainty_<start>_<end>.json`; elsewhere
  it sums hex depth × hex area. **Check after the build that both agree for each event** (they did to five figures
  for the San Juan): click each storm button and compare with the window's daily sum.
- Daily bars, cell maxima, and releases come from `daily_basin_summary.csv`. Release 8 is final; anything lower
  makes the box say the figures are early estimates.
- Height: the tallest column stays about 100 km high (elevation scale 100000 / max, capped at 1200), and the color
  scale runs to the selection's wettest hex, so each window reads well; the legend gives its maximum.
- **Handle drags:** both handles are range inputs stacked on one track, with only their thumbs taking the pointer.
  When both sit on one day (after a bar click), the first step of a drag decides which end moves (`grab`). `grab`
  is cleared on every pointer down and up, not only on `change`, because `change` doesn't fire when a drag ends
  where it started; a stale `grab` made the next drag move the wrong end. The keyboard always moves the focused
  handle. Keep this if the slider is reworked.

## Page details worth keeping

- **Button template scales:** one color scale for all days (the wettest hex-day), so the days can be compared; the
  total has its own. Elevation scale 350 for the total and 1200 for single days. (The range template scales each
  selection instead; see above.)
- Rivers and labels are lifted to the column top under each point (the hex index is stored per point), so they sit
  on the surface.
- Basin means are weighted by each hex's 800 m cell count (`h[5]`), since edge hexes are only partly in the basin.
  Each hex also carries its area in the basin (`h[6]`, m², GRS80 cell areas as in `storm_total.py`), and its daily
  depths are area-weighted, so depth × area gives the run's volume exactly; `h[7]` is daily rain depth when built
  with `rain_snow`.
- Embedded in a page (in an iframe), the map uses MapLibre `cooperativeGestures`, so scrolling moves the page. The
  view fits around the panel: beside it on wide screens, below it on narrow ones.
- The deck.gl standalone bundle's `H3HexagonLayer` failed to find `h3-js` from the CDN, which is why hex outlines
  are precomputed in Python.

## Retiring a map

When a new map replaces an old one, replace the old `public/viz/<old>/index.html` with a small redirect page (meta
refresh plus a link) and delete its `data.json`, so old links keep working. Delete the old config, its
`.rivers.geojson`, and any stills nothing uses. First grep `src/`, `public/`, `docs/`, CLAUDE.md, and this skill for the
old slug, config name, and still names, and update every reference.
