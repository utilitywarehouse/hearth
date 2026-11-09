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
  values?: { default: string; dark?: string };
  alias?: { default: string; dark?: string };
  description?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
};

/** A manifest entry whose surfaces are derived from its path, the way the tokens generator derives them. */
export const tokenEntry = ({ layer, path, values, alias, description, device }: EntryOptions) => {
  const resolved = values ?? { default: '#000000' };
  const cssName = path.replace(/^semantic\./, '').replaceAll('.', '-');
  const jsPath = layer === 'semantic' ? path.replace(/^semantic\./, 'semanticLight.') : path;
  return {
    path,
    ...(device ? { device } : {}),
    layer,
    type: 'color',
    ...(description ? { description } : {}),
    values: resolved,
    ...(alias ? { alias } : {}),
    surfaces: {
      css: { variable: `--h-${cssName}` },
      browser: { import: `${TOKENS_PACKAGE}/browser`, path },
      js: {
        import: TOKENS_PACKAGE,
        path: jsPath,
        ...(resolved.dark ? { darkPath: jsPath.replace('semanticLight.', 'semanticDark.') } : {}),
      },
    },
  };
};

/** A validated manifest built from the given entries. */
export const manifestOf = (entries: Array<ReturnType<typeof tokenEntry>>) => {
  const result = validateManifest(tokensManifest({ entries }));
  if (!result.success) throw new Error(result.errors.join('\n'));
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
