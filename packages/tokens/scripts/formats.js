import { camelCase, recursiveCamelCase } from './utils/index.js';

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

// Register transforms, formats, and groups
function registerDictionaryExtensions(StyleDictionary) {
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
      const common = {},
        light = {},
        dark = {};
      dictionary.allTokens.forEach(token => {
        const [_, ...rest] = token.path;
        const [__, ___, ...parts] = token.path;
        let current = common;
        const isLight = rest[0] === 'light';
        const isDark = rest[0] === 'dark';
        if (isLight) current = light;
        if (isDark) current = dark;
        (isLight || isDark ? parts : rest).forEach((part, i) => {
          const camelPart = camelCase(part);
          if (i === rest.length - (isLight || isDark ? 2 : 1)) {
            current[camelPart] = token.value;
          } else {
            current[camelPart] = current[camelPart] || {};
            current = current[camelPart];
          }
        });
      });
      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\nexport const common = ${JSON.stringify(common, null, 2)} as const;
\nexport const light = ${JSON.stringify(light, null, 2)} as const;
\nexport const dark = ${JSON.stringify(dark, null, 2)} as const;
\nconst color = { common, light, dark } as const;
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
          const camelPart = camelCase(part);
          if (i === subKeys.length - 1) current[camelPart] = token.value;
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

  StyleDictionary.registerFormat({
    name: 'js/component-index',
    format: ({ options }) => {
      const { components } = options;
      return `/**
 * Do not edit directly, this file was auto-generated.
 */
\n${components.map(name => `export { default as ${name} } from './${name}';`).join('\n')}`;
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
export { default as layout } from './layout';
export { default as primitive } from './primitive';
export { default as typography } from './typography';
export * as components from './components';`;
    },
  });

  StyleDictionary.registerFormat({
    name: 'javascript/esm-camel',
    format: ({ dictionary }) => {
      const output = {};
      dictionary.allTokens.forEach(token => {
        let current = output;
        token.path.forEach((part, i) => {
          const camelPart = camelCase(part);
          if (i === token.path.length - 1) current[camelPart] = token.value;
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
}

export { registerDictionaryExtensions };
