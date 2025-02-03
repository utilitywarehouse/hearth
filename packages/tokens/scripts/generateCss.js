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
  transform: token => {
    return `${token.attributes.type}-${token.attributes.item}-${token.attributes.subitem}-${token.attributes.category}`;
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
    return `${token.value / 16}`;
  },
});

StyleDictionary.registerTransform({
  name: 'add-px',
  type: 'value',
  transform: token => `${token.value}px`,
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
      token.path.includes(componentName) &&
      token.attributes.category === 'light'
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
                return token.attributes.type === 'layout' && token.attributes.item === 'spacing';
              },
            },
          ],
        },
        'css-colour': {
          transformGroup: 'css-device',
          transforms: ['remove-light-color'],
          buildPath: './css/',
          files: [
            {
              destination: 'color.css',
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
                if (token.attributes.category === 'space') {
                  return false;
                }
                return token.filePath.includes('primitive');
              },
            },
          ],
        },
        'css-space': {
          transformGroup: 'css-device',
          transforms: ['add-px'],
          buildPath: './css/',
          files: [
            {
              destination: 'space.css',
              format: 'css/variables',
              filter: token =>
                token.filePath.includes('primitive') && token.attributes.category === 'space',
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
