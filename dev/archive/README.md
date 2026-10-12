# Archived design concepts

Not built or shown on the site. These are the concept pages (`/concepts/`) and the components and data only they used.
The site settled on the **Journey** style, now the base theme in `src/styles/global.css`; the style picker and
the other eight styles are back in `src/` for previewing.

The files keep their original `src/` paths, so a page can be restored by moving it back (it may need imports
updated). Delete this folder when it's no longer useful.

## Shelved projects

- `src/content/projects/qgis-rem.md`: the Relative Elevation Model (REM) QGIS 4 port, shelved 2026-10-11 until the
  port is substantially improved. To restore: move it back to `src/content/projects/`, then add it to the How I work
  diagram again (`src/pages/how-i-work.astro`: a `t-rem` tool fed by elevation models, with a "Floodplain REMs"
  product for land managers). It has no images yet; its two map slots are placeholders.
