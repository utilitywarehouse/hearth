import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateManifest } from '@utilitywarehouse/hearth-manifest';

export const TOKENS_PACKAGE = '@utilitywarehouse/hearth-tokens';

export const tokensManifest = (overrides: Record<string, unknown> = {}) => ({
  schemaVersion: 2,
  package: { name: TOKENS_PACKAGE, version: '1.2.3' },
  type: 'tokens',
  entries: [
    {
      path: 'semantic.background.brand',
      layer: 'semantic',
      type: 'color',
      values: { default: '#7a42c8', dark: '#442484' },
      surfaces: {
        css: { variable: '--h-background-brand' },
        browser: {
          import: `${TOKENS_PACKAGE}/browser`,
          path: 'semantic.background.brand',
        },
        js: {
          import: TOKENS_PACKAGE,
          path: 'semanticLight.background.brand',
          darkPath: 'semanticDark.background.brand',
        },
      },
    },
  ],
  ...overrides,
});

type EntryOptions = {
  layer: 'primitive' | 'semantic' | 'component';
  path: string;
  type?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  values?: { default: string | number; dark?: string | number };
  alias?: { default: string; dark?: string };
  /** What the stylesheet declares, where it differs from the JS value (`8px` for 8). */
  cssValue?: string;
  description?: string;
  /** A token that exists on the JS surface only (no CSS variable or browser export). */
  jsOnly?: boolean;
};

/** A manifest entry whose surfaces are derived from its path, the way the tokens generator derives them. */
export const tokenEntry = ({
  layer,
  path,
  type = 'color',
  device,
  values,
  alias,
  cssValue,
  description,
  jsOnly,
}: EntryOptions) => {
  const resolved = values ?? { default: '#000000' };
  const cssName = [path.replace(/^semantic\./, '').replaceAll('.', '-'), device]
    .filter(Boolean)
    .join('-');
  const basePath = layer === 'semantic' ? path.replace(/^semantic\./, 'semanticLight.') : path;
  const jsPath = device ? `${basePath}.${device}` : basePath;
  return {
    path,
    ...(device ? { device } : {}),
    layer,
    type,
    ...(device ? { device } : {}),
    ...(description ? { description } : {}),
    values: resolved,
    ...(alias ? { alias } : {}),
    surfaces: {
      ...(jsOnly
        ? {}
        : {
            css: { variable: `--h-${cssName}`, ...(cssValue ? { value: cssValue } : {}) },
            browser: {
              import: `${TOKENS_PACKAGE}/browser`,
              path: device ? `${path}.${device}` : path,
            },
          }),
      js: {
        import: TOKENS_PACKAGE,
        path: jsPath,
        ...(resolved.dark !== undefined
          ? { darkPath: jsPath.replace('semanticLight.', 'semanticDark.') }
          : {}),
      },
    },
  };
};

/** A validated manifest built from the given entries. */
export const manifestOf = (entries: Array<ReturnType<typeof tokenEntry>>) => {
  const result = validateManifest(tokensManifest({ entries }));
  if (!result.success) throw new Error(result.errors.join('\n'));
  if (result.manifest.type !== 'tokens') throw new Error('expected a tokens manifest');
  return result.manifest;
};

/** A temp directory standing in for a consumer project. */
export const createConsumer = () => mkdtempSync(join(tmpdir(), 'hearth-cli-'));

/** Installs `hearth-manifest.json` for a package in the consumer's `node_modules`, shaped like the real package (`"./*": "./*"`). */
export const installPackage = (
  consumerDir: string,
  packageName: string,
  manifest: unknown,
  version = '1.2.3'
) => {
  const packageDir = join(consumerDir, 'node_modules', ...packageName.split('/'));
  mkdirSync(packageDir, { recursive: true });
  writeFileSync(
    join(packageDir, 'package.json'),
    JSON.stringify({ name: packageName, version, exports: { './*': './*' } })
  );
  // undefined installs the package without a manifest, like a version that predates manifest support
  if (manifest === undefined) return;
  // a string is written as is, so tests can install a file that is not valid JSON
  writeFileSync(
    join(packageDir, 'hearth-manifest.json'),
    typeof manifest === 'string' ? manifest : JSON.stringify(manifest)
  );
};
