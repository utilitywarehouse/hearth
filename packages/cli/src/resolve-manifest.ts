import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import {
  MANIFEST_TYPES,
  SCHEMA_VERSION,
  validateManifest,
  type Manifest,
} from '@utilitywarehouse/hearth-manifest';

type ManifestOfType<T extends Manifest['type']> = Extract<Manifest, { type: T }>;

export type ResolveResult<T extends Manifest['type'] = Manifest['type']> =
  | { status: 'ok'; manifest: ManifestOfType<T>; path: string }
  | { status: 'not-installed'; packageName: string }
  | { status: 'no-manifest'; packageName: string }
  | { status: 'invalid'; packageName: string; errors: Array<string> }
  | { status: 'unsupported-schema'; packageName: string; found: number; supported: number }
  | { status: 'unsupported-type'; packageName: string; found: string };

/**
 * Reads and validates the `hearth-manifest.json` of a package installed in `fromDir`'s `node_modules`,
 * and checks it is the `type` of manifest the caller expects from that package.
 */
export const resolveManifest = <T extends Manifest['type']>(
  packageName: string,
  fromDir: string,
  type: T
): ResolveResult<T> => {
  let path: string;
  try {
    path = createRequire(join(fromDir, 'noop.js')).resolve(`${packageName}/hearth-manifest.json`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
      // the package may be installed at a version that predates the manifest
      try {
        createRequire(join(fromDir, 'noop.js')).resolve(`${packageName}/package.json`);
        return { status: 'no-manifest', packageName };
      } catch {
        return { status: 'not-installed', packageName };
      }
    }
    throw error;
  }
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    return {
      status: 'invalid',
      packageName,
      errors: [`could not read hearth-manifest.json as JSON: ${(error as Error).message}`],
    };
  }
  const found = (raw as { schemaVersion?: unknown } | null)?.schemaVersion;
  if (typeof found === 'number' && found > SCHEMA_VERSION) {
    return { status: 'unsupported-schema', packageName, found, supported: SCHEMA_VERSION };
  }
  const foundType = (raw as { type?: unknown } | null)?.type;
  if (typeof foundType === 'string' && !(MANIFEST_TYPES as Array<string>).includes(foundType)) {
    return { status: 'unsupported-type', packageName, found: foundType };
  }
  const result = validateManifest(raw);
  if (!result.success) return { status: 'invalid', packageName, errors: result.errors };
  if (result.manifest.type !== type) {
    return {
      status: 'invalid',
      packageName,
      errors: [`expected a ${type} manifest, found ${result.manifest.type}`],
    };
  }
  return { status: 'ok', manifest: result.manifest as ManifestOfType<T>, path };
};
