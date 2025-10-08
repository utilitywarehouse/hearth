import { PropDef } from './prop-def';

const colorValues = ['strong', 'subtle'] as const;

const borderColorPropDefs = {
  borderColor: { className: 'border-color', tokens: colorValues, responsive: false },
  borderTopColor: { className: 'border-top-color', tokens: colorValues, responsive: false },
  borderRightColor: { className: 'border-right-color', tokens: colorValues, responsive: false },
  borderBottomColor: { className: 'border-bottom-color', tokens: colorValues, responsive: false },
  borderLeftColor: { className: 'border-left-color', tokens: colorValues, responsive: false },
} satisfies {
  borderColor: PropDef<(typeof colorValues)[number]>;
  borderTopColor: PropDef<(typeof colorValues)[number]>;
  borderRightColor: PropDef<(typeof colorValues)[number]>;
  borderBottomColor: PropDef<(typeof colorValues)[number]>;
  borderLeftColor: PropDef<(typeof colorValues)[number]>;
};

interface BorderColorProps {
  /**
   * Set the border colour.
   */
  borderColor?: (typeof colorValues)[number];
  /**
   * Set the border top colour.
   */
  borderTopColor?: (typeof colorValues)[number];
  /**
   * Set the border right colour.
   */
  borderRightColor?: (typeof colorValues)[number];
  /**
   * Set the border bottom colour.
   */
  borderBottomColor?: (typeof colorValues)[number];
  /**
   * Set the border left colour.
   */
  borderLeftColor?: (typeof colorValues)[number];
}

export { borderColorPropDefs, colorValues as borderColorValues };
export type { BorderColorProps };
