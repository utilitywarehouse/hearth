import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PackageType } from '../src/data/types.ts';

export type { PackageType } from '../src/data/types.ts';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Repo root of the hearth monorepo (…/apps/usage-analytics/collector -> …). */
export const REPO_ROOT = path.resolve(here, '..', '..', '..');
export const APP_ROOT = path.resolve(here, '..');
export const DATA_DIR = path.join(APP_ROOT, 'data');
export const SNAPSHOTS_DIR = path.join(DATA_DIR, 'snapshots');
export const STATE_DIR = path.join(DATA_DIR, 'state');
export const CHECKPOINT_FILE = path.join(STATE_DIR, 'checkpoint.json');
export const INDEX_FILE = path.join(DATA_DIR, 'index.json');
export const MANIFEST_FILE = path.join(here, 'symbol-manifests', 'symbols.json');
/** Transient working dir for shallow clones (gitignored). */
export const CLONES_DIR = path.join(APP_ROOT, '.clones');

export const ORG = 'utilitywarehouse';
/** The hearth monorepo itself — excluded so we only measure external adopters. */
export const SELF_REPO = `${ORG}/hearth`;

/**
 * How to find each package's exported symbols in the local workspace when
 * building the allow-list. `type` also drives dashboard rendering.
 */
export interface PackageConfig {
  /** Published npm name. */
  name: string;
  type: PackageType;
  /**
   * How exported symbols are discovered for the allow-list.
   * `exports`: parse named exports from a module file (components, icons, token
   * namespaces all share this shape). `none`: no symbol surface (asset packages).
   */
  manifest: { kind: 'exports'; file: string } | { kind: 'none' };
}

/** The 11 published @utilitywarehouse/hearth-* packages, in display order. */
export const PACKAGES: Array<PackageConfig> = [
  {
    name: '@utilitywarehouse/hearth-react',
    type: 'component-lib',
    manifest: { kind: 'exports', file: 'packages/react/src/index.ts' },
  },
  {
    name: '@utilitywarehouse/hearth-react-native',
    type: 'component-lib',
    manifest: { kind: 'exports', file: 'packages/react-native/src/index.ts' },
  },
  {
    name: '@utilitywarehouse/hearth-tokens',
    type: 'tokens',
    manifest: { kind: 'exports', file: 'packages/tokens/js/index.js' },
  },
  {
    name: '@utilitywarehouse/hearth-react-icons',
    type: 'icons',
    manifest: { kind: 'exports', file: 'packages/react-icons/dist/index.d.ts' },
  },
  {
    name: '@utilitywarehouse/hearth-react-native-icons',
    type: 'icons',
    manifest: { kind: 'exports', file: 'packages/react-native-icons/dist/index.d.ts' },
  },
  {
    name: '@utilitywarehouse/hearth-svg-icons',
    type: 'icons',
    manifest: { kind: 'none' },
  },
  {
    name: '@utilitywarehouse/hearth-svg-assets',
    type: 'asset',
    manifest: { kind: 'none' },
  },
  {
    name: '@utilitywarehouse/hearth-json-assets',
    type: 'asset',
    manifest: { kind: 'none' },
  },
  {
    name: '@utilitywarehouse/hearth-fonts',
    type: 'asset',
    manifest: { kind: 'none' },
  },
  {
    name: '@utilitywarehouse/hearth-css-reset',
    type: 'asset',
    manifest: { kind: 'none' },
  },
];

/** Unique package names (config above may repeat generated packages). */
export const PACKAGE_NAMES = Array.from(new Set(PACKAGES.map(p => p.name)));

export function getPackageConfig(name: string): PackageConfig | undefined {
  return PACKAGES.find(p => p.name === name);
}

/** Any file matching these extensions is parsed for imports. */
export const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];

/** Directories never worth walking when parsing a clone. */
export const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'out',
  'coverage',
  '.next',
  '.turbo',
  'storybook-static',
  'vendor',
]);

/** Skip files bigger than this (bytes) — minified bundles, generated blobs. */
export const MAX_FILE_BYTES = 1024 * 1024; // 1 MB

/** Skip cloning a repo whose reported size (KB) exceeds this. */
export const MAX_REPO_SIZE_KB = 2 * 1024 * 1024; // ~2 GB

/** GitHub REST API version header value, matching the repo convention. */
export const GITHUB_API_VERSION = '2022-11-28';
