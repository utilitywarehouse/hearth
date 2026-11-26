import { describe, expect, it } from 'vitest';
import { getAsset, listAssets, searchAssets } from '../assets.js';

const entry = (name: string, category: string, file: string) => ({
  name,
  category,
  file,
  import: `@utilitywarehouse/hearth-svg-assets/${file}`,
});

const ENTRIES = [
  entry('LogoFullPurple', 'logo', 'lib/logo-full-purple.svg'),
  entry('LogoIconWhite', 'logo', 'lib/logo-icon-white.svg'),
  entry('MascotWave', 'mascot', 'lib/mascot-wave.svg'),
  entry('SpotAccount', 'spot', 'lib/spot-account.svg'),
];

describe('searchAssets', () => {
  it('matches the query against name, file and import, ignoring case', () => {
    expect(searchAssets(ENTRIES, { query: 'purple' }).assets.map(a => a.name)).toEqual([
      'LogoFullPurple',
    ]);
    expect(searchAssets(ENTRIES, { query: 'mascot-wave.SVG' }).total).toBe(1);
    expect(searchAssets(ENTRIES, { query: 'hearth-svg-assets/lib/spot' }).total).toBe(1);
  });

  it('filters by category', () => {
    const { assets, total } = searchAssets(ENTRIES, { query: 'logo', category: 'logo' });

    expect(total).toBe(2);
    expect(assets.every(a => a.category === 'logo')).toBe(true);
    expect(searchAssets(ENTRIES, { query: 'logo', category: 'spot' }).total).toBe(0);
  });

  it('counts every match in total but returns only up to the limit', () => {
    const { assets, total } = searchAssets(ENTRIES, { query: 'lib', limit: 2 });

    expect(total).toBe(4);
    expect(assets).toHaveLength(2);
  });
});

describe('listAssets', () => {
  it('returns every asset, optionally of one category', () => {
    expect(listAssets(ENTRIES, {}).total).toBe(4);
    expect(listAssets(ENTRIES, { category: 'mascot' }).assets.map(a => a.name)).toEqual([
      'MascotWave',
    ]);
  });
});

describe('getAsset', () => {
  it('finds the asset with exactly this name', () => {
    expect(getAsset(ENTRIES, 'MascotWave')).toEqual({ status: 'found', asset: ENTRIES[2] });
  });

  it('suggests close names when there is no such asset', () => {
    expect(getAsset(ENTRIES, 'LogoFullPurpel')).toEqual({
      status: 'not-found',
      name: 'LogoFullPurpel',
      suggestions: ['LogoFullPurple'],
    });
  });

  it('is case-sensitive', () => {
    expect(getAsset(ENTRIES, 'mascotwave').status).toBe('not-found');
  });
});
