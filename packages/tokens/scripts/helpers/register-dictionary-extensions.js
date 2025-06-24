import { camelCase } from './camel-case.js';
import { loadJSON } from './load-json.js';
import { recursiveCamelCase } from './recursive-camel-case.js';

// Helper to build device-specific output
function buildDeviceOutput(dictionary, options) {
  const output = { mobile: {}, tablet: {}, desktop: {} };
  dictionary.allTokens.forEach(token => {
    const [device, ...rest] = token.path;
    if (!output[device]) return;
    let current = output[device];
    rest.forEach((part, i) => {
      const camelPart = camelCase(part);
      if (options.skipPaths?.includes(part)) return;
      if (i === rest.length - 1) current[camelPart] = token.value;
      else {
        current[camelPart] = current[camelPart] || {};
        current = current[camelPart];
      }
    });
  });
  return output;
}

const primitiveJson = loadJSON('./raw/hearth-components--tokens---primitive.json');
const deviceJson = loadJSON('./raw/hearth-components--tokens---device.json');
const semanticJson = loadJSON('./raw/hearth-components--tokens---semantic.json');

// Register transforms, formats, and groups
export function registerDictionaryExtensions(StyleDictionary) {
  StyleDictionary.registerTransform({
    name: 'name/camel-case',
    type: 'name',
    transform: token => token.name.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()),
  });

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
\nexport const mobile = ${JSON.stringify(output.mobile, null, 2)} as const;
\nexport const tablet = ${JSON.stringify(output.tablet, null, 2)} as const;
\nexport const desktop = ${JSON.stringify(output.desktop, null, 2)} as const;
\nconst ${fileName} = { mobile, tablet, desktop } as const;
\nexport default ${fileName};`;
    },
  });

  StyleDictionary.registerFormat({
    name: 'js/theme-module',
    format: ({ dictionary }) => {
      const colorScales = {};

      dictionary.allTokens.forEach(token => {
        const [_, colorScale, shade] = token.path;
        if (!colorScales[colorScale]) {
          colorScales[colorScale] = {};
        }
        const camelShade = camelCase(shade);
        colorScales[colorScale][camelShade] = token.value;
      });

      // Add semantic tokens under light and dark keys
      const semanticTokens = { light: {}, dark: {} };
      if (semanticJson) {
        ['light', 'dark'].forEach(mode => {
          if (semanticJson[mode]) {
            Object.entries(semanticJson[mode]).forEach(([category, tokens]) => {
              if (category === 'color') {
                // Flatten color tokens to root level of light/dark
                Object.entries(tokens).forEach(([key, tokenData]) => {
                  if (tokenData.type === 'color') {
                    const camelKey = camelCase(key);
                    semanticTokens[mode][camelKey] = tokenData.value;
                  }
                });
              } else {
                // Keep other token types nested under their category, but only if they have color type
                const camelCategory = camelCase(category);
                const colorTokensInCategory = {};
                let hasColorTokens = false;

                Object.entries(tokens).forEach(([key, tokenData]) => {
                  if (tokenData.type === 'color') {
                    const camelKey = camelCase(key);
                    colorTokensInCategory[camelKey] = tokenData.value;
                    hasColorTokens = true;
                  }
                });

                if (hasColorTokens) {
                  semanticTokens[mode][camelCategory] = colorTokensInCategory;
                }
              }
            });
          }
        });
      }

      const exports = Object.keys(colorScales)
        .map(colorScale => {
          const camelColorScale = camelCase(colorScale);
          return `export const ${camelColorScale} = ${JSON.stringify(colorScales[colorScale], null, 2)} as const;`;
        })
        .join('\n\n');

      const semanticExports = `export const light = ${JSON.stringify(semanticTokens.light, null, 2)} as const;

export const dark = ${JSON.stringify(semanticTokens.dark, null, 2)} as const;`;

      const defaultExport = `const color = { ${Object.keys(colorScales)
        .map(scale => camelCase(scale))
        .join(', ')}, light, dark } as const;`;

      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\n${exports}

${semanticExports}

${defaultExport}
\nexport default color;`;
    },
  });

  StyleDictionary.registerFormat({
    name: 'js/component-output',
    format: ({ dictionary }) => {
      const output = {};

      // Extract the component name from the first token's path
      const componentName =
        dictionary.allTokens.length > 0 ? dictionary.allTokens[0].path[1] : null;

      dictionary.allTokens.forEach(token => {
        const subKeys = token.path.slice(2);
        let current = output;
        subKeys.forEach((part, i) => {
          const camelPart = camelCase(part);
          if (i === subKeys.length - 1) current[camelPart] = token.value;
          else {
            current[camelPart] = current[camelPart] || {};
            current = current[camelPart];
          }
        });
      });

      // Add device-specific tokens if they exist for this component
      if (componentName && deviceJson) {
        ['mobile', 'tablet', 'desktop'].forEach(deviceSize => {
          const deviceComponents = deviceJson[deviceSize]?.components;
          if (deviceComponents && deviceComponents[componentName]) {
            // Initialize device section in output
            output[deviceSize] = {};

            // Process the device component structure recursively
            const processDeviceTokens = (obj, current) => {
              for (const [key, value] of Object.entries(obj)) {
                const camelKey = camelCase(key);
                if (value && typeof value === 'object' && !value.type) {
                  // It's a nested object, recurse
                  current[camelKey] = current[camelKey] || {};
                  processDeviceTokens(value, current[camelKey]);
                } else if (value && typeof value === 'object' && value.value !== undefined) {
                  // It's a token object with a value
                  current[camelKey] = value.value;
                } else {
                  // Direct value or other case
                  current[camelKey] = value;
                }
              }
            };

            processDeviceTokens(deviceComponents[componentName], output[deviceSize]);
          }
        });
      }

      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\nexport default ${JSON.stringify(output, null, 2)} as const;`;
    },
  });

  StyleDictionary.registerFormat({
    name: 'js/component-index',
    format: ({ options }) => {
      const { components } = options;
      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\n${components.map(name => `export { default as ${camelCase(name)} } from './${name}';`).join('\n')}`;
    },
  });

  StyleDictionary.registerFormat({
    name: 'js/component-root-index',
    format: () => {
      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\nexport * as light from './light';
export * as dark from './dark';`;
    },
  });

  StyleDictionary.registerFormat({
    name: 'js/root-index',
    format: () => {
      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\nexport { default as color } from './color';
export { default as semanticLight } from './semantic-light';
export { default as semanticDark } from './semantic-dark';
export { default as layout } from './layout';
export { default as shadow } from './shadow';
export { default as primitive } from './primitive';
${Object.keys(primitiveJson)
  .filter(primitive => primitive !== 'color')
  .map(primitive =>
    primitive !== 'color'
      ? `export { default as ${camelCase(primitive)} } from './${primitive}';`
      : ''
  )
  .join('\n')}
export { default as typography } from './typography';
export * as components from './components';`;
    },
  });

  StyleDictionary.registerFormat({
    name: 'javascript/esm-camel',
    format: ({ dictionary, options }) => {
      // define skip list from either options.skip or options.skipPaths
      const skip = options?.skip || options?.skipPaths || [];
      const output = {};
      dictionary.allTokens.forEach(token => {
        // Create effectivePath by filtering out keys in the skip list
        const effectivePath = token.path.filter(part => !skip.includes(part));
        let current = output;
        effectivePath.forEach((part, i) => {
          const camelPart = camelCase(part);
          if (i === effectivePath.length - 1) current[camelPart] = token.value;
          else {
            current[camelPart] = current[camelPart] || {};
            current = current[camelPart];
          }
        });
      });
      const camelOutput = recursiveCamelCase(output);
      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\nexport default ${JSON.stringify(camelOutput, null, 2)} as const;`;
    },
  });

  StyleDictionary.registerFormat({
    name: 'js/semantic-colors',
    format: ({ dictionary, options }) => {
      const { mode } = options;
      const output = {};

      dictionary.allTokens.forEach(token => {
        // Skip the mode level in the path (e.g., skip 'light' or 'dark')
        const pathWithoutMode = token.path.slice(1);
        let current = output;
        pathWithoutMode.forEach((part, i) => {
          const camelPart = camelCase(part);
          if (i === pathWithoutMode.length - 1) current[camelPart] = token.value;
          else {
            current[camelPart] = current[camelPart] || {};
            current = current[camelPart];
          }
        });
      });

      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\nexport default ${JSON.stringify(output, null, 2)} as const;`;
    },
  });
}
