import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const sizePropDefs = {
  width: { className: 'width', responsive: true },
  maxWidth: { className: 'max-width', responsive: true },
  minWidth: { className: 'min-width', responsive: true },
  height: { className: 'height', responsive: true },
  maxHeight: { className: 'max-height', responsive: true },
  minHeight: { className: 'min-height', responsive: true },
} satisfies {
  width: PropDef<string>;
  maxWidth: PropDef<string>;
  minWidth: PropDef<string>;
  height: PropDef<string>;
  maxHeight: PropDef<string>;
  minHeight: PropDef<string>;
};

export interface SizeProps {
  /**
   * Set the width of the component.
   */
  width?: Responsive<string>;
  /**
   * Set the maximum width the component can grow to.
   */
  maxWidth?: Responsive<string>;
  /**
   * Set the minimum width the component can shrink to.
   */
  minWidth?: Responsive<string>;
  /**
   * Set the height of the component.
   */
  height?: Responsive<string>;
  /**
   * Set the maximum height the component can grow to.
   */
  maxHeight?: Responsive<string>;
  /**
   * Set the minimum height the component can shrink to.
   */
  minHeight?: Responsive<string>;
}
