"""Capture still images of a storm hex map for its project page, with headless Chrome (WebGL through SwiftShader).

Writes <assets>/hex-storm-total.jpg (the card image) and one hex-<mon><dd>.jpg per day in the config's days_shown,
all with the panel hidden (?still). The dev server must be running (astro dev --background).
Usage: python3 dev/h3/capture_stills.py dev/h3/maps/<map>.json src/assets/projects/<project> [http://localhost:4321]
"""
import json, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cfg = json.loads(Path(sys.argv[1]).read_text())
assets = Path(sys.argv[2]); assets.mkdir(parents=True, exist_ok=True)
base = (sys.argv[3] if len(sys.argv) > 3 else "http://localhost:4321") + "/" + cfg["out"].removeprefix("public/") + "/index.html"
days = json.loads((Path(cfg["out"]) / "data.json").read_text())["days"]

def shot(query, png):
    subprocess.run([CHROME, "--headless=new", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars",
                    "--force-device-scale-factor=2", "--window-size=1200,760", "--virtual-time-budget=25000",
                    f"--screenshot={png}", f"{base}?still{query}"], capture_output=True, check=True)
    im = Image.open(png).convert("RGB")
    return im, im.size

with tempfile.TemporaryDirectory() as tmp:
    # Crops leave room above the basin for the tallest columns and drop the empty map around it.
    im, (w, h) = shot("", f"{tmp}/total.png")
    im.crop((int(w * 0.11), int(h * 0.10), int(w * 0.88), int(h * 0.86))).save(assets / "hex-storm-total.jpg", quality=88)
    for d in cfg.get("days_shown", days):
        im, (w, h) = shot(f"&day={days.index(d)}", f"{tmp}/{d}.png")
        im = im.crop((int(w * 0.11), int(h * 0.03), int(w * 0.88), int(h * 0.86)))
        im = im.resize((1100, int(1100 * im.size[1] / im.size[0])), Image.LANCZOS)
        name = f"hex-{['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'][int(d[5:7]) - 1]}{d[8:]}.jpg"
        im.save(assets / name, quality=86)
        print("wrote", assets / name)
print("wrote", assets / "hex-storm-total.jpg")
