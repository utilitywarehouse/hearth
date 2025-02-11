import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const textTransformValues = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;

const textTransformPropDefs = {
  textTransform: { className: 'text-transform', tokens: textTransformValues, responsive: true },
} satisfies {
  textTransform: PropDef<(typeof textTransformValues)[number]>;
};

interface TextTransformProps {
  /**
   * Set the text-transform on the component.
   */
  textTransform?: Responsive<(typeof textTransformValues)[number]>;
}

export { textTransformPropDefs };
export type { TextTransformProps };
