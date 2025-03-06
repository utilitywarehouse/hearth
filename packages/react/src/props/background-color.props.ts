import { PropDef } from './prop-def';
import { colorTokens as importedColorTokens } from '../tokens/color';
import { transformColorValue } from '../helpers/transform-color-value';

const colorTokens = [...importedColorTokens] as const;

const backgroundColorPropDefs = {
  backgroundColor: {
    className: 'background-color',
    tokens: colorTokens,
    responsive: false,
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
