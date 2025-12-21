import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const zIndexPropDefs = {
  zIndex: { className: 'zi', responsive: true },
} satisfies {
  zIndex: PropDef<string>;
};

export interface ZIndexProps {
  zIndex?: Responsive<string>;
}
