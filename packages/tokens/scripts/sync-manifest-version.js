import fs from 'fs';
import { loadJSON } from './helpers/load-json.js';

// `changeset version` bumps package.json but does not regenerate the tokens, so the
// version recorded in hearth-manifest.json is brought in line here on release.
const MANIFEST_PATH = './hearth-manifest.json';

const { version } = loadJSON('./package.json');
const manifest = loadJSON(MANIFEST_PATH);
manifest.package.version = version;
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Set ${MANIFEST_PATH} package.version to ${version}`);
