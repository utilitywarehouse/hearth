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
      schemaVersion: 2,
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

  it('carries the value the CSS declares next to the variable, which can differ from the JS value', () => {
    const records = [
      { surface: 'css', variable: '--h-space-100', cssValue: '8px' },
      { surface: 'browser', accessor: 'space[100]' },
      { surface: 'js', accessor: 'space[100]' },
    ].map(fields => ({
      layer: 'primitive',
      path: ['space', '100'],
      mode: 'light',
      type: 'number',
      value: 8,
      ...fields,
    }));

    const [entry] = buildTokensManifest(records, meta).entries;

    expect(entry.values).toEqual({ default: 8 });
    expect(entry.surfaces.css).toEqual({ variable: '--h-space-100', value: '8px' });
  });

  it('resolves a CSS value declared as a reference to another variable', () => {
    const record = (path, variable, cssValue, value) => ({
      layer: 'primitive',
      path,
      mode: 'light',
      type: 'number',
      value,
      ...{ variable, cssValue },
    });
    const surfaces = (path, variable, cssValue, value) =>
      ['css', 'browser', 'js'].map(surface => ({
        ...record(path, variable, cssValue, value),
        surface,
        accessor: path.join('.'),
      }));
    const records = [
      ...surfaces(['space', '100'], '--h-space-100', '8px', 8),
      ...surfaces(['layout', 'gap'], '--h-gap', 'var(--h-gap-base)', 8),
      ...surfaces(['layout', 'gap-base'], '--h-gap-base', 'var(--h-space-100)', 8),
    ];

    const { entries } = buildTokensManifest(records, meta);

    expect(entries.find(entry => entry.path === 'layout.gap').surfaces.css.value).toBe('8px');
  });

  it('refuses a CSS value that references a variable no token declares', () => {
    const records = ['css', 'browser', 'js'].map(surface => ({
      surface,
      layer: 'primitive',
      path: ['layout', 'gap'],
      mode: 'light',
      type: 'number',
      value: 8,
      variable: '--h-gap',
      cssValue: 'var(--h-missing)',
      accessor: 'layout.gap',
    }));

    expect(() => buildTokensManifest(records, meta)).toThrow(/--h-missing/);
  });

  it('builds one entry per device for a token that differs by device', () => {
    const records = ['mobile', 'desktop'].flatMap(device =>
      ['css', 'browser', 'js'].map(surface => ({
        surface,
        layer: 'semantic',
        path: ['shadow', 'md', 'x'],
        device,
        mode: 'light',
        type: 'number',
        value: device === 'mobile' ? 4 : 6,
        ...{
          css: { variable: `--h-md-x-${device}`, cssValue: device === 'mobile' ? '4px' : '6px' },
          browser: { accessor: `shadow.md.x.${device}` },
          js: { accessor: `shadow.${device}.md.x` },
        }[surface],
      }))
    );

    const { entries } = buildTokensManifest(records, meta);

    expect(entries.map(({ path, device, values }) => [path, device, values.default])).toEqual([
      ['semantic.shadow.md.x', 'desktop', 6],
      ['semantic.shadow.md.x', 'mobile', 4],
    ]);
    expect(entries[1].surfaces.js.path).toBe('shadow.mobile.md.x');
  });

  it('merges a component token’s light and dark records, under a component. path', () => {
    const records = ['light', 'dark']
      .flatMap(mode =>
        ['css', 'browser', 'js'].map(surface => ({
          surface,
          layer: 'component',
          path: ['button', 'shadow-color'],
          mode,
          type: 'color',
          value: mode === 'light' ? '#101010' : '#fcfbf2',
          ...{
            css: { variable: '--h-button-shadow-color' },
            browser: { accessor: 'components.button.shadowColor' },
            js: { accessor: `components.${mode}.button.shadowColor` },
          }[surface],
        }))
      )
      .filter(record => record.mode === 'light' || record.surface === 'js');

    const [entry] = buildTokensManifest(records, meta).entries;

    expect(entry).toMatchObject({
      path: 'component.button.shadow-color',
      layer: 'component',
      values: { default: '#101010', dark: '#fcfbf2' },
      surfaces: {
        css: { variable: '--h-button-shadow-color' },
        js: {
          path: 'components.light.button.shadowColor',
          darkPath: 'components.dark.button.shadowColor',
        },
      },
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
