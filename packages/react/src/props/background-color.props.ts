import { CssTokenVariable } from '../types/css-token-variable';
import { PropDef } from './prop-def';

const values = ['primary', 'secondary', 'brand'] as const;

export const backgroundColorPropDefs = {
  backgroundColor: { className: 'bg', tokens: values, responsive: false },
} satisfies {
  backgroundColor: PropDef<(typeof values)[number] | CssTokenVariable>;
};

export interface BackgroundColorProps {
  backgroundColor?: (typeof values)[number] | CssTokenVariable;
}
