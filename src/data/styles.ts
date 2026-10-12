// Site styles. The site ships with DEFAULT_STYLE (Field Notes). Others can be previewed with ?style=<key> in the
// URL. The style picker (src/components/StylePicker.astro) is kept for future use but not shown; to bring it
// back, add <StylePicker /> to src/layouts/Base.astro.
export const STYLES = {
  field: { name: 'Field Notes', note: 'Published style: paper, Source Serif headings, spruce green' },
  journey: { name: 'Journey', note: 'Warm paper, canyon rust, Fraunces headings' },
  pitch: { name: 'Clear Pitch', note: 'Clean, Fraunces headings, spruce green' },
  console: { name: 'Mission Control', note: 'Dark, technical, grid' },
  atlas: { name: 'Atlas', note: 'Editorial, image-led, list layout' },
  swiss: { name: 'Swiss', note: 'Minimal, bold type, red accent' },
  scholar: { name: 'Scholar', note: 'Researcher: statement, research and software as publications' },
  gallery: { name: 'Gallery', note: 'Cartographer: a wall of maps, minimal text' },
  cases: { name: 'Case Studies', note: 'Problem-solver: problem, what I built, result' },
} as const;

export type StyleKey = keyof typeof STYLES;
export const DEFAULT_STYLE: StyleKey = 'field';
