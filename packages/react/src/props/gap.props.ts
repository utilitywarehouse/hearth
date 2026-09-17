import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const gapPropDefs = {
  gap: { className: 'gap', tokens: spaceTokens, responsive: true },
  rowGap: { className: 'row-gap', tokens: spaceTokens, responsive: true },
  columnGap: { className: 'column-gap', tokens: spaceTokens, responsive: true },
} satisfies {
  gap: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  rowGap: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  columnGap: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
};

export interface GapProps {
  /**
   * Shorthand for `row-gap` and `column-gap`, setting the space between rows and
   * columns in a flex or grid container. Supports responsive values.
   */
  gap?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  /**
   * Set the space between rows in a flex or grid container. Supports responsive values.
   */
  rowGap?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  /**
   * Set the space between columns in a flex or grid container. Supports responsive values.
   */
  columnGap?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
}
