import { execFileSync } from 'node:child_process';
import { packageRoot } from './run-binary.js';

/** Vitest global setup: builds `dist/cli.js` once, so test files that run the binary do not each rebuild (and clean) it. */
export default function setup() {
  execFileSync('npx', ['tsup'], { cwd: packageRoot, stdio: 'pipe' });
}
