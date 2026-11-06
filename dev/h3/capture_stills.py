"""Capture still images of a storm hex map for its project page, with headless Chrome (WebGL through SwiftShader).

All stills hide the panel (?still). The dev server must be running (astro dev --background).
- Button maps (template.html): hex-storm-total.jpg (the card image), hex-thumb.jpg, and one hex-<mon><dd>.jpg per
  day in the config's days_shown, each loaded with ?day=N.
- Range maps ("template": "template_range.html"): one image per entry in the config's "stills" list,
  [[start, end, filename], ...], each loaded with ?start=..&end=.. (start = end for one day), and hex-thumb.jpg
  from the "initial" window (or "thumb_window": [start, end]).
hex-thumb.jpg is a square of the wettest corner with ?bare (no towns or rivers), for the home page ring;
thumb_center in the config is its center as fractions of the frame.
Usage: python3 dev/h3/capture_stills.py dev/h3/maps/<map>.json src/assets/projects/<project> [http://localhost:4321]
"""
import json, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
cfg = json.loads(Path(sys.argv[1]).read_text())
assets = Path(sys.argv[2]); assets.mkdir(parents=True, exist_ok=True)
base = (sys.argv[3] if len(sys.argv) > 3 else "http://localhost:4321") + "/" + cfg["out"].removeprefix("public/") + "/index.html"
days = json.loads((Path(cfg["out"]) / "data.json").read_text())["days"]
is_range = cfg.get("template") == "template_range.html"

def shot(query, png):
    subprocess.run([CHROME, "--headless=new", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars",
                    "--force-device-scale-factor=2", "--window-size=1200,760", "--virtual-time-budget=25000",
                    f"--screenshot={png}", f"{base}?still{query}"], capture_output=True, check=True)
    im = Image.open(png).convert("RGB")
    return im, im.size

def save(im, top, name, width=None, quality=86):
    # Crops leave room above the basin for the tallest columns and drop the empty map around it.
    w, h = im.size
    im = im.crop((int(w * 0.11), int(h * top), int(w * 0.88), int(h * 0.86)))
    if width:
        im = im.resize((width, int(width * im.size[1] / im.size[0])), Image.LANCZOS)
    im.save(assets / name, quality=quality)
    print("wrote", assets / name)

def thumb(query, tmp):
    im, (w, h) = shot(f"&bare{query}", f"{tmp}/bare.png")
    cx, cy = cfg.get("thumb_center", [0.5, 0.45]); half = int(0.21 * h)  # the square is 42% of the frame height
    im.crop((int(cx * w) - half, int(cy * h) - half, int(cx * w) + half, int(cy * h) + half)).resize(
        (640, 640), Image.LANCZOS).save(assets / "hex-thumb.jpg", quality=88)
    print("wrote", assets / "hex-thumb.jpg")

with tempfile.TemporaryDirectory() as tmp:
    if is_range:
        # The range page scales the tallest column to the same height for any window, so one crop fits all.
        for start, end, name in cfg["stills"]:
            im, _ = shot(f"&start={start}&end={end}", f"{tmp}/{name}.png")
            save(im, 0.05, name, width=1100)
        s, e = cfg.get("thumb_window", cfg.get("initial", [days[0], days[-1]]))
        thumb(f"&start={s}&end={e}", tmp)
    else:
        im, _ = shot("", f"{tmp}/total.png")
        save(im, 0.10, "hex-storm-total.jpg", quality=88)
        thumb("", tmp)
        for d in cfg.get("days_shown", days):
            im, _ = shot(f"&day={days.index(d)}", f"{tmp}/{d}.png")
            save(im, 0.03, f"hex-{MONTHS[int(d[5:7]) - 1]}{d[8:]}.jpg", width=1100)
