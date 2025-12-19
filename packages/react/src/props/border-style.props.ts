import { PropDef } from './prop-def';
import { Responsive } from '../types/responsive';

const values = ['none', 'solid'] as const;

export const borderStylePropDefs = {
  borderStyle: { className: 'bs', tokens: values, responsive: true },
  borderTopStyle: { className: 'bs-t', tokens: values, responsive: true },
  borderRightStyle: { className: 'bs-r', tokens: values, responsive: true },
  borderBottomStyle: { className: 'bs-b', tokens: values, responsive: true },
  borderLeftStyle: { className: 'bs-l', tokens: values, responsive: true },
} satisfies {
  borderStyle: PropDef<(typeof values)[number]>;
  borderTopStyle: PropDef<(typeof values)[number]>;
  borderRightStyle: PropDef<(typeof values)[number]>;
  borderBottomStyle: PropDef<(typeof values)[number]>;
  borderLeftStyle: PropDef<(typeof values)[number]>;
};

export interface BorderStyleProps {
  borderStyle?: Responsive<(typeof values)[number]>;
  borderTopStyle?: Responsive<(typeof values)[number]>;
  borderRightStyle?: Responsive<(typeof values)[number]>;
  borderBottomStyle?: Responsive<(typeof values)[number]>;
  borderLeftStyle?: Responsive<(typeof values)[number]>;
}
