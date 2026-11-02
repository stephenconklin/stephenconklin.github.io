"""Download a storm hex map's rivers from the USGS NHDPlus small-scale flowlines.

Takes the rivers named in the map's config, every reach draining at least `min_drainage_km2`, inside the basin outline,
and writes them next to the config as <config name>.rivers.geojson, where build_storm_h3.py finds them.
Usage: python dev/h3/fetch_rivers.py dev/h3/maps/<map>.json
"""
import json, sys, urllib.parse, urllib.request
from pathlib import Path

URL = "https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/4/query"

config_path = Path(sys.argv[1])
cfg = json.loads(config_path.read_text())
rv = cfg["rivers"]

basin = json.loads((Path(cfg["run"]) / cfg["boundary"]).read_text())
geom = basin["features"][0]["geometry"] if "features" in basin else basin
rings = geom["coordinates"] if geom["type"] == "Polygon" else [r for p in geom["coordinates"] for r in p]
rings = [r[::3] + [r[0]] for r in rings]  # thinned; the query only needs the outline roughly
names = ",".join("'" + n.replace("'", "''") + "'" for n in rv["names"])

feats, offset = [], 0
while True:
    body = urllib.parse.urlencode({
        "where": f"GNIS_NAME IN ({names}) AND TotDASqKM >= {rv['min_drainage_km2']}",
        "geometry": json.dumps({"rings": rings, "spatialReference": {"wkid": 4326}}),
        "geometryType": "esriGeometryPolygon", "inSR": 4326, "outSR": 4326, "spatialRel": "esriSpatialRelIntersects",
        "outFields": "GNIS_NAME,TotDASqKM", "maxAllowableOffset": 0.002, "resultOffset": offset, "f": "geojson",
    }).encode()
    page = json.load(urllib.request.urlopen(URL, body, timeout=120))
    feats += page["features"]
    offset += len(page["features"])
    if not page.get("exceededTransferLimit") or not page["features"]:
        break

out = config_path.with_suffix(".rivers.geojson")
json.dump({"type": "FeatureCollection", "features": feats}, open(out, "w"))
found = sorted({f["properties"]["GNIS_NAME"] for f in feats})
print(len(feats), "reaches:", found, "\nnot found:", sorted(set(rv["names"]) - set(found)) or "none", "\n->", out)
