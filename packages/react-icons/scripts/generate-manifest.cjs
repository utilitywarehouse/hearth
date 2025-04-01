const fs = require('fs-extra');
const path = require('path');

/**
 * Get a list of all the names of the React component files, which will be the
 * same as the components themselves.
 */
function getComponentNames() {
  return fs
    .readdirSync(path.resolve(__dirname, '../lib'), { withFileTypes: true })
    .filter(item => !item.name.includes('types'))
    .filter(item => item.name.includes('.tsx'))
    .map(item => item.name.replace('.tsx', ''));
}

/** Write the above list to a manifest.json file */
async function generateManifest(components) {
  await fs.outputFile(
    path.resolve(__dirname, '..', 'manifest.json'),
    JSON.stringify({ reactIcons: components }, null, 2),
    {
      encoding: 'utf8',
    }
  );
}

async function main() {
  const components = getComponentNames();
  await generateManifest(components);
}

main()
  .then(() => {
    console.log('Thanks, see ya 👋');
  })
  .catch(err => console.error(err));
