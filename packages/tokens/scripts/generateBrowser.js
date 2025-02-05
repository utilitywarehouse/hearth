import StyleDictionary from 'style-dictionary';
import { loadJSON } from './utils/load-json.js';
import { filters } from './utils/filters.js';
import { DELIMITER, normalizeTokenPath } from './utils/normalize-token.js';
import merge from 'lodash.merge';

export const BUILD_PATH = './browser/';

StyleDictionary.registerFormat({
  name: 'browser/variables',
  format: ({ dictionary, file }) => {
    const tokens = {};
    // get the group name of the current set of tokens
    const tokensName = file.destination.split('.')[0];
    // we assume that these tokens are filtered before they get here
    dictionary.allTokens.forEach(token => {
      // normalize the tokens in the same way they are for the CSS
      const normalizedPath = normalizeTokenPath(token);
      // this will give us the generated CSS variable
      const cssCustomProperty = `--${normalizedPath.join(DELIMITER)}`;
      var token = {};
      // we need to build the JS object from the path, this will give us the
      // dot notation path to the token
      // ie. color.blue.200
      normalizedPath.reduce((acc, curr, i) => {
        // ignore the first element of the path if it is the same as the group name
        // we want to avoid stuttered objects
        // ie. space.space.100
        if (i === 0 && curr === tokensName) {
          return acc;
        }
        // the last element of the path should point to the CSS variable
        if (i === normalizedPath.length - 1) {
          return (acc[curr] = cssCustomProperty);
        }
        return (acc[curr] = {});
      }, token);
      // deep merge the token into the tokens object
      merge(tokens, token);
    });
    // console.log({ tokens });
    // write the tokens to file
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
            {
              destination: 'color.js',
              format: 'browser/variables',
              filter: filters.isColor,
            },
            {
              destination: 'space.js',
              format: 'browser/variables',
              filter: filters.isSpace,
            },
            {
              destination: 'layout.css',
              format: 'browser/variables',
              filter: filters.isLayout,
            },
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
