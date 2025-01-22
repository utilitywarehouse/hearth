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
  name: 'remove-color',
  type: 'name',
  filter: token => {
    return token.type === 'color' && token.attributes?.type !== 'dark';
  },
  transform: token => {
    return token.name.replace(/light-/, '').replace(/colour/, 'color');
  },
});

StyleDictionary.registerTransform({
  name: 'rename-typography',
  type: 'name',
  filter: token => {
    return token.attributes.type === 'typography';
  },
  transform: token => {
    if (token.attributes.state === 'font-family') {
      return `${token.attributes.subitem}-${token.attributes.state}`;
    }
    return `${token.attributes.subitem}-${token.attributes.state}-${token.path[token.path.length - 1]}-${token.attributes.category}`;
  },
});

StyleDictionary.registerTransform({
  name: 'rename-layout',
  type: 'name',
  filter: token => {
    return token.attributes.type === 'layout';
  },
  transform: token => {
    return `${token.attributes.item}-${token.attributes.subitem}-${token.attributes.category}`;
  },
});

StyleDictionary.registerTransform({
  name: 'px-to-rem',
  type: 'value',
  filter: token => {
    return (
      typeof token.value === 'number' &&
      (token.name.includes('font-size') ||
        token.name.includes('line-height') ||
        token.name.includes('letter-spacing'))
    );
  },
  transform: token => {
    return `${token.value / 16}rem`;
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

const lightComponents = Object.keys(componentJson.light);
const dynamicComponentFiles = lightComponents.map(componentName => ({
  destination: `${componentName}.css`,
  format: 'css/variables',
  filter: token => {
    return (
      token.filePath.includes('component') &&
      token.attributes.category !== 'dark' &&
      token.path.includes(componentName)
    );
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
        'css-primitve': {
          transformGroup: 'css-device',
          transforms: ['remove-color', 'px-to-rem'],
          buildPath: './css/',
          files: [
            {
              destination: 'primitive.css',
              format: 'css/variables',
              filter: token => {
                if (token.attributes?.type === 'dark') {
                  return false;
                }
                return token.filePath.includes('primitive');
              },
            },
          ],
        },
        'css-components': {
          transformGroup: 'css-device',
          transforms: ['remove-color', 'px-to-rem'],
          buildPath: './css/',
          files: dynamicComponentFiles,
        },
      },
    }),
  ];
}

export default generateCss;
