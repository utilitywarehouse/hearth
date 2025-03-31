import { spaceTokens } from '../tokens/space';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const marginValues = ['auto', ...spaceTokens] as const;

const marginPropDefs = {
  margin: { className: 'margin', tokens: marginValues, responsive: true },
  marginTop: { className: 'margin-top', tokens: marginValues, responsive: true },
  marginRight: { className: 'margin-right', tokens: marginValues, responsive: true },
  marginBottom: { className: 'margin-bottom', tokens: marginValues, responsive: true },
  marginLeft: { className: 'margin-left', tokens: marginValues, responsive: true },
  marginInline: { className: 'margin-inline', tokens: marginValues, responsive: true },
  marginBlock: { className: 'margin-block', tokens: marginValues, responsive: true },
} satisfies {
  margin: PropDef<(typeof marginValues)[number]>;
  marginTop: PropDef<(typeof marginValues)[number]>;
  marginRight: PropDef<(typeof marginValues)[number]>;
  marginBottom: PropDef<(typeof marginValues)[number]>;
  marginLeft: PropDef<(typeof marginValues)[number]>;
  marginInline: PropDef<(typeof marginValues)[number]>;
  marginBlock: PropDef<(typeof marginValues)[number]>;
};

interface MarginProps {
  margin?: Responsive<(typeof marginValues)[number]>;
  marginTop?: Responsive<(typeof marginValues)[number]>;
  marginRight?: Responsive<(typeof marginValues)[number]>;
  marginBottom?: Responsive<(typeof marginValues)[number]>;
  marginLeft?: Responsive<(typeof marginValues)[number]>;
  marginInline?: Responsive<(typeof marginValues)[number]>;
  marginBlock?: Responsive<(typeof marginValues)[number]>;
}

export { marginPropDefs };
export type { MarginProps };
