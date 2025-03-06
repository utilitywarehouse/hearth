import { transformColorValue } from '../helpers/transform-color-value';
import { colorTokens as importedColorTokens } from '../tokens/color';
import { PropDef } from './prop-def';

// we need to redefine as const so that intellisense works
const colorTokens = [...importedColorTokens] as const;

const colorPropDefs = {
  color: {
    className: 'color',
    tokens: colorTokens,
    responsive: false,
    singleClassNameTokens: true,
    transformValue: transformColorValue,
  },
} satisfies {
  color: PropDef<(typeof colorTokens)[number]>;
};

interface ColorProps {
  /**
   * Set the foreground colour.
   */
  color?: (typeof colorTokens)[number];
}

export { colorPropDefs };
export type { ColorProps };
