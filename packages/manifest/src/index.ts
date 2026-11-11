export { MANIFEST_TYPES, SCHEMA_VERSION, manifestJsonSchema, manifestSchema } from './schema.js';
export type {
  IconEntry,
  IconsManifest,
  JsonAssetEntry,
  JsonAssetsManifest,
  Manifest,
  SvgAssetEntry,
  SvgAssetsManifest,
  TokenEntry,
  TokensManifest,
} from './schema.js';
export { validateManifest } from './validate-manifest.js';
export type { ValidationResult } from './validate-manifest.js';
