import { describe, expect, it } from 'vitest';
import { getIcon, listIcons, searchIcons } from '../icons.js';
import { DEFAULT_ICONS, iconEntry, iconsManifestOf } from './consumer-fixture.js';

const manifest = iconsManifestOf();

describe('searchIcons', () => {
  it('matches the name, case-insensitively', () => {
    const { icons, total } = searchIcons(manifest, { query: 'arrow' });

    expect(icons.map(icon => icon.name)).toEqual(['ArrowRightMediumIcon', 'ArrowLeftLargeIcon']);
    expect(total).toBe(2);
  });

  it('matches the svg file name', () => {
    const { icons } = searchIcons(manifest, { query: 'add-small' });

    expect(icons.map(icon => icon.name)).toEqual(['AddSmallIcon']);
  });

  it('matches the component name when it differs from the icon name', () => {
    const renamed = iconsManifestOf([{ ...iconEntry('PlusIcon'), component: 'AddGlyph' }]);

    expect(searchIcons(renamed, { query: 'glyph' }).icons.map(icon => icon.name)).toEqual([
      'PlusIcon',
    ]);
  });

  it('keeps only icons of the size asked for', () => {
    const { icons, total } = searchIcons(manifest, { query: 'add', size: 'small' });

    expect(icons.map(icon => icon.name)).toEqual(['AddSmallIcon']);
    expect(total).toBe(1);
  });

  it('limits the icons returned but counts every match', () => {
    const { icons, total } = searchIcons(manifest, { query: 'icon', limit: 2 });

    expect(icons).toHaveLength(2);
    expect(total).toBe(DEFAULT_ICONS.length);
  });

  it('returns nothing for a query that matches nothing', () => {
    expect(searchIcons(manifest, { query: 'zzz' })).toEqual({ icons: [], total: 0 });
  });
});

describe('listIcons', () => {
  it('lists every icon up to the default limit', () => {
    const many = iconsManifestOf(
      Array.from({ length: 25 }, (_, index) => iconEntry(`Icon${index}`))
    );

    const { icons, total } = listIcons(many, {});

    expect(icons).toHaveLength(20);
    expect(total).toBe(25);
  });

  it('keeps only icons of the size asked for', () => {
    expect(listIcons(manifest, { size: 'large' }).icons.map(icon => icon.name)).toEqual([
      'ArrowLeftLargeIcon',
    ]);
  });
});

describe('getIcon', () => {
  it('returns the icon with the name given', () => {
    expect(getIcon(manifest, 'AddSmallIcon')).toEqual({
      status: 'found',
      icon: {
        name: 'AddSmallIcon',
        size: 'small',
        svg: 'add-small-icon.svg',
        component: 'AddSmallIcon',
      },
    });
  });

  it('suggests the closest names for one that does not exist', () => {
    expect(getIcon(manifest, 'AddSmalIcon')).toEqual({
      status: 'not-found',
      name: 'AddSmalIcon',
      suggestions: ['AddSmallIcon'],
    });
  });

  it('suggests nothing when no name is close', () => {
    expect(getIcon(manifest, 'Zebra')).toEqual({
      status: 'not-found',
      name: 'Zebra',
      suggestions: [],
    });
  });
});
