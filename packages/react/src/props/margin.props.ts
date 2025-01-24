import { spaceTokens } from '../tokens/space';
import { Responsive, Union } from '../types/responsive';
import { PropDef } from './prop-def';

const marginTokens = spaceTokens;

const marginPropDefs = {
  margin: { className: 'margin', tokens: marginTokens, responsive: true },
  marginTop: { className: 'margin-top', tokens: marginTokens, responsive: true },
  marginRight: { className: 'margin-right', tokens: marginTokens, responsive: true },
  marginBottom: { className: 'margin-bottom', tokens: marginTokens, responsive: true },
  marginLeft: { className: 'margin-left', tokens: marginTokens, responsive: true },
  marginInline: { className: 'margin-inline', tokens: marginTokens, responsive: true },
  marginBlock: { className: 'margin-block', tokens: marginTokens, responsive: true },
} satisfies {
  margin: PropDef<(typeof marginTokens)[number]>;
  marginTop: PropDef<(typeof marginTokens)[number]>;
  marginRight: PropDef<(typeof marginTokens)[number]>;
  marginBottom: PropDef<(typeof marginTokens)[number]>;
  marginLeft: PropDef<(typeof marginTokens)[number]>;
  marginInline: PropDef<(typeof marginTokens)[number]>;
  marginBlock: PropDef<(typeof marginTokens)[number]>;
};

interface MarginProps {
  margin?: Responsive<Union<string, (typeof marginTokens)[number]>>;
  marginTop?: Responsive<Union<string, (typeof marginTokens)[number]>>;
  marginRight?: Responsive<Union<string, (typeof marginTokens)[number]>>;
  marginBottom?: Responsive<Union<string, (typeof marginTokens)[number]>>;
  marginLeft?: Responsive<Union<string, (typeof marginTokens)[number]>>;
  marginInline?: Responsive<Union<string, (typeof marginTokens)[number]>>;
  marginBlock?: Responsive<Union<string, (typeof marginTokens)[number]>>;
}

export { marginPropDefs, marginTokens };
export type { MarginProps };
