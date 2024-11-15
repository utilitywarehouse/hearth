import type { PaddingProps } from '../../props/padding.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import type { Responsive } from '../../types/responsive';

interface CommonFlexProps extends PaddingProps {
  as: 'div' | 'span';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  display?: Responsive<'none' | 'flex' | 'inline-flex'>;
  direction?: Responsive<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  gap?: Responsive<string>;
}
type FlexDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type FlexSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type FlexProps = CommonFlexProps & (FlexSpanProps | FlexDivProps);
