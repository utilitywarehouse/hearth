import { PropDef } from './prop-def';
import { Responsive } from '../types/responsive';

const values = ['0', '1', '2'] as const;

export const borderWidthPropDefs = {
  borderWidth: { className: 'bw', tokens: values, responsive: true },
  borderTopWidth: { className: 'bw-t', tokens: values, responsive: true },
  borderRightWidth: { className: 'bw-r', tokens: values, responsive: true },
  borderBottomWidth: { className: 'bw-b', tokens: values, responsive: true },
  borderLeftWidth: { className: 'bw-l', tokens: values, responsive: true },
} satisfies {
  borderWidth: PropDef<(typeof values)[number]>;
  borderTopWidth: PropDef<(typeof values)[number]>;
  borderRightWidth: PropDef<(typeof values)[number]>;
  borderBottomWidth: PropDef<(typeof values)[number]>;
  borderLeftWidth: PropDef<(typeof values)[number]>;
};

export interface BorderWidthProps {
  borderWidth?: Responsive<(typeof values)[number]>;
  borderTopWidth?: Responsive<(typeof values)[number]>;
  borderRightWidth?: Responsive<(typeof values)[number]>;
  borderBottomWidth?: Responsive<(typeof values)[number]>;
  borderLeftWidth?: Responsive<(typeof values)[number]>;
}
