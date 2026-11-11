import { readFileSync, statSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';

/** The most `--print` will output; bigger assets are read from the file instead. */
export const MAX_PRINT_BYTES = 100 * 1024;

export type ReadAssetResult =
  | { status: 'ok'; content: string }
  | { status: 'too-large'; path: string; bytes: number; limit: number }
  | { status: 'outside-package'; file: string }
  | { status: 'missing'; path: string };

/** The contents of `file` (a path from the manifest) inside the package at `packageDir`, if it is there and small enough to print. */
export const readAsset = (
  packageDir: string,
  file: string,
  limit = MAX_PRINT_BYTES
): ReadAssetResult => {
  const path = resolve(packageDir, file);
  const fromPackage = relative(packageDir, path);
  if (fromPackage.startsWith('..') || isAbsolute(fromPackage)) {
    return { status: 'outside-package', file };
  }
  let bytes: number;
  try {
    bytes = statSync(path).size;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { status: 'missing', path };
    throw error;
  }
  if (bytes > limit) return { status: 'too-large', path, bytes, limit };
  return { status: 'ok', content: readFileSync(path, 'utf8') };
};
