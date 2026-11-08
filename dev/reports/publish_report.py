"""Copy PRISM Storm Analysis web reports onto the site, after checking they're safe to link into.

PRISM Storm Analysis writes web-ready reports with `report.py --web` (to events/<event>/report/web/ in the run): section
anchors, the dates in the title, a link back to the project page, and no local paths or notes meant for whoever runs
the tools. This script copies them as they are, but first checks each one, so a report made without --web (or with
the wrong back link) can't reach the site:
- every section anchor the project page links to is present (#timeline, #gauges, #runoff, #uncertainty, #snow);
- the back link points at --back;
- nothing mentions a local path (/Volumes/, /Users/), a .py script, or a roadmap number.

Usage: python3 dev/reports/publish_report.py public/reports/<slug> --back /projects/<project>/ <run>/events/*/report/web/*.html
"""
import argparse, re, shutil, sys
from pathlib import Path

ANCHORS = ["timeline", "gauges", "runoff", "uncertainty", "snow"]

ap = argparse.ArgumentParser()
ap.add_argument("out_dir", type=Path)
ap.add_argument("--back", required=True, help="site path of the project page the reports link back to")
ap.add_argument("reports", type=Path, nargs="+")
a = ap.parse_args()

problems = []
for report in a.reports:
    s = report.read_text()
    missing = [x for x in ANCHORS if f'id="{x}"' not in s]
    if missing:
        problems.append(f"{report.name}: no anchor for {', '.join('#' + x for x in missing)} (made without --web?)")
    if f'<p class="back"><a href="{a.back}">' not in s:
        problems.append(f"{report.name}: no back link to {a.back} (report.py --web --back-url {a.back})")
    leftover = sorted(set(re.findall(r"/Volumes/|/Users/|\b\w+\.py\b|roadmap", s)))
    if leftover:
        problems.append(f"{report.name}: mentions {', '.join(leftover)}")
if problems:
    sys.exit("\n".join(problems))

a.out_dir.mkdir(parents=True, exist_ok=True)
for report in a.reports:
    shutil.copyfile(report, a.out_dir / report.name)
    print("copied", a.out_dir / report.name)
