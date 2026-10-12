// Capture screenshots of a web page via Chrome DevTools Protocol.
// Usage: node dev/screenshots/capture_page.mjs <outdir> <width> <height> <waitMs> <name=url> ...
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [outdir, W, H, WAIT, ...shots] = process.argv.slice(2);
const port = 9333;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  '--ignore-gpu-blocklist', '--hide-scrollbars', `--window-size=${W},${H}`,
  `--user-data-dir=${path.join(outdir, '.chrome')}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page');
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 2, mobile: false });
for (const s of shots) {
  const [name, url] = [s.slice(0, s.indexOf('=')), s.slice(s.indexOf('=') + 1)];
  await send('Page.navigate', { url });
  await sleep(+WAIT);
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outdir, `${name}.png`), Buffer.from(r.result.data, 'base64'));
  console.log('saved', name);
}
ws.close();
chrome.kill();
