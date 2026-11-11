import { describe, expect, it } from 'vitest';
import { buildJsonAssetsManifest } from '../helpers/build-json-assets-manifest.mjs';

const pkg = { name: '@utilitywarehouse/hearth-json-assets', version: '1.0.0' };
// names come from the existing manifest.json, which keeps the acronym casing (`UW`, `EV`)
// that the lowercase file names have lost
const assets = [
  { name: 'AnimatedUWMonoPurpleLight', filename: 'animated-uw-mono-purple-light.json' },
  { name: 'AnimatedSpotAccountDark', filename: 'animated-spot-account-dark.json' },
  { name: 'AnimatedConfettiLight', filename: 'animated-confetti-light.json' },
];

describe('buildJsonAssetsManifest', () => {
  const manifest = buildJsonAssetsManifest(assets, pkg);
  const byName = Object.fromEntries(manifest.entries.map(entry => [entry.name, entry]));

  it('stamps the schema version, type and package', () => {
    expect(manifest).toMatchObject({ schemaVersion: 2, type: 'json-assets', package: pkg });
  });

  it('derives name, type, file path and import path from the file name', () => {
    expect(byName.AnimatedSpotAccountDark).toEqual({
      name: 'AnimatedSpotAccountDark',
      category: 'spot',
      type: 'animated',
      file: 'lib/animated-spot-account-dark.json',
      import: '@utilitywarehouse/hearth-json-assets/lib/animated-spot-account-dark.json',
    });
  });

  it('calls the uw group logo, and uses other when no group fits', () => {
    expect(byName.AnimatedUWMonoPurpleLight.category).toBe('logo');
    expect(byName.AnimatedConfettiLight.category).toBe('other');
  });

  it('sorts entries by name', () => {
    const names = manifest.entries.map(entry => entry.name);

    expect(names).toEqual([...names].sort());
  });

  it('keeps the name it is given rather than deriving one from the file name', () => {
    expect(byName.AnimatedUWMonoPurpleLight.file).toBe('lib/animated-uw-mono-purple-light.json');
  });

  it('rejects a file that is not json', () => {
    expect(() => buildJsonAssetsManifest([{ name: 'Notes', filename: 'notes.txt' }], pkg)).toThrow(
      /notes\.txt/
    );
  });

  it('rejects a file whose leading word is not a known type', () => {
    expect(() =>
      buildJsonAssetsManifest(
        [{ name: 'StaticSpotBillLight', filename: 'static-spot-bill-light.json' }],
        pkg
      )
    ).toThrow(/static-spot-bill-light\.json/);
  });
});
