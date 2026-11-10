import { describe, expect, it } from 'vitest';
import { buildIconsManifest, ICON_PACKAGES } from '../helpers/build-icons-manifest.mjs';

const files = ['bill-medium-icon.svg', 'add-small-icon.svg', 'book-open-large-icon.svg'];
const meta = ICON_PACKAGES.react;

describe('buildIconsManifest', () => {
  it('derives one entry per SVG file, sorted by name', () => {
    const { entries } = buildIconsManifest(files, { name: meta.name, version: '1.0.0' }, 'react');

    expect(entries).toEqual([
      { name: 'AddSmallIcon', size: 'small', svg: 'add-small-icon.svg', component: 'AddSmallIcon' },
      {
        name: 'BillMediumIcon',
        size: 'medium',
        svg: 'bill-medium-icon.svg',
        component: 'BillMediumIcon',
      },
      {
        name: 'BookOpenLargeIcon',
        size: 'large',
        svg: 'book-open-large-icon.svg',
        component: 'BookOpenLargeIcon',
      },
    ]);
  });

  it('stamps the package and the usage for the platform it is built for', () => {
    const manifest = buildIconsManifest(files, { name: 'x', version: '2.3.4' }, 'react-native');

    expect(manifest).toMatchObject({
      schemaVersion: 2,
      type: 'icons',
      package: { name: 'x', version: '2.3.4' },
      usage: { platform: 'react-native', import: ICON_PACKAGES['react-native'].name },
    });
  });

  it('gives all three platforms the same entries and only different usage', () => {
    const [svg, react, native] = ['svg', 'react', 'react-native'].map(platform =>
      buildIconsManifest(files, { name: 'x', version: '1.0.0' }, platform)
    );

    expect(react.entries).toEqual(svg.entries);
    expect(native.entries).toEqual(svg.entries);
    expect(new Set([svg.usage.example, react.usage.example, native.usage.example]).size).toBe(3);
  });

  it('rejects a file whose name has no size', () => {
    expect(() =>
      buildIconsManifest(['mystery-icon.svg'], { name: 'x', version: '1.0.0' }, 'svg')
    ).toThrow(/mystery-icon\.svg/);
  });

  it('rejects an unknown platform', () => {
    expect(() => buildIconsManifest(files, { name: 'x', version: '1.0.0' }, 'flutter')).toThrow(
      /flutter/
    );
  });
});
