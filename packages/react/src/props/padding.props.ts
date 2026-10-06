import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const paddingPropDefs = {
  padding: { className: 'p', tokens: spaceTokens, responsive: true },
  paddingTop: { className: 'pt', tokens: spaceTokens, responsive: true },
  paddingRight: { className: 'pr', tokens: spaceTokens, responsive: true },
  paddingBottom: { className: 'pb', tokens: spaceTokens, responsive: true },
  paddingLeft: { className: 'pl', tokens: spaceTokens, responsive: true },
  paddingX: { className: 'px', tokens: spaceTokens, responsive: true },
  paddingY: { className: 'py', tokens: spaceTokens, responsive: true },
} satisfies {
  padding: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingTop: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingRight: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingBottom: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingLeft: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingX: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingY: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
};

export interface PaddingProps {
  /**
   * Sets the responsive `padding` CSS property on all sides of the element.
   */
  padding?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `padding-top` CSS property.
   */
  paddingTop?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `padding-right` CSS property.
   */
  paddingRight?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `padding-bottom` CSS property.
   */
  paddingBottom?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `padding-left` CSS property.
   */
  paddingLeft?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `padding-left` and `padding-right` CSS properties.
   */
  paddingX?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `padding-top` and `padding-bottom` CSS properties.
   */
  paddingY?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
}
