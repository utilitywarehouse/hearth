import { PropDef } from './prop-def';
import { CssTokenVariable } from '../types/css-token-variable';

const colorValues = ['primary', 'secondary', 'brand', 'affirmative', 'inverted'] as const;

const colorPropDefs = {
  color: { className: 'color', tokens: colorValues, responsive: false },
} satisfies {
  color: PropDef<(typeof colorValues)[number] | CssTokenVariable>;
};

interface ColorProps {
  /**
   * Set the foreground colour.
   */
  color?: (typeof colorValues)[number] | CssTokenVariable;
}

export { colorPropDefs, colorValues };
export type { ColorProps };
