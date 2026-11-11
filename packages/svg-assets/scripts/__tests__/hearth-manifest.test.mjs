import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateManifest } from '@utilitywarehouse/hearth-manifest';

// Checks the committed hearth-manifest.json against the committed SVGs it describes. If an asset
// is added or removed without regenerating the manifest (`pnpm generate:manifest`), these fail.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'hearth-manifest.json'), 'utf8'));
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const svgFiles = fs
  .readdirSync(path.join(root, 'lib'))
  .filter(file => file.endsWith('.svg'))
  .map(file => `lib/${file}`)
  .sort();

describe('hearth-manifest.json', () => {
  it('is a valid svg assets manifest', () => {
    expect(validateManifest(manifest)).toEqual({ success: true, manifest });
    expect(manifest.type).toBe('svg-assets');
  });

  it('names this package and its current version', () => {
    expect(manifest.package).toEqual({ name: packageJson.name, version: packageJson.version });
  });

  it('has an entry for every SVG in lib, and none for a file that is not there', () => {
    expect(manifest.entries.map(entry => entry.file).sort()).toEqual(svgFiles);
  });

  it('imports each asset from this package', () => {
    for (const entry of manifest.entries) {
      expect(entry.import).toBe(`${packageJson.name}/${entry.file}`);
    }
  });

  it('names each asset as the existing name-only manifest.json does', () => {
    const known = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8')).svgAssets;

    expect(manifest.entries.map(entry => entry.name).sort()).toEqual(
      known.map(asset => asset.name).sort()
    );
  });
});
