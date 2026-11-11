import { describe, expect, it } from 'vitest';
import { checkTarball } from '../check-tarball.js';

const pack = (...paths: Array<string>) => [{ files: paths.map(path => ({ path, size: 1 })) }];

describe('checkTarball', () => {
  it('has no errors when the tarball holds the manifest and package.json', () => {
    expect(checkTarball(pack('package.json', 'hearth-manifest.json', 'lib/a.svg'))).toEqual([]);
  });

  it('reports a tarball without the manifest', () => {
    expect(checkTarball(pack('package.json', 'lib/a.svg'))).toEqual([
      'tarball does not contain hearth-manifest.json',
    ]);
  });

  it('reports a tarball without package.json', () => {
    expect(checkTarball(pack('hearth-manifest.json'))).toEqual([
      'tarball does not contain package.json',
    ]);
  });

  it('does not count a nested manifest as the root one', () => {
    expect(checkTarball(pack('package.json', 'lib/hearth-manifest.json'))).toEqual([
      'tarball does not contain hearth-manifest.json',
    ]);
  });

  it('reports pack output it cannot read rather than passing', () => {
    expect(checkTarball({ error: 'EPERM' })).toEqual([
      'could not read the file list from npm pack',
    ]);
  });
});
