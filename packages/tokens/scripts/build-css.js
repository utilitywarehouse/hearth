import StyleDictionary from 'style-dictionary';
import { loadJSON, unwrapAlias } from './utils/index.js';

const componentJson = loadJSON('./raw/hearth-components---component.json');
const deviceJson = loadJSON('./raw/hearth-design-tokens---device.json');

const filters = {
  isFont: token => token.attributes.category === 'font',
  isLayout: token => token.attributes.type === 'layout' && token.attributes.item === 'spacing',
  isTypography: token => {
    if (token.attributes.type === 'typography') {
      if (token.attributes.subitem === 'font-family') {
        return false;
      }
      if (token.name.includes('font-weight') && token.attributes.category !== 'mobile') {
        return false;
      }
      if (token.path.includes('letter-spacing')) {
        return false;
      }
      return token;
    }
  },
  isColor: token => {
    if (token.attributes?.type === 'dark') {
      return false;
    }
    return token.filePath.includes('primitive') && token.type === 'color';
  },
  isSpace: token => token.filePath.includes('primitive') && token.attributes.category === 'space',
  isLineHeight: token => token.attributes.category === 'line-height',
  isBorder: token => token.attributes.category.includes('border'),
};

const DEVICES = ['mobile', 'tablet', 'desktop'];

const normalizeName = token => {
  if (DEVICES.includes(token.path[0]) && token.path[1] === 'typography') {
    if (token.name.includes('font-weight')) {
      return token.path.slice(2).join('-');
    }
    return [...token.path.slice(2), token.path[0]].join('-');
  }
  if (token.path[0] === 'color' && token.path[1] === 'light') {
    return [token.path[0], ...token.path.slice(2)].join('-');
  }
  return token.name;
};

StyleDictionary.registerTransform({
  name: 'css/normalize-name',
  type: 'name',
  transform: normalizeName,
});

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
  name: 'font/px-to-rem',
  type: 'value',
  filter: token => token.attributes.category === 'font' && token.attributes.type === 'size',
  transform: token => `${token.value / 16}rem`,
});

StyleDictionary.registerTransform({
  name: 'line-height/unitless',
  type: 'value',
  filter: filters.isLineHeight,
  transform: token => {
    return `${token.value / 16}`;
  },
});

const px = token => token.value + 'px';

StyleDictionary.registerTransform({
  name: 'space/px',
  type: 'value',
  filter: filters.isSpace,
  transform: px,
});

StyleDictionary.registerTransform({
  name: 'border/px',
  type: 'value',
  filter: filters.isBorder,
  transform: px,
});

StyleDictionary.registerTransformGroup({
  name: 'css-transforms',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'alias/variable-css',
    'css/normalize-name',
    'space/px',
    'border/px',
    'font/px-to-rem',
    'line-height/unitless',
  ],
});

const typographyComponents = Object.keys(deviceJson.mobile.typography);
const lightComponents = Object.keys(componentJson.light);
const dynamicComponentFiles = [...lightComponents].map(componentName => ({
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
const typographyComponentFiles = typographyComponents.map(componentName => ({
  destination: `${componentName}.css`,
  format: 'css/variables',
  filter: token => {
    if (token.path.includes('font-family') || token.path.includes('letter-spacing')) {
      return false;
    }
    return token.attributes.type === 'typography' && token.path.includes(componentName);
  },
}));

function buildCss() {
  console.log('Building CSS...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      platforms: {
        // 'css-components': {
        //   transformGroup: 'css-transforms',
        //   transforms: ['rename-typography'],
        //   buildPath: './css/',
        //   files: typographyComponentFiles,
        // },
        css: {
          transformGroup: 'css-transforms',
          buildPath: './css/',
          files: [
            {
              destination: 'color.css',
              format: 'css/variables',
              filter: filters.isColor,
            },
            {
              destination: 'space.css',
              format: 'css/variables',
              filter: filters.isSpace,
            },
            {
              destination: 'layout.css',
              format: 'css/variables',
              filter: filters.isLayout,
            },
            {
              destination: 'font.css',
              format: 'css/variables',
              filter: filters.isFont,
            },
            {
              destination: 'line-height.css',
              format: 'css/variables',
              filter: filters.isLineHeight,
            },
            {
              destination: 'typography.css',
              format: 'css/variables',
              filter: filters.isTypography,
            },
            {
              destination: 'border.css',
              format: 'css/variables',
              filter: filters.isBorder,
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

export default buildCss;
