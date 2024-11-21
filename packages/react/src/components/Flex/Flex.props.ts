import { ColorProps } from '../../props/color.props';
import type { PaddingProps } from '../../props/padding.props';
import type { SizeProps } from '../../props/size.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import type { Responsive } from '../../types/responsive';

interface CommonFlexProps extends ColorProps, PaddingProps, SizeProps {
  as?: 'div' | 'span';
  /** Change the default rendered element for the one passed as a child, merging their props and behavior. */
  asChild?: boolean;
  display?: Responsive<'none' | 'flex' | 'inline-flex'>;
  direction?: Responsive<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  gap?: Responsive<string>;
  align?: Responsive<'start' | 'center' | 'end' | 'baseline' | 'stretch'>;
  justify?: Responsive<'start' | 'center' | 'end' | 'baseline' | 'stretch'>;
}
type FlexDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type FlexSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type FlexProps = CommonFlexProps & (FlexSpanProps | FlexDivProps);
