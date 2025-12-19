import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['start', 'center', 'end', 'baseline', 'stretch'] as const;

export const alignItemsPropDefs = {
  alignItems: { className: 'ai', tokens: values, responsive: true },
} satisfies {
  alignItems: PropDef<(typeof values)[number]>;
};

export interface AlignItemsProps {
  alignItems?: Responsive<(typeof values)[number]>;
}
