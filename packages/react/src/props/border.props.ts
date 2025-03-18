import { PropDef } from './prop-def';
import { colorTokens as importedColorTokens } from '../tokens/color';
import { transformColorValue } from '../helpers/transform-color-value';
import { Responsive } from '../types/responsive';

// we need to redefine as const so that intellisense works
const colorTokens = [...importedColorTokens] as const;
const borderStyleValues = ['none', 'solid'] as const;
const borderWidthValues = ['0', '1', '2'] as const;
const borderRadiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;

const borderPropDefs = {
  borderColor: {
    className: 'border-color',
    tokens: colorTokens,
    responsive: false,
    singleClassNameTokens: true,
    transformValue: transformColorValue,
  },
  borderStyle: { className: 'border-style', tokens: borderStyleValues, responsive: true },
  borderWidth: { className: 'border-width', tokens: borderWidthValues, responsive: true },
  borderTopColor: {
    className: 'border-top-color',
    tokens: colorTokens,
    responsive: false,
    singleClassNameTokens: true,
    transformValue: transformColorValue,
  },
  borderTopStyle: { className: 'border-top-style', tokens: borderStyleValues, responsive: true },
  borderTopWidth: { className: 'border-top-width', tokens: borderWidthValues, responsive: true },
  borderRightColor: {
    className: 'border-right-color',
    tokens: colorTokens,
    responsive: false,
    singleClassNameTokens: true,
    transformValue: transformColorValue,
  },
  borderRightStyle: {
    className: 'border-right-style',
    tokens: borderStyleValues,
    responsive: true,
  },
  borderRightWidth: {
    className: 'border-right-width',
    tokens: borderWidthValues,
    responsive: true,
  },
  borderBottomColor: {
    className: 'border-bottom-color',
    tokens: colorTokens,
    responsive: false,
    singleClassNameTokens: true,
    transformValue: transformColorValue,
  },
  borderBottomStyle: {
    className: 'border-bottom-style',
    tokens: borderStyleValues,
    responsive: true,
  },
  borderBottomWidth: {
    className: 'border-bottom-width',
    tokens: borderWidthValues,
    responsive: true,
  },
  borderLeftColor: {
    className: 'border-left-color',
    tokens: colorTokens,
    responsive: false,
    singleClassNameTokens: true,
    transformValue: transformColorValue,
  },
  borderLeftStyle: { className: 'border-left-style', tokens: borderStyleValues, responsive: true },
  borderLeftWidth: { className: 'border-left-width', tokens: borderWidthValues, responsive: true },
  borderRadius: { className: 'border-radius', tokens: borderRadiusValues, responsive: true },
  borderTopLeftRadius: {
    className: 'border-top-left-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderTopRightRadius: {
    className: 'border-top-right-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderBottomRightRadius: {
    className: 'border-bottom-right-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderBottomLeftRadius: {
    className: 'border-bottom-left-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
} satisfies {
  borderColor: PropDef<(typeof colorTokens)[number]>;
  borderStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderTopColor: PropDef<(typeof colorTokens)[number]>;
  borderTopStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderTopWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderRightColor: PropDef<(typeof colorTokens)[number]>;
  borderRightStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderRightWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderBottomColor: PropDef<(typeof colorTokens)[number]>;
  borderBottomStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderBottomWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderLeftColor: PropDef<(typeof colorTokens)[number]>;
  borderLeftStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderLeftWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderTopLeftRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderTopRightRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderBottomRightRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderBottomLeftRadius: PropDef<(typeof borderRadiusValues)[number]>;
};

interface BorderProps {
  /* Set the border colour. */
  borderColor?: (typeof colorTokens)[number];
  /* Set the border style. */
  borderStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border width. */
  borderWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border-top colour. */
  borderTopColor?: (typeof colorTokens)[number];
  /* Set the border-top style. */
  borderTopStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border-top width. */
  borderTopWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border-right colour. */
  borderRightColor?: (typeof colorTokens)[number];
  /* Set the border-right style. */
  borderRightStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border-right width. */
  borderRightWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border-bottom colour. */
  borderBottomColor?: (typeof colorTokens)[number];
  /* Set the border-bottom style. */
  borderBottomStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border-bottom width. */
  borderBottomWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border-left colour. */
  borderLeftColor?: (typeof colorTokens)[number];
  /* Set the border-left style. */
  borderLeftStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border-left width. */
  borderLeftWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border radius. */
  borderRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-top-left radius. */
  borderTopLeftRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-top-right radius. */
  borderTopRightRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-bottom-right radius. */
  borderBottomRightRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-bottom-left radius. */
  borderBottomLeftRadius?: Responsive<(typeof borderRadiusValues)[number]>;
}

export { borderPropDefs };
export type { BorderProps };
