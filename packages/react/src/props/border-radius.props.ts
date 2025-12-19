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
  borderRadius?: Responsive<(typeof values)[number]>;
  borderRadiusTopLeftNone?: boolean;
  borderRadiusTopRightNone?: boolean;
  borderRadiusBottomLeftNone?: boolean;
  borderRadiusBottomRightNone?: boolean;
  borderRadiusTopNone?: boolean;
  borderRadiusRightNone?: boolean;
  borderRadiusBottomNone?: boolean;
  borderRadiusLeftNone?: boolean;
}
