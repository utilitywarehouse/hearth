import { spaceTokens } from '../tokens/space';
import { Responsive } from '../types/responsive';
import { PropDef, Union } from './prop-def';

const paddingPropDefs = {
  padding: { className: 'padding', tokens: spaceTokens, responsive: true },
  paddingTop: { className: 'padding-top', tokens: spaceTokens, responsive: true },
  paddingRight: { className: 'padding-right', tokens: spaceTokens, responsive: true },
  paddingBottom: { className: 'padding-bottom', tokens: spaceTokens, responsive: true },
  paddingLeft: { className: 'padding-left', tokens: spaceTokens, responsive: true },
  paddingInline: { className: 'padding-inline', tokens: spaceTokens, responsive: true },
  paddingBlock: { className: 'padding-block', tokens: spaceTokens, responsive: true },
} satisfies {
  padding: PropDef<(typeof spaceTokens)[number]>;
  paddingTop: PropDef<(typeof spaceTokens)[number]>;
  paddingRight: PropDef<(typeof spaceTokens)[number]>;
  paddingBottom: PropDef<Union<string, (typeof spaceTokens)[number]>>;
  paddingLeft: PropDef<(typeof spaceTokens)[number]>;
  paddingInline: PropDef<(typeof spaceTokens)[number]>;
  paddingBlock: PropDef<(typeof spaceTokens)[number]>;
};

interface PaddingProps {
  padding?: Responsive<(typeof spaceTokens)[number]>;
  paddingTop?: Responsive<(typeof spaceTokens)[number]>;
  paddingRight?: Responsive<(typeof spaceTokens)[number]>;
  paddingBottom?: Responsive<Union<string, (typeof spaceTokens)[number]>>;
  paddingLeft?: Responsive<(typeof spaceTokens)[number]>;
  paddingInline?: Responsive<(typeof spaceTokens)[number]>;
  paddingBlock?: Responsive<(typeof spaceTokens)[number]>;
}

export { paddingPropDefs };
export type { PaddingProps };
