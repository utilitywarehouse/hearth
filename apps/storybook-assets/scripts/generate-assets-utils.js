const { render } = require('ejs');
const fs = require('fs-extra');
const path = require('path');

async function getAssets() {
  const svgAssetsRaw = fs.readFileSync(
    path.resolve(__dirname, '../../../packages/svg-assets', 'manifest.json'),
    { encoding: 'utf8' }
  );
  const { svgAssets } = JSON.parse(svgAssetsRaw);
  return { svgAssets };
}

async function generateAssetsUtils({ svgAssets }) {
  const svgAssetsTemplateSrc = fs.readFileSync(
    path.resolve(__dirname, '../templates', 'svg-assets.ts.ejs'),
    { encoding: 'utf8' }
  );
  const svgAssetsRendered = render(svgAssetsTemplateSrc, { assets: svgAssets });
  await fs.outputFile(path.resolve(__dirname, '../utils', 'svg-assets.ts'), svgAssetsRendered);

  const assetsTemplateSrc = fs.readFileSync(
    path.resolve(__dirname, '../templates', 'assets.ts.ejs'),
    { encoding: 'utf8' }
  );
  const assetsRendered = render(assetsTemplateSrc, { assets: svgAssets });
  await fs.outputFile(path.resolve(__dirname, '../utils', 'assets.ts'), assetsRendered);
}

async function generateAssetStories({ svgAssets }) {
  const storiesDir = 'IndividualAssets';
  fs.rmSync(path.resolve(__dirname, '../stories', storiesDir), {
    recursive: true,
    force: true,
  });

  svgAssets.forEach(async asset => {
    const templateSrc = fs.readFileSync(
      path.resolve(__dirname, '../templates', 'asset-story.ts.ejs'),
      { encoding: 'utf8' }
    );
    const rendered = render(templateSrc, { asset });
    await fs.outputFile(
      path.resolve(__dirname, '../stories', storiesDir, asset.name + '.stories.tsx'),
      rendered
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
