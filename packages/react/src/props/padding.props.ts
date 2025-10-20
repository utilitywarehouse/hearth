import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const paddingPropDefs = {
  padding: { className: 'padding', tokens: spaceTokens, responsive: true },
  paddingTop: { className: 'padding-top', tokens: spaceTokens, responsive: true },
  paddingRight: { className: 'padding-right', tokens: spaceTokens, responsive: true },
  paddingBottom: { className: 'padding-bottom', tokens: spaceTokens, responsive: true },
  paddingLeft: { className: 'padding-left', tokens: spaceTokens, responsive: true },
  paddingInline: { className: 'padding-inline', tokens: spaceTokens, responsive: true },
  paddingBlock: { className: 'padding-block', tokens: spaceTokens, responsive: true },
} satisfies {
  padding: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingTop: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingRight: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingBottom: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingLeft: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingInline: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingBlock: PropDef<(typeof spaceTokens)[number] | CssTokenVariable>;
};

interface PaddingProps {
  padding?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingTop?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingRight?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingBottom?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingLeft?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingInline?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
  paddingBlock?: Responsive<(typeof spaceTokens)[number] | CssTokenVariable>;
}

export { paddingPropDefs };
export type { PaddingProps };
