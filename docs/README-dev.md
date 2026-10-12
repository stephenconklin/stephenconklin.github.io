# stephenconklin.github.io

GIS portfolio for Stephen Conklin, built with [Astro](https://astro.build) and deployed to GitHub Pages at **https://stephenconklin.github.io/**.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
```

Pushing to `main` builds and deploys the site with GitHub Actions (`.github/workflows/deploy.yml`).
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions** once.

## Structure

| Path | What |
|---|---|
| `src/content/projects/*.md` | One file per project: frontmatter (metadata, links, skills, maps) and a Markdown write-up |
| `src/content.config.ts` | Schema for the project frontmatter |
| `src/data/taxonomy.ts` | Skill areas and project groups (Research, QGIS, Web maps, Tools) |
| `src/data/profile.ts` | Bio, experience, education and toolbox for the About page |
| `src/data/durango-map.ts` | Durango streets, Animas River and lakes behind the home page portrait (SVG paths, from the ENV 385 Durango data) |
| `src/assets/projects/<project>/` | Project images, optimized at build time |
| `src/pages/` | Home, projects, project detail, maps gallery, How I work (pipeline), about |

## Adding a project

Create `src/content/projects/<slug>.md`, copying the frontmatter of an existing project. `status` is
`public` (repo on GitHub, shows a GitHub button), `upcoming` (shows "Publishing soon", no repo link) or
`research` (no standalone repo). When an upcoming project is published, set `status: public` and add `repo:`.

## Adding a static map

Every project has a `maps:` list. An entry with only a `title` (and optional `caption`) shows as a
reserved "Map in preparation" frame on the project page and on `/maps/`. To fill it, put the image in
`src/assets/projects/<slug>/` and add `src` and `alt`:

```yaml
maps:
  - title: Relative Elevation Model of a meandering river
    caption: Height above river, 0–10 m.
    src: ../../assets/projects/qgis-rem/rem_example.png
    alt: REM of a meandering river floodplain
```

The `cover:` image shows on project cards; projects without one get a contour-pattern card.

## Screenshots

How the dashboard, web map and desktop-app screenshots were captured and cropped (window sizes, settings, scripts):
[docs/SCREENSHOTS.md](docs/SCREENSHOTS.md).

## Analytics

Cookie-free page-view and click analytics with [GoatCounter](https://stephenconklin.goatcounter.com)
(`src/components/Analytics.astro`). It loads on the published site only, so local previews aren't counted.
Clicks on email, GitHub, the live BioSCape dashboard, the live Dolores map and other outside links are recorded as
events (`email`, `github`, `bioscape-dashboard`, `dolores-live-map`, `outbound-<site>`), each with the page it came from.

## Look and feel

The site uses the **Field Notes** style: paper backgrounds, a spruce-green accent, a rust second accent and Source
Serif headings, with a matching dark mode (automatic, or the toggle in the header). It's set by `DEFAULT_STYLE` in
`src/data/styles.ts`; its colors are in `src/styles/variants.css` (the "Original base" block).

The other styles are kept for future use. Preview one by adding `?style=journey` (or `pitch`, `atlas`, …) to any
URL; fonts that only they use load on demand. A style picker (`src/components/StylePicker.astro`) is also kept but
not shown; to bring it back, add `<StylePicker />` to `src/layouts/Base.astro`.

The design concepts used along the way (the old `/concepts/` pages) are kept locally in `dev/archive/`, which is
not built and not part of the repository.
