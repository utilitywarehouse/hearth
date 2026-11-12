import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { checkCliChangeset } from './check-cli-changeset.js';

// `pnpm --filter` runs this from `packages/manifest`, so work from the repo root, where `.changeset` and the diff paths live.
const git = (args: Array<string>) => execFileSync('git', args, { encoding: 'utf8' });
const root = git(['rev-parse', '--show-toplevel']).trim();
const base = process.argv[2] ?? 'origin/main';
const changed = git(['-C', root, 'diff', '--name-only', `${base}...HEAD`])
  .split('\n')
  .filter(Boolean);

// Only changesets this PR adds or edits count: one inherited from the base branch may be consumed
// by a release before this PR merges, leaving a schema change with no CLI bump.
const added = git(['-C', root, 'diff', '--name-only', '--diff-filter=AM', `${base}...HEAD`])
  .split('\n')
  .filter(file => /^\.changeset\/.+\.md$/.test(file) && file !== '.changeset/README.md');
const changesets = added.map(file => readFileSync(join(root, file), 'utf8'));

const errors = checkCliChangeset(changed, changesets);
for (const message of errors) console.error(message);
if (errors.length) process.exit(1);
console.log('Manifest schema unchanged, or released with a CLI changeset.');
