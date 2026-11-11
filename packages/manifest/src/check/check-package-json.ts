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
    const resolved = resolveExport(pkg.exports, `./${MANIFEST_FILE}`);
    if (resolved === UNMATCHED) {
      errors.push(`"exports" does not expose ./${MANIFEST_FILE}`);
    } else if (resolved?.replace(/^\.\//, '') !== MANIFEST_FILE) {
      errors.push(`"exports" does not resolve ./${MANIFEST_FILE} to the root manifest`);
    }
  }
  return errors;
}

const UNMATCHED = Symbol('unmatched');

// The conditions `require.resolve` matches, which is how the CLI finds the manifest.
const CONDITIONS = ['require', 'node', 'default'];

/** A target string, `null` where the package excludes it, `undefined` where no condition matches. */
const resolveTarget = (target: unknown): string | null | undefined => {
  if (typeof target === 'string' || target === null) return target;
  if (Array.isArray(target)) {
    return target.map(resolveTarget).find(item => typeof item === 'string');
  }
  if (typeof target === 'object') {
    for (const [condition, value] of Object.entries(target)) {
      const resolved = CONDITIONS.includes(condition) ? resolveTarget(value) : undefined;
      if (resolved !== undefined) return resolved;
    }
  }
  return undefined;
};

/**
 * Where Node resolves `subpath` through `exports`: the target path, `null`/`undefined` where it is
 * excluded or unreachable, or `UNMATCHED` where no entry applies. An exact entry beats a `*`
 * pattern, and a longer pattern prefix beats a shorter one.
 */
const resolveExport = (
  exports: unknown,
  subpath: string
): string | null | undefined | typeof UNMATCHED => {
  const map =
    typeof exports === 'object' && exports !== null && !Array.isArray(exports)
      ? (exports as Record<string, unknown>)
      : {};
  if (subpath in map) return resolveTarget(map[subpath]);

  const [pattern] = Object.keys(map)
    .filter(key => key.includes('*'))
    .map(key => ({
      key,
      prefix: key.slice(0, key.indexOf('*')),
      suffix: key.slice(key.indexOf('*') + 1),
    }))
    .filter(
      ({ prefix, suffix }) =>
        subpath.length >= prefix.length + suffix.length &&
        subpath.startsWith(prefix) &&
        subpath.endsWith(suffix)
    )
    .sort((a, b) => b.prefix.length - a.prefix.length || b.key.length - a.key.length);
  if (!pattern) return UNMATCHED;

  const match = subpath.slice(pattern.prefix.length, subpath.length - pattern.suffix.length);
  return resolveTarget(map[pattern.key])?.replaceAll('*', match);
};
