import StyleDictionary from 'style-dictionary';
import { unwrapAlias } from './helpers/unwrap-alias.js';
import { loadJSON } from './helpers/load-json.js';
import { normalizeTokenName } from './helpers/normalize-token.js';
import { px } from './helpers/px.js';
import { filters } from './helpers/filters.js';
import { kebabCase } from './helpers/kebab-case.js';

const BUILD_PATH = './css/';
const VALID_DEVICE_COMPONENTS = ['card'];
const PREFIX = 'h';

// I tried to get this working with fs.readdirSync but I couldn't
// so this will have to do for now
StyleDictionary.registerFormat({
  name: 'css/index',
  format: () => {
    return `@import '../css/badge.css';
@import '../css/border.css';
@import '../css/button.css';
@import '../css/card.css';
@import '../css/color.css';
@import '../css/divider.css';
@import '../css/focus.css';
@import '../css/font.css';
@import '../css/icon-button.css';
@import '../css/inline-link.css';
@import '../css/input.css';
@import '../css/layout.css';
@import '../css/letter-spacing.css';
@import '../css/line-height.css';
@import '../css/link.css';
@import '../css/opacity.css';
@import '../css/space.css';
@import '../css/spinner.css';
@import '../css/text.css';
@import '../css/typography.css';
@import '../css/mobile.css';
@import '../css/tablet.css';
@import '../css/desktop.css';
`;
  },
});

StyleDictionary.registerTransform({
  name: 'css/normalize-name',
  type: 'name',
  transform: (token, config) => {
    return normalizeTokenName(token, config);
  },
});

StyleDictionary.registerTransform({
  name: 'alias/unwrap',
  type: 'value',
  filter: filters.isStringToken,
  transform: (token, config) => {
    const aliasPath = unwrapAlias(token.alias).split('.');
    return `var(--${kebabCase([config.prefix, ...aliasPath].join('-'))})`;
  },
});

StyleDictionary.registerTransform({
  name: 'font-size/px-to-rem',
  type: 'value',
  filter: filters.isFontSize,
  transform: token => `${token.value / 16}rem`,
});

StyleDictionary.registerTransform({
  name: 'line-height/px-to-rem',
  type: 'value',
  filter: filters.isPrimitiveLineHeight,
  transform: token => `${token.value / 16}rem`,
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
  name: 'spinner/px',
  type: 'value',
  filter: filters.isSpinnerComponentSize,
  transform: px,
});

StyleDictionary.registerTransform({
  name: 'button/px',
  type: 'value',
  filter: filters.isButtonMinWidth,
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

StyleDictionary.registerTransform({
  name: 'opacity/value',
  type: 'value',
  filter: filters.isOpacity,
  transform: token => {
    return token.value / 100;
  },
});

StyleDictionary.registerTransform({
  name: 'letter-spacing/normalize-value',
  type: 'value',
  filter: filters.isPrimitiveLetterSpacing,
  transform: token => {
    return token.value.toFixed(2) + 'px';
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
    'spinner/px',
    'button/px',
    'font-size/px-to-rem',
    'line-height/px-to-rem',
    'opacity/value',
    'letter-spacing/normalize-value',
  ],
});

const componentJson = loadJSON('./raw/hearth-components--tokens---component.json');
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
const deviceJson = loadJSON('./raw/hearth-components--tokens---device.json');
const deviceFiles = Object.keys(deviceJson).map(device => {
  return {
    destination: `${device}.css`,
    format: 'css/variables',
    filter: token => {
      return (
        token.filePath.includes('device') &&
        token.path.includes(device) &&
        token.path.some(el => VALID_DEVICE_COMPONENTS.includes(el))
      );
    },
  };
});

export function generateCssTokens() {
  console.log('Generating CSS tokens...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      platforms: {
        css: {
          transformGroup: 'css-transforms',
          prefix: PREFIX,
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
              destination: 'letter-spacing.css',
              format: 'css/variables',
              filter: filters.isPrimitiveLetterSpacing,
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
            {
              destination: 'opacity.css',
              format: 'css/variables',
              filter: filters.isOpacity,
            },
          ],
        },
        'css-components': {
          transformGroup: 'css-transforms',
          prefix: PREFIX,
          buildPath: BUILD_PATH,
          files: componentFiles,
        },
        'css-device-components': {
          transformGroup: 'css-transforms',
          prefix: PREFIX,
          buildPath: BUILD_PATH,
          files: deviceFiles,
        },
        'css-index': {
          transformGroup: 'css-transforms',
          prefix: PREFIX,
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
