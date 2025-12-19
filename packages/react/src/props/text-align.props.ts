import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['left', 'center', 'right'] as const;

export const textAlignPropDefs = {
  textAlign: { className: 'ta', tokens: values, responsive: true },
} satisfies {
  textAlign: PropDef<(typeof values)[number]>;
};

export interface TextAlignProps {
  textAlign?: Responsive<(typeof values)[number]>;
}
