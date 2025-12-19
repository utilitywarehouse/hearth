import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['wrap', 'nowrap', 'balance', 'pretty'] as const;

export const textWrapPropDefs = {
  wrap: { className: 'tw', tokens: values, responsive: true },
} satisfies {
  wrap: PropDef<(typeof values)[number]>;
};

export interface TextWrapProps {
  wrap?: Responsive<(typeof values)[number]>;
}
