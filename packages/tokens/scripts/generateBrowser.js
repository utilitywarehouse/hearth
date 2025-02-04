import StyleDictionary from 'style-dictionary';
import { loadJSON } from './utils/load-json.js';
import { filters } from './utils/filters.js';
import { DELIMITER, normalizeTokenPath } from './utils/normalize-token.js';

export const BUILD_PATH = './browser/';

StyleDictionary.registerFormat({
  name: 'browser/variables',
  format: ({ dictionary, file }) => {
    const tokens = {};
    const tokensName = file.destination.split('.')[0];
    dictionary.allTokens.forEach(token => {
      const normalizedPath = normalizeTokenPath(token);
      normalizedPath.forEach((el, i) => {
        if (el === tokensName) {
          return;
        }
        if (i < normalizedPath.length - 1) {
          tokens[el] = {};
        }
        if (i === normalizedPath.length - 1) {
          tokens[el] = `--${normalizedPath.join(DELIMITER)}`;
        }
      });
    });
    return `export const ${tokensName} = ${JSON.stringify(tokens, null, 2)};\n`;
  },
});

const componentJson = loadJSON('./raw/hearth-components---component.json');
const componentFiles = Object.keys(componentJson.light).map(componentName => ({
  destination: `${componentName}.css`,
  format: 'css/variables',
  filter: token =>
    token.filePath.includes('component') &&
    token.path.includes(componentName) &&
    token.attributes.category === 'light',
}));

function generateBrowser() {
  console.log('Generating Browser tokens...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      platforms: {
        browser: {
          buildPath: BUILD_PATH,
          files: [
            // {
            //   destination: 'color.css',
            //   format: 'browser/variables',
            //   filter: filters.isColor,
            // },
            {
              destination: 'space.js',
              format: 'browser/variables',
              filter: filters.isSpace,
            },
            // {
            //   destination: 'layout.css',
            //   format: 'browser/variables',
            //   filter: filters.isLayout,
            // },
            // {
            //   destination: 'font.css',
            //   format: 'browser/variables',
            //   filter: filters.isFont,
            // },
            // {
            //   destination: 'line-height.css',
            //   format: 'browser/variables',
            //   filter: filters.isLineHeight,
            // },
            // {
            //   destination: 'typography.css',
            //   format: 'browser/variables',
            //   filter: filters.isTypography,
            // },
            // {
            //   destination: 'border.css',
            //   format: 'browser/variables',
            //   filter: filters.isBorder,
            // },
          ],
        },
        // 'css-components': {
        //   transformGroup: 'css-transforms',
        //   buildPath: BUILD_PATH,
        //   files: componentFiles,
        // },
      },
    }),
  ];
}

export default generateBrowser;
