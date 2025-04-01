const fs = require('fs-extra');
const path = require('path');
var template = require('lodash.template');

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

function generateCodeConnectFiles(icons) {
  icons.forEach(async function (icon) {
    const compiled = template(
      fs.readFileSync(path.join(__dirname, '..', 'templates', 'icon.figma.tsx'), 'utf8')
    );

    await fs.outputFile(
      path.resolve(__dirname, '..', 'figma-code-connect', icon.name + '.figma.tsx'),
      compiled(icon),
      { encoding: 'utf8' }
    );
  });
}

async function main() {
  const icons = getIcons();
  generateCodeConnectFiles(icons);
}

main()
  .then(() => {
    console.log('Thanks, see ya 👋');
  })
  .catch(err => console.error(err));
