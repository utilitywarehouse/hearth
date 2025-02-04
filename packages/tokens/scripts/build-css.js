import StyleDictionary from 'style-dictionary';
import { unwrapAlias } from './helpers/unwrap-alias.js';
import { loadJSON } from './helpers/load-json.js';
import { normalizeTokenName } from './helpers/normalize-token-name.js';
import { px } from './helpers/px.js';
import { filters } from './helpers/filters.js';

export const BUILD_PATH = './css/';

StyleDictionary.registerTransform({
  name: 'css/normalize-name',
  type: 'name',
  transform: normalizeTokenName,
});

StyleDictionary.registerTransform({
  name: 'alias/variable-css',
  type: 'value',
  filter: filters.isStringToken,
  transform: token => {
    const aliasPath = unwrapAlias(token.alias).replace(/\./g, '-');
    return `var(--${aliasPath})`;
  },
});

StyleDictionary.registerTransform({
  name: 'font-size/px-to-rem',
  type: 'value',
  filter: filters.isFontSize,
  transform: token => `${token.value / 16}rem`,
});

StyleDictionary.registerTransform({
  name: 'line-height/unitless',
  type: 'value',
  filter: filters.isLineHeight,
  transform: token => `${token.value / 16}`,
});

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
    'font-size/px-to-rem',
    'line-height/unitless',
  ],
});

const componentJson = loadJSON('./raw/hearth-components---component.json');
const componentFiles = Object.keys(componentJson.light).map(componentName => ({
  destination: `${componentName}.css`,
  format: 'css/variables',
  filter: token =>
    token.filePath.includes('component') &&
    token.path.includes(componentName) &&
    token.attributes.category === 'light',
}));

export function buildCss() {
  console.log('Building CSS...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      platforms: {
        css: {
          transformGroup: 'css-transforms',
          buildPath: BUILD_PATH,
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
        'css-components': {
          transformGroup: 'css-transforms',
          buildPath: BUILD_PATH,
          files: componentFiles,
        },
      },
    }),
  ];
}
