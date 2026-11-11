import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { INDEXED_PACKAGES } from './indexed-packages.js';
import { runCheck, type Pack } from './run-check.js';

// Run from `packages/manifest/dist/check.js`: `--tarball` also checks what `npm pack` would publish.
const packages = fileURLToPath(new URL('../..', import.meta.url));

const pack: Pack = cwd =>
  JSON.parse(
    execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
      cwd,
      encoding: 'utf8',
    })
  );

const errors = runCheck(
  packages,
  INDEXED_PACKAGES,
  process.argv.includes('--tarball') ? pack : undefined
);
const failing = Object.entries(errors);

for (const [dir, messages] of failing) {
  console.error(`packages/${dir}:\n${messages.map(message => `  - ${message}`).join('\n')}`);
}
if (failing.length) process.exit(1);
console.log(
  `Checked ${INDEXED_PACKAGES.length} indexed packages: all ship a valid, in-sync manifest.`
);
