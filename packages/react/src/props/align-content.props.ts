import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['start', 'center', 'end', 'stretch', 'between', 'around', 'evenly'] as const;

export const alignContentPropDefs = {
  alignContent: { className: 'ac', tokens: values, responsive: true },
} satisfies {
  alignContent: PropDef<(typeof values)[number]>;
};

export interface AlignContentProps {
  alignContent?: Responsive<(typeof values)[number]>;
}
