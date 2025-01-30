import StyleDictionary from 'style-dictionary';
import { loadJSON, unwrapAlias } from './utils/index.js';

const componentJson = loadJSON('./raw/hearth-components---component.json');

StyleDictionary.registerTransform({
  name: 'alias/variable-css',
  type: 'value',
  filter: token => {
    return token.value && typeof token.alias === 'string';
  },
  transform: token => {
    const aliasPath = unwrapAlias(token.alias).replace(/\./g, '-');
    return `var(--${aliasPath})`;
  },
});

StyleDictionary.registerTransform({
  name: 'remove-light-color',
  type: 'name',
  filter: token => {
    return (
      (token.type === 'color' || token.filePath.includes('component')) &&
      token.attributes?.type !== 'dark'
    );
  },
  transform: token => {
    return token.name.replace(/light-/, '');
  },
});

StyleDictionary.registerTransform({
  name: 'remove-dark-color',
  type: 'name',
  filter: token => {
    return (
      (token.type === 'color' || token.filePath.includes('component')) &&
      token.attributes?.type !== 'light'
    );
  },
  transform: token => {
    return token.name.replace(/dark-/, '');
  },
});

StyleDictionary.registerTransform({
  name: 'remove-alias-color',
  type: 'value',
  filter: token => {
    return token.type === 'color';
  },
  transform: token => {
    return token.value.replace(/light-/, '').replace(/dark-/, '');
  },
});

StyleDictionary.registerTransform({
  name: 'rename-typography',
  type: 'name',
  filter: token => {
    return token.attributes.type === 'typography';
  },
  transform: token => {
    if (token.path.subitem === 'font-family') {
      return `${token.attributes.item}-${token.attributes.subitem}`;
    }
    return `${token.attributes.item}-${token.attributes.subitem}${token.attributes.state ? `-${token.attributes.state}` : ''}${token.attributes.category !== 'mobile' ? `-${token.attributes.category}` : ''}`;
  },
});

StyleDictionary.registerTransform({
  name: 'rename-layout',
  type: 'name',
  filter: token => {
    return token.attributes.type === 'layout';
  },
  transform: token => {
    return `${token.attributes.item}-${token.attributes.subitem}${token.attributes.category !== 'mobile' ? `-${token.attributes.category}` : ''}`;
  },
});

StyleDictionary.registerTransform({
  name: 'px-to-rem',
  type: 'value',
  filter: token => {
    return typeof token.value === 'number' && token.name.includes('font-size');
  },
  transform: token => {
    return `${token.value / 16}rem`;
  },
});

StyleDictionary.registerTransform({
  name: 'unitless-line-height',
  type: 'value',
  filter: token => {
    return typeof token.value === 'number' && token.attributes.category === 'line-height';
  },
  transform: token => {
    console.log({ token });
    return `${token.value / 16}`;
  },
});

StyleDictionary.registerTransformGroup({
  name: 'css-device',
  transforms: [
    // For example, built-in CTI attribute transform
    'attribute/cti',
    // built-in name transform, e.g. name/cti/kebab or name/camel
    'name/kebab',
    // our custom transform for alias references in CSS
    'alias/variable-css',
  ],
});

StyleDictionary.registerFormat({
  name: 'css/theme-component-variables',
  format: ({ dictionary }) => {
    // console.log(dictionary.allTokens);
    const lightTokens = dictionary.allTokens.filter(t => t.path[0] === 'light');
    const darkTokens = dictionary.allTokens.filter(t => t.path[0] === 'dark');

    const lightVars = lightTokens
      .map(t => `  --${t.path.slice(1).join('-')}: ${t.value};`)
      .join('\n');
    const darkVars = darkTokens
      .filter(t => t.type === 'color')
      .map(t => `  --${t.path.slice(1).join('-')}: ${t.value};`)
      .join('\n');

    return `/**
 * Do not edit directly, this file was auto-generated.
 */\n\n:root {\n${lightVars}\n}\n\n[data-theme='dark'] {\n${darkVars}\n}`;
  },
});

StyleDictionary.registerFormat({
  name: 'css/theme-color-variables',
  format: ({ dictionary }) => {
    // console.log(dictionary.allTokens);
    const lightTokens = dictionary.allTokens.filter(t => t.attributes?.type === 'light');
    const darkTokens = dictionary.allTokens.filter(t => t.attributes?.type === 'dark');

    const lightVars = lightTokens
      .map(t => `  --color-${t.path.slice(2).join('-')}: ${t.value};`)
      .join('\n');
    const darkVars = darkTokens
      .filter(t => t.type === 'color')
      .map(t => `  --color-${t.path.slice(2).join('-')}: ${t.value};`)
      .join('\n');

    return `/**
 * Do not edit directly, this file was auto-generated.
 */\n\n:root {\n${lightVars}\n}\n\n[data-theme='dark'] {\n${darkVars}\n}`;
  },
});

const lightComponents = Object.keys(componentJson.light);
const dynamicComponentFiles = lightComponents.map(componentName => ({
  destination: `${componentName}.css`,
  format: 'css/theme-component-variables',
  filter: token => {
    return token.filePath.includes('component') && token.path.includes(componentName);
  },
}));

function generateCss() {
  console.log('Generating CSS...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      platforms: {
        'css-typography': {
          transformGroup: 'css-device',
          transforms: ['rename-typography'],
          buildPath: './css/',
          files: [
            {
              destination: 'typography.css',
              format: 'css/variables',
              filter: token => {
                if (
                  token.attributes.subitem === 'font-family' &&
                  token.attributes.category !== 'mobile'
                ) {
                  return false;
                }
                return token.attributes.type === 'typography';
              },
            },
          ],
        },
        'css-layout': {
          transformGroup: 'css-device',
          transforms: ['rename-layout'],
          buildPath: './css/',
          files: [
            {
              destination: 'layout.css',
              format: 'css/variables',
              filter: token => {
                return token.attributes.type === 'layout';
              },
            },
          ],
        },
        'css-colour': {
          transformGroup: 'css-device',
          buildPath: './css/',
          files: [
            {
              destination: 'colour.css',
              format: 'css/theme-color-variables',
              filter: token => {
                return token.filePath.includes('primitive') && token.type === 'color';
              },
            },
          ],
        },
        'css-colour-light': {
          transformGroup: 'css-device',
          transforms: ['remove-light-color'],
          buildPath: './css/',
          files: [
            {
              destination: 'colours/light.css',
              format: 'css/variables',
              filter: token => {
                if (token.attributes?.type === 'dark') {
                  return false;
                }
                return token.filePath.includes('primitive') && token.type === 'color';
              },
            },
          ],
        },
        'css-colour-dark': {
          transformGroup: 'css-device',
          transforms: ['remove-dark-color'],
          buildPath: './css/',
          files: [
            {
              destination: 'colours/dark.css',
              format: 'css/variables',
              filter: token => {
                if (token.attributes?.type === 'light') {
                  return false;
                }
                return token.filePath.includes('primitive') && token.type === 'color';
              },
            },
          ],
        },
        'css-primitve': {
          transformGroup: 'css-device',
          transforms: ['remove-light-color', 'px-to-rem', 'unitless-line-height'],
          buildPath: './css/',
          files: [
            {
              destination: 'primitive.css',
              format: 'css/variables',
              filter: token => {
                if (token.type === 'color') {
                  return false;
                }
                return token.filePath.includes('primitive');
              },
            },
          ],
        },
        'css-components': {
          transformGroup: 'css-device',
          transforms: ['remove-light-color', 'remove-alias-color', 'px-to-rem'],
          buildPath: './css/',
          files: dynamicComponentFiles,
        },
      },
    }),
  ];
}

export default generateCss;
