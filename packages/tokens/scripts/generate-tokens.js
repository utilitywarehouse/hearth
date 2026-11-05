import fs from 'fs';
import { validateManifest } from '@utilitywarehouse/hearth-manifest';
import { generateJsTokens } from './generate-js-tokens.js';
import { generateCssTokens } from './generate-css-tokens.js';
import { generateBrowserTokens } from './generate-browser-tokens.js';
import { buildTokensManifest } from './helpers/build-tokens-manifest.js';
import { clearManifestRecords, getManifestRecords } from './helpers/manifest-collector.js';
import { loadJSON } from './helpers/load-json.js';

const MANIFEST_PATH = './hearth-manifest.json';

function writeManifest() {
  const { name, version } = loadJSON('./package.json');
  const manifest = buildTokensManifest(getManifestRecords(), { name, version });
  const result = validateManifest(manifest);
  if (!result.success) {
    throw new Error(`Invalid ${MANIFEST_PATH}:\n${result.errors.join('\n')}`);
  }
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${MANIFEST_PATH} (${manifest.entries.length} entries)`);
}

async function generateTokens() {
  clearManifestRecords();
  const dictionaries = [
    // Generate JS objects, optimised for use in React Native applications
    ...generateJsTokens(),
    // Generate CSS Custom properties
    ...generateCssTokens(),
    // Generate JS objects, optimised for use in the browser. These will refer
    // to CSS custom properties rather than raw values, so need to be used in
    // conjunction with the CSS tokens.
    ...generateBrowserTokens(),
  ];

  try {
    // Style Dictionary v4 is async => buildAllPlatforms returns a Promise
    // We can do Promise.allSettled to run them in parallel:
    const results = await Promise.allSettled(dictionaries.map(d => d.buildAllPlatforms()));
    // a failed build would otherwise leave the manifest without that surface's data
    const failures = results.filter(result => result.status === 'rejected');
    if (failures.length > 0) {
      throw new Error(
        `${failures.length} token build(s) failed:\n${failures.map(f => f.reason?.stack ?? f.reason).join('\n')}`
      );
    }
    console.log('Tokens built successfully!');
    // The generators record the tokens they write as they go, so this runs once they are done
    writeManifest();
  } catch (error) {
    console.error('Error building tokens:', error);
    process.exitCode = 1;
  }
}

// Run the build:
(async () => {
  await generateTokens();
})();
