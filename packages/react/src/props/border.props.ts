import { PropDef } from './prop-def';
import { Responsive } from '../types/responsive';

const borderStyleValues = ['none', 'solid'] as const;
const borderWidthValues = ['0', '1', '2'] as const;

const borderPropDefs = {
  borderStyle: { className: 'border-style', tokens: borderStyleValues, responsive: true },
  borderWidth: { className: 'border-width', tokens: borderWidthValues, responsive: true },
  borderTopStyle: { className: 'border-top-style', tokens: borderStyleValues, responsive: true },
  borderTopWidth: { className: 'border-top-width', tokens: borderWidthValues, responsive: true },
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
  borderLeftStyle: { className: 'border-left-style', tokens: borderStyleValues, responsive: true },
  borderLeftWidth: { className: 'border-left-width', tokens: borderWidthValues, responsive: true },
} satisfies {
  borderStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderTopStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderTopWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderRightStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderRightWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderBottomStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderBottomWidth: PropDef<(typeof borderWidthValues)[number]>;
  borderLeftStyle: PropDef<(typeof borderStyleValues)[number]>;
  borderLeftWidth: PropDef<(typeof borderWidthValues)[number]>;
};

interface BorderProps {
  /* Set the border style. */
  borderStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border width. */
  borderWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border-top style. */
  borderTopStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border-top width. */
  borderTopWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border-right style. */
  borderRightStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border-right width. */
  borderRightWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border-bottom style. */
  borderBottomStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border-bottom width. */
  borderBottomWidth?: Responsive<(typeof borderWidthValues)[number]>;
  /* Set the border-left style. */
  borderLeftStyle?: Responsive<(typeof borderStyleValues)[number]>;
  /* Set the border-left width. */
  borderLeftWidth?: Responsive<(typeof borderWidthValues)[number]>;
}

export { borderPropDefs };
export type { BorderProps };
