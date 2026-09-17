import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['start', 'center', 'end', 'stretch', 'between', 'around', 'evenly'] as const;

export const alignContentPropDefs = {
  alignContent: { className: 'ac', tokens: values, responsive: true },
} satisfies {
  alignContent: PropDef<(typeof values)[number]>;
};

export interface AlignContentProps {
  /**
   * Set how a flex or grid container distributes space between and around its lines
   * when there is extra space in the cross axis. Supports responsive values.
   */
  alignContent?: Responsive<(typeof values)[number]>;
}
