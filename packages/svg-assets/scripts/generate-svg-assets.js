const path = require('path');
const crypto = require('crypto');
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require('lodash');
const { optimize, loadConfig } = require('svgo');
const fetch = require('node-fetch');

require('dotenv').config();

const APPROVED_CANVASES = [
  'Logo',
  'Spots - Theme',
  'Scenes - Theme',
  'Mascots - Theme',
  'Technical - Theme',
  'Emojis',
];

if (!process.env.FIGMA_ACCESS_TOKEN) {
  throw new Error("❌ FIGMA_ACCESS_TOKEN is missing! Make sure it's set.");
}

const figmaConfig = {
  /** The base Figma API url */
  baseUrl: 'https://api.figma.com',
  /** The UW Assets Figma library fileKey */
  fileKey: 'bZWlxN5ZzRTlDmnR1EGZun',
  /** The headers pass the Figma personal access key to the API, authenticating this script. */
  headers: new fetch.Headers({ 'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN }),
};

const transformers = {
  /** Extract variant values from a component variant name, ignoring keys like Variant/Color. */
  parseVariantValues(name) {
    if (!name || typeof name !== 'string') return [];
    const parts = name
      .split(/[,/]/)
      .map(s => s.trim())
      .filter(Boolean);
    return parts
      .map(p => {
        const kv = p.split(/[:=]/);
        let value = kv.length > 1 ? kv.slice(1).join(':') : p;
        value = value.trim();
        return value
          .replace(/^Variant$/i, '')
          .replace(/^Color$/i, '')
          .trim();
      })
      .filter(Boolean);
  },

  /** Build the svg & jsx names of the asset (variant-aware). */
  buildAssetNames(asset, metadata = {}) {
    const { componentSetName } = metadata;
    // Prefer set name when present (indicates variants); otherwise use the component name.
    const base = componentSetName || `${asset.name.split(' - ')[0]}`;
    const variantValues = componentSetName ? transformers.parseVariantValues(asset.name) : [];
    const combined = [base, ...variantValues].join(' ').replace(/\s+/g, ' ').trim();

    const svgName = `${_.kebabCase(combined)}`;
    const jsxName = `${_.upperFirst(_.camelCase(combined))}`;
    return { id: asset.id, svgName, jsxName };
  },
  /** Pass SVG through SVGO to reduce size. */
  async passSVGO(svgRaw, svgPath, config) {
    const { data } = optimize(svgRaw, {
      ...config,
      path: svgPath,
    });
    return data;
  },
};

/**
 * Gets the contents of the UW Assets Figma library.
 *
 * https://www.figma.com/file/WDFaQF9EMtS7MjuIpjDVpf
 *
 * This is the document we will need to pull all the assets out of.
 */
async function getAssetsFigmaDocument() {
  const resp = await fetch(`${figmaConfig.baseUrl}/v1/files/${figmaConfig.fileKey}`, {
    headers: figmaConfig.headers,
  });
  const data = await resp.json();
  if (data.status === 403 && (data.err === 'Invalid token' || data.err === 'Token expired')) {
    throw new Error(
      'An invalid or expired token was used. Follow the Auth Guide (https://git.io/Je87i), and try again.'
    );
  }
  return data.document;
}

/** Get only the small, medium & large asset canvases from the Figma document. */
async function getSizeCanvases(document) {
  const canvas = document.children.reduce((canvases, { name, children }) => {
    const [size] = name.split(' - ');

    if (
      // Include these canvases only, and ensure they have content
      APPROVED_CANVASES.some(s => name.includes(s)) &&
      children.length > 0
    ) {
      canvases = [...canvases, { size, children }];
    }
    return canvases;
  }, []);

  return canvas;
}

/** Gets all the assets from the contents of the Variant frames */
function getAssets(data) {
  // Recursively traverse canvas nodes to collect all COMPONENTs (and components inside COMPONENT_SETs)
  return data.reduce((assets, canvas) => {
    const visit = (node, ctx = {}) => {
      if (!node) return;
      if (node.type === 'COMPONENT') {
        assets[node.id] = transformers.buildAssetNames(node, {
          canvas: canvas.size,
          componentSetName: ctx.componentSetName,
        });
      }
      // If this is a COMPONENT_SET, capture its name to pass to children
      const nextCtx = { ...ctx };
      if (node.type === 'COMPONENT_SET') {
        nextCtx.componentSetName = `${node.name.split(' - ')[0]}`;
      }
      if (node.children && node.children.length) {
        node.children.forEach(child => visit(child, nextCtx));
      }
    };

    canvas.children.forEach(child => visit(child));
    return assets;
  }, {});
}

async function writeAssetsToFile(assets) {
  const formatted = Object.values(assets).map(({ id, jsxName }) => ({ id, name: jsxName }));
  await fs.outputFile(
    path.resolve(__dirname, '..', 'assets.json'),
    JSON.stringify(formatted, undefined, 2),
    {
      encoding: 'utf8',
    }
  );
}

/** Gets Figma urls for each asset SVG, using the asset id. */
async function renderIdsToSvgUrls(ids) {
  const resp = await fetch(
    `${figmaConfig.baseUrl}/v1/images/${figmaConfig.fileKey}?ids=${ids}&format=svg`,
    { headers: figmaConfig.headers }
  );

  // We can't be sure of the response, when an error, will have a body that can be streamed to JSON.
  let data = {
    err: null,
    images: {},
  };
  if (resp.headers.get('content-type').includes('application/json')) {
    data = await resp.json();
  }
  const error = typeof data.err === 'object' ? JSON.stringify(data.err, null, 2) : data.err;
  if (!resp.ok) {
    switch (resp.status) {
      case 400:
        throw new Error(`Unexpected error encountered from Figma API\n${error}`);
      case 404:
        throw new Error(
          "One or more of the assets couldn't be found in Figma. Check to see if they still exist, and try again."
        );
      case 500:
        throw new Error('Figma could not render the assets. ಠ_ಠ');
      default:
        throw new Error(
          `An error occurred while rendering assets to SVG.\n${resp.status}\n${error}`
        );
    }
  }

  if (!data.images || !Object.keys(data.images).length) {
    throw new Error(
      `An error occurred after rendering assets in Figma. Render response:\n${JSON.stringify(
        data,
        null,
        2
      )}`
    );
  }

  return data.images;
}

/** Download SVGs and create .svg files in the lib directory. */
async function downloadSvgsToFs(urls, assets) {
  const svgoConfig = await loadConfig();
  await Promise.all(
    Object.keys(urls).map(async assetId => {
      const asset = assets[assetId];
      const fileName = `${asset.svgName}.svg`;

      const processedSvg = await (await fetch(urls[assetId]))
        .text()
        .then(async svgRaw => transformers.passSVGO(svgRaw, fileName, svgoConfig));
      asset.hash = crypto.createHash('sha256').update(processedSvg, 'utf8').digest('hex');

      await fs.outputFile(path.resolve(__dirname, '..', 'lib', fileName), processedSvg, {
        encoding: 'utf8',
      });
    })
  );
}

/** Generates a manifest.json file for use by storybook to generate docs. */
async function generateManifest(assets) {
  // use a map to avoid duplicates
  const manifestMap = Object.values(assets).reduce((map, asset) => {
    const { svgName, jsxName, hash } = asset;
    map.set(jsxName, { name: jsxName, path: `${svgName}.svg`, hash });
    return map;
  }, new Map());

  const svgAssets = Array.from(manifestMap.values());

  await fs.outputFile(
    path.resolve(__dirname, '../manifest.json'),
    JSON.stringify({ svgAssets }, null, 2),
    { encoding: 'utf8' }
  );
}

/** Get the current SVG asset metadata from the manifest file. */
async function getManifestAssets() {
  try {
    const raw = await fs.readFileSync(path.resolve(__dirname, '..', 'manifest.json'), {
      encoding: 'utf8',
    });
    const { svgAssets } = JSON.parse(raw);
    return svgAssets || [];
  } catch (e) {
    // If manifest doesn't exist yet, treat as no existing assets
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
## NEW ASSETS

${added}

## CHANGED ASSETS

${changed}

## REMOVED ASSETS

${removed}

`;
  await fs.outputFile(path.resolve(__dirname, '../../../', 'updated-svg-assets.md'), content);
  return { added, changed, removed };
}

async function main() {
  // First get a list of the currently available assets.
  const currentAssetsList = await getManifestAssets();

  // Get the document from Figma
  console.log('getting figma document');
  const document = await getAssetsFigmaDocument();
  // Pull out the relevant canvases
  const data = await getSizeCanvases(document);
  // Get all the assets
  console.log('getting assets');
  const assets = getAssets(data);
  // write to file for reference & generating figma code connect files
  await writeAssetsToFile(assets);
  // List all the assets ids and use them to get the URLs for each SVG
  const assetIds = Object.keys(assets);
  const assetSvgUrls = await renderIdsToSvgUrls(assetIds);

  // Download those SVGs to file
  console.log('creating svg files');
  await downloadSvgsToFs(assetSvgUrls, assets);
  // generate the manifest for the storybook docs
  await generateManifest(assets);

  // Let's see what assets we have now, and what has been added, changed and
  // removed, so we can add it to the release changeset.
  const updatedAssetsList = await getManifestAssets();
  await createTempListOfAssetChanges(currentAssetsList, updatedAssetsList);
}

main()
  .then(() => {
    console.log('Thanks, see ya 👋');
  })
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
