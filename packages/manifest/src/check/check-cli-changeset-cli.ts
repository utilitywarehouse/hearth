import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { checkCliChangeset } from './check-cli-changeset.js';

// `pnpm --filter` runs this from `packages/manifest`, so work from the repo root, where `.changeset` and the diff paths live.
const git = (args: Array<string>) => execFileSync('git', args, { encoding: 'utf8' });
const root = git(['rev-parse', '--show-toplevel']).trim();
const base = process.argv[2] ?? 'origin/main';
const changed = git(['-C', root, 'diff', '--name-only', `${base}...HEAD`])
  .split('\n')
  .filter(Boolean);

const dir = join(root, '.changeset');
const changesets = readdirSync(dir)
  .filter(file => file.endsWith('.md') && file !== 'README.md')
  .map(file => readFileSync(join(dir, file), 'utf8'));

const errors = checkCliChangeset(changed, changesets);
for (const message of errors) console.error(message);
if (errors.length) process.exit(1);
console.log('Manifest schema unchanged, or released with a CLI changeset.');
