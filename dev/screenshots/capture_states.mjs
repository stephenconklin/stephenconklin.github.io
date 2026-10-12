// Capture one page in several control states, e.g. the same map view with different settings.
// Loads the page once, waits for tiles, then for each state resets the listed controls to their
// defaults, applies the state's values, waits briefly and saves a screenshot.
//
// Usage: node dev/screenshots/capture_states.mjs config.json
//
// config.json:
// {
//   "outDir": "…", "url": "https://…/#zoom/lat/lng/bearing/pitch",
//   "width": 1440, "height": 900, "scale": 2, "loadWait": 25000, "stateWait": 2500,
//   "defaults": { "change-min": "20", "change-range": "1.5" },
//   "states": [ { "name": "default" }, { "name": "lod-0", "set": { "change-min": "0" } } ]
// }
// Each key in "defaults"/"set" is an element id; selects get a "change" event, other inputs "input" and "change".
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const cfg = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const { outDir, url, width = 1440, height = 900, scale = 2, loadWait = 25000, stateWait = 2500 } = cfg;
fs.mkdirSync(outDir, { recursive: true });
const port = 9334;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  '--ignore-gpu-blocklist', '--hide-scrollbars', `--window-size=${width},${height}`,
  `--user-data-dir=${path.join(outDir, '.chrome')}`, 'about:blank',
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

const setControls = (values) => `(() => {
  const v = ${JSON.stringify(values)};
  for (const [id, val] of Object.entries(v)) {
    const el = document.getElementById(id);
    if (!el) return 'missing #' + id;
    if (el.type === 'checkbox') el.checked = val === true || val === 'true'; else el.value = val;
    if (el.tagName !== 'SELECT') el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  return 'ok';
})()`;

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile: false });
await send('Page.navigate', { url });
await sleep(loadWait);
for (const s of cfg.states) {
  const r = await send('Runtime.evaluate', { expression: setControls({ ...(cfg.defaults || {}), ...(s.set || {}) }) });
  if (r.result?.result?.value !== 'ok') console.log(s.name, r.result?.result?.value);
  await sleep(stateWait);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, `${s.name}.png`), Buffer.from(shot.result.data, 'base64'));
  console.log('saved', s.name);
}
ws.close();
chrome.kill();
