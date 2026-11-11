import { describe, expect, it } from 'vitest';
import { checkManifest } from '../check-manifest.js';

const pkg = { name: '@utilitywarehouse/hearth-json-assets', version: '0.6.0' };
const manifest = {
  schemaVersion: 2,
  package: { ...pkg },
  type: 'json-assets',
  entries: [
    {
      name: 'AnimatedSpotAccountDark',
      category: 'spot',
      type: 'animated',
      file: 'lib/animated-spot-account-dark.json',
      import: `${pkg.name}/lib/animated-spot-account-dark.json`,
    },
  ],
};

describe('checkManifest', () => {
  it('has no errors for a valid manifest of the expected type that matches its package', () => {
    expect(checkManifest(manifest, pkg, { type: 'json-assets' })).toEqual([]);
  });

  it('reports a manifest that fails the schema', () => {
    const errors = checkManifest({ ...manifest, entries: 'nope' }, pkg, { type: 'json-assets' });

    expect(errors).toEqual([expect.stringContaining('entries')]);
  });

  it('reports an unknown manifest type, naming it', () => {
    const errors = checkManifest({ ...manifest, type: 'widgets' }, pkg, { type: 'json-assets' });

    expect(errors).toEqual([expect.stringContaining('"widgets"')]);
  });

  it('reports a manifest of a different type than the package should ship', () => {
    const errors = checkManifest(manifest, pkg, { type: 'svg-assets' });

    expect(errors).toEqual(['type is "json-assets", expected "svg-assets"']);
  });

  it('reports a manifest naming a different package', () => {
    const errors = checkManifest({ ...manifest, package: { ...pkg, name: 'other' } }, pkg, {
      type: 'json-assets',
    });

    expect(errors).toEqual([`package.name is "other", expected "${pkg.name}"`]);
  });

  it('reports a stale version', () => {
    const errors = checkManifest({ ...manifest, package: { ...pkg, version: '0.5.0' } }, pkg, {
      type: 'json-assets',
    });

    expect(errors).toEqual(['package.version is "0.5.0", expected "0.6.0"']);
  });

  it('reports a missing manifest (null) rather than throwing', () => {
    expect(checkManifest(null, pkg, { type: 'json-assets' })).not.toEqual([]);
  });
});
