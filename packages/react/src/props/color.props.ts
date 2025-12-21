import { PropDef } from './prop-def';
import { CssTokenVariable } from '../types/css-token-variable';

const values = ['primary', 'secondary', 'brand', 'affirmative', 'inverted'] as const;

export const colorPropDefs = {
  color: { className: 'text', tokens: values, responsive: false },
} satisfies {
  color: PropDef<(typeof values)[number] | CssTokenVariable>;
};

export interface ColorProps {
  color?: (typeof values)[number] | CssTokenVariable;
}
