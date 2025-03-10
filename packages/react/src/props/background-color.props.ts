import { PropDef } from './prop-def';
import { colorTokens as importedColorTokens } from '../tokens/color';
import { transformColorValue } from '../helpers/transform-color-value';

// we need to redefine as const so that intellisense works
const colorTokens = [...importedColorTokens] as const;

const backgroundColorPropDefs = {
  backgroundColor: {
    className: 'background-color',
    tokens: colorTokens,
    responsive: false,
    singleClassNameTokens: true,
    transformValue: transformColorValue,
  },
} satisfies {
  backgroundColor: PropDef<(typeof colorTokens)[number]>;
};

interface BackgroundColorProps {
  /**
   * Set the background colour.
   */
  backgroundColor?: (typeof colorTokens)[number];
}

export { backgroundColorPropDefs };
export type { BackgroundColorProps };
