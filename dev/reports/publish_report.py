"""Copy a PRISM Storm Analysis HTML report onto the site, ready for figures to link into.

The report is self-contained (inline CSS, SVG, and one small tooltip script), so it is copied as is, except:
- each section heading gets a stable id (#timeline, #gauges, #runoff, #uncertainty, #snow), so a figure on the
  project page can open the report at its chart;
- a link back to the project page goes above the title, and the page title gets the report's dates;
- the footer drops the run folder's local path and the figures folder, and links the tools' GitHub repo;
- notes written for whoever runs the tools are reworded for readers (rerun this script, roadmap numbers, a docs
  path that becomes a link).
Each replacement must match, or the script stops, so a change in report.py's wording shows up here.

Usage: python3 dev/reports/publish_report.py <run>/report/storm_report_<start>_<end>.html public/reports/<slug> \
           --back /projects/<project>/ --back-label "<Project title>"
"""
import argparse, re, sys
from pathlib import Path

REPO = "https://github.com/stephenconklin/PRISM_Storm_Analysis"
SECTIONS = {"Storm timeline": "timeline", "PRISM vs rain gauges": "gauges", "Where the water went": "runoff",
            "Volume and its uncertainty": "uncertainty", "Snow check at SNOTEL stations": "snow"}

ap = argparse.ArgumentParser()
ap.add_argument("report", type=Path)
ap.add_argument("out_dir", type=Path)
ap.add_argument("--back", required=True, help="site path of the project page")
ap.add_argument("--back-label", required=True)
a = ap.parse_args()
s = a.report.read_text()

def sub(pattern, repl, text, required=True, flags=0):
    new, n = re.subn(pattern, repl, text, flags=flags)
    if required and not n:
        sys.exit(f"{a.report.name}: no match for {pattern!r}; has report.py changed?")
    return new

# Section anchors.
for heading, slug in SECTIONS.items():
    s = sub(rf"<h2>{re.escape(heading)}</h2>", f'<h2 id="{slug}">{heading}</h2>', s)

# Title with the dates, from "PRISM days Oct 20 – Oct 27, 2026."
days = re.search(r"PRISM days (.+?), (\d{4})\.", s)
if not days:
    sys.exit(f"{a.report.name}: no 'PRISM days ...' line")
s = sub(r"<title>(.*?) storm report</title>",
        rf"<title>\1 storm report, PRISM days {days[1]}, {days[2]}</title>", s)

# Back link and anchor offset.
s = sub(r"</style>", "h2[id]{scroll-margin-top:16px} .back{font-size:13px;margin:0 0 16px} "
        ".back a,.note a{color:var(--s1)}\n</style>", s, flags=0)
s = sub(r"<body><main>", f'<body><main><p class="back"><a href="{a.back}">&larr; {a.back_label}</a></p>', s)

# Footer: no local paths.
s = sub(r"by PRISM Storm Analysis report\.py from [^<]*?\. (PRISM data:)",
        rf'by <a href="{REPO}">PRISM Storm Analysis</a>. \1', s)
s = sub(r" Figures as SVG in report/figures/\.", "", s)

# Notes for the operator, reworded for readers.
s = sub(r"\(docs/UNCERTAINTY\.md\)", f'(<a href="{REPO}/blob/main/docs/UNCERTAINTY.md">how the range is built</a>)', s)
s = sub(r"comparison with other precipitation products \(roadmap [\d.]+\) not built",
        "comparison with other precipitation products not built yet", s)
s = sub(r"The flow record ends before the requested recession window; rerun validate_runoff\.py later\.",
        "The flow record ends before the recession is over, so these runoff ratios are provisional.", s,
        required=False)

leftover = re.findall(r"/Volumes/|/Users/|\.py\b|roadmap", s)
if leftover:
    sys.exit(f"{a.report.name}: still mentions {sorted(set(leftover))}")
a.out_dir.mkdir(parents=True, exist_ok=True)
(a.out_dir / a.report.name).write_text(s)
print("wrote", a.out_dir / a.report.name)
