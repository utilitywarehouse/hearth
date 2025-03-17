import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;

const positionPropDefs = {
  position: { className: 'position', tokens: positionValues, responsive: true },
  inset: { className: 'inset', responsive: true },
  top: { className: 'top', responsive: true },
  right: { className: 'right', responsive: true },
  bottom: { className: 'bottom', responsive: true },
  left: { className: 'left', responsive: true },
} satisfies {
  position: PropDef<(typeof positionValues)[number]>;
  inset: PropDef<string>;
  top: PropDef<string>;
  right: PropDef<string>;
  bottom: PropDef<string>;
  left: PropDef<string>;
};

interface PositionProps {
  position?: Responsive<(typeof positionValues)[number]>;
  inset?: Responsive<string>;
  top?: Responsive<string>;
  right?: Responsive<string>;
  bottom?: Responsive<string>;
  left?: Responsive<string>;
}

export { positionPropDefs };
export type { PositionProps };
