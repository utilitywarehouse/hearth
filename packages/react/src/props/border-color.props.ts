import { CssTokenVariable } from '../types/css-token-variable';
import { PropDef } from './prop-def';

const values = ['strong', 'subtle'] as const;

export const borderColorPropDefs = {
  borderColor: { className: 'border', tokens: values, responsive: false },
  borderTopColor: { className: 'border-t', tokens: values, responsive: false },
  borderRightColor: { className: 'border-r', tokens: values, responsive: false },
  borderBottomColor: { className: 'border-b', tokens: values, responsive: false },
  borderLeftColor: { className: 'border-l', tokens: values, responsive: false },
} satisfies {
  borderColor: PropDef<(typeof values)[number] | CssTokenVariable>;
  borderTopColor: PropDef<(typeof values)[number] | CssTokenVariable>;
  borderRightColor: PropDef<(typeof values)[number] | CssTokenVariable>;
  borderBottomColor: PropDef<(typeof values)[number] | CssTokenVariable>;
  borderLeftColor: PropDef<(typeof values)[number] | CssTokenVariable>;
};

export interface BorderColorProps {
  borderColor?: (typeof values)[number] | CssTokenVariable;
  borderTopColor?: (typeof values)[number] | CssTokenVariable;
  borderRightColor?: (typeof values)[number] | CssTokenVariable;
  borderBottomColor?: (typeof values)[number] | CssTokenVariable;
  borderLeftColor?: (typeof values)[number] | CssTokenVariable;
}
