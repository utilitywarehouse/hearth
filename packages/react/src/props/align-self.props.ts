import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['start', 'center', 'end', 'stretch'] as const;

export const alignSelfPropDefs = {
  alignSelf: { className: 'as', tokens: values, responsive: true },
} satisfies {
  alignSelf: PropDef<(typeof values)[number]>;
};

export interface AlignSelfProps {
  alignSelf?: Responsive<(typeof values)[number]>;
}
