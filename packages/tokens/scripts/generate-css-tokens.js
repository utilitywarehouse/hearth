import StyleDictionary from 'style-dictionary';
import { unwrapAlias } from './helpers/unwrap-alias.js';
import { loadJSON } from './helpers/load-json.js';
import { normalizeTokenName } from './helpers/normalize-token.js';
import { px } from './helpers/px.js';
import { filters } from './helpers/filters.js';

export const BUILD_PATH = './css/';

// I tried to get this working with fs.readdirSync but I couldn't
// so this will have to do for now
StyleDictionary.registerFormat({
  name: 'css/index',
  format: () => {
    return `@import '../css/badge.css';
@import '../css/border.css';
@import '../css/button.css';
@import '../css/color.css';
@import '../css/font.css';
@import '../css/layout.css';
@import '../css/line-height.css';
@import '../css/space.css';
@import '../css/spinner.css';
@import '../css/typography.css';
`;
  },
});

StyleDictionary.registerTransform({
  name: 'css/normalize-name',
  type: 'name',
  transform: normalizeTokenName,
});

StyleDictionary.registerTransform({
  name: 'alias/unwrap',
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
  filter: filters.isPrimitiveLineHeight,
  transform: token => `${token.value / 16}`,
});

StyleDictionary.registerTransform({
  name: 'space/px',
  type: 'value',
  filter: filters.isPrimitiveSpace,
  transform: px,
});

StyleDictionary.registerTransform({
  name: 'border/px',
  type: 'value',
  filter: filters.isPrimitiveBorder,
  transform: px,
});

StyleDictionary.registerTransform({
  name: 'alias/remove-light-color-prefix',
  type: 'value',
  filter: filters.isColor,
  transform: token => {
    return token.value.replace(/light-/, '');
  },
});

StyleDictionary.registerTransformGroup({
  name: 'css-transforms',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'alias/unwrap',
    'alias/remove-light-color-prefix',
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
  filter: token => {
    return (
      token.filePath.includes('component') &&
      token.path.includes(componentName) &&
      token.attributes.category === 'light'
    );
  },
}));

export function generateCssTokens() {
  console.log('Generating CSS tokens...');
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
              filter: filters.isPrimitiveLightColor,
            },
            {
              destination: 'space.css',
              format: 'css/variables',
              filter: filters.isPrimitiveSpace,
            },
            {
              destination: 'layout.css',
              format: 'css/variables',
              filter: filters.isLayoutSpacing,
            },
            {
              destination: 'font.css',
              format: 'css/variables',
              filter: filters.isFont,
            },
            {
              destination: 'line-height.css',
              format: 'css/variables',
              filter: filters.isPrimitiveLineHeight,
            },
            {
              destination: 'typography.css',
              format: 'css/variables',
              filter: filters.isTypography,
            },
            {
              destination: 'border.css',
              format: 'css/variables',
              filter: filters.isPrimitiveBorder,
            },
          ],
        },
        'css-components': {
          transformGroup: 'css-transforms',
          buildPath: BUILD_PATH,
          files: componentFiles,
        },
        'css-index': {
          transformGroup: 'css-transforms',
          buildPath: BUILD_PATH,
          files: [
            {
              destination: 'index.css',
              format: 'css/index',
            },
          ],
        },
      },
    }),
  ];
}
