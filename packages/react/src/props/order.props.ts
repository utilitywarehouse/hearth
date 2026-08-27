import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const orderPropDefs = {
  order: { className: 'order', responsive: true },
} satisfies {
  order: PropDef<string>;
};

export interface OrderProps {
  /**
   * Set the order in which the component appears among its flex or grid siblings.
   */
  order?: Responsive<string>;
}
