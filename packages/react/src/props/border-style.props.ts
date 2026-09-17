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
  /**
   * Sets the responsive `border-style` CSS property on all sides of the element.
   */
  borderStyle?: Responsive<(typeof values)[number]>;
  /**
   * Sets the responsive `border-top-style` CSS property.
   */
  borderTopStyle?: Responsive<(typeof values)[number]>;
  /**
   * Sets the responsive `border-right-style` CSS property.
   */
  borderRightStyle?: Responsive<(typeof values)[number]>;
  /**
   * Sets the responsive `border-bottom-style` CSS property.
   */
  borderBottomStyle?: Responsive<(typeof values)[number]>;
  /**
   * Sets the responsive `border-left-style` CSS property.
   */
  borderLeftStyle?: Responsive<(typeof values)[number]>;
}
