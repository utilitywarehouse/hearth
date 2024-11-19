import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { Responsive } from '../../types/responsive';

interface PaddingProps {
  padding?: Responsive<string>;
  paddingTop?: Responsive<string>;
  paddingRight?: Responsive<string>;
  paddingBottom?: Responsive<string>;
  paddingLeft?: Responsive<string>;
  paddingInline?: Responsive<string>;
  paddingBlock?: Responsive<string>;
}

// Omits the specified props from the component props. Autocomplete will suggest props
// of the component, but won't restrict the omittable props to those that actually exist.
type ComponentPropsWithout<
  T extends ElementType,
  O extends Omit<string, keyof ComponentPropsWithoutRef<T>> | keyof ComponentPropsWithoutRef<T>,
> = Omit<ComponentPropsWithoutRef<T>, O & string>;

type RemovedProps = 'asChild' | 'defaultChecked' | 'defaultValue' | 'color';

interface CommonBoxProps extends PaddingProps {
  as: 'div' | 'span';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
}
type BoxDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type BoxSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type BoxProps = CommonBoxProps & (BoxSpanProps | BoxDivProps);
