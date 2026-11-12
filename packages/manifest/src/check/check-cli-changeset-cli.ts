import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { checkCliChangeset } from './check-cli-changeset.js';

// Run from the repo root as `node packages/manifest/dist/check-cli-changeset.js <base-ref>`.
const base = process.argv[2] ?? 'origin/main';
const changed = execFileSync('git', ['diff', '--name-only', `${base}...HEAD`], {
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

const dir = '.changeset';
const changesets = readdirSync(dir)
  .filter(file => file.endsWith('.md') && file !== 'README.md')
  .map(file => readFileSync(join(dir, file), 'utf8'));

const errors = checkCliChangeset(changed, changesets);
for (const message of errors) console.error(message);
if (errors.length) process.exit(1);
console.log('Manifest schema unchanged, or released with a CLI changeset.');
