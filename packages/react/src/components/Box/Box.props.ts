import type { Responsive } from '../../types/responsive';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

interface PaddingProps {
  padding?: Responsive<string>;
  paddingTop?: Responsive<string>;
  paddingRight?: Responsive<string>;
  paddingBottom?: Responsive<string>;
  paddingLeft?: Responsive<string>;
  paddingInline?: Responsive<string>;
  paddingBlock?: Responsive<string>;
}

interface ColorProps {
  color?: string;
  backgroundColor?: string;
}

interface CommonBoxProps extends ColorProps, PaddingProps {
  as?: 'div' | 'span';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
}
type BoxDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type BoxSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);
