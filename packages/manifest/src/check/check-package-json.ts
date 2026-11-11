export const MANIFEST_FILE = 'hearth-manifest.json';

export type PackageJson = {
  name?: string;
  version?: string;
  files?: Array<string>;
  exports?: unknown;
};

// Matches a `files` entry or `exports` subpath pattern, where `*` stands for any characters.
const matches = (pattern: string, target: string) =>
  new RegExp(
    `^${pattern
      .replace(/^\.\//, '')
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*')}$`
  ).test(target);

/** Errors for a package whose published tarball would not ship, or expose, its manifest. */
export function checkPackageJson(pkg: PackageJson): Array<string> {
  const errors: Array<string> = [];
  if (!(pkg.files ?? []).some(entry => matches(entry, MANIFEST_FILE))) {
    errors.push(`"files" does not include ${MANIFEST_FILE}`);
  }
  if (pkg.exports !== undefined) {
    const subpaths =
      typeof pkg.exports === 'object' && pkg.exports !== null ? Object.keys(pkg.exports) : [];
    if (!subpaths.some(subpath => matches(subpath, MANIFEST_FILE))) {
      errors.push(`"exports" does not expose ./${MANIFEST_FILE}`);
    }
  }
  return errors;
}
