// People credited across the site. Link a name once per page, at its first important mention.
export const FISHER = {
  name: 'G. Burch Fisher, Ph.D.',
  url: 'https://burchfisher.github.io/',
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes plain text and links the first mention of Dr. Fisher's name. Use with set:html. */
export function linkFisher(text: string): string {
  const safe = esc(text);
  const name = esc(FISHER.name);
  return safe.replace(name, `<a href="${FISHER.url}">${name}</a>`);
}
