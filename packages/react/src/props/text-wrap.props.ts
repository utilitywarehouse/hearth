import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['wrap', 'nowrap', 'balance', 'pretty'] as const;

export const textWrapPropDefs = {
  wrap: { className: 'tw', tokens: values, responsive: true },
  textWrap: { className: 'tw', tokens: values, responsive: true },
} satisfies {
  wrap: PropDef<(typeof values)[number]>;
  textWrap: PropDef<(typeof values)[number]>;
};

export interface TextWrapProps {
  /**
   * DEPRECATED: use `textWrap` instead of `wrap`
   * @deprecated Use `textWrap` instead of `wrap`
   */
  wrap?: Responsive<(typeof values)[number]>;
  textWrap?: Responsive<(typeof values)[number]>;
}
