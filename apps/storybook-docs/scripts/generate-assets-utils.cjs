const { render } = require('ejs');
const fs = require('fs-extra');
const path = require('path');

const SVG_ASSETS_DIR = path.resolve(__dirname, '../../../packages/svg-assets');
const JSON_ASSETS_DIR = path.resolve(__dirname, '../../../packages/json-assets');

function readManifestAssets(manifestPath, assetKey) {
  const manifestRaw = fs.readFileSync(manifestPath, { encoding: 'utf8' });
  const parsed = JSON.parse(manifestRaw);

  return parsed[assetKey] || [];
}

function dedupeManifestAssets({ assets, assetType, pathKey }) {
  const assetsByName = new Map();

  assets.forEach(asset => {
    const existingAsset = assetsByName.get(asset.name);

    if (!existingAsset) {
      assetsByName.set(asset.name, asset);
      return;
    }

    if (existingAsset[pathKey] !== asset[pathKey]) {
      throw new Error(
        `${assetType} manifest contains conflicting entries for ${asset.name}: ${existingAsset[pathKey]} and ${asset[pathKey]}.`
      );
    }
  });

  return Array.from(assetsByName.values());
}

function assertManifestAssetsExist({ assets, assetsDir, assetType, pathKey }) {
  const libDir = path.resolve(assetsDir, 'lib');
  const missingAssets = assets.filter(
    asset => !fs.existsSync(path.resolve(libDir, asset[pathKey]))
  );

  if (missingAssets.length === 0) {
    return;
  }

  const missingAssetsList = missingAssets
    .map(asset => `- ${asset.name} (${asset[pathKey]})`)
    .join('\n');

  throw new Error(
    `Found removed ${assetType} asset(s) still referenced by manifest.json:\n${missingAssetsList}\nRegenerate the ${assetType} assets package manifest or restore the missing files.`
  );
}

async function getAssets() {
  const svgAssetsManifestPath = path.resolve(SVG_ASSETS_DIR, 'manifest.json');
  const svgAssets = dedupeManifestAssets({
    assets: readManifestAssets(svgAssetsManifestPath, 'svgAssets'),
    assetType: 'SVG',
    pathKey: 'path',
  });
  assertManifestAssetsExist({
    assets: svgAssets,
    assetsDir: SVG_ASSETS_DIR,
    assetType: 'SVG',
    pathKey: 'path',
  });

  let jsonAssets = [];
  const jsonAssetsManifestPath = path.resolve(JSON_ASSETS_DIR, 'manifest.json');

  if (fs.existsSync(jsonAssetsManifestPath)) {
    jsonAssets = dedupeManifestAssets({
      assets: readManifestAssets(jsonAssetsManifestPath, 'jsonAssets'),
      assetType: 'JSON',
      pathKey: 'filename',
    });
    assertManifestAssetsExist({
      assets: jsonAssets,
      assetsDir: JSON_ASSETS_DIR,
      assetType: 'JSON',
      pathKey: 'filename',
    });
  }

  return { svgAssets, jsonAssets };
}

async function generateAssetsUtils({ svgAssets, jsonAssets }) {
  const svgAssetsTemplateSrc = fs.readFileSync(
    path.resolve(__dirname, '../templates', 'svg-assets.ts.ejs'),
    { encoding: 'utf8' }
  );
  const svgAssetsRendered = render(svgAssetsTemplateSrc, { assets: svgAssets });
  await fs.outputFile(path.resolve(__dirname, '../utils', 'svg-assets.ts'), svgAssetsRendered);

  const jsonAssetsTemplateSrc = fs.readFileSync(
    path.resolve(__dirname, '../templates', 'json-assets.ts.ejs'),
    { encoding: 'utf8' }
  );
  const jsonAssetsRendered = render(jsonAssetsTemplateSrc, { assets: jsonAssets });
  await fs.outputFile(path.resolve(__dirname, '../utils', 'json-assets.ts'), jsonAssetsRendered);
}

async function generateAssetStories({ svgAssets, jsonAssets }) {
  const svgStoriesDir = 'SVG';
  const jsonStoriesDir = 'JSON';

  fs.rmSync(path.resolve(__dirname, '../docs/assets', svgStoriesDir), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.resolve(__dirname, '../docs/assets', jsonStoriesDir), {
    recursive: true,
    force: true,
  });

  svgAssets.forEach(async asset => {
    const templateSrcSvg = fs.readFileSync(
      path.resolve(__dirname, '../templates', 'svg-asset-story.ts.ejs'),
      { encoding: 'utf8' }
    );
    const renderedSvg = render(templateSrcSvg, { asset });
    await fs.outputFile(
      path.resolve(__dirname, '../docs/assets', svgStoriesDir, asset.name + '.stories.tsx'),
      renderedSvg
    );
  });

  jsonAssets.forEach(async asset => {
    const templateSrcJson = fs.readFileSync(
      path.resolve(__dirname, '../templates', 'json-asset-story.ts.ejs'),
      { encoding: 'utf8' }
    );
    const renderedJson = render(templateSrcJson, { asset });
    await fs.outputFile(
      path.resolve(__dirname, '../docs/assets', jsonStoriesDir, asset.name + '.stories.tsx'),
      renderedJson
    );
  });
}

async function main() {
  const assets = await getAssets();
  await generateAssetsUtils(assets);
  await generateAssetStories(assets);
}

main()
  .then(() => console.log('Assets utils and stories generated'))
  .catch(err => console.error(err));
