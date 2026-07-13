/**
 * Read declared dependency versions for tracked packages out of a single
 * `package.json`. Kept separate from `imports.ts` (AST-based source analysis)
 * since this is plain JSON parsing over a different kind of file.
 */
const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const;

/**
 * Parse one `package.json`'s contents and return the declared semver range
 * for each tracked package it depends on (any of the dependency fields).
 * Returns an empty object for unparseable JSON rather than throwing — a
 * malformed package.json elsewhere in a monorepo shouldn't abort the whole
 * repo's collection.
 */
export function collectDeclaredVersions(
  packageJsonContents: string,
  tracked: ReadonlySet<string>
): Record<string, string> {
  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(packageJsonContents) as Record<string, unknown>;
  } catch {
    return {};
  }

  const found: Record<string, string> = {};
  for (const field of DEPENDENCY_FIELDS) {
    const deps = pkg[field];
    if (!deps || typeof deps !== 'object') continue;
    for (const [name, range] of Object.entries(deps as Record<string, unknown>)) {
      if (typeof range !== 'string' || !tracked.has(name)) continue;
      // First declaration wins if a package appears in more than one
      // dependency field of the same file (e.g. both a dep and a peerDep) —
      // rare, and any one of them reflects the same declared range anyway.
      found[name] ??= range;
    }
  }
  return found;
}
