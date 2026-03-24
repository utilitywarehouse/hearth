const path = require('path');
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
    return fileName.split('.')[0].toLowerCase().replace(/_/g, '-') + '-light.json';
  },
  toJsxName(filePath) {
    const withoutExt = filePath.replace(/\.[^.]+$/, '');
    const parts = withoutExt
      .split(/[\\/]/)
      .flatMap(part => part.split(/[^a-zA-Z0-9]+/))
      .filter(Boolean);
    return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
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
    await fs.outputFile(path.resolve(LIB_DIR, asset.filename), jsonData, {
      encoding: 'utf8',
    });
  });
}

/** Generates a manifest.json file for use by storybook to generate docs. */
async function generateManifest(assets) {
  const jsonAssets = assets
    .map(({ name, filename }) => ({ name, filename }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  await fs.outputFile(MANIFEST_PATH, JSON.stringify({ jsonAssets }, null, 2), {
    encoding: 'utf8',
  });
}

/** Get a list of JSON asset names from the manifest file. */
function getAssetsList() {
  try {
    const raw = fs.readFileSync(MANIFEST_PATH, { encoding: 'utf8' });
    const { jsonAssets } = JSON.parse(raw);
    return (jsonAssets || []).map(item => item.name);
  } catch (e) {
    // If manifest doesn't exist yet, treat as no existing assets.
    return [];
  }
}

/**
 * Create a temporary list of added and removed assets. This will be deleted
 * after it has been outputted to the console when running the generate
 * script.
 * Currently this won't list any assets that have changed. So we'll have to
 * check this manually to see if the change warrants inclusion in the
 * changeset.
 */
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
## NEW ANIMATED ASSETS

${added}

## REMOVED ANIMATED ASSETS

${removed}

`;

  await fs.outputFile(path.resolve(__dirname, '../../../', 'updated-json-assets.md'), content);
  return { added, removed };
}

async function main() {
  // First get a list of the currently available assets.
  const currentAssetsList = getAssetsList();

  // Fetch assets from Brandfolder
  console.log('fetching assets from Brandfolder');
  const assets = await fetchBrandfolderAnimatedAssets();
  console.log(`Found ${assets.length} JSON asset(s).`);

  // Download JSON files to lib directory
  console.log(`downloading ${assets.length} JSON asset(s)`);
  await downloadJsonToFs(assets);

  // Generate the manifest for the storybook docs
  await generateManifest(assets);

  // Let's see what assets we have now, and what has been added and removed, so
  // we can add it to the release changeset.
  const updatedAssetsList = getAssetsList();
  await createTempListOfAddedAndRemovedAssets(currentAssetsList, updatedAssetsList);

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
