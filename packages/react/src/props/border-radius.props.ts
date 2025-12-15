import { PropDef } from './prop-def';
import { Responsive } from '../types/responsive';

const borderRadiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full', 'inherit'] as const;

const borderRadiusPropDefs = {
  borderRadius: { className: 'border-radius', tokens: borderRadiusValues, responsive: true },
  borderRadiusTopLeftNone: { className: 'br-tl-none', responsive: false },
  borderRadiusTopRightNone: { className: 'br-tr-none', responsive: false },
  borderRadiusBottomLeftNone: { className: 'br-bl-none', responsive: false },
  borderRadiusBottomRightNone: { className: 'br-br-none', responsive: false },
  borderRadiusTopNone: { className: 'br-t-none', responsive: false },
  borderRadiusRightNone: { className: 'br-r-none', responsive: false },
  borderRadiusBottomNone: { className: 'br-b-none', responsive: false },
  borderRadiusLeftNone: { className: 'br-l-none', responsive: false },
} satisfies {
  borderRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderRadiusTopLeftNone: PropDef<boolean>;
  borderRadiusTopRightNone: PropDef<boolean>;
  borderRadiusBottomLeftNone: PropDef<boolean>;
  borderRadiusBottomRightNone: PropDef<boolean>;
  borderRadiusTopNone: PropDef<boolean>;
  borderRadiusRightNone: PropDef<boolean>;
  borderRadiusBottomNone: PropDef<boolean>;
  borderRadiusLeftNone: PropDef<boolean>;
};

interface BorderRadiusProps {
  /* Set the border radius. */
  borderRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-top-left-radius to none. */
  borderRadiusTopLeftNone?: boolean;
  /* Set the border-top-right-radius to none. */
  borderRadiusTopRightNone?: boolean;
  /* Set the border-bottom-left-radius to none. */
  borderRadiusBottomLeftNone?: boolean;
  /* Set the border-bottom-right-radius to none. */
  borderRadiusBottomRightNone?: boolean;
  /* Set thed top border-radius to none. */
  borderRadiusTopNone?: boolean;
  /* Set thed right border-radius to none. */
  borderRadiusRightNone?: boolean;
  /* Set thed bottom border-radius to none. */
  borderRadiusBottomNone?: boolean;
  /* Set thed left border-radius to none. */
  borderRadiusLeftNone?: boolean;
}

export { borderRadiusPropDefs };
export type { BorderRadiusProps };
