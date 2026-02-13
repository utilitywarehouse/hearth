import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const opacityPropDefs = {
  opacity: { className: 'opacity', responsive: true },
} satisfies {
  opacity: PropDef<string>;
};

export interface OpacityProps {
  opacity?: Responsive<string>;
}
