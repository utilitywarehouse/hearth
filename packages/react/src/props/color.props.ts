import { PropDef } from './prop-def';

const colorValues = ['primary', 'secondary', 'brand', 'affirmative', 'inverted'] as const;

const colorPropDefs = {
  color: { className: 'color', tokens: colorValues, responsive: false },
} satisfies {
  color: PropDef<(typeof colorValues)[number]>;
};

interface ColorProps {
  /**
   * Set the foreground colour.
   */
  color?: (typeof colorValues)[number];
}

export { colorPropDefs };
export type { ColorProps };
