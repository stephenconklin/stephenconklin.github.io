"""Crop browser-window screenshots of the BioSCape Phenology Explorer for the site.

Removes the browser bar (and with it the address bar and IP), and optionally saves a
map-only crop. Works on plain window captures and on captures that include the macOS
window shadow (transparent margins).

Usage:
  python3 -I dev/screenshots/crop_dashboard.py OUT_DIR SHOT.png[:name[:map]] ...

  name  output file stem (default: the input file's stem)
  map   also write map-<name>.jpg, the map panel only

Example:
  python3 -I dev/screenshots/crop_dashboard.py src/assets/projects/bioscape-phenology-explorer \
      ~/Desktop/Screenshots/1.png:overview:map ~/Desktop/Screenshots/4.png:annual-cycles

Outputs app-<name>.jpg (max 2400 px wide) and map-<name>.jpg (max 2200 px wide), JPEG q88.
"""
import sys
from pathlib import Path
from PIL import Image

APP_MAX_W, MAP_MAX_W, QUALITY = 2400, 2200, 88
SIDEBAR_FRAC = 616 / 3200  # dashboard sidebar width as a share of the app width


def dark(p):
    return sum(p) < 150


def window_box(im):
    """Opaque window area: excludes the transparent shadow margin, if any."""
    if im.mode == 'RGBA':
        box = im.getchannel('A').point(lambda v: 255 if v == 255 else 0).getbbox()
        if box:
            l, t, r, b = box
            return (l + 2, t, r - 2, b - 4)  # trim the rounded corners
    return (0, 0, im.width, im.height)


def app_top(rgb, box):
    """First row below the browser bar: the dark sidebar starts here."""
    l, t, r, b = box
    col = l + 60
    for y in range(t + 40, b - 40):
        if all(dark(rgb.getpixel((col, y + k))) for k in range(0, 30, 3)):
            return y
    raise SystemExit('Could not find the top of the dashboard; is the sidebar visible on the left?')


def map_bottom(rgb, l, top, r, b):
    """Bottom of the map panel: the row of the dark chart-panel divider below the map."""
    col = l + int((r - l) * 0.75)
    for y in range(top + int((b - top) * 0.35), b - 40):
        if all(dark(rgb.getpixel((x, y))) for x in range(col - 300, col + 300, 50)) and \
           all(dark(rgb.getpixel((col, y + k))) for k in range(0, 40, 4)):
            return y
    return top + int((b - top) * 0.49)


def save(img, path, max_w):
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    img.save(path, quality=QUALITY)
    print(f'{path}  {img.width}x{img.height}')


def main(out_dir, specs):
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    for spec in specs:
        src, *rest = spec.split(':')
        name = rest[0] if rest and rest[0] else Path(src).stem
        want_map = len(rest) > 1 and rest[1] == 'map'
        im = Image.open(Path(src).expanduser())
        box = window_box(im)
        rgb = im.convert('RGB')
        l, _, r, b = box
        top = app_top(rgb, box)
        save(rgb.crop((l, top, r, b)), out / f'app-{name}.jpg', APP_MAX_W)
        if want_map:
            side = l + round((r - l) * SIDEBAR_FRAC)
            bottom = map_bottom(rgb, side, top, r, b)
            save(rgb.crop((side, top + 3, r, bottom - 3)), out / f'map-{name}.jpg', MAP_MAX_W)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2:])
