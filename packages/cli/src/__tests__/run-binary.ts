import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const binary = join(packageRoot, 'dist', 'cli.js');

/** A hung binary must fail the test, not block the worker until the CI job times out. */
const TIMEOUT_MS = 30_000;

/** Runs the built `hearth` binary in a consumer project and returns what it exited with and printed. */
export const hearth = (cwd: string, args: Array<string>) => {
  const { status, stdout, stderr } = spawnSync(binary, args, {
    cwd,
    encoding: 'utf8',
    timeout: TIMEOUT_MS,
  });
  return { code: status, out: stdout, err: stderr };
};
