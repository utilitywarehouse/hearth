const fs = require('fs-extra');
const path = require('path');

/**
 * Get a list of all the icon ids & names.
 */
function getIcons() {
  const icons = fs.readFileSync(
    path.resolve(__dirname, '../../../packages/svg-icons', 'icons.json'),
    {
      encoding: 'utf8',
    }
  );
  return JSON.parse(icons);
}

/**
 * All icons share one Code Connect template — batch files pair that single
 * template with a JSON list of per-icon data, rather than one file per icon.
 */
function generateBatchFiles(icons) {
  fs.copySync(
    path.join(__dirname, '..', 'templates', 'icons.figma.batch.ts'),
    path.resolve(__dirname, '..', 'figma-code-connect', 'icons.figma.batch.ts')
  );

  const batchJson = {
    templateFile: './icons.figma.batch.ts',
    components: icons.map(icon => ({
      url: `https://www.figma.com/design/x1DivEZ23UPZP7WXufHPjG/UW-Icons?node-id=${icon.id}&m=dev`,
      id: icon.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
      name: icon.name,
      component: icon.name,
      source: `../lib/${icon.name}.tsx`,
    })),
  };

  fs.outputFileSync(
    path.resolve(__dirname, '..', 'figma-code-connect', 'icons.figma.batch.json'),
    JSON.stringify(batchJson, null, 2) + '\n',
    { encoding: 'utf8' }
  );
}

async function main() {
  const icons = getIcons();
  generateBatchFiles(icons);
}

main()
  .then(() => {
    console.log('Thanks, see ya 👋');
  })
  .catch(err => console.error(err));
