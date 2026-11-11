import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const binary = join(packageRoot, 'dist', 'cli.js');

/** Runs the built `hearth` binary in a consumer project and returns what it exited with and printed. */
export const hearth = (cwd: string, args: Array<string>) => {
  const { status, stdout, stderr } = spawnSync(binary, args, { cwd, encoding: 'utf8' });
  return { code: status, out: stdout, err: stderr };
};
