import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['auto', ...spaceTokens] as const;

export const marginPropDefs = {
  margin: { className: 'm', tokens: values, responsive: true },
  marginTop: { className: 'mt', tokens: values, responsive: true },
  marginRight: { className: 'mr', tokens: values, responsive: true },
  marginBottom: { className: 'mb', tokens: values, responsive: true },
  marginLeft: { className: 'ml', tokens: values, responsive: true },
  marginX: { className: 'mx', tokens: values, responsive: true },
  marginY: { className: 'my', tokens: values, responsive: true },
} satisfies {
  margin: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginTop: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginRight: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginBottom: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginLeft: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginX: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginY: PropDef<(typeof values)[number] | CssTokenVariable>;
};

export interface MarginProps {
  /**
   * Sets the responsive `margin` CSS property on all sides of the element.
   */
  margin?: Responsive<(typeof values)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `margin-top` CSS property.
   */
  marginTop?: Responsive<(typeof values)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `margin-right` CSS property.
   */
  marginRight?: Responsive<(typeof values)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `margin-bottom` CSS property.
   */
  marginBottom?: Responsive<(typeof values)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `margin-left` CSS property.
   */
  marginLeft?: Responsive<(typeof values)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `margin-left` and `margin-right` CSS properties.
   */
  marginX?: Responsive<(typeof values)[number] | CssTokenVariable>;
  /**
   * Sets the responsive `margin-top` and `margin-bottom` CSS properties.
   */
  marginY?: Responsive<(typeof values)[number] | CssTokenVariable>;
}
