import StyleDictionary from 'style-dictionary';
import { loadJSON } from './utils/index.js';

function buildDeviceOutput(dictionary, options) {
  const output = { mobile: {}, tablet: {}, desktop: {} };
  dictionary.allTokens.forEach(token => {
    const [device, ...rest] = token.path;
    if (!output[device]) return;
    let current = output[device];
    rest.forEach((part, i) => {
      if (options.skipPaths?.includes(part)) return;
      if (i === rest.length - 1) {
        current[part] = token.value;
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  });
  return output;
}

StyleDictionary.registerTransformGroup({
  name: 'js-device',
  transforms: ['attribute/cti', 'name/camel'],
});

StyleDictionary.registerFormat({
  name: 'js/device-module',
  format: ({ dictionary, options, file }) => {
    const fileName = file?.destination?.replace('.ts', '');
    const output = buildDeviceOutput(dictionary, options);
    return `/**
 * Do not edit directly, this file was auto-generated.
 */
\nexport const mobile = ${JSON.stringify(output.mobile, null, 2)};
\nexport const tablet = ${JSON.stringify(output.tablet, null, 2)};
\nexport const desktop = ${JSON.stringify(output.desktop, null, 2)};
\nconst ${fileName} = { mobile, tablet, desktop };
\nexport default ${fileName};`;
  },
});

StyleDictionary.registerFormat({
  name: 'js/theme-module',
  format: ({ dictionary }) => {
    const common = {};
    const light = {};
    const dark = {};

    dictionary.allTokens.forEach(token => {
      const [_, ...rest] = token.path;
      const [__, ___, ...parts] = token.path;
      let current = common;
      const isLight = rest[0] === 'light';
      const isDark = rest[0] === 'dark';
      if (isLight) current = light;
      if (isDark) current = dark;
      (isLight || isDark ? parts : rest).forEach((part, i) => {
        if (i === rest.length - (isLight || isDark ? 2 : 1)) {
          current[part] = token.value;
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      });
    });

    return `/**
 * Do not edit directly, this file was auto-generated.
 */
\nexport const common = ${JSON.stringify(common, null, 2)};
\nexport const light = ${JSON.stringify(light, null, 2)};
\nexport const dark = ${JSON.stringify(dark, null, 2)};
\nconst color = { common, light, dark };
\nexport default color;`;
  },
});

StyleDictionary.registerFormat({
  name: 'js/component-output',
  format: ({ dictionary }) => {
    const output = {};
    dictionary.allTokens.forEach(token => {
      const subKeys = token.path.slice(2);
      let current = output;
      subKeys.forEach((part, i) => {
        if (i === subKeys.length - 1) {
          current[part] = token.value;
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      });
    });
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

export default ${JSON.stringify(output, null, 2)};`;
  },
});

StyleDictionary.registerFormat({
  name: 'js/component-index',
  format: ({ options }) => {
    const { components } = options;
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

${components.map(name => `export { default as ${name} } from './${name}';`).join('\n')}`;
  },
});

StyleDictionary.registerFormat({
  name: 'js/component-root-index',
  format: () => {
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

export * as light from './light/index';
export * as dark from './dark/index';`;
  },
});

StyleDictionary.registerFormat({
  name: 'js/root-index',
  format: () => {
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

export { default as color } from './color';
export { default as layout } from './layout';
export { default as primitive } from './primitive';
export { default as typography } from './typography';
export * as components from './components';`;
  },
});

const componentJson = loadJSON('./raw/hearth-components---component.json');
const lightComponents = Object.keys(componentJson.light);
const darkComponents = Object.keys(componentJson.dark);

const dynamicLightComponentFiles = lightComponents.map(componentName => ({
  destination: `components/light/${componentName}.ts`,
  format: 'js/component-output',
  options: {
    minify: true,
  },
  transformGroup: 'js-device',
  filter: token => {
    return (
      token.filePath.includes('component') &&
      token.path.includes(componentName) &&
      token.path.includes('light')
    );
  },
}));

const dynamicDarkComponentFiles = darkComponents.map(componentName => ({
  destination: `components/dark/${componentName}.ts`,
  format: 'js/component-output',
  options: {
    minify: true,
  },
  transformGroup: 'js-device',
  filter: token => {
    return (
      token.filePath.includes('component') &&
      token.path.includes(componentName) &&
      token.path.includes('dark')
    );
  },
}));

const indexLightFile = {
  destination: 'components/light/index.ts',
  format: 'js/component-index',
  transformGroup: 'js-device',
  options: {
    components: lightComponents,
  },
};

const indexDarkFile = {
  destination: 'components/dark/index.ts',
  format: 'js/component-index',
  transformGroup: 'js-device',
  options: {
    components: darkComponents,
  },
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

function generateJs() {
  console.log('Generating JS...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      platforms: {
        'js-typography': {
          transformGroup: 'js-device',
          buildPath: './ts/',
          files: [
            {
              destination: 'typography.ts',
              format: 'js/device-module',
              options: {
                skipPaths: ['typography', 'scales'],
              },
              filter: token => {
                if (
                  token.attributes.state === 'font-family' &&
                  token.attributes.category !== 'mobile'
                ) {
                  return false;
                }
                return token.attributes.type === 'typography';
              },
            },
          ],
        },
        'js-layout': {
          transformGroup: 'js-device',
          buildPath: './ts/',
          files: [
            {
              destination: 'layout.ts',
              format: 'js/device-module',
              options: {
                skipPaths: ['layout'],
              },
              filter: token => {
                return token.attributes.type === 'layout';
              },
            },
          ],
        },
        'js-colour': {
          transformGroup: 'js-device',
          buildPath: './ts/',
          files: [
            {
              destination: 'color.ts',
              format: 'js/theme-module',
              filter: token => {
                return token.filePath.includes('primitive') && token.type === 'color';
              },
            },
          ],
        },
        'js-primitive': {
          transformGroup: 'js-device',
          buildPath: './ts/',
          files: [
            {
              destination: 'primitive.ts',
              format: 'javascript/esm',
              filter: token => {
                return token.filePath.includes('primitive') && token.type !== 'color';
              },
              options: {
                minify: true,
              },
            },
          ],
        },
        'js-components': {
          transformGroup: 'js-device',
          buildPath: './ts/',
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

export default generateJs;
