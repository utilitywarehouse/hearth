import { spaceTokens } from '../tokens/space';
import { CssTokenVariable } from '../types/css-token-variable';
import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['auto', ...spaceTokens] as const;

export const marginPropDefs = {
  margin: { className: 'm', tokens: values, responsive: true },
  marginTop: { className: 'mt', tokens: values, responsive: true },
  marginRight: { className: 'mr', tokens: values, responsive: true },
  marginBottom: { className: 'mb', tokens: values, responsive: true },
  marginLeft: { className: 'ml', tokens: values, responsive: true },
  marginX: { className: 'mx', tokens: values, responsive: true },
  marginY: { className: 'my', tokens: values, responsive: true },
} satisfies {
  margin: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginTop: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginRight: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginBottom: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginLeft: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginX: PropDef<(typeof values)[number] | CssTokenVariable>;
  marginY: PropDef<(typeof values)[number] | CssTokenVariable>;
};

export interface MarginProps {
  margin?: Responsive<(typeof values)[number] | CssTokenVariable>;
  marginTop?: Responsive<(typeof values)[number] | CssTokenVariable>;
  marginRight?: Responsive<(typeof values)[number] | CssTokenVariable>;
  marginBottom?: Responsive<(typeof values)[number] | CssTokenVariable>;
  marginLeft?: Responsive<(typeof values)[number] | CssTokenVariable>;
  marginX?: Responsive<(typeof values)[number] | CssTokenVariable>;
  marginY?: Responsive<(typeof values)[number] | CssTokenVariable>;
}
