import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
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

export const ICON_PACKAGES = {
  react: '@utilitywarehouse/hearth-react-icons',
  'react-native': '@utilitywarehouse/hearth-react-native-icons',
  svg: '@utilitywarehouse/hearth-svg-icons',
} as const;

export type IconPlatform = keyof typeof ICON_PACKAGES;

type IconSize = 'small' | 'medium' | 'large';

/** An icon entry whose svg file is derived from its name (`AddSmallIcon` -> `add-small-icon.svg`). */
export const iconEntry = (name: string, size: IconSize = 'medium') => ({
  name,
  size,
  svg: `${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}.svg`,
  component: name,
});

const ICON_USAGE: Record<IconPlatform, { import: string; example: string }> = {
  react: {
    import: ICON_PACKAGES.react,
    example: `import { <component> } from '${ICON_PACKAGES.react}';`,
  },
  'react-native': {
    import: ICON_PACKAGES['react-native'],
    example: `import { <component> } from '${ICON_PACKAGES['react-native']}';`,
  },
  svg: { import: ICON_PACKAGES.svg, example: `${ICON_PACKAGES.svg}/<svg>` },
};

export const DEFAULT_ICONS = [
  iconEntry('AddSmallIcon', 'small'),
  iconEntry('AddMediumIcon', 'medium'),
  iconEntry('ArrowRightMediumIcon', 'medium'),
  iconEntry('ArrowLeftLargeIcon', 'large'),
];

/** The same icon list ships in all three icon packages; only `package` and `usage` differ. */
export const iconsManifest = (
  platform: IconPlatform = 'react',
  entries: Array<ReturnType<typeof iconEntry>> = DEFAULT_ICONS,
  version = '1.2.3'
) => ({
  schemaVersion: 2,
  package: { name: ICON_PACKAGES[platform], version },
  type: 'icons',
  usage: { platform, ...ICON_USAGE[platform] },
  entries,
});

/** A validated icons manifest. */
export const iconsManifestOf = (
  entries: Array<ReturnType<typeof iconEntry>> = DEFAULT_ICONS,
  platform: IconPlatform = 'react'
) => {
  const result = validateManifest(iconsManifest(platform, entries));
  if (!result.success) throw new Error(result.errors.join('\n'));
  if (result.manifest.type !== 'icons') throw new Error('expected an icons manifest');
  return result.manifest;
};

export const SVG_ASSETS_PACKAGE = '@utilitywarehouse/hearth-svg-assets';

type SvgAssetCategory = 'logo' | 'mascot' | 'spot' | 'scene' | 'technical' | 'other';

/** An SVG asset entry whose file and import are derived from its name (`LogoFullPurple` -> `lib/logo-full-purple.svg`). */
export const svgAssetEntry = (name: string, category: SvgAssetCategory = 'other') => {
  const file = `lib/${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}.svg`;
  return { name, category, file, import: `${SVG_ASSETS_PACKAGE}/${file}` };
};

export const DEFAULT_SVG_ASSETS = [
  svgAssetEntry('LogoFullPurple', 'logo'),
  svgAssetEntry('LogoIconWhite', 'logo'),
  svgAssetEntry('MascotWave', 'mascot'),
  svgAssetEntry('SpotAccount', 'spot'),
];

export const svgAssetsManifest = (
  entries: Array<ReturnType<typeof svgAssetEntry>> = DEFAULT_SVG_ASSETS,
  version = '1.2.3'
) => ({
  schemaVersion: 2,
  package: { name: SVG_ASSETS_PACKAGE, version },
  type: 'svg-assets',
  entries,
});

/** Writes an asset file into an installed package, where `--print` reads it from. */
export const installAssetFile = (
  consumerDir: string,
  packageName: string,
  file: string,
  content: string
) => {
  const path = join(consumerDir, 'node_modules', ...packageName.split('/'), file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};

export const JSON_ASSETS_PACKAGE = '@utilitywarehouse/hearth-json-assets';

type JsonAssetCategory = 'spot' | 'logo' | 'other';

/** A JSON asset entry whose file and import are derived from its name (`AnimatedSpotAccountDark` -> `lib/animated-spot-account-dark.json`). */
export const jsonAssetEntry = (name: string, category: JsonAssetCategory = 'other') => {
  const file = `lib/${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}.json`;
  return { name, category, type: 'animated', file, import: `${JSON_ASSETS_PACKAGE}/${file}` };
};

export const DEFAULT_JSON_ASSETS = [
  jsonAssetEntry('AnimatedSpotAccountDark', 'spot'),
  jsonAssetEntry('AnimatedSpotAccountLight', 'spot'),
  jsonAssetEntry('AnimatedLogoLoader', 'logo'),
];

export const jsonAssetsManifest = (
  entries: Array<ReturnType<typeof jsonAssetEntry>> = DEFAULT_JSON_ASSETS,
  version = '1.2.3'
) => ({
  schemaVersion: 2,
  package: { name: JSON_ASSETS_PACKAGE, version },
  type: 'json-assets',
  entries,
});
