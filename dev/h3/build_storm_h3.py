"""Build a 3D storm hex map for the website from a PRISM Storm Analysis run.

Aggregates the run's 800 m daily precipitation clips to H3 hexagons and writes <out>/data.json: per hex, mean daily
depths (mm, weighted by cell area), mean storm depth (mm), storm volume (m3, sum of cell volumes), the hex outline
(lng, lat), so the page needs no H3 library, its 800 m cell count, its area in the basin (m2) and, with "rain_snow" in
the config, its mean daily rain depths (mm). Depth times area gives the volume of any run of days, which the range
template (template_range.html) uses. Towns and rivers (from fetch_rivers.py) are tagged with the hex each point falls
in, so the page can set them on the column tops. Also copies the template (config "template", default template.html)
to <out>/index.html.

Run folders: the PRISM Storm Analysis folder layout of 7 Nov 2026 (basin/, daily/, events/<event>/; see its
scripts/layout.py) and the older one with everything at the top level. The config names files by their file name
("boundary", "volume_tif"); run_file() finds them in either layout.

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

def event_dirs():
    """{(start, end): folder} of the run's storm windows (events/<event>/event.json)."""
    found = {}
    for d in sorted((D / "events").glob("*/")) if (D / "events").is_dir() else []:
        try:
            w = json.loads((d / "event.json").read_text())
            found[(str(w["start"]), str(w["end"]))] = d
        except (OSError, ValueError, KeyError):
            pass
    return found

EVENTS = event_dirs()

def window_of(name):
    """(start, end) ISO dates from a name ending in _<YYYYMMDD>_<YYYYMMDD>[.ext], else None."""
    import re
    m = re.search(r"_(\d{8})_(\d{8})(?:\.[a-z]+)?$", Path(name).name)
    return tuple(f"{x[:4]}-{x[4:6]}-{x[6:]}" for x in m.groups()) if m else None

def run_file(name, sub=None, window=None):
    """A file of the run: in the current layout (basin/, daily/, events/<event>/<sub>/), else at the top (older
    runs). window defaults to the one in the file name; returns the first candidate when none exists."""
    w = window or window_of(name)
    cands = [D / "basin" / name, D / "daily" / name, D / "daily" / "clipped" / name]
    if w and w in EVENTS:
        cands += [EVENTS[w] / s / name for s in ([sub] if sub else ["totals", "subbasins", "validation"])]
    cands += [D / name, D / "clipped" / name]
    return next((c for c in cands if c.exists()), cands[0])

def read(p):
    with rasterio.open(p) as r:
        a = r.read(1, masked=True).astype("float64")
        return a.filled(np.nan), r.transform

def cell_area_m2(T, height):
    """Ellipsoidal (GRS80) area of one cell in each row, as storm_total.cell_area_m2 in PRISM Storm Analysis."""
    f = 1 / 298.257222101; e2 = f * (2 - f); e = np.sqrt(e2); b2 = 6378137.0 ** 2 * (1 - e2)
    q = lambda lat: (s := np.sin(np.radians(lat))) / (1 - e2 * s * s) - np.log((1 - e * s) / (1 + e * s)) / (2 * e)
    top = T.f + np.arange(height) * T.e
    return np.abs(np.radians(T.a) * b2 / 2 * (q(top) - q(top + T.e)))

vol, T = read(run_file(Path(cfg["volume_tif"]).name, "totals"))
daily = [read(run_file(f"ppt_800m_{d:%Y%m%d}_clip.tif"))[0] for d in days]
# Rain share of each cell-day from tmean: all snow at or below all_snow_c, all rain at or above all_rain_c, linear
# between (storm_total.snow_fraction). The ramp comes from the config, else the run's storm.toml, else 0-3 C.
settings = {}
if (D / "storm.toml").exists():
    import tomllib
    settings = tomllib.loads((D / "storm.toml").read_text())
ramp = cfg["rain_snow"] if isinstance(cfg.get("rain_snow"), dict) else settings.get("rain_snow", {})
snow_c, rain_c = ramp.get("all_snow_c", 0.0), ramp.get("all_rain_c", 3.0)
def rain_share(t):
    f = (t >= snow_c).astype(float) if rain_c <= snow_c else np.clip((t - snow_c) / (rain_c - snow_c), 0.0, 1.0)
    return np.where(np.isnan(t), np.nan, f)
rain = None
if cfg.get("rain_snow"):
    rain = [dd * rain_share(read(run_file(f"tmean_800m_{d:%Y%m%d}_clip.tif"))[0]) for d, dd in zip(days, daily)]
rows, cols = np.where(np.isfinite(vol))
xs, ys = rasterio.transform.xy(T, rows, cols)
cells = [h3.latlng_to_cell(y, x, RES) for x, y in zip(xs, ys)]
area = cell_area_m2(T, vol.shape[0])

agg = {}
for i, c in enumerate(cells):
    r, k = rows[i], cols[i]
    a = agg.setdefault(c, {"n": 0, "area": 0.0, "vol": 0.0, "d": np.zeros(len(days)), "rain": np.zeros(len(days))})
    a["n"] += 1; a["area"] += area[r]; a["vol"] += vol[r, k]
    a["d"] += [dd[r, k] * area[r] for dd in daily]
    if rain: a["rain"] += [rr[r, k] * area[r] for rr in rain]

hexes = []
for c, a in agg.items():
    d = a["d"] / a["area"]
    ring = [[round(lng, 4), round(lat, 4)] for lat, lng in h3.cell_to_boundary(c)]
    # The 800 m cell count weights the hex in basin means: edge hexes are only partly in the basin. The area (m2)
    # does the same exactly, and turns a depth into a volume.
    h = [c, [round(float(v), 2) for v in d], round(float(d.sum()), 1), int(round(a["vol"])), ring, a["n"], round(a["area"])]
    if rain: h.append([round(float(v), 2) for v in a["rain"] / a["area"]])
    hexes.append(h)
hexes.sort(key=lambda h: h[0])

basin = json.loads(run_file(Path(cfg["boundary"]).name).read_text())
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
def basin_total(start, end):
    """The run's basin_total row for a window: layer basin_total_<span> in the window's totals.gpkg (current layout),
    else basin_total_<span> or a matching plain basin_total in the top-level totals.gpkg (older runs)."""
    import sqlite3
    span = start.replace("-", "") + "_" + end.replace("-", "")
    gpkg = run_file("totals.gpkg", "subbasins", (start, end))
    if not gpkg.exists():
        return None
    db = sqlite3.connect(gpkg); db.row_factory = sqlite3.Row
    r = None
    for q, args in ((f"select * from basin_total_{span}", ()),
                    ("select * from basin_total where prism_start = ? and prism_end = ?", (start, end))):
        try:
            r = db.execute(q, args).fetchone()
        except sqlite3.OperationalError:
            continue
        if r:
            break
    db.close()
    return {k: r[k] for k in ("name", "huc", "area_km2", "mean_mm", "max_mm", "volume_m3", "volume_acre_ft")} if r else None

summary = basin_total(cfg["start"], cfg["end"])
daily_stats = {}
if run_file("daily_basin_summary.csv").exists():
    import csv
    for row in csv.DictReader(open(run_file("daily_basin_summary.csv"))):
        # [basin mean mm, cell max mm, PRISM release (1-8; 8 is final)]
        daily_stats[row["date"]] = [float(row["basin_mean_mm"]), float(row["basin_max_mm"]), int(row.get("release") or 0)]

# The run's named events (storm.toml) inside the map's days, with their basin totals and uncertainty ranges, so the
# page can name a selected window and quote the run's own figures for it.
events = []
for e in settings.get("events", []):
    es, ee = str(e["start"]), str(e["end"])
    if es < cfg["start"] or ee > cfg["end"]:
        continue
    span = es.replace("-", "") + "_" + ee.replace("-", "")
    ev = {"name": e["name"], "label": cfg.get("event_labels", {}).get(e["name"], e["name"]), "start": es, "end": ee}
    s_ = basin_total(es, ee)
    if s_: ev["summary"] = s_
    unc = run_file(f"ppt_800m_uncertainty_{span}.json", "totals")
    if unc.exists():
        u = json.loads(unc.read_text())
        ev["range_m3"] = u.get("range_m3")
        if u.get("rain"): ev["rain_m3"] = u["rain"]["rain_m3"]
    events.append(ev)

out.mkdir(parents=True, exist_ok=True)
json.dump({"title": cfg["title"], "description": cfg.get("description", ""), "day_note": cfg.get("day_note", ""),
           "res": RES, "days": iso, "days_shown": shown, "initial": cfg.get("initial"), "bounds": bounds, "view": cfg.get("view", {}),
           "source": "PRISM 800 m daily precipitation, aggregated to H3 by cell center",
           "total_volume_m3": tot_vol, "summary": summary, "daily_stats": [daily_stats.get(d) for d in iso], "events": events,
           "rain_snow": [snow_c, rain_c] if rain else None, "hexes": hexes, "basin": geom, "towns": towns, "rivers": rivers},
          open(out / "data.json", "w"), separators=(",", ":"))
shutil.copy(Path(__file__).with_name(cfg.get("template", "template.html")), out / "index.html")

dep = np.array([h[2] for h in hexes])
area_vol = sum(sum(h[1]) * h[6] / 1000 for h in hexes)
print(len(hexes), "hexes; cells", len(cells), "; volume", f"{tot_vol:.4e}", "(daily depth x area", f"{area_vol:.4e})", "; depth max", dep.max(), "mean", dep.mean().round(1),
      "; towns", sum(t[3] >= 0 for t in towns), "of", len(towns), "in basin; rivers", len(rivers),
      "; size", (out / "data.json").stat().st_size // 1024, "KB ->", out)
