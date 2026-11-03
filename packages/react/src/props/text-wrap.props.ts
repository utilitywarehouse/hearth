import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['wrap', 'nowrap', 'balance', 'pretty'] as const;

export const textWrapPropDefs = {
  textWrap: { className: 'tw', tokens: values, responsive: true },
} satisfies {
  textWrap: PropDef<(typeof values)[number]>;
};

export interface TextWrapProps {
  /**
   * Sets the CSS `text-wrap` property, controlling how text wraps within its container.
   * Can be set responsively.
   */
  textWrap?: Responsive<(typeof values)[number]>;
}
