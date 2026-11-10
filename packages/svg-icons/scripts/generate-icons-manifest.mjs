// Writes the same icon list into hearth-manifest.json in the SVG, React and React Native icon
// packages, each with the usage for its own platform. It reads the committed `lib/*.svg`, so it
// needs no Figma access: run it after `generate`, or on its own to refresh the manifests.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateManifest } from '@utilitywarehouse/hearth-manifest';
import { buildIconsManifest, ICON_PACKAGES } from './helpers/build-icons-manifest.mjs';

const packages = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const svgFiles = fs
  .readdirSync(path.join(packages, 'svg-icons/lib'))
  .filter(f => f.endsWith('.svg'));

const DIRECTORIES = {
  svg: 'svg-icons',
  react: 'react-icons',
  'react-native': 'react-native-icons',
};

for (const [platform, directory] of Object.entries(DIRECTORIES)) {
  const target = path.join(packages, directory);
  const { version } = JSON.parse(fs.readFileSync(path.join(target, 'package.json'), 'utf8'));
  const manifest = buildIconsManifest(
    svgFiles,
    { name: ICON_PACKAGES[platform].name, version },
    platform
  );
  const result = validateManifest(manifest);
  if (!result.success) throw new Error(`${directory}: ${result.errors.join('; ')}`);
  fs.writeFileSync(
    path.join(target, 'hearth-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  console.log(`Wrote ${directory}/hearth-manifest.json (${manifest.entries.length} icons)`);
}
