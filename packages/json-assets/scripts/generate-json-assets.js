const path = require('path');
const crypto = require('crypto');
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/naming-convention
const fetch = require('node-fetch');

require('dotenv').config();

if (!process.env.BRANDFOLDER_API_KEY) {
  throw new Error("❌ BRANDFOLDER_API_KEY is missing! Make sure it's set.");
}

const brandfolderConfig = {
  /** The base Brandfolder API url */
  baseUrl: 'https://brandfolder.com/api/v4',
  /** The UW Brandfolder collection ID for JSON assets (Lottie animations) */
  collectionId: process.env.BRANDFOLDER_COLLECTION_ID, // new-brand
  /** The headers for authenticating with the Brandfolder API. */
  headers: {
    Authorization: `Bearer ${process.env.BRANDFOLDER_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

const transformers = {
  normalizeFilename(fileName) {
    const isDarkMode = fileName.startsWith('Dark-mode');
    const name = `${fileName
      .split('.')[0]
      .replace(/^Dark-mode_/, '')
      .replace(/_/g, '-')}`;
    return `animated-${name.toLowerCase()}-${isDarkMode ? 'dark' : 'light'}.json`;
  },
  toJsxName(filePath) {
    const isDarkMode = filePath.startsWith('Dark-mode');
    const withoutExt = filePath.replace(/\.[^.]+$/, '');
    const parts = withoutExt
      .replace(/^Dark-mode_/, '')
      .split(/[\\/]/)
      .flatMap(part => part.split(/[^a-zA-Z0-9]+/))
      .filter(Boolean);
    return `Animated${parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')}${isDarkMode ? 'Dark' : 'Light'}`;
  },
};

const LIB_DIR = path.resolve(__dirname, '..', 'lib');
const MANIFEST_PATH = path.resolve(__dirname, '..', 'manifest.json');

/**
 * Fetch all assets from the Brandfolder collection, following pagination.
 * Includes attachments so we can get the download URLs.
 */
async function fetchBrandfolderAnimatedAssets() {
  const assets = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `${brandfolderConfig.baseUrl}/collections/${brandfolderConfig.collectionId}/assets?search=extension:json&include=attachments&page=${page}&per=${perPage}`;
    const resp = await fetch(url, { headers: brandfolderConfig.headers });

    if (!resp.ok) {
      const errorText = await resp.text();
      throw new Error(
        `Failed to fetch assets from Brandfolder (status ${resp.status}):\n${errorText}`
      );
    }

    const { included } = await resp.json();

    if (!included || included.length === 0) {
      break;
    }

    included
      .filter(asset => asset.attributes?.extension === 'json')
      .forEach(asset => {
        assets.push({
          id: asset.id,
          name: transformers.toJsxName(asset.attributes?.filename),
          filename: transformers.normalizeFilename(asset.attributes?.filename),
          url: asset.attributes?.url,
        });
      });

    // Stop if we received fewer results than requested (last page)
    if (included.length < perPage) {
      break;
    }

    page++;
  }

  return assets;
}

/** Process items in batches to limit concurrency. */
async function processInBatches(items, batchSize, fn) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(fn));
  }
}

/** Download JSON files and write them to the lib directory. */
async function downloadJsonToFs(assets) {
  await fs.ensureDir(LIB_DIR);

  await processInBatches(assets, 5, async asset => {
    const resp = await fetch(asset.url);
    if (!resp.ok) {
      throw new Error(`Failed to download ${asset.filename}: ${resp.status}`);
    }

    const jsonData = await resp.text();
    asset.hash = crypto.createHash('sha256').update(jsonData, 'utf8').digest('hex');

    await fs.outputFile(path.resolve(LIB_DIR, asset.filename), jsonData, {
      encoding: 'utf8',
    });
  });
}

/** Generates a manifest.json file for use by storybook to generate docs. */
async function generateManifest(assets) {
  const jsonAssets = assets
    .map(({ name, filename, hash }) => ({ name, filename, hash }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  await fs.outputFile(MANIFEST_PATH, JSON.stringify({ jsonAssets }, null, 2), {
    encoding: 'utf8',
  });
}

/** Get the current JSON asset metadata from the manifest file. */
function getManifestAssets() {
  try {
    const raw = fs.readFileSync(MANIFEST_PATH, { encoding: 'utf8' });
    const { jsonAssets } = JSON.parse(raw);
    return jsonAssets || [];
  } catch (e) {
    // If manifest doesn't exist yet, treat as no existing assets.
    return [];
  }
}

/**
 * Create a temporary list of added, changed and removed assets. This will be
 * deleted after it has been outputted to the console when running the
 * generate script.
 */
async function createTempListOfAssetChanges(previous, updated) {
  const previousByName = new Map(previous.map(asset => [asset.name, asset]));
  const updatedByName = new Map(updated.map(asset => [asset.name, asset]));

  const addedAssets = updated.reduce((added, asset) => {
    if (!previousByName.has(asset.name)) {
      added.push(asset.name);
    }
    return added;
  }, []);

  const removedAssets = previous.reduce((removed, asset) => {
    if (!updatedByName.has(asset.name)) {
      removed.push(asset.name);
    }
    return removed;
  }, []);

  const changedAssets = updated.reduce((changed, asset) => {
    const previousAsset = previousByName.get(asset.name);

    if (!previousAsset) {
      return changed;
    }

    // Older manifests do not have hashes, so skip changed detection until
    // both sides have a stored fingerprint.
    if (previousAsset.hash && asset.hash && previousAsset.hash !== asset.hash) {
      changed.push(asset.name);
    }

    return changed;
  }, []);

  const added = addedAssets.length > 0 ? `- ${addedAssets.join('\n- ')}` : 'No new assets.';
  const removed =
    removedAssets.length > 0 ? `- ${removedAssets.join('\n- ')}` : 'No removed assets.';
  const changed =
    changedAssets.length > 0 ? `- ${changedAssets.join('\n- ')}` : 'No changed assets.';

  const content = `
## NEW ANIMATED ASSETS

${added}

## CHANGED ANIMATED ASSETS

${changed}

## REMOVED ANIMATED ASSETS

${removed}

`;

  await fs.outputFile(path.resolve(__dirname, '../../../', 'updated-json-assets.md'), content);
  return { added, changed, removed };
}

async function main() {
  // First get a list of the currently available assets.
  const currentAssetsList = getManifestAssets();

  // Fetch assets from Brandfolder
  console.log('fetching assets from Brandfolder');
  const assets = await fetchBrandfolderAnimatedAssets();
  console.log(`Found ${assets.length} JSON asset(s).`);

  // Download JSON files to lib directory
  console.log(`downloading ${assets.length} JSON asset(s)`);
  await downloadJsonToFs(assets);

  // Generate the manifest for the storybook docs
  await generateManifest(assets);

  // Let's see what assets we have now, and what has been added, changed and
  // removed, so we can add it to the release changeset.
  const updatedAssetsList = getManifestAssets();
  await createTempListOfAssetChanges(currentAssetsList, updatedAssetsList);

  console.log(`Generated asset manifest.`);
}

main()
  .then(() => {
    console.log('Thanks, see ya 👋');
  })
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
