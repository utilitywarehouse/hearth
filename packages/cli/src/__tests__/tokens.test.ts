import { describe, expect, it } from 'vitest';
import { getToken, listTokens, searchTokens } from '../tokens.js';
import { manifestOf, tokenEntry } from './consumer-fixture.js';

const manifest = manifestOf([
  tokenEntry({ layer: 'semantic', path: 'semantic.background.brand' }),
  tokenEntry({ layer: 'semantic', path: 'semantic.text.brand' }),
  tokenEntry({ layer: 'primitive', path: 'color.brand.700' }),
]);

const darkManifest = manifestOf([
  tokenEntry({
    layer: 'semantic',
    path: 'semantic.background.brand',
    values: { default: '#7a42c8', dark: '#442484' },
    alias: { default: 'color.purple.700', dark: 'color.purple.900' },
  }),
]);

describe('searchTokens', () => {
  it('searches the semantic layer by default', () => {
    const { tokens } = searchTokens(manifest, { query: 'brand' });

    expect(tokens.map(token => token.path)).toEqual([
      'semantic.background.brand',
      'semantic.text.brand',
    ]);
  });

  it('searches another layer when asked', () => {
    const { tokens } = searchTokens(manifest, { query: 'brand', layer: 'primitive' });

    expect(tokens.map(token => token.path)).toEqual(['color.brand.700']);
  });

  it('reports the CSS and browser surfaces, with no dark values, by default', () => {
    const { tokens } = searchTokens(darkManifest, { query: 'background.brand' });

    expect(tokens).toEqual([
      {
        path: 'semantic.background.brand',
        layer: 'semantic',
        type: 'color',
        values: { default: '#7a42c8' },
        alias: { default: 'color.purple.700' },
        css: { variable: '--h-background-brand' },
        browser: {
          import: '@utilitywarehouse/hearth-tokens/browser',
          path: 'semantic.background.brand',
        },
      },
    ]);
    expect(JSON.stringify(tokens)).not.toMatch(/dark/i);
  });

  it('matches the query against the path and the description, ignoring case', () => {
    const described = manifestOf([
      tokenEntry({ layer: 'semantic', path: 'semantic.text.primary', description: 'Brand text' }),
      tokenEntry({ layer: 'semantic', path: 'semantic.border.subtle' }),
    ]);

    const { tokens } = searchTokens(described, { query: 'BRAND' });

    expect(tokens.map(token => token.path)).toEqual(['semantic.text.primary']);
  });

  it('caps the results at the limit and reports how many matched in total', () => {
    const { tokens, total } = searchTokens(manifest, { query: '', layer: 'semantic', limit: 1 });

    expect(tokens.map(token => token.path)).toEqual(['semantic.background.brand']);
    expect(total).toBe(2);
  });

  it('reports the JS surface with light and dark values for the native platform', () => {
    const { tokens } = searchTokens(darkManifest, {
      query: 'background.brand',
      platform: 'native',
    });

    expect(tokens).toEqual([
      {
        path: 'semantic.background.brand',
        layer: 'semantic',
        type: 'color',
        values: { default: '#7a42c8', dark: '#442484' },
        alias: { default: 'color.purple.700', dark: 'color.purple.900' },
        js: {
          import: '@utilitywarehouse/hearth-tokens',
          path: 'semanticLight.background.brand',
          darkPath: 'semanticDark.background.brand',
        },
      },
    ]);
  });
});

describe('getToken', () => {
  it('returns the token at an exact path, in the platform view, with its alias reference and resolved value', () => {
    const result = getToken(darkManifest, 'semantic.background.brand');

    expect(result).toMatchObject({
      status: 'found',
      token: {
        path: 'semantic.background.brand',
        values: { default: '#7a42c8' },
        alias: { default: 'color.purple.700' },
        css: { variable: '--h-background-brand' },
      },
    });
  });

  it('returns every device variant at a path, each labelled with its device', () => {
    const result = getToken(
      manifestOf([
        tokenEntry({ layer: 'semantic', path: 'semantic.shadow.md.x', device: 'desktop' }),
        tokenEntry({ layer: 'semantic', path: 'semantic.shadow.md.x', device: 'mobile' }),
      ]),
      'semantic.shadow.md.x'
    );

    expect(result).toMatchObject({
      status: 'group',
      tokens: [{ device: 'mobile' }, { device: 'desktop' }],
    });
  });

  it('reports the CSS value on web and the JS value on native', () => {
    const opacity = manifestOf([
      tokenEntry({
        layer: 'semantic',
        path: 'semantic.opacity.disabled',
        values: { default: 50 as unknown as string },
        cssValue: '0.5',
      }),
    ]);

    expect(getToken(opacity, 'semantic.opacity.disabled')).toMatchObject({
      token: { values: { default: '0.5' } },
    });
    expect(getToken(opacity, 'semantic.opacity.disabled', { platform: 'native' })).toMatchObject({
      token: { values: { default: 50 } },
    });
  });

  it('suggests each close path once, however many device variants it has', () => {
    const result = getToken(
      manifestOf([
        tokenEntry({ layer: 'semantic', path: 'semantic.shadow.md.x', device: 'desktop' }),
        tokenEntry({ layer: 'semantic', path: 'semantic.shadow.md.x', device: 'mobile' }),
        tokenEntry({ layer: 'semantic', path: 'semantic.shadow.md.x', device: 'tablet' }),
        tokenEntry({ layer: 'semantic', path: 'semantic.shadow.md.y', device: 'desktop' }),
      ]),
      'semantic.shadow.md.z'
    );

    expect(result).toMatchObject({
      status: 'not-found',
      suggestions: ['semantic.shadow.md.x', 'semantic.shadow.md.y'],
    });
  });

  it('reports an unknown path with the closest existing paths as suggestions', () => {
    const result = getToken(manifest, 'semantic.background.brnad');

    expect(result).toEqual({
      status: 'not-found',
      path: 'semantic.background.brnad',
      suggestions: ['semantic.background.brand'],
    });
  });
});

const spacingAt = (device: 'mobile' | 'tablet' | 'desktop', value: number) =>
  tokenEntry({
    layer: 'semantic',
    path: 'semantic.layout.spacing.md',
    type: 'number',
    device,
    values: { default: value },
    cssValue: `${value}px`,
    alias: { default: 'space.100' },
  });

const mixedManifest = manifestOf([
  tokenEntry({ layer: 'semantic', path: 'semantic.background.brand' }),
  tokenEntry({
    layer: 'semantic',
    path: 'semantic.opacity.disabled',
    type: 'number',
    values: { default: 50 },
    cssValue: '0.5',
  }),
  spacingAt('mobile', 8),
  spacingAt('tablet', 12),
  spacingAt('desktop', 16),
  tokenEntry({
    layer: 'semantic',
    path: 'semantic.layout.grid.gutter',
    type: 'number',
    device: 'mobile',
    values: { default: 16 },
    jsOnly: true,
  }),
  tokenEntry({
    layer: 'primitive',
    path: 'space.100',
    type: 'number',
    values: { default: 8 },
    cssValue: '8px',
  }),
]);

describe('listTokens', () => {
  it('lists every token of a layer (semantic by default) when no type is given', () => {
    const { tokens } = listTokens(mixedManifest, {});

    expect(new Set(tokens.map(token => token.path))).toEqual(
      new Set([
        'semantic.background.brand',
        'semantic.opacity.disabled',
        'semantic.layout.spacing.md',
      ])
    );
  });

  it('keeps only the tokens of the given type', () => {
    const { tokens } = listTokens(mixedManifest, { type: 'color' });

    expect(tokens.map(token => token.path)).toEqual(['semantic.background.brand']);
  });

  it('lists another layer when asked', () => {
    const { tokens } = listTokens(mixedManifest, { layer: 'primitive', type: 'number' });

    expect(tokens.map(token => token.path)).toEqual(['space.100']);
  });

  it('reports the value the CSS declares on the web platform, not the JS value', () => {
    const { tokens } = listTokens(mixedManifest, { type: 'number' });

    const opacity = tokens.find(token => token.path === 'semantic.opacity.disabled');
    expect(opacity?.values).toEqual({ default: '0.5' });
  });

  it('reports the JS value for the native platform', () => {
    const { tokens } = listTokens(mixedManifest, { type: 'number', platform: 'native' });

    const opacity = tokens.find(token => token.path === 'semantic.opacity.disabled');
    expect(opacity?.values).toEqual({ default: 50 });
  });

  it('leaves out tokens with no CSS or browser surface on the web platform only', () => {
    const web = listTokens(mixedManifest, { type: 'number' }).tokens;
    const native = listTokens(mixedManifest, { type: 'number', platform: 'native' }).tokens;

    expect(web.map(token => token.path)).not.toContain('semantic.layout.grid.gutter');
    expect(native.map(token => token.path)).toContain('semantic.layout.grid.gutter');
  });

  it('returns one token per device for a device-dependent path, in device order', () => {
    const { tokens } = listTokens(mixedManifest, { type: 'number' });

    const spacing = tokens.filter(token => token.path === 'semantic.layout.spacing.md');
    expect(spacing.map(token => [token.device, token.values.default])).toEqual([
      ['mobile', '8px'],
      ['tablet', '12px'],
      ['desktop', '16px'],
    ]);
    expect(spacing[0]).toMatchObject({
      alias: { default: 'space.100' },
      css: { variable: '--h-layout-spacing-md-mobile' },
    });
  });

  it('counts paths, not devices, for the limit and the total', () => {
    const { tokens, total } = listTokens(mixedManifest, { type: 'number', limit: 2 });

    expect(total).toBe(2);
    // in manifest order: the opacity token, then the three device variants of one path
    expect(tokens.map(token => token.path)).toEqual([
      'semantic.opacity.disabled',
      'semantic.layout.spacing.md',
      'semantic.layout.spacing.md',
      'semantic.layout.spacing.md',
    ]);
  });
});

describe('getToken for tokens that are not a single entry', () => {
  it('returns every device variant of an exact path as a group', () => {
    const result = getToken(mixedManifest, 'semantic.layout.spacing.md');

    expect(result).toMatchObject({
      status: 'group',
      path: 'semantic.layout.spacing.md',
      tokens: [{ device: 'mobile' }, { device: 'tablet' }, { device: 'desktop' }],
    });
  });

  it('returns the tokens beneath a path prefix as a group', () => {
    const result = getToken(mixedManifest, 'semantic.layout');

    expect(result.status).toBe('group');
    if (result.status === 'group') {
      expect(new Set(result.tokens.map(token => token.path))).toEqual(
        new Set(['semantic.layout.spacing.md'])
      );
    }
  });

  it('matches a prefix on whole path segments only', () => {
    const result = getToken(mixedManifest, 'semantic.lay');

    expect(result.status).toBe('not-found');
  });

  it('treats a token with no CSS or browser surface as absent on the web platform', () => {
    const web = getToken(mixedManifest, 'semantic.layout.grid.gutter');
    const native = getToken(mixedManifest, 'semantic.layout.grid.gutter', { platform: 'native' });

    expect(web.status).toBe('not-found');
    expect(native.status).toBe('group');
  });

  it('reports a device variant’s CSS value on the web platform', () => {
    const result = getToken(mixedManifest, 'semantic.layout.spacing.md');

    expect(result.status === 'group' && result.tokens[2].values).toEqual({ default: '16px' });
  });
});
