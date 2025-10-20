import { CssTokenVariable } from '../types/css-token-variable';
import { PropDef } from './prop-def';

const colorValues = ['primary', 'secondary', 'brand'] as const;

const backgroundColorPropDefs = {
  backgroundColor: { className: 'background-color', tokens: colorValues, responsive: false },
} satisfies {
  backgroundColor: PropDef<(typeof colorValues)[number] | CssTokenVariable>;
};

interface BackgroundColorProps {
  /**
   * Set the background colour.
   */
  backgroundColor?: (typeof colorValues)[number] | CssTokenVariable;
}

export { backgroundColorPropDefs, colorValues as backgroundColorValues };
export type { BackgroundColorProps };
