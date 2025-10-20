import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
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
  margin: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginTop: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginRight: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginBottom: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginLeft: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginInline: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginBlock: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
};

interface MarginProps {
  margin?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginTop?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginRight?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginBottom?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginLeft?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginInline?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginBlock?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
}

export { marginPropDefs };
export type { MarginProps };
