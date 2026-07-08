// Clear committed snapshots (e.g. the seeded sample dataset) so the next
// `pnpm collect` run starts from a clean slate. Resets index.json to empty
// rather than deleting it, since the dashboard fetches it unconditionally.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, '..', 'data');
const snapshotsDir = path.join(dataDir, 'snapshots');
const indexFile = path.join(dataDir, 'index.json');
const checkpointFile = path.join(dataDir, 'state', 'checkpoint.json');

let removed = 0;
if (fs.existsSync(snapshotsDir)) {
  for (const file of fs.readdirSync(snapshotsDir)) {
    fs.rmSync(path.join(snapshotsDir, file));
    removed++;
  }
}

fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(indexFile, JSON.stringify({ schemaVersion: 1, snapshots: [] }, null, 2) + '\n');

fs.rmSync(checkpointFile, { force: true });

console.log(`[clear-data] removed ${removed} snapshot(s), reset index.json, cleared checkpoint.`);
console.log('[clear-data] run `pnpm collect` (with GITHUB_PAT_TOKEN set) to populate real data.');
