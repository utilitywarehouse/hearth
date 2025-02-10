import StyleDictionary from 'style-dictionary';
import { loadJSON } from './helpers/load-json.js';
import { filters } from './helpers/filters.js';
import { DELIMITER, normalizeTokenPath } from './helpers/normalize-token.js';
import { camelCase } from './helpers/camel-case.js';
import merge from 'lodash.merge';

export const BUILD_PATH = './browser-src/';

StyleDictionary.registerFormat({
  name: 'browser/index',
  format: () => {
    return `export * from './badge.js'
export * from './border.js';
export * from './button.js';
export * from './color.js';
export * from './font.js';
export * from './layout.js';
export * from './line-height.js';
export * from './space.js';
export * from './spinner.js';
export * from './typography.js';
`;
  },
});

StyleDictionary.registerFormat({
  name: 'browser/variables',
  format: ({ dictionary, file }) => {
    const tokens = {};
    // get the group name of the current set of tokens
    const tokensName = file.destination.split('.')[0];
    // we assume that these tokens are filtered before they get here
    dictionary.allTokens.forEach(token => {
      // console.log({ token });
      // normalize the tokens in the same way they are for the CSS
      const normalizedPath = normalizeTokenPath(token);
      // this will give us the generated CSS variable
      const cssCustomProperty = `var(--${normalizedPath.join(DELIMITER)})`;
      var tokenObject = {};
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
          return (acc[camelCase(curr)] = cssCustomProperty);
        }
        // again to avoid stuttering (specifically for border properties, ie. border.borderRadius)
        const el = camelCase(curr.replace(`${tokensName}-`, ''));
        return (acc[el] = {});
      }, tokenObject);
      // deep merge the token into the tokens object
      merge(tokens, tokenObject);
    });
    // console.log({ tokens });
    // write the tokens to file
    return `export const ${camelCase(tokensName)} = ${JSON.stringify(tokens, null, 2)} as const;\n`;
  },
});

const componentJson = loadJSON('./raw/hearth-components---component.json');
const componentFiles = Object.keys(componentJson.light).map(componentName => ({
  destination: `${componentName}.ts`,
  format: 'browser/variables',
  filter: token =>
    token.filePath.includes('component') &&
    token.path.includes(componentName) &&
    token.path.includes('light'),
}));

export function buildBrowser() {
  console.log('Buildng Browser tokens...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      platforms: {
        browser: {
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'color.ts',
              format: 'browser/variables',
              filter: filters.isPrimitiveLightColor,
            },
            {
              destination: 'space.ts',
              format: 'browser/variables',
              filter: filters.isPrimitiveSpace,
            },
            {
              destination: 'layout.ts',
              format: 'browser/variables',
              filter: filters.isLayoutSpacing,
            },
            {
              destination: 'font.ts',
              format: 'browser/variables',
              filter: filters.isFont,
            },
            {
              destination: 'line-height.ts',
              format: 'browser/variables',
              filter: filters.isPrimitiveLineHeight,
            },
            {
              destination: 'typography.ts',
              format: 'browser/variables',
              filter: filters.isTypography,
            },
            {
              destination: 'border.ts',
              format: 'browser/variables',
              filter: filters.isPrimitiveBorder,
            },
          ],
        },
        'browser-components': {
          buildPath: BUILD_PATH,
          files: componentFiles,
        },
        'browser-index': {
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'index.js',
              format: 'browser/index',
            },
          ],
        },
      },
    }),
  ];
}
