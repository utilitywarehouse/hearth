// Writes hearth-manifest.json from the committed `lib/*.svg`, so it needs no Figma access.
// Run it after `generate`, or on its own to refresh the manifest (for example after a release).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateManifest } from '@utilitywarehouse/hearth-manifest';
import { buildSvgAssetsManifest } from './helpers/build-svg-assets-manifest.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { name, version } = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const svgFiles = fs.readdirSync(path.join(root, 'lib')).filter(file => file.endsWith('.svg'));

const manifest = buildSvgAssetsManifest(svgFiles, { name, version });
const result = validateManifest(manifest);
if (!result.success) throw new Error(result.errors.join('; '));
fs.writeFileSync(path.join(root, 'hearth-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote hearth-manifest.json (${manifest.entries.length} assets)`);
