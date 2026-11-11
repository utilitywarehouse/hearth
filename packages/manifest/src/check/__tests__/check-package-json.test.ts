import { describe, expect, it } from 'vitest';
import { checkPackageJson } from '../check-package-json.js';

describe('checkPackageJson', () => {
  it('has no errors when files lists the manifest and there are no exports', () => {
    expect(checkPackageJson({ files: ['lib', 'hearth-manifest.json'] })).toEqual([]);
  });

  it('reports a package whose files omit the manifest', () => {
    expect(checkPackageJson({ files: ['lib'] })).toEqual([
      '"files" does not include hearth-manifest.json',
    ]);
  });

  it('reports a package with no files field, which would pack everything but is not how these ship', () => {
    expect(checkPackageJson({})).toEqual(['"files" does not include hearth-manifest.json']);
  });

  it('reports exports that do not expose the manifest', () => {
    expect(
      checkPackageJson({ files: ['hearth-manifest.json'], exports: { '.': './dist/index.js' } })
    ).toEqual(['"exports" does not expose ./hearth-manifest.json']);
  });

  it('accepts exports that expose the manifest by name', () => {
    expect(
      checkPackageJson({
        files: ['hearth-manifest.json'],
        exports: { '.': './dist/index.js', './hearth-manifest.json': './hearth-manifest.json' },
      })
    ).toEqual([]);
  });

  it('accepts exports with a catch-all subpath pattern', () => {
    expect(
      checkPackageJson({
        files: ['hearth-manifest.json'],
        exports: { '.': './js/index.js', './*': './*' },
      })
    ).toEqual([]);
  });

  it('accepts a files glob that matches the manifest', () => {
    expect(checkPackageJson({ files: ['*.json'] })).toEqual([]);
  });
});
