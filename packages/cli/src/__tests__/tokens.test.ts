import { describe, expect, it } from 'vitest';
import { getToken, searchTokens } from '../tokens.js';
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
      tokens: [
        {
          path: 'semantic.background.brand',
          values: { default: '#7a42c8' },
          alias: { default: 'color.purple.700' },
          css: { variable: '--h-background-brand' },
        },
      ],
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
      status: 'found',
      tokens: [{ device: 'desktop' }, { device: 'mobile' }],
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
      tokens: [{ values: { default: '0.5' } }],
    });
    expect(getToken(opacity, 'semantic.opacity.disabled', { platform: 'native' })).toMatchObject({
      tokens: [{ values: { default: 50 } }],
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
