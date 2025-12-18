import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const marginValues = ['auto', ...spaceTokens] as const;

const marginPropDefs = {
  margin: { className: 'm', tokens: marginValues, responsive: true },
  marginTop: { className: 'mt', tokens: marginValues, responsive: true },
  marginRight: { className: 'mr', tokens: marginValues, responsive: true },
  marginBottom: { className: 'mb', tokens: marginValues, responsive: true },
  marginLeft: { className: 'ml', tokens: marginValues, responsive: true },
  marginX: { className: 'mx', tokens: marginValues, responsive: true },
  marginY: { className: 'my', tokens: marginValues, responsive: true },
} satisfies {
  margin: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginTop: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginRight: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginBottom: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginLeft: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginX: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
  marginY: PropDef<(typeof marginValues)[number] | CssTokenVariable>;
};

interface MarginProps {
  margin?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginTop?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginRight?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginBottom?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginLeft?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginX?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
  marginY?: Responsive<(typeof marginValues)[number] | CssTokenVariable>;
}

export { marginPropDefs };
export type { MarginProps };
