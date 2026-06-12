const { render } = require('ejs');
const fs = require('fs-extra');
const path = require('path');

/** Get lists of the names of the svg icons and the react icons */
async function getIcons() {
  const reactIconsRaw = fs.readFileSync(
    path.resolve(__dirname, '../../../packages/react-icons', 'manifest.json'),
    { encoding: 'utf8' }
  );
  const svgIconsRaw = fs.readFileSync(
    path.resolve(__dirname, '../../../packages/svg-icons', 'manifest.json'),
    { encoding: 'utf8' }
  );
  const { reactIcons } = JSON.parse(reactIconsRaw);
  const { svgIcons } = JSON.parse(svgIconsRaw);
  return { reactIcons, svgIcons };
}

/**
 * Generate the files we use to render the icons in Storybook.
 *
 *  - `utils/icons.ts` - we use this file to list the names of all the current icons.
 *  - `utils/svg-icons.ts` - this file imports & exports all the available svg icons, so we can render them.
 *  - `utils/react-icons.ts` - this file imports & exports all the available React components, so we can render them.
 */
async function generateIconsUtils({ reactIcons, svgIcons }) {
  const reactIconsTemplateSrc = fs.readFileSync(
    path.resolve(__dirname, '../templates', 'react-icons.ts.ejs'),
    { encoding: 'utf8' }
  );
  const reactIconsRendered = render(reactIconsTemplateSrc, { icons: reactIcons });
  await fs.outputFile(path.resolve(__dirname, '../utils', 'react-icons.ts'), reactIconsRendered);

  const svgIconsTemplateSrc = fs.readFileSync(
    path.resolve(__dirname, '../templates', 'svg-icons.ts.ejs'),
    { encoding: 'utf8' }
  );
  const svgIconsRendered = render(svgIconsTemplateSrc, { icons: svgIcons });
  await fs.outputFile(path.resolve(__dirname, '../utils', 'svg-icons.ts'), svgIconsRendered);

  const iconsTemplateSrc = fs.readFileSync(
    path.resolve(__dirname, '../templates', 'icons.ts.ejs'),
    { encoding: 'utf8' }
  );
  const iconsRendered = render(iconsTemplateSrc, { icons: svgIcons });
  await fs.outputFile(path.resolve(__dirname, '../utils', 'icons.ts'), iconsRendered);
}

/**
 * Generate the individual icon stories for visual regression testing in chromatic
 */
async function generateIconStories({ reactIcons }) {
  const storiesDir = 'IndividualIcons';
  // remove the current folder of icons
  fs.rmSync(path.resolve(__dirname, '../docs/icons', storiesDir), {
    recursive: true,
    force: true,
  });

  reactIcons.forEach(async icon => {
    const templateSrc = fs.readFileSync(
      path.resolve(__dirname, '../templates', 'icon-story.ts.ejs'),
      { encoding: 'utf8' }
    );
    const rendered = render(templateSrc, { icon });
    await fs.outputFile(
      path.resolve(__dirname, '../docs/icons', storiesDir, icon + '.stories.ts'),
      rendered
    );
  });
}

async function main() {
  const icons = await getIcons();
  await generateIconsUtils(icons);
  await generateIconStories(icons);
}

main()
  .then(() => {
    console.log('Thanks, see ya 👋');
  })
  .catch(err => console.error(err));
