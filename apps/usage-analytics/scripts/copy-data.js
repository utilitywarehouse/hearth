// Sync committed data/ snapshots into public/data/ so the SPA can fetch them at
// runtime (they're kept out of the JS bundle). Run before `dev` and `build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(here, '..');
const src = path.join(appRoot, 'data');
const dest = path.join(appRoot, 'public', 'data');

if (!fs.existsSync(src)) {
  console.warn(`[copy-data] no data/ directory at ${src} — nothing to copy.`);
  process.exit(0);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
// state/ is collector bookkeeping, not needed by the SPA.
fs.cpSync(src, dest, {
  recursive: true,
  filter: srcPath => !srcPath.split(path.sep).includes('state'),
});

console.log(`[copy-data] copied data/ -> public/data/`);
