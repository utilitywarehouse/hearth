import { describe, expect, it } from 'vitest';
import { buildTokensManifest } from '../build-tokens-manifest.js';

const meta = { name: '@utilitywarehouse/hearth-tokens', version: '0.4.8' };

const semanticBrandRecords = [
  {
    surface: 'css',
    layer: 'semantic',
    path: ['background', 'brand'],
    mode: 'light',
    type: 'color',
    value: '#7a42c8',
    alias: '{color.purple.700}',
    variable: '--h-background-brand',
  },
  {
    surface: 'browser',
    layer: 'semantic',
    path: ['background', 'brand'],
    mode: 'light',
    type: 'color',
    value: '#7a42c8',
    alias: '{color.purple.700}',
    accessor: 'semantic.background.brand',
  },
  {
    surface: 'js',
    layer: 'semantic',
    path: ['background', 'brand'],
    mode: 'light',
    type: 'color',
    value: '#7a42c8',
    alias: '{color.purple.700}',
    accessor: 'semanticLight.background.brand',
  },
  {
    surface: 'js',
    layer: 'semantic',
    path: ['background', 'brand'],
    mode: 'dark',
    type: 'color',
    value: '#442484',
    alias: '{color.purple.900}',
    accessor: 'semanticDark.background.brand',
  },
];

const primitiveRecords = ['css', 'browser', 'js'].map(surface => ({
  surface,
  layer: 'primitive',
  path: ['color', 'blue', '200'],
  mode: 'light',
  type: 'color',
  value: '#bcddff',
  ...{
    css: { variable: '--h-color-blue-200' },
    browser: { accessor: 'color.blue[200]' },
    js: { accessor: 'color.blue[200]' },
  }[surface],
}));

describe('buildTokensManifest', () => {
  // Characterisation: holds by construction of the merge rather than driving new code.
  it('builds a primitive colour with no dark value, alias or JS dark path', () => {
    const [entry] = buildTokensManifest(primitiveRecords, meta).entries;

    expect(entry).toEqual({
      path: 'color.blue.200',
      layer: 'primitive',
      type: 'color',
      values: { default: '#bcddff' },
      surfaces: {
        css: { variable: '--h-color-blue-200' },
        browser: {
          import: '@utilitywarehouse/hearth-tokens/browser',
          path: 'color.blue[200]',
        },
        js: { import: '@utilitywarehouse/hearth-tokens', path: 'color.blue[200]' },
      },
    });
  });

  it('orders entries by path so regenerated manifests diff cleanly', () => {
    const { entries } = buildTokensManifest([...semanticBrandRecords, ...primitiveRecords], meta);

    expect(entries.map(entry => entry.path)).toEqual([
      'color.blue.200',
      'semantic.background.brand',
    ]);
  });

  it('merges the records for one semantic colour into a single entry', () => {
    const manifest = buildTokensManifest(semanticBrandRecords, meta);

    expect(manifest).toEqual({
      schemaVersion: 1,
      package: meta,
      type: 'tokens',
      entries: [
        {
          path: 'semantic.background.brand',
          layer: 'semantic',
          type: 'color',
          values: { default: '#7a42c8', dark: '#442484' },
          alias: { default: 'color.purple.700', dark: 'color.purple.900' },
          surfaces: {
            css: { variable: '--h-background-brand' },
            browser: {
              import: '@utilitywarehouse/hearth-tokens/browser',
              path: 'semantic.background.brand',
            },
            js: {
              import: '@utilitywarehouse/hearth-tokens',
              path: 'semanticLight.background.brand',
              darkPath: 'semanticDark.background.brand',
            },
          },
        },
      ],
    });
  });

  it('refuses a colour with no light JS record rather than using another record as its default', () => {
    const darkOnly = semanticBrandRecords.filter(r => !(r.surface === 'js' && r.mode === 'light'));

    expect(() => buildTokensManifest(darkOnly, meta)).toThrow(/semantic\.background\.brand/);
  });

  it('refuses a colour whose only alias is in dark mode, which the schema cannot express', () => {
    const darkAliasOnly = semanticBrandRecords.map(({ alias, ...record }) =>
      record.mode === 'dark' ? { ...record, alias } : record
    );

    expect(() => buildTokensManifest(darkAliasOnly, meta)).toThrow(/alias/);
  });
});
