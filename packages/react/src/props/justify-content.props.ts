import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['start', 'center', 'end', 'stretch', 'between', 'around', 'evenly'] as const;

export const justifyContentPropDefs = {
  justifyContent: { className: 'jc', tokens: values, responsive: true },
} satisfies {
  justifyContent: PropDef<(typeof values)[number]>;
};

export interface JustifyContentProps {
  /*
   * For flexboxes, the stretch value behaves as flex-start or start.
   * This is because, in flexboxes, stretching is controlled using the flex-grow property.
   */
  justifyContent?: Responsive<(typeof values)[number]>;
}
