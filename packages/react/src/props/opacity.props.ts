import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const opacityPropDefs = {
  opacity: { className: 'opacity', responsive: true },
} satisfies {
  opacity: PropDef<string>;
};

export interface OpacityProps {
  /**
   * Set the transparency of an element, from `0` (fully transparent) to `1`
   * (fully opaque). Supports responsive values.
   */
  opacity?: Responsive<string>;
}
