import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';
import { spaceTokens } from '../tokens/space';
import { Union } from '../types/union';

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;

const positionPropDefs = {
  position: { className: 'position', tokens: positionValues, responsive: true },
  inset: { className: 'inset', tokens: spaceTokens, responsive: true },
  top: { className: 'top', tokens: spaceTokens, responsive: true },
  right: { className: 'right', tokens: spaceTokens, responsive: true },
  bottom: { className: 'bottom', tokens: spaceTokens, responsive: true },
  left: { className: 'left', tokens: spaceTokens, responsive: true },
} satisfies {
  position: PropDef<(typeof positionValues)[number]>;
  inset: PropDef<Union<string, (typeof spaceTokens)[number]>>;
  top: PropDef<Union<string, (typeof spaceTokens)[number]>>;
  right: PropDef<Union<string, (typeof spaceTokens)[number]>>;
  bottom: PropDef<Union<string, (typeof spaceTokens)[number]>>;
  left: PropDef<Union<string, (typeof spaceTokens)[number]>>;
};

interface PositionProps {
  position?: Responsive<(typeof positionValues)[number]>;
  inset?: Responsive<Union<string, (typeof spaceTokens)[number]>>;
  top?: Responsive<Union<string, (typeof spaceTokens)[number]>>;
  right?: Responsive<Union<string, (typeof spaceTokens)[number]>>;
  bottom?: Responsive<Union<string, (typeof spaceTokens)[number]>>;
  left?: Responsive<Union<string, (typeof spaceTokens)[number]>>;
}

export { positionPropDefs };
export type { PositionProps };
