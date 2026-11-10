import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateManifest } from '@utilitywarehouse/hearth-manifest';

// Checks the committed hearth-manifest.json against the committed icons it describes. If an
// icon is added or removed without regenerating the manifest (`pnpm generate:manifest` in
// svg-icons), these fail.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'hearth-manifest.json'), 'utf8'));
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const iconFiles = fs
  .readdirSync(path.join(root, 'lib'))
  .filter(file => file.endsWith('.svg'))
  .sort();

describe('hearth-manifest.json', () => {
  it('is a valid icons manifest', () => {
    expect(validateManifest(manifest)).toEqual({ success: true, manifest });
    expect(manifest.type).toBe('icons');
  });

  it('names this package and its current version', () => {
    expect(manifest.package).toEqual({ name: packageJson.name, version: packageJson.version });
  });

  it('is for the svg platform', () => {
    expect(manifest.usage.platform).toBe('svg');
    expect(manifest.usage.import).toBe(packageJson.name);
  });

  it('has an entry for every icon in lib, and none for an icon that is not there', () => {
    const listed = manifest.entries.map(entry => entry.svg).sort();

    expect(listed).toEqual(iconFiles);
  });
});
