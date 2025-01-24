import { spaceTokens } from '../tokens/space';
import { Responsive, Union } from '../types/responsive';
import { PropDef } from './prop-def';

const paddingTokens = spaceTokens;

const paddingPropDefs = {
  padding: { className: 'padding', tokens: paddingTokens, responsive: true },
  paddingTop: { className: 'padding-top', tokens: paddingTokens, responsive: true },
  paddingRight: { className: 'padding-right', tokens: paddingTokens, responsive: true },
  paddingBottom: { className: 'padding-bottom', tokens: paddingTokens, responsive: true },
  paddingLeft: { className: 'padding-left', tokens: paddingTokens, responsive: true },
  paddingInline: { className: 'padding-inline', tokens: paddingTokens, responsive: true },
  paddingBlock: { className: 'padding-block', tokens: paddingTokens, responsive: true },
} satisfies {
  padding: PropDef<(typeof paddingTokens)[number]>;
  paddingTop: PropDef<(typeof paddingTokens)[number]>;
  paddingRight: PropDef<(typeof paddingTokens)[number]>;
  paddingBottom: PropDef<(typeof paddingTokens)[number]>;
  paddingLeft: PropDef<(typeof paddingTokens)[number]>;
  paddingInline: PropDef<(typeof paddingTokens)[number]>;
  paddingBlock: PropDef<(typeof paddingTokens)[number]>;
};

interface PaddingProps {
  padding?: Responsive<Union<string, (typeof paddingTokens)[number]>>;
  paddingTop?: Responsive<Union<string, (typeof paddingTokens)[number]>>;
  paddingRight?: Responsive<Union<string, (typeof paddingTokens)[number]>>;
  paddingBottom?: Responsive<Union<string, (typeof paddingTokens)[number]>>;
  paddingLeft?: Responsive<Union<string, (typeof paddingTokens)[number]>>;
  paddingInline?: Responsive<Union<string, (typeof paddingTokens)[number]>>;
  paddingBlock?: Responsive<Union<string, (typeof paddingTokens)[number]>>;
}

export { paddingPropDefs, paddingTokens };
export type { PaddingProps };
