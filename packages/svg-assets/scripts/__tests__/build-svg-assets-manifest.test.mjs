import { describe, expect, it } from 'vitest';
import { buildSvgAssetsManifest } from '../helpers/build-svg-assets-manifest.mjs';

const pkg = { name: '@utilitywarehouse/hearth-svg-assets', version: '1.0.0' };
const files = [
  'spot-bill.svg',
  'logo-full-purple.svg',
  'technical-microfilter-01-light.svg',
  'mascot-wave.svg',
  'scene-home.svg',
  'beaming-face-grey.svg',
];

describe('buildSvgAssetsManifest', () => {
  const manifest = buildSvgAssetsManifest(files, pkg);
  const byName = Object.fromEntries(manifest.entries.map(entry => [entry.name, entry]));

  it('stamps the schema version, type and package', () => {
    expect(manifest).toMatchObject({ schemaVersion: 2, type: 'svg-assets', package: pkg });
  });

  it('derives name, file path and import path from the file name', () => {
    expect(byName.LogoFullPurple).toEqual({
      name: 'LogoFullPurple',
      category: 'logo',
      file: 'lib/logo-full-purple.svg',
      import: '@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg',
    });
    expect(byName.TechnicalMicrofilter01Light.file).toBe('lib/technical-microfilter-01-light.svg');
  });

  it('takes the category from the name, and uses other when none fits', () => {
    expect(byName.SpotBill.category).toBe('spot');
    expect(byName.MascotWave.category).toBe('mascot');
    expect(byName.SceneHome.category).toBe('scene');
    expect(byName.TechnicalMicrofilter01Light.category).toBe('technical');
    expect(byName.BeamingFaceGrey.category).toBe('other');
  });

  it('sorts entries by name', () => {
    const names = manifest.entries.map(entry => entry.name);

    expect(names).toEqual([...names].sort());
  });

  it('rejects a file that is not an svg', () => {
    expect(() => buildSvgAssetsManifest(['notes.txt'], pkg)).toThrow(/notes\.txt/);
  });
});
