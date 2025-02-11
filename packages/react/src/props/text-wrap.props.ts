import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const textWrapValues = ['wrap', 'nowrap', 'balance', 'pretty'] as const;

const textWrapPropDefs = {
  wrap: { className: 'text-wrap', tokens: textWrapValues, responsive: true },
} satisfies {
  wrap: PropDef<(typeof textWrapValues)[number]>;
};

interface TextWrapProps {
  /**
   * Set the text-wrap on the component.
   */
  wrap?: Responsive<(typeof textWrapValues)[number]>;
}

export { textWrapPropDefs };
export type { TextWrapProps };
