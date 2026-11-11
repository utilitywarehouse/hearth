import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { checkManifest, type PackageIdentity } from './check-manifest.js';
import { checkPackageJson, MANIFEST_FILE, type PackageJson } from './check-package-json.js';
import { checkTarball } from './check-tarball.js';
import type { IndexedPackage } from './indexed-packages.js';

/** Errors per package directory; a package with none is absent. */
export type CheckErrors = Record<string, Array<string>>;

/** Returns the parsed `npm pack --dry-run --json` output for a package directory. */
export type Pack = (packageDir: string) => unknown;

const checkPackage = ({ dir, type }: IndexedPackage, packages: string, pack?: Pack) => {
  const root = join(packages, dir);
  if (!existsSync(join(root, 'package.json'))) return [`packages/${dir} does not exist`];

  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as PackageJson &
    PackageIdentity;
  const errors = checkPackageJson(pkg);

  const manifestPath = join(root, MANIFEST_FILE);
  if (!existsSync(manifestPath)) {
    errors.push(`${MANIFEST_FILE} is missing`);
  } else {
    try {
      errors.push(...checkManifest(JSON.parse(readFileSync(manifestPath, 'utf8')), pkg, { type }));
    } catch (error) {
      errors.push(`${MANIFEST_FILE} is not valid JSON: ${(error as Error).message}`);
    }
  }

  if (pack) errors.push(...checkTarball(pack(root)));
  return errors;
};

/**
 * Checks every indexed package ships a valid, in-sync manifest, and that no package ships one
 * without being listed. With `pack`, also checks what each package's tarball would contain.
 */
export function runCheck(
  packages: string,
  indexed: Array<IndexedPackage>,
  pack?: Pack
): CheckErrors {
  const errors: CheckErrors = {};
  const add = (dir: string, messages: Array<string>) => {
    if (messages.length) errors[dir] = messages;
  };

  for (const entry of indexed) add(entry.dir, checkPackage(entry, packages, pack));

  const registered = new Set(indexed.map(entry => entry.dir));
  for (const dir of readdirSync(packages)) {
    if (!registered.has(dir) && existsSync(join(packages, dir, MANIFEST_FILE))) {
      add(dir, [`ships ${MANIFEST_FILE} but is not in INDEXED_PACKAGES`]);
    }
  }
  return errors;
}
