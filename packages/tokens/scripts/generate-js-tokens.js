import StyleDictionary from 'style-dictionary';
import {
  logBrokenReferenceLevels,
  logVerbosityLevels,
  logWarningLevels,
} from 'style-dictionary/enums';
import { loadJSON } from './helpers/load-json.js';
import { registerDictionaryExtensions } from './helpers/register-dictionary-extensions.js';

const BUILD_PATH = './src/ts/';

// Call registration once
registerDictionaryExtensions(StyleDictionary);

// Helper to create dynamic component files
function createDynamicComponentFiles(componentJson, mode) {
  return Object.keys(componentJson[mode]).map(componentName => ({
    destination: `components/${mode}/${componentName}.ts`,
    format: 'js/component-output',
    options: { minify: true },
    transformGroup: 'js-device',
    // Match only tokens from the component tokens file whose path starts with
    // [mode, componentName] — a loose `path.includes` would also capture
    // unrelated tokens with a nested segment of the same name (e.g. `icon`
    // inside menu/checkbox tokens) and tokens from the semantic file, whose
    // filename also contains 'component'.
    filter: token =>
      token.filePath.endsWith('hearth-components--tokens---component.json') &&
      token.path[0] === mode &&
      token.path[1] === componentName,
  }));
}

const componentJson = loadJSON('./raw/hearth-components--tokens---component.json');
const primitiveJson = loadJSON('./raw/hearth-components--tokens---primitive.json');
const dynamicLightComponentFiles = createDynamicComponentFiles(componentJson, 'light');
const dynamicDarkComponentFiles = createDynamicComponentFiles(componentJson, 'dark');

const indexLightFile = {
  destination: 'components/light/index.ts',
  format: 'js/component-index',
  transformGroup: 'js-device',
  options: { components: Object.keys(componentJson.light) },
};

const indexDarkFile = {
  destination: 'components/dark/index.ts',
  format: 'js/component-index',
  transformGroup: 'js-device',
  options: { components: Object.keys(componentJson.dark) },
};

const indexRootFile = {
  destination: 'components/index.ts',
  format: 'js/component-root-index',
  transformGroup: 'js-device',
};

const rootJsIndexFile = {
  destination: 'index.ts',
  format: 'js/root-index',
  transformGroup: 'js-device',
};

export function generateJsTokens() {
  console.log('Generating JS tokens...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      log: {
        warnings: logWarningLevels.warn,
        verbosity: logVerbosityLevels.default,
        errors: {
          brokenReferences: logBrokenReferenceLevels.throw,
        },
      },
      platforms: {
        'js-typography': {
          transformGroup: 'js-device',
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'typography.ts',
              format: 'js/device-module',
              options: { skipPaths: ['typography', 'scales'] },
              filter: token =>
                token.attributes.state === 'font-family'
                  ? token.attributes.category === 'mobile'
                  : token.attributes.type === 'typography',
            },
          ],
        },
        'js-layout': {
          transformGroup: 'js-device',
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'layout.ts',
              format: 'js/device-module',
              options: { skipPaths: ['layout'] },
              filter: token => token.attributes.type === 'layout',
            },
          ],
        },
        'js-shadow': {
          transformGroup: 'js-device',
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'shadow.ts',
              format: 'js/device-module',
              options: { skipPaths: ['shadow'] },
              filter: token => token.attributes.type === 'shadow',
            },
          ],
        },
        'js-colour': {
          transformGroup: 'js-device',
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'color.ts',
              format: 'js/theme-module',
              filter: token => token.filePath.includes('primitive') && token.path[0] === 'color',
            },
          ],
        },
        'js-semantic-colors': {
          transformGroup: 'js-device',
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'semantic-light.ts',
              format: 'js/semantic-colors',
              options: { mode: 'light' },
              filter: token => token.filePath.includes('semantic') && token.path[0] === 'light',
            },
            {
              destination: 'semantic-dark.ts',
              format: 'js/semantic-colors',
              options: { mode: 'dark' },
              filter: token => token.filePath.includes('semantic') && token.path[0] === 'dark',
            },
          ],
        },
        'js-semantic': {
          transformGroup: 'js-device',
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'semantic.ts',
              format: 'js/semantic-non-color',
              options: { mode: 'light' },
              filter: token =>
                token.filePath.includes('semantic') &&
                token.path[0] === 'light' &&
                token.type !== 'color',
            },
          ],
        },
        'js-primitive': {
          transformGroup: 'js-device',
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'primitive.ts',
              format: 'javascript/esm-camel',
              filter: token => {
                return token.filePath.includes('primitive') && token.type !== 'color';
              },
              options: { minify: true },
            },
            ...Object.keys(primitiveJson)
              .filter(primitive => primitive !== 'color')
              .map(primitive => ({
                destination: `${primitive}.ts`,
                format: 'javascript/esm-camel',
                filter: token => {
                  return (
                    token.filePath.includes('primitive') &&
                    token.type !== 'color' &&
                    token.attributes.category === primitive
                  );
                },
                options: { minify: true, skipPaths: [primitive] },
              })),
          ],
        },
        'js-components': {
          transformGroup: 'js-device',
          buildPath: BUILD_PATH,
          files: [
            ...dynamicLightComponentFiles,
            ...dynamicDarkComponentFiles,
            indexLightFile,
            indexDarkFile,
            indexRootFile,
            rootJsIndexFile,
          ],
        },
      },
    }),
  ];
}
