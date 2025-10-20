import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const gapPropDefs = {
  gap: { className: 'gap', tokens: spaceTokens, responsive: true },
  rowGap: { className: 'row-gap', tokens: spaceTokens, responsive: true },
  columnGap: { className: 'column-gap', tokens: spaceTokens, responsive: true },
} satisfies {
  gap: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  rowGap: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  columnGap: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
};

interface GapProps {
  gap?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  rowGap?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  columnGap?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
}

export { gapPropDefs };
export type { GapProps };
