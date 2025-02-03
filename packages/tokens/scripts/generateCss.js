import StyleDictionary from 'style-dictionary';
import { loadJSON, unwrapAlias } from './utils/index.js';

const componentJson = loadJSON('./raw/hearth-components---component.json');
const deviceJson = loadJSON('./raw/hearth-design-tokens---device.json');

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
    if (token.attributes?.type === 'dark') {
      return false;
    }
    return token.filePath.includes('primitive') && token.type === 'color';
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
    if (token.attributes.subitem === 'font-family' && token.attributes.category !== 'mobile') {
      return false;
    }
    return token.attributes.type === 'typography';
  },
  transform: token => {
    const { item, subitem, state, category } = token.attributes;
    return `${item}-${subitem}${state ? `-${state}` : ''}${category !== 'mobile' ? `-${category}` : ''}`;
  },
});

StyleDictionary.registerTransform({
  name: 'rename-layout',
  type: 'name',
  filter: token => {
    return token.attributes.type === 'layout' && token.attributes.item === 'spacing';
  },
  transform: token => {
    const { type, item, subitem, category } = token.attributes;
    return `${type}-${item}-${subitem}-${category}`;
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
  name: 'add-space-px',
  type: 'value',
  filter: token => token.filePath.includes('primitive') && token.attributes.category === 'space',
  transform: token => `${token.value}px`,
});

StyleDictionary.registerTransformGroup({
  name: 'css-transforms',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'alias/variable-css',
    'rename-typography',
    'rename-layout',
    'add-space-px',
    'remove-light-color',
  ],
});

const typographyComponents = Object.keys(deviceJson.mobile.typography);
const lightComponents = Object.keys(componentJson.light);
const dynamicComponentFiles = [...lightComponents].map(componentName => ({
  destination: `${componentName}.css`,
  format: 'css/variables',
  filter: token => {
    console.log({ token });
    return (
      token.filePath.includes('component') &&
      token.path.includes(componentName) &&
      token.attributes.category === 'light'
    );
  },
}));
const typographyComponentFiles = typographyComponents.map(componentName => ({
  destination: `${componentName}.css`,
  format: 'css/variables',
  filter: token => {
    if (token.attributes.subitem === 'font-family' && token.attributes.category !== 'mobile') {
      return false;
    }
    return token.attributes.type === 'typography' && token.path.includes(componentName);
  },
}));

function generateCss() {
  console.log('Generating CSS...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      platforms: {
        'css-components': {
          transformGroup: 'css-transforms',
          transforms: ['rename-typography'],
          buildPath: './css/',
          files: typographyComponentFiles,
        },
        css: {
          transformGroup: 'css-transforms',
          buildPath: './css/',
          files: [
            // {
            //   destination: 'typography.css',
            //   format: 'css/variables',
            //   filter: token => {
            //     if (
            //       token.attributes.subitem === 'font-family' &&
            //       token.attributes.category !== 'mobile'
            //     ) {
            //       return false;
            //     }
            //     return token.attributes.type === 'typography';
            //   },
            // },
            {
              destination: 'layout.css',
              format: 'css/variables',
              filter: token => {
                return token.attributes.type === 'layout' && token.attributes.item === 'spacing';
              },
            },
            {
              destination: 'space.css',
              format: 'css/variables',
              filter: token =>
                token.filePath.includes('primitive') && token.attributes.category === 'space',
            },
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
        // 'css-primitve': {
        //   transformGroup: 'css-device',
        //   transforms: ['remove-light-color', 'px-to-rem', 'unitless-line-height'],
        //   buildPath: './css/',
        //   files: [
        //     {
        //       destination: 'primitive.css',
        //       format: 'css/variables',
        //       filter: token => {
        //         // console.log(`--${token.path.join('-')}`);
        //         if (token.type === 'color') {
        //           return false;
        //         }
        //         if (token.attributes.category === 'space') {
        //           return false;
        //         }
        //         return token.filePath.includes('primitive');
        //       },
        //     },
        //   ],
        // },
      },
    }),
  ];
}

export default generateCss;
