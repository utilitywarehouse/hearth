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

export interface SkeletonBoxProps
  extends
    Omit<ComponentPropsWithRef<'div'>, 'children' | 'color'>,
    Pick<BoxProps, 'display'>,
    AlignSelfProps,
    BorderRadiusProps,
    FlexItemProps,
    GridItemProps,
    MarginProps,
    OrderProps,
    PositionProps,
    SizeProps,
    ZIndexProps {}
