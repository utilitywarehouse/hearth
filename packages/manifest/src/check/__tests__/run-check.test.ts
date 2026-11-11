import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { INDEXED_PACKAGES, type IndexedPackage } from '../indexed-packages.js';
import { runCheck } from '../run-check.js';

const jsonAssets: IndexedPackage = { dir: 'json-assets', type: 'json-assets' };
const name = '@utilitywarehouse/hearth-json-assets';
const manifest = {
  schemaVersion: 2,
  package: { name, version: '1.0.0' },
  type: 'json-assets',
  entries: [],
};

type Fixture = { manifest?: unknown; pkg?: object };

/** Builds a throwaway `packages/` directory with one directory per entry. */
const packagesDir = (dirs: Record<string, Fixture>) => {
  const root = mkdtempSync(join(tmpdir(), 'hearth-check-'));
  for (const [dir, { manifest: m, pkg }] of Object.entries(dirs)) {
    mkdirSync(join(root, dir));
    writeFileSync(
      join(root, dir, 'package.json'),
      JSON.stringify(pkg ?? { name, version: '1.0.0', files: ['hearth-manifest.json'] })
    );
    if (m !== undefined) writeFileSync(join(root, dir, 'hearth-manifest.json'), JSON.stringify(m));
  }
  return root;
};

const okPack = () => [{ files: [{ path: 'package.json' }, { path: 'hearth-manifest.json' }] }];

describe('runCheck', () => {
  it('passes for a package with a valid, in-sync manifest', () => {
    const dir = packagesDir({ 'json-assets': { manifest } });

    expect(runCheck(dir, [jsonAssets])).toEqual({});
  });

  it('reports a package whose manifest file is missing', () => {
    const dir = packagesDir({ 'json-assets': {} });

    expect(runCheck(dir, [jsonAssets])).toEqual({
      'json-assets': ['hearth-manifest.json is missing'],
    });
  });

  it('reports a manifest that is not JSON', () => {
    const dir = packagesDir({ 'json-assets': { manifest: 'x' } });
    writeFileSync(join(dir, 'json-assets/hearth-manifest.json'), '{nope');

    expect(runCheck(dir, [jsonAssets])['json-assets']).toEqual([
      expect.stringContaining('hearth-manifest.json is not valid JSON'),
    ]);
  });

  it('reports a stale version after the package version changes', () => {
    const dir = packagesDir({
      'json-assets': {
        manifest,
        pkg: { name, version: '1.1.0', files: ['hearth-manifest.json'] },
      },
    });

    expect(runCheck(dir, [jsonAssets])).toEqual({
      'json-assets': ['package.version is "1.0.0", expected "1.1.0"'],
    });
  });

  it('reports package.json problems alongside manifest problems, all at once', () => {
    const dir = packagesDir({
      'json-assets': { manifest: { ...manifest, type: 'tokens' }, pkg: { name, version: '1.0.0' } },
    });

    expect(runCheck(dir, [jsonAssets])['json-assets']).toHaveLength(2);
  });

  it('collects errors from every package rather than stopping at the first', () => {
    const dir = packagesDir({ 'json-assets': {}, tokens: {} });

    expect(Object.keys(runCheck(dir, [jsonAssets, { dir: 'tokens', type: 'tokens' }]))).toEqual([
      'json-assets',
      'tokens',
    ]);
  });

  it('checks the packed tarball when given a pack function', () => {
    const dir = packagesDir({ 'json-assets': { manifest } });
    const packed: Array<string> = [];
    const pack = (target: string) => {
      packed.push(target);
      return [{ files: [{ path: 'package.json' }] }];
    };

    expect(runCheck(dir, [jsonAssets], pack)).toEqual({
      'json-assets': ['tarball does not contain hearth-manifest.json'],
    });
    expect(packed).toEqual([join(dir, 'json-assets')]);
  });

  it('passes the tarball check when the tarball is complete', () => {
    const dir = packagesDir({ 'json-assets': { manifest } });

    expect(runCheck(dir, [jsonAssets], okPack)).toEqual({});
  });

  it('reports an indexed package that is not in the registry', () => {
    const dir = packagesDir({ 'json-assets': { manifest }, tokens: { manifest } });

    expect(runCheck(dir, [jsonAssets])).toEqual({
      tokens: ['ships hearth-manifest.json but is not in INDEXED_PACKAGES'],
    });
  });

  it('reports a registered package that does not exist', () => {
    const dir = packagesDir({});

    expect(runCheck(dir, [jsonAssets])).toEqual({
      'json-assets': ['packages/json-assets does not exist'],
    });
  });
});

describe('the Hearth monorepo', () => {
  it('registers six indexed packages', () => {
    expect(INDEXED_PACKAGES.map(p => p.dir).sort()).toEqual([
      'json-assets',
      'react-icons',
      'react-native-icons',
      'svg-assets',
      'svg-icons',
      'tokens',
    ]);
  });

  it('has every indexed package shipping a valid, in-sync manifest', () => {
    const packages = resolve(import.meta.dirname, '../../../..');

    expect(runCheck(packages, INDEXED_PACKAGES)).toEqual({});
  });
});
