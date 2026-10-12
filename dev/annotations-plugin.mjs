// Dev-only Vite middleware that stores review notes made in the browser
// (see src/components/Annotator.astro) in annotations.json at the project root.
import fs from 'node:fs';
import path from 'node:path';

const FILE = path.resolve('annotations.json');

const load = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return [];
  }
};
const save = (notes) => fs.writeFileSync(FILE, JSON.stringify(notes, null, 2) + '\n');

const body = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
  });

export default function annotations() {
  return {
    name: 'portfolio-annotations',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__annotations', async (req, res) => {
        const send = (code, data) => {
          res.statusCode = code;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
        try {
          const notes = load();
          if (req.method === 'GET') return send(200, notes);
          if (req.method === 'POST') {
            const n = await body(req);
            const note = {
              id: Date.now().toString(36),
              status: 'open',
              created: new Date().toISOString(),
              page: String(n.page ?? ''),
              style: String(n.style ?? ''),
              viewport: Number(n.viewport) || null,
              selector: String(n.selector ?? ''),
              element: String(n.element ?? '').slice(0, 200),
              note: String(n.note ?? ''),
            };
            notes.push(note);
            save(notes);
            return send(201, note);
          }
          if (req.method === 'DELETE') {
            const { id } = await body(req);
            save(notes.filter((x) => x.id !== id));
            return send(200, { ok: true });
          }
          send(405, { error: 'method not allowed' });
        } catch (e) {
          send(500, { error: String(e) });
        }
      });
    },
  };
}
