const path = require('path');

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map(filePath => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { ${exportName} } from './${basename}'`;
  });
  return [...exportEntries, `export type { IconProps } from './types';`].join('\n');
}

module.exports = defaultIndexTemplate;
