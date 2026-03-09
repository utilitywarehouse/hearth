const { render } = require('ejs');
const fs = require('fs-extra');
const path = require('path');

async function getAssets() {
  const svgAssetsRaw = fs.readFileSync(
    path.resolve(__dirname, '../../../packages/svg-assets', 'manifest.json'),
    { encoding: 'utf8' }
  );
  const { svgAssets } = JSON.parse(svgAssetsRaw);

  let jsonAssets = [];
  const jsonAssetsManifestPath = path.resolve(
    __dirname,
    '../../../packages/json-assets',
    'manifest.json'
  );
  if (fs.existsSync(jsonAssetsManifestPath)) {
    const jsonAssetsRaw = fs.readFileSync(jsonAssetsManifestPath, { encoding: 'utf8' });
    const parsed = JSON.parse(jsonAssetsRaw);
    jsonAssets = parsed.jsonAssets || [];
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
  const svgStoriesDir = 'IndividualSVGAssets';
  const jsonStoriesDir = 'IndividualJSONAssets';

  fs.rmSync(path.resolve(__dirname, '../stories', svgStoriesDir), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.resolve(__dirname, '../stories', jsonStoriesDir), {
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
      path.resolve(__dirname, '../stories', svgStoriesDir, asset.name + '.stories.tsx'),
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
      path.resolve(__dirname, '../stories', jsonStoriesDir, asset.name + '.stories.tsx'),
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
