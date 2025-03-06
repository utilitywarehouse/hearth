import { spaceTokens } from '../tokens/space';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const gapPropDefs = {
  gap: { className: 'gap', tokens: spaceTokens, responsive: true },
  rowGap: { className: 'row-gap', tokens: spaceTokens, responsive: true },
  columnGap: { className: 'column-gap', tokens: spaceTokens, responsive: true },
} satisfies {
  gap: PropDef<(typeof spaceTokens)[number]>;
  rowGap: PropDef<(typeof spaceTokens)[number]>;
  columnGap: PropDef<(typeof spaceTokens)[number]>;
};

interface GapProps {
  gap?: Responsive<(typeof spaceTokens)[number]>;
  rowGap?: Responsive<(typeof spaceTokens)[number]>;
  columnGap?: Responsive<(typeof spaceTokens)[number]>;
}

export { gapPropDefs };
export type { GapProps };
