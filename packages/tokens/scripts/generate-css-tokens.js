import fs from 'fs';
import path from 'path';
import StyleDictionary from 'style-dictionary';
import { filters } from './helpers/filters.js';
import { kebabCase } from './helpers/kebab-case.js';
import { normalizeTokenName } from './helpers/normalize-token.js';
import { px } from './helpers/px.js';
import { unwrapAlias } from './helpers/unwrap-alias.js';

// Path where CSS files will be generated
const BUILD_PATH = './css/';
// Prefix used for all CSS custom properties
const PREFIX = 'h';

/**
 * Creates an index.css file that imports all generated CSS files.
 * This action:
 * 1. Reads all CSS files in the build directory
 * 2. Filters out index.css itself and non-CSS files
 * 3. Creates @import statements with the correct relative path
 * 4. Writes the imports to index.css
 */
StyleDictionary.registerAction({
  name: 'create_css_index',
  do: () => {
    const cssFiles = fs
      .readdirSync(path.resolve(BUILD_PATH))
      .filter(file => file.endsWith('.css') && file !== 'index.css')
      .map(file => `@import '../css/${file}';`)
      .join('\n');

    const indexFilePath = path.resolve(path.join(BUILD_PATH, 'index.css'));
    try {
      fs.writeFileSync(indexFilePath, cssFiles);
    } catch (error) {
      console.error(`Failed to write to file: ${indexFilePath}. Error: ${error.message}`);
    }
  },
});

/**
 * Normalizes token names to ensure consistent naming across the design system.
 * This transform is applied to all token names before they are used in CSS.
 */
StyleDictionary.registerTransform({
  name: 'css/normalize-name',
  type: 'name',
  transform: (token, config) => {
    return normalizeTokenName(token, config);
  },
});

/**
 * Unwraps alias references in token values.
 * When a token references another token (alias), this transform converts the reference
 * into a CSS custom property using the kebab-case format.
 * Example: {color: {alias: "base.primary"}} becomes var(--h-base-primary)
 */
StyleDictionary.registerTransform({
  name: 'alias/unwrap',
  type: 'value',
  filter: filters.isStringToken,
  transform: (token, config) => {
    const aliasPath = unwrapAlias(token.alias).split('.');
    return `var(--${kebabCase([config.prefix, ...aliasPath].join('-'))})`;
  },
});

/**
 * Converts font size values from pixels to rem units.
 * This transform is applied to all font size tokens to ensure consistent scaling.
 * Example: 16px becomes 1rem
 */
StyleDictionary.registerTransform({
  name: 'font-size/px-to-rem',
  type: 'value',
  filter: filters.isFontSize,
  transform: token => {
    return `${token.value / 16}rem`;
  },
});

/**
 * Converts line height values from pixels to rem units.
 * This transform is applied to primitive line height tokens to ensure consistent scaling.
 * Example: 24px becomes 1.5rem
 */
StyleDictionary.registerTransform({
  name: 'line-height/px-to-rem',
  type: 'value',
  filter: filters.isPrimitiveLineHeight,
  transform: token => `${token.value / 16}rem`,
});

/**
 * Converts space values to pixel units.
 * This transform is applied to primitive spacing tokens to ensure consistent units.
 * Example: 4 becomes 4px
 */
StyleDictionary.registerTransform({
  name: 'space/px',
  type: 'value',
  filter: filters.isPrimitiveSpace,
  transform: px,
});

/**
 * Converts border values to pixel units.
 * This transform is applied to primitive border tokens to ensure consistent units.
 * Example: 1 becomes 1px
 */
StyleDictionary.registerTransform({
  name: 'border/px',
  type: 'value',
  filter: filters.isPrimitiveBorder,
  transform: px,
});

/**
 * Converts component-specific pixel values.
 * This transform is applied to component tokens that use pixel values.
 * Example: 16 becomes 16px
 */
StyleDictionary.registerTransform({
  name: 'component/px',
  type: 'value',
  filter: filters.isComponentPxValue,
  transform: px,
});

/**
 * Removes the 'light-' prefix from color tokens.
 * This transform is applied to color tokens to maintain consistent naming.
 * Example: 'light-primary' becomes 'primary'
 */
StyleDictionary.registerTransform({
  name: 'alias/remove-light-color-prefix',
  type: 'value',
  filter: filters.isColor,
  transform: token => {
    return token.value.replace(/light-/, '');
  },
});

/**
 * Converts opacity values from percentage to decimal.
 * This transform is applied to opacity tokens to ensure correct CSS values.
 * Example: 50 becomes 0.5
 */
StyleDictionary.registerTransform({
  name: 'opacity/value',
  type: 'value',
  filter: filters.isOpacity,
  transform: token => {
    return token.value / 100;
  },
});

/**
 * Normalizes letter spacing values to pixel units with 2 decimal places.
 * This transform is applied to primitive letter spacing tokens.
 * Example: 0.5 becomes 0.50px
 */
StyleDictionary.registerTransform({
  name: 'letter-spacing/normalize-value',
  type: 'value',
  filter: filters.isPrimitiveLetterSpacing,
  transform: token => `${token.value.toFixed(2)}px`,
});

/**
 * Defines the sequence of transforms to be applied to CSS tokens.
 * The transforms are applied in order, from top to bottom.
 */
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
    'component/px',
    'font-size/px-to-rem',
    'line-height/px-to-rem',
    'opacity/value',
    'letter-spacing/normalize-value',
  ],
});

export function generateCssTokens() {
  console.log('Generating CSS tokens...');
  return [
    new StyleDictionary({
      source: ['./raw/*.json'],
      log: {
        verbosity: 'verbose',
        errors: true,
        warnings: true,
      },
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
            {
              destination: 'semantic.css',
              format: 'css/variables',
              filter: filters.isSemantic,
            },
            {
              destination: 'components.css',
              format: 'css/variables',
              filter: filters.isComponentToken,
            },
          ],
          actions: ['create_css_index'],
        },
      },
    }),
  ];
}
