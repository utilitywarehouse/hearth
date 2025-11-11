import { PropDef } from './prop-def';
import { Responsive } from '../types/responsive';

const borderRadiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full', 'inherit'] as const;

const borderRadiusPropDefs = {
  borderRadius: { className: 'border-radius', tokens: borderRadiusValues, responsive: true },
  borderTopLeftRadius: {
    className: 'border-top-left-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderTopRightRadius: {
    className: 'border-top-right-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderBottomRightRadius: {
    className: 'border-bottom-right-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
  borderBottomLeftRadius: {
    className: 'border-bottom-left-radius',
    tokens: borderRadiusValues,
    responsive: true,
  },
} satisfies {
  borderRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderTopLeftRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderTopRightRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderBottomRightRadius: PropDef<(typeof borderRadiusValues)[number]>;
  borderBottomLeftRadius: PropDef<(typeof borderRadiusValues)[number]>;
};

interface BorderRadiusProps {
  /* Set the border radius. */
  borderRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-top-left radius. */
  borderTopLeftRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-top-right radius. */
  borderTopRightRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-bottom-right radius. */
  borderBottomRightRadius?: Responsive<(typeof borderRadiusValues)[number]>;
  /* Set the border-bottom-left radius. */
  borderBottomLeftRadius?: Responsive<(typeof borderRadiusValues)[number]>;
}

export { borderRadiusPropDefs };
export type { BorderRadiusProps };
