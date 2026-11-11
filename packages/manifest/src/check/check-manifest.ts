import type { Manifest } from '../schema.js';
import { validateManifest } from '../validate-manifest.js';

export type PackageIdentity = { name: string; version: string };

/** Errors for a package's `hearth-manifest.json`: schema, expected type, and own name and version. */
export function checkManifest(
  raw: unknown,
  pkg: PackageIdentity,
  expected: { type: Manifest['type'] }
): Array<string> {
  const result = validateManifest(raw);
  if (!result.success) return result.errors;

  const { manifest } = result;
  const errors: Array<string> = [];
  if (manifest.type !== expected.type) {
    errors.push(`type is "${manifest.type}", expected "${expected.type}"`);
  }
  if (manifest.package.name !== pkg.name) {
    errors.push(`package.name is "${manifest.package.name}", expected "${pkg.name}"`);
  }
  if (manifest.package.version !== pkg.version) {
    errors.push(`package.version is "${manifest.package.version}", expected "${pkg.version}"`);
  }
  return errors;
}
