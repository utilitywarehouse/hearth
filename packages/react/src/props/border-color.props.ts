import { CssTokenVariable } from '../types/css-token-variable';
import { PropDef } from './prop-def';

const colorValues = ['strong', 'subtle'] as const;

const borderColorPropDefs = {
  borderColor: { className: 'border', tokens: colorValues, responsive: false },
  borderTopColor: { className: 'border-t', tokens: colorValues, responsive: false },
  borderRightColor: { className: 'border-r', tokens: colorValues, responsive: false },
  borderBottomColor: { className: 'border-b', tokens: colorValues, responsive: false },
  borderLeftColor: { className: 'border-l', tokens: colorValues, responsive: false },
} satisfies {
  borderColor: PropDef<(typeof colorValues)[number] | CssTokenVariable>;
  borderTopColor: PropDef<(typeof colorValues)[number] | CssTokenVariable>;
  borderRightColor: PropDef<(typeof colorValues)[number] | CssTokenVariable>;
  borderBottomColor: PropDef<(typeof colorValues)[number] | CssTokenVariable>;
  borderLeftColor: PropDef<(typeof colorValues)[number] | CssTokenVariable>;
};

interface BorderColorProps {
  /**
   * Set the border colour.
   */
  borderColor?: (typeof colorValues)[number] | CssTokenVariable;
  /**
   * Set the border top colour.
   */
  borderTopColor?: (typeof colorValues)[number] | CssTokenVariable;
  /**
   * Set the border right colour.
   */
  borderRightColor?: (typeof colorValues)[number] | CssTokenVariable;
  /**
   * Set the border bottom colour.
   */
  borderBottomColor?: (typeof colorValues)[number] | CssTokenVariable;
  /**
   * Set the border left colour.
   */
  borderLeftColor?: (typeof colorValues)[number] | CssTokenVariable;
}

export { borderColorPropDefs, colorValues as borderColorValues };
export type { BorderColorProps };
