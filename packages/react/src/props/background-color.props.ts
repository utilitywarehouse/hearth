import { PropDef } from './prop-def';

const colorValues = ['primary', 'secondary', 'brand'] as const;

const backgroundColorPropDefs = {
  backgroundColor: { className: 'background-color', tokens: colorValues, responsive: false },
} satisfies {
  backgroundColor: PropDef<(typeof colorValues)[number]>;
};

interface BackgroundColorProps {
  /**
   * Set the background colour.
   */
  backgroundColor?: (typeof colorValues)[number];
}

export { backgroundColorPropDefs };
export type { BackgroundColorProps };
