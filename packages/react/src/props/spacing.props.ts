import { PropDef } from './prop-def';

const spacingValues = ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const spacingPropDefs = {
  spacing: { className: 'spacing', tokens: spacingValues, responsive: false },
  rowSpacing: { className: 'row-spacing', tokens: spacingValues, responsive: false },
  columnSpacing: { className: 'column-spacing', tokens: spacingValues, responsive: false },
} satisfies {
  spacing: PropDef<(typeof spacingValues)[number]>;
  rowSpacing: PropDef<(typeof spacingValues)[number]>;
  columnSpacing: PropDef<(typeof spacingValues)[number]>;
};

interface SpacingProps {
  /**
   * Set responsive spacing between child elements.
   */
  spacing?: (typeof spacingValues)[number];
  /**
   * Set responsive row spacing between child elements.
   */
  rowSpacing?: (typeof spacingValues)[number];
  /**
   * Set responsive column spacing between child elements.
   */
  columnSpacing?: (typeof spacingValues)[number];
}

export type { SpacingProps };
export { spacingPropDefs };
