import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['visible', 'hidden', 'clip', 'scroll', 'auto'] as const;

export const overflowPropDefs = {
  overflow: { className: 'o', tokens: values, responsive: true },
  overflowX: { className: 'ox', tokens: values, responsive: true },
  overflowY: { className: 'oy', tokens: values, responsive: true },
} satisfies {
  overflow: PropDef<(typeof values)[number]>;
  overflowX: PropDef<(typeof values)[number]>;
  overflowY: PropDef<(typeof values)[number]>;
};

export interface OverflowProps {
  /**
   * Set how content that overflows the component's box is handled, on both axes.
   * @default 'visible'
   */
  overflow?: Responsive<(typeof values)[number]>;
  /**
   * Set how content that overflows the component's box is handled on the horizontal axis.
   * @default 'visible'
   */
  overflowX?: Responsive<(typeof values)[number]>;
  /**
   * Set how content that overflows the component's box is handled on the vertical axis.
   * @default 'visible'
   */
  overflowY?: Responsive<(typeof values)[number]>;
}
