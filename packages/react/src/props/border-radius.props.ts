import { PropDef } from './prop-def';
import { Responsive } from '../types/responsive';

const values = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full', 'inherit'] as const;

export const borderRadiusPropDefs = {
  borderRadius: { className: 'radius', tokens: values, responsive: true },
  borderRadiusTopLeftNone: { className: 'radius-tl-none', responsive: false },
  borderRadiusTopRightNone: { className: 'radius-tr-none', responsive: false },
  borderRadiusBottomLeftNone: { className: 'radius-bl-none', responsive: false },
  borderRadiusBottomRightNone: { className: 'radius-br-none', responsive: false },
  borderRadiusTopNone: { className: 'radius-t-none', responsive: false },
  borderRadiusRightNone: { className: 'radius-r-none', responsive: false },
  borderRadiusBottomNone: { className: 'radius-b-none', responsive: false },
  borderRadiusLeftNone: { className: 'radius-l-none', responsive: false },
} satisfies {
  borderRadius: PropDef<(typeof values)[number]>;
  borderRadiusTopLeftNone: PropDef<boolean>;
  borderRadiusTopRightNone: PropDef<boolean>;
  borderRadiusBottomLeftNone: PropDef<boolean>;
  borderRadiusBottomRightNone: PropDef<boolean>;
  borderRadiusTopNone: PropDef<boolean>;
  borderRadiusRightNone: PropDef<boolean>;
  borderRadiusBottomNone: PropDef<boolean>;
  borderRadiusLeftNone: PropDef<boolean>;
};

export interface BorderRadiusProps {
  /**
   * Sets the responsive `border-radius` CSS property on all corners of the element.
   */
  borderRadius?: Responsive<(typeof values)[number]>;
  /**
   * Removes the border radius from the top-left corner.
   */
  borderRadiusTopLeftNone?: boolean;
  /**
   * Removes the border radius from the top-right corner.
   */
  borderRadiusTopRightNone?: boolean;
  /**
   * Removes the border radius from the bottom-left corner.
   */
  borderRadiusBottomLeftNone?: boolean;
  /**
   * Removes the border radius from the bottom-right corner.
   */
  borderRadiusBottomRightNone?: boolean;
  /**
   * Removes the border radius from the top-left and top-right corners.
   */
  borderRadiusTopNone?: boolean;
  /**
   * Removes the border radius from the top-right and bottom-right corners.
   */
  borderRadiusRightNone?: boolean;
  /**
   * Removes the border radius from the bottom-left and bottom-right corners.
   */
  borderRadiusBottomNone?: boolean;
  /**
   * Removes the border radius from the top-left and bottom-left corners.
   */
  borderRadiusLeftNone?: boolean;
}
