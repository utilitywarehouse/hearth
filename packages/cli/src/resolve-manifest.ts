import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { SCHEMA_VERSION, validateManifest, type Manifest } from '@utilitywarehouse/hearth-manifest';

export type ResolveResult =
  | { status: 'ok'; manifest: Manifest; path: string }
  | { status: 'not-installed'; packageName: string }
  | { status: 'invalid'; packageName: string; errors: Array<string> }
  | { status: 'unsupported-schema'; packageName: string; found: number; supported: number };

/** Reads and validates the `hearth-manifest.json` of a package installed in `fromDir`'s `node_modules`. */
export const resolveManifest = (packageName: string, fromDir: string): ResolveResult => {
  let path: string;
  try {
    path = createRequire(join(fromDir, 'noop.js')).resolve(`${packageName}/hearth-manifest.json`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
      return { status: 'not-installed', packageName };
    }
    throw error;
  }
  const raw: unknown = JSON.parse(readFileSync(path, 'utf8'));
  const found = (raw as { schemaVersion?: unknown } | null)?.schemaVersion;
  if (typeof found === 'number' && found > SCHEMA_VERSION) {
    return { status: 'unsupported-schema', packageName, found, supported: SCHEMA_VERSION };
  }
  const result = validateManifest(raw);
  if (!result.success) return { status: 'invalid', packageName, errors: result.errors };
  return { status: 'ok', manifest: result.manifest, path };
};
