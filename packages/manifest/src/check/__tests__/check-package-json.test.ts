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

  describe('exports resolve the manifest the way the CLI’s require.resolve does', () => {
    const files = ['hearth-manifest.json'];
    const error = ['"exports" does not resolve ./hearth-manifest.json to the root manifest'];

    it('reports a pattern that redirects away from the root file', () => {
      expect(checkPackageJson({ files, exports: { './*': './dist/*' } })).toEqual(error);
    });

    it('reports an exact entry that points at a different file', () => {
      const exports = { './hearth-manifest.json': './other.json' };

      expect(checkPackageJson({ files, exports })).toEqual(error);
    });

    it('reports an explicit exclusion that overrides a catch-all pattern', () => {
      const exports = { './*': './*', './hearth-manifest.json': null };

      expect(checkPackageJson({ files, exports })).toEqual(error);
    });

    it('lets an exact entry override a redirecting pattern', () => {
      const exports = { './*': './dist/*', './hearth-manifest.json': './hearth-manifest.json' };

      expect(checkPackageJson({ files, exports })).toEqual([]);
    });

    it('prefers the longer pattern, as Node does', () => {
      const exports = { './*': './*', './hearth-*': './dist/hearth-*' };

      expect(checkPackageJson({ files, exports })).toEqual(error);
    });

    it('accepts a suffix pattern that resolves to the root file', () => {
      expect(checkPackageJson({ files, exports: { './*.json': './*.json' } })).toEqual([]);
    });

    it('follows the require, node and default conditions, in the order written', () => {
      const exports = {
        './hearth-manifest.json': { import: './x.json', default: './hearth-manifest.json' },
      };

      expect(checkPackageJson({ files, exports })).toEqual([]);
    });

    it('reports conditions that none of the CLI’s conditions match', () => {
      const exports = { './hearth-manifest.json': { import: './hearth-manifest.json' } };

      expect(checkPackageJson({ files, exports })).toEqual(error);
    });

    it('reports a matching condition that excludes the manifest', () => {
      const exports = {
        './hearth-manifest.json': { require: null, default: './hearth-manifest.json' },
      };

      expect(checkPackageJson({ files, exports })).toEqual(error);
    });

    it('takes the first usable entry of an array target', () => {
      const exports = { './hearth-manifest.json': [null, './hearth-manifest.json'] };

      expect(checkPackageJson({ files, exports })).toEqual([]);
    });
  });
});
