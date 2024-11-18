import * as React from 'react';
import clsx from 'clsx';

import type { FlexProps } from './Flex.props';

import type { ElementRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { withBreakpointStyles } from '../../helpers/with-breakpoint-styles';
import { withBreakpoints } from '../../helpers/with-breakpoints';

const componentName = 'Flex';
const componentClassName = 'uwp-' + componentName;

type FlexElement = ElementRef<'div'>;

export const Flex = React.forwardRef<FlexElement, FlexProps>(
  (
    {
      className,
      asChild,
      as: Tag = 'div',
      display,
      padding,
      paddingTop,
      paddingLeft,
      paddingBlock,
      paddingRight,
      paddingBottom,
      paddingInline,
      gap,
      direction,
      align,
      style = undefined,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : Tag;

    const displayClassName = withBreakpoints(display, 'display');
    const directionClassName = withBreakpoints(direction, 'flex-direction');
    const alignClassName = withBreakpoints(align, 'align-items');

    const paddingProps = withBreakpointStyles(padding, 'padding');
    const paddingTopProps = withBreakpointStyles(paddingTop, 'padding-top');
    const paddingRightProps = withBreakpointStyles(paddingRight, 'padding-right');
    const paddingBottomProps = withBreakpointStyles(paddingBottom, 'padding-bottom');
    const paddingLeftProps = withBreakpointStyles(paddingLeft, 'padding-left');
    const paddingInlineProps = withBreakpointStyles(paddingInline, 'padding-inline');
    const paddingBlockProps = withBreakpointStyles(paddingBlock, 'padding-block');

    const gapProps = withBreakpointStyles(gap, 'gap');
    console.log({ gapProps });

    const styleProps = {
      ...paddingProps?.style,
      ...paddingTopProps?.style,
      ...paddingRightProps?.style,
      ...paddingBottomProps?.style,
      ...paddingLeftProps?.style,
      ...paddingInlineProps?.style,
      ...paddingBlockProps?.style,
      ...gapProps?.style,
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={clsx(
          componentClassName,
          displayClassName,
          directionClassName,
          alignClassName,
          paddingProps?.className,
          paddingInlineProps?.className,
          paddingBlockProps?.className,
          paddingTopProps?.className,
          paddingRightProps?.className,
          paddingBottomProps?.className,
          paddingLeftProps?.className,
          gapProps?.className,
          className
        )}
        {...props}
        style={styleProps}
      />
    );
  }
);

Flex.displayName = componentName;
