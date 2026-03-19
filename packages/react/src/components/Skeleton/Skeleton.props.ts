import type { ComponentPropsWithRef } from 'react';
import type { BoxProps } from '../Box/Box.props';
import type { AlignSelfProps } from '../../props/align-self.props';
import type { BorderRadiusProps } from '../../props/border-radius.props';
import type { FlexItemProps } from '../../props/flex-item.props';
import type { GridItemProps } from '../../props/grid-item.props';
import type { MarginProps } from '../../props/margin.props';
import type { OrderProps } from '../../props/order.props';
import type { PositionProps } from '../../props/position.props';
import type { SizeProps } from '../../props/size.props';
import type { ZIndexProps } from '../../props/z-index.props';

export interface SkeletonProps
  extends
    Omit<ComponentPropsWithRef<'div'>, 'color'>,
    Pick<BoxProps, 'display'>,
    AlignSelfProps,
    BorderRadiusProps,
    FlexItemProps,
    GridItemProps,
    MarginProps,
    OrderProps,
    PositionProps,
    SizeProps,
    ZIndexProps {
  /*
   * The `loadingTitle` prop is used to provide an accessible
   * announcement for screen readers when the skeleton is loading.
   * This should be a string that describes the content that is being loaded,
   * such as "user profile" or "product details".
   * This string will automatically be prefixed with "Loading" when announced,
   * so users will hear something like "Loading user profile".
   * This helps users who rely on assistive technologies understand
   * what is happening on the page while the skeleton is displayed.
   */
  loadingTitle: string;
}
