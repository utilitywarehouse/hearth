import type { Manifest } from '../schema.js';

export type IndexedPackage = { dir: string; type: Manifest['type'] };

/** The packages under `packages/` that ship a `hearth-manifest.json`, and the type each ships. */
export const INDEXED_PACKAGES: Array<IndexedPackage> = [
  { dir: 'tokens', type: 'tokens' },
  { dir: 'svg-icons', type: 'icons' },
  { dir: 'react-icons', type: 'icons' },
  { dir: 'react-native-icons', type: 'icons' },
  { dir: 'svg-assets', type: 'svg-assets' },
  { dir: 'json-assets', type: 'json-assets' },
];
