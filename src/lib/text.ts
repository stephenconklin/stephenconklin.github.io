// Species names to set in italics wherever they appear in captions and other plain-text fields.
const ITALIC = ['E. coli'];

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes plain text and italicizes species names. Use with set:html. */
export function italicize(text: string): string {
  return ITALIC.reduce((s, name) => s.split(esc(name)).join(`<i>${esc(name)}</i>`), esc(text));
}
