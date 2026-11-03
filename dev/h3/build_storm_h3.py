"""Build a 3D storm hex map for the website from a PRISM Data Wrangler run.

Aggregates the run's 800 m daily precipitation clips to H3 hexagons and writes <out>/data.json: per hex, mean daily
depths (mm), mean storm depth (mm), storm volume (m3, sum of cell volumes), and the hex outline (lng, lat), so the page
needs no H3 library. Towns and rivers (from fetch_rivers.py) are tagged with the hex each point falls in, so the page
can set them on the column tops. Also copies template.html to <out>/index.html.

Usage: python dev/h3/build_storm_h3.py dev/h3/maps/<map>.json   (run from the repo root, in an env with h3 and rasterio)
"""
import datetime as dt, json, shutil, sys
from pathlib import Path
import numpy as np, rasterio, h3

config_path = Path(sys.argv[1])
cfg = json.loads(config_path.read_text())
D, out, RES = Path(cfg["run"]), Path(cfg["out"]), cfg.get("res", 6)
start, end = dt.date.fromisoformat(cfg["start"]), dt.date.fromisoformat(cfg["end"])
days = [start + dt.timedelta(n) for n in range((end - start).days + 1)]

def read(p):
    with rasterio.open(p) as r:
        a = r.read(1, masked=True).astype("float64")
        return a.filled(np.nan), r.transform

vol, T = read(D / cfg["volume_tif"])
daily = [read(D / "clipped" / f"ppt_800m_{d:%Y%m%d}_clip.tif")[0] for d in days]
rows, cols = np.where(np.isfinite(vol))
xs, ys = rasterio.transform.xy(T, rows, cols)
cells = [h3.latlng_to_cell(y, x, RES) for x, y in zip(xs, ys)]

agg = {}
for i, c in enumerate(cells):
    r, k = rows[i], cols[i]
    a = agg.setdefault(c, {"n": 0, "vol": 0.0, "d": np.zeros(len(days))})
    a["n"] += 1; a["vol"] += vol[r, k]; a["d"] += [dd[r, k] for dd in daily]

hexes = []
for c, a in agg.items():
    d = a["d"] / a["n"]
    ring = [[round(lng, 4), round(lat, 4)] for lat, lng in h3.cell_to_boundary(c)]
    # The 800 m cell count weights the hex in basin means: edge hexes are only partly in the basin.
    hexes.append([c, [round(float(v), 1) for v in d], round(float(d.sum()), 1), int(round(a["vol"])), ring, a["n"]])
hexes.sort(key=lambda h: h[0])

basin = json.loads((D / cfg["boundary"]).read_text())
geom = basin["features"][0]["geometry"] if "features" in basin else basin
def thin(ring, step=4): return [[round(x, 4), round(y, 4)] for x, y in ring[::step]] + [[round(ring[0][0], 4), round(ring[0][1], 4)]]
if geom["type"] == "Polygon": geom = {"type": "Polygon", "coordinates": [thin(r) for r in geom["coordinates"]]}
else: geom = {"type": "MultiPolygon", "coordinates": [[thin(r) for r in p] for p in geom["coordinates"]]}
pts = np.array([p for h in hexes for p in h[4]])
bounds = [[float(pts[:, 0].min()), float(pts[:, 1].min())], [float(pts[:, 0].max()), float(pts[:, 1].max())]]

index = {h[0]: i for i, h in enumerate(hexes)}
def hex_of(lng, lat): return index.get(h3.latlng_to_cell(lat, lng, RES), -1)

# Towns: [name, lng, lat, hex index, label placement ("right" unless the config says "above" or "below")].
places = cfg.get("town_labels", {})
towns = [[n, round(lng, 4), round(lat, 4), hex_of(lng, lat), places.get(n, "right")] for n, lat, lng in cfg.get("towns", [])]

rivers = []
rivers_path = config_path.with_suffix(".rivers.geojson")
if rivers_path.exists():
    def densify(line, step=0.01):
        # Extra points about 1 km apart, so a river follows the column tops instead of cutting through them.
        pts = []
        for (x0, y0), (x1, y1) in zip(line, line[1:]):
            n = max(1, int(max(abs(x1 - x0), abs(y1 - y0)) / step))
            pts += [(x0 + (x1 - x0) * t / n, y0 + (y1 - y0) * t / n) for t in range(n)]
        return pts + [tuple(line[-1])]
    by_name = {}
    for f in json.loads(rivers_path.read_text())["features"]:
        g, name, da = f["geometry"], f["properties"]["GNIS_NAME"], f["properties"]["TotDASqKM"]
        for line in (g["coordinates"] if g["type"] == "MultiLineString" else [g["coordinates"]]):
            path = [[round(x, 4), round(y, 4), hex_of(x, y)] for x, y in densify([c[:2] for c in line])]
            by_name.setdefault(name, []).append((da, path))
    # Where along each river (reaches sorted by drainage area, 0 = smallest) its name goes; null leaves it unlabeled.
    label_at = cfg["rivers"].get("label_at", {})
    for name, reaches in by_name.items():
        reaches.sort(key=lambda r: r[0])
        at = label_at.get(name, 0.5)
        mid = reaches[min(len(reaches) - 1, int(len(reaches) * at))][1] if at is not None else None
        rivers.append([name, [r[1] for r in reaches], mid[len(mid) // 2] if mid else None])

iso = [d.isoformat() for d in days]
shown = [iso.index(d) for d in cfg.get("days_shown", iso)]
tot_vol = sum(h[3] for h in hexes)

# Storm-total and daily figures from the run's own summaries, so the panel matches the QGIS project and the report.
summary = None
if (D / "totals.gpkg").exists():
    import sqlite3
    db = sqlite3.connect(D / "totals.gpkg"); db.row_factory = sqlite3.Row
    r = db.execute("select * from basin_total where prism_start = ? and prism_end = ?", (cfg["start"], cfg["end"])).fetchone()
    db.close()
    if r: summary = {k: r[k] for k in ("name", "huc", "area_km2", "mean_mm", "max_mm", "volume_m3", "volume_acre_ft")}
daily_stats = {}
if (D / "daily_basin_summary.csv").exists():
    import csv
    for row in csv.DictReader(open(D / "daily_basin_summary.csv")):
        daily_stats[row["date"]] = [float(row["basin_mean_mm"]), float(row["basin_max_mm"])]

out.mkdir(parents=True, exist_ok=True)
json.dump({"title": cfg["title"], "description": cfg.get("description", ""), "day_note": cfg.get("day_note", ""),
           "res": RES, "days": iso, "days_shown": shown, "bounds": bounds, "view": cfg.get("view", {}),
           "source": "PRISM 800 m daily precipitation, aggregated to H3 by cell center",
           "total_volume_m3": tot_vol, "summary": summary, "daily_stats": [daily_stats.get(d) for d in iso], "hexes": hexes, "basin": geom, "towns": towns, "rivers": rivers},
          open(out / "data.json", "w"), separators=(",", ":"))
shutil.copy(Path(__file__).with_name("template.html"), out / "index.html")

dep = np.array([h[2] for h in hexes])
print(len(hexes), "hexes; cells", len(cells), "; volume", f"{tot_vol:.4e}", "; depth max", dep.max(), "mean", dep.mean().round(1),
      "; towns", sum(t[3] >= 0 for t in towns), "of", len(towns), "in basin; rivers", len(rivers),
      "; size", (out / "data.json").stat().st_size // 1024, "KB ->", out)
