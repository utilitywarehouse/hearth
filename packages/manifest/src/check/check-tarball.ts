import { MANIFEST_FILE } from './check-package-json.js';

/**
 * Errors for the parsed output of `npm pack --dry-run --json`: the tarball must ship the manifest
 * and the package.json that readers resolve it from.
 */
export function checkTarball(packJson: unknown): Array<string> {
  const files = Array.isArray(packJson)
    ? (packJson[0] as { files?: Array<{ path?: unknown }> } | undefined)?.files
    : undefined;
  if (!Array.isArray(files)) return ['could not read the file list from npm pack'];

  const paths = new Set(files.map(file => file.path));
  return [MANIFEST_FILE, 'package.json']
    .filter(required => !paths.has(required))
    .map(required => `tarball does not contain ${required}`);
}
