# Taking screenshots for the site

How the current screenshots were made, so new ones match. Three kinds:

1. **Web dashboards you click through yourself** (BioSCape Phenology Explorer)
2. **Live web maps that open at a fixed view from a URL** (Dolores River)
3. **Desktop apps on a remote instance** (Jetstream2 Dashboard Deploy)

Images go in `src/assets/projects/<project>/` (or `src/assets/maps/` for stand-alone maps). Astro makes the
responsive web sizes at build time, so save at full resolution and don't pre-shrink below the sizes below.

---

## 1. Web dashboards (BioSCape Phenology Explorer)

Used for: the BioSCape main image, its four map crops and the dashboard tour (October 2026).

### Capture

| Setting | Value |
|---|---|
| Browser | Chrome, normal window (not full screen), bookmarks bar hidden |
| Window size | **about 1600 × 1000** points — keep it the same for every shot in a set |
| Result on a Retina Mac | **3200 × 2000 px** PNG |
| Browser zoom | **100%** (⌘0) |
| Dashboard text size | Default (don't use the A− / A+ buttons) |
| How | **⌘⇧4, then Space, then click the window.** A window shadow is fine; the script removes it |
| Save | PNG files in one folder, e.g. `~/Desktop/Screenshots/` — don't paste into chat (that compresses them) |

Tips: pick a pixel with a clear seasonal signal for chart shots; keep the LVIS flight boxes overlay on and the HLS
tile grid off; satellite basemap.

### Crop (removes the browser bar and IP address)

```bash
python3 -I dev/screenshots/crop_dashboard.py src/assets/projects/bioscape-phenology-explorer ~/Desktop/Screenshots/1.png:overview:map ~/Desktop/Screenshots/4.png:annual-cycles
```

- Each `FILE.png:name` writes `app-name.jpg` (whole dashboard, max 2400 px wide).
- Add `:map` to also write `map-name.jpg` (map panel only, max 2200 px wide).
- JPEG quality 88. The script finds the top of the dashboard by itself, including window-shadow captures.
- Check that no part of the address bar is left: the image should start with "BIOSCAPE · NASA" at top left.

### Add to the site

In `src/content/projects/bioscape-phenology-explorer.md`:

- **Map crops** go in the `maps:` list (`title`, `caption`, `src`, `alt`).
- **Dashboard shots** go in the "A tour of the dashboard" section as Markdown images with an italic caption below.
- Captions describe what's visible (flight box, metric, tab). Don't interpret patterns unless you've confirmed them.

---

## 2. Live web maps from a URL (Dolores River)

Used for: the three Dolores River 3D views. The built-in browser pane can't draw MapLibre's 3D terrain, so these
were captured with headless Chrome.

```bash
node dev/screenshots/capture_page.mjs OUT_DIR 1440 900 22000 "name=https://…/#zoom/lat/lng/bearing/pitch"
```

| Setting | Value |
|---|---|
| Viewport | **1440 × 900** at **2× pixel density** → 2880 × 1800 px PNG |
| Wait before capture | **20–28 seconds** (tiles and terrain must finish loading) |
| Camera | Set by the map's URL hash: `#zoom/lat/lng/bearing/pitch` — copy it from your browser's address bar |
| Views used | `#19.2/38.03136/-108.87529/-134.2/67` (3D), `#17.4/38.0314/-108.8753/0/0` (overview), `#18.7/38.03136/-108.87529/45.8/62` (reverse angle) |
| Save | `sips -Z 2400 -s format jpeg -s formatOptions 85 in.png --out out.jpg` |

**Settings comparisons (same view, one control changed at a time).** `dev/screenshots/capture_states.mjs` loads the
map once, then sets the panel's controls by element id before each shot. The Dolores "Seeing real change" rows used:

- View `#18.6/38.0313/-108.8760/0/0` (top-down over the flood bar), 1440 × 900 at 2×, 25 s load wait, 3 s per state
- Defaults `change-min` 20, `change-range` 1.5, `change-ramp` Spectral, `change-show` true; states changed one at a
  time (`change-min` 0 / 50, `change-range` 0.5 / 2, `change-ramp` RdBu / BrBG, `change-show` false)
- Saved with `sips -Z 1800 -s format jpeg -s formatOptions 82` to `src/assets/projects/dolores-river-change-detection/controls/`
- Run one capture at a time: two runs in parallel share a Chrome debugging port and control the same browser.

A view that points away from the surveyed area comes back blank — try another angle. The control panel is included;
to get map-only shots, collapse the panel in the map first (needs a script change) or crop it out.

---

## Aspect ratio: use 16:10 for anything that might be a main image

Project pages limit the main image to 640 px tall, and project cards crop to 16:10. A **16:10** capture
(window **1600 × 1000** points → 3200 × 2000 px on Retina) fills both without empty side bands or cropped content.
Taller shots (like 1.28:1) are fine in the side-by-side figure rows, but look small and letterboxed as a main image.

**Sizing a window exactly:** drag the window corner to roughly 1600 × 1000, then ask Claude to "check size" — it can
read window sizes without any permission and will say how far off it is. (An `osascript` resize command exists but
needs Accessibility permission, which VS Code's built-in terminal often doesn't get.)

**Capturing a window from Claude:** with Screen Recording allowed for the Claude app, Claude can capture a named window
directly (macOS `screencapture -l <window id>`), check it for credentials, and resize/crop it for the site.

## Clean map exports from QGIS

With the QGIS MCP plugin running, Claude can resize the QGIS window from inside QGIS (no macOS permission needed) and
render the current map view straight to a file, with no QGIS interface, at any size. Used for the NAIP
"Dolly Sods coverage" map (project `NAIP-Harvest-M2M/QGIS/Dolly_Sods.qgz`): 1600 × 1000 at 96 dpi on a 2× screen →
3200 × 2000 px, saved as 2400 × 1500 JPEG (q85). Rendering via `QgsMapRendererParallelJob` to a file is reliable; the
inline `render_map` tool can drop the connection on large images.

## QGIS dialogs and step sequences (Stacked Terrain, October 2026)

Used for the Stacked Terrain page, from the GEOG 400 Lab 6 project, without changing the project:

- **Map renders:** 16:10 extents, 2400 × 1500 (main image, dpi 240) or 2000 × 1250 (figure rows, dpi 200). Raising the dpi with
  the pixel size keeps millimetre-based edges and shadows looking the same as on screen.
- **Step sequences:** every stage is rendered at the same extent. In-between states (e.g. slabs with no lift) use a
  `layer.clone()` with changed variables, so the real layer is never edited. Oblique stages are framed about 1.2 km
  further north to allow for the lift.
- **Tool dialog:** filled in with a real run's parameters from QGIS's Processing history, captured, then cropped to 16:10
  from the top.
- **QGIS window:** 1600 × 1000. Show only the run's group, capture, then restore layer visibility, expansion and extent.
  Bring QGIS to the front before capturing, or the capture shows the window as it was before.
- **Layer Properties → Variables:** 1100 × 688, with the Variable column widened so names aren't cut off. Close it with
  Cancel.

## VS Code screenshots (NAIP Harvest M2M, October 2026)

- Window 1600 × 1000, normal zoom; config file on top, integrated terminal in the bottom ~45%
- Keep credential lines (USGS `username` / `token`, lines 15–16 of the NAIP configs) scrolled out of view, or show
  `config.example.yaml`, which only has placeholders
- Stop the run at **"Proceed with download? [y/N]"** for the shot, then answer N
- Saved at 2400 × 1500 PNG to `src/assets/projects/naip-harvest-m2m/`

## Terminal screenshots (Bash / Python runs)

Planned for the HLS VI Pipeline and VI Phenology steps of the BioSCape story. Suggested settings — not yet used, so
adjust after the first set:

| Setting | Value |
|---|---|
| Window | **about 1400 × 900**, same for every shot; Retina gives ~2800 × 1800 px |
| Font size | **16–18 pt** so code stays readable when the image is shown small |
| Theme | One dark theme for all shots |
| Prompt | Short and clean, e.g. `PS1='$ '` for the session, so usernames and host names don't show |
| Content | The command you typed plus a screenful of meaningful output (steps starting/finishing, tile counts, timings) — not a wall of warnings |
| Hide | Credentials and tokens (Earthdata `~/.netrc`, USGS M2M token), full home-directory paths if you'd rather not show them |
| How | ⌘⇧4, Space, click the window; PNG to `~/Desktop/Screenshots/` |

A clean way to get a tidy run on screen: run a small study area or a single step (e.g. one tile) so the output fits
one window.

---

## 3. Desktop apps on a remote instance (Jetstream2 Dashboard Deploy)

The repo's own guide sets the standard: **window 1100 × 820**, normal scale, default light theme, cropped to the app
content (no window title bar). See `docs/user-guide/SCREENSHOTS.md` in the Jetstream2 repo.

- **Redact the instance IP** to `149.165.xxx.xxx` before publishing (the Manage tab shows it).
- Before capturing the Manage tab: click **Free up space** (so Storage shows no warning) and **Show latest** (so the
  log pane isn't empty).
- The portfolio's current Manage-tab image was taken through the web desktop in a browser at a larger size, then
  cropped, redacted and had the storage warning blanked. Recapture at 1100 × 820 for the repo guide.
