import { PropDef } from './prop-def';
import { Responsive } from '../types/responsive';
import { CssTokenVariable } from '../types/css-token-variable';

const values = ['0', '1', '2'] as const;

export const borderWidthPropDefs = {
  borderWidth: { className: 'bw', tokens: values, responsive: true },
  borderTopWidth: { className: 'bw-t', tokens: values, responsive: true },
  borderRightWidth: { className: 'bw-r', tokens: values, responsive: true },
  borderBottomWidth: { className: 'bw-b', tokens: values, responsive: true },
  borderLeftWidth: { className: 'bw-l', tokens: values, responsive: true },
} satisfies {
  borderWidth: PropDef<(typeof values)[number] | CssTokenVariable>;
  borderTopWidth: PropDef<(typeof values)[number] | CssTokenVariable>;
  borderRightWidth: PropDef<(typeof values)[number] | CssTokenVariable>;
  borderBottomWidth: PropDef<(typeof values)[number] | CssTokenVariable>;
  borderLeftWidth: PropDef<(typeof values)[number] | CssTokenVariable>;
};

export interface BorderWidthProps {
  borderWidth?: Responsive<(typeof values)[number] | CssTokenVariable>;
  borderTopWidth?: Responsive<(typeof values)[number] | CssTokenVariable>;
  borderRightWidth?: Responsive<(typeof values)[number] | CssTokenVariable>;
  borderBottomWidth?: Responsive<(typeof values)[number] | CssTokenVariable>;
  borderLeftWidth?: Responsive<(typeof values)[number] | CssTokenVariable>;
}
