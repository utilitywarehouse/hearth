const path = require('path');
const fs = require('fs-extra');

const RAW_DIR = path.resolve(__dirname, '..', 'raw');
const LIB_DIR = path.resolve(__dirname, '..', 'lib');
const MANIFEST_PATH = path.resolve(__dirname, '..', 'manifest.json');

function normalizeFilename(fileName) {
  return fileName.toLowerCase().replace(/_/g, '-');
}

function toJsxName(filePath) {
  const withoutExt = filePath.replace(/\.[^.]+$/, '');
  const parts = withoutExt
    .split(/[\\/]/)
    .flatMap(part => part.split(/[^a-zA-Z0-9]+/))
    .filter(Boolean);

  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return [fullPath];
    })
  );

  return nested.flat();
}

async function copyRawFilesToLib() {
  await fs.ensureDir(LIB_DIR);

  if (!(await fs.pathExists(RAW_DIR))) {
    return [];
  }

  const rawFiles = await walkFiles(RAW_DIR);

  await Promise.all(
    rawFiles.map(async sourcePath => {
      const relativeFromRaw = path.relative(RAW_DIR, sourcePath);
      const parsed = path.parse(relativeFromRaw);
      const normalizedBase = normalizeFilename(parsed.base);
      const destinationPath = path.join(LIB_DIR, parsed.dir, normalizedBase);

      await fs.ensureDir(path.dirname(destinationPath));
      await fs.copy(sourcePath, destinationPath, { overwrite: true });
    })
  );

  return rawFiles;
}

async function generateManifestFromLib() {
  if (!(await fs.pathExists(LIB_DIR))) {
    await fs.outputFile(MANIFEST_PATH, JSON.stringify({ jsonAssets: [] }, null, 2), {
      encoding: 'utf8',
    });
    return [];
  }

  const libFiles = await walkFiles(LIB_DIR);

  const manifestMap = libFiles.reduce((map, fullPath) => {
    const relativePath = path.relative(LIB_DIR, fullPath).split(path.sep).join('/');
    const name = toJsxName(relativePath);
    map.set(name, { name, path: relativePath });
    return map;
  }, new Map());

  const jsonAssets = Array.from(manifestMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, 'en')
  );

  await fs.outputFile(MANIFEST_PATH, JSON.stringify({ jsonAssets }, null, 2), {
    encoding: 'utf8',
  });

  return jsonAssets;
}

/** Get a list of JSON asset names from the manifest file. */
async function getAssetsList() {
  try {
    const raw = await fs.readFileSync(MANIFEST_PATH, { encoding: 'utf8' });
    const { jsonAssets } = JSON.parse(raw);
    return (jsonAssets || []).map(item => item.name);
  } catch (e) {
    // If manifest doesn't exist yet, treat as no existing assets.
    return [];
  }
}

/** Create a temporary list of added and removed assets for release notes. */
async function createTempListOfAddedAndRemovedAssets(previous, updated) {
  const addedAssets = updated.reduce((added, asset) => {
    if (!previous.includes(asset)) {
      added.push(asset);
    }
    return added;
  }, []);

  const removedAssets = previous.reduce((removed, asset) => {
    if (!updated.includes(asset)) {
      removed.push(asset);
    }
    return removed;
  }, []);

  const added = addedAssets.length > 0 ? `- ${addedAssets.join('\n- ')}` : 'No new assets.';
  const removed =
    removedAssets.length > 0 ? `- ${removedAssets.join('\n- ')}` : 'No removed assets.';

  const content = `
## NEW ASSETS

${added}

## REMOVED ASSETS

${removed}

`;

  await fs.outputFile(path.resolve(__dirname, '../../../', 'updated-assets.md'), content);
  return { added, removed };
}

async function main() {
  const currentAssetsList = await getAssetsList();

  await copyRawFilesToLib();
  const assets = await generateManifestFromLib();

  const updatedAssetsList = await getAssetsList();
  await createTempListOfAddedAndRemovedAssets(currentAssetsList, updatedAssetsList);

  console.log(`Generated manifest with ${assets.length} json asset(s).`);
}

main()
  .then(() => {
    console.log('Thanks, see ya 👋');
  })
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
