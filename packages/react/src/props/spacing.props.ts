import { PropDef } from './prop-def';

const values = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export const spacingPropDefs = {
  spacing: { className: 'spacing', tokens: values, responsive: false },
  rowSpacing: { className: 'row-spacing', tokens: values, responsive: false },
  columnSpacing: { className: 'column-spacing', tokens: values, responsive: false },
} satisfies {
  spacing: PropDef<(typeof values)[number]>;
  rowSpacing: PropDef<(typeof values)[number]>;
  columnSpacing: PropDef<(typeof values)[number]>;
};

export interface SpacingProps {
  /**
   * Set responsive spacing between child elements.
   */
  spacing?: (typeof values)[number];
  /**
   * Set responsive row spacing between child elements.
   */
  rowSpacing?: (typeof values)[number];
  /**
   * Set responsive column spacing between child elements.
   */
  columnSpacing?: (typeof values)[number];
}
