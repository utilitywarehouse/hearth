import { spaceTokens } from '../tokens/space';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const marginPropDefs = {
  margin: { className: 'margin', tokens: spaceTokens, responsive: true },
  marginTop: { className: 'margin-top', tokens: spaceTokens, responsive: true },
  marginRight: { className: 'margin-right', tokens: spaceTokens, responsive: true },
  marginBottom: { className: 'margin-bottom', tokens: spaceTokens, responsive: true },
  marginLeft: { className: 'margin-left', tokens: spaceTokens, responsive: true },
  marginInline: { className: 'margin-inline', tokens: spaceTokens, responsive: true },
  marginBlock: { className: 'margin-block', tokens: spaceTokens, responsive: true },
} satisfies {
  margin: PropDef<(typeof spaceTokens)[number]>;
  marginTop: PropDef<(typeof spaceTokens)[number]>;
  marginRight: PropDef<(typeof spaceTokens)[number]>;
  marginBottom: PropDef<(typeof spaceTokens)[number]>;
  marginLeft: PropDef<(typeof spaceTokens)[number]>;
  marginInline: PropDef<(typeof spaceTokens)[number]>;
  marginBlock: PropDef<(typeof spaceTokens)[number]>;
};

interface MarginProps {
  margin?: Responsive<(typeof spaceTokens)[number]>;
  marginTop?: Responsive<(typeof spaceTokens)[number]>;
  marginRight?: Responsive<(typeof spaceTokens)[number]>;
  marginBottom?: Responsive<(typeof spaceTokens)[number]>;
  marginLeft?: Responsive<(typeof spaceTokens)[number]>;
  marginInline?: Responsive<(typeof spaceTokens)[number]>;
  marginBlock?: Responsive<(typeof spaceTokens)[number]>;
}

export { marginPropDefs };
export type { MarginProps };
