import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const paddingPropDefs = {
  padding: { className: 'p', tokens: spaceTokens, responsive: true },
  paddingTop: { className: 'pt', tokens: spaceTokens, responsive: true },
  paddingRight: { className: 'pr', tokens: spaceTokens, responsive: true },
  paddingBottom: { className: 'pb', tokens: spaceTokens, responsive: true },
  paddingLeft: { className: 'pl', tokens: spaceTokens, responsive: true },
  paddingX: { className: 'px', tokens: spaceTokens, responsive: true },
  paddingY: { className: 'py', tokens: spaceTokens, responsive: true },
} satisfies {
  padding: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingTop: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingRight: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingBottom: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingLeft: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingX: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingY: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
};

interface PaddingProps {
  padding?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingTop?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingRight?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingBottom?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingLeft?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingX?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingY?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
}

export { paddingPropDefs };
export type { PaddingProps };
