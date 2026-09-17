import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const zIndexPropDefs = {
  zIndex: { className: 'zi', responsive: true },
} satisfies {
  zIndex: PropDef<string>;
};

export interface ZIndexProps {
  /**
   * Set the stack order of a positioned component relative to its siblings.
   */
  zIndex?: Responsive<string>;
}
