import * as React from 'react';
import clsx from 'clsx';

import type { BoxProps } from './Box.props';

import './Box.css';
import { withBreakpoints } from '../../helpers/with-breakpoints';
import type { ElementRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

const componentName = 'Box';
const componentClassName = 'uwp-' + componentName;

type BoxElement = ElementRef<'div'>;

export const Box = React.forwardRef<BoxElement, BoxProps>(
  (
    {
      className,
      asChild,
      as: Tag = 'div',
      padding,
      paddingTop,
      paddingLeft,
      paddingBlock,
      paddingRight,
      paddingBottom,
      paddingInline,
      style = undefined,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : Tag;
    const paddingProps = withBreakpoints(padding, 'padding');
    const paddingTopProps = withBreakpoints(paddingTop, 'padding-top');
    const paddingRightProps = withBreakpoints(paddingRight, 'padding-right');
    const paddingBottomProps = withBreakpoints(paddingBottom, 'padding-bottom');
    const paddingLeftProps = withBreakpoints(paddingLeft, 'padding-left');
    const paddingInlineProps = withBreakpoints(paddingInline, 'padding-inline');
    const paddingBlockProps = withBreakpoints(paddingBlock, 'padding-block');
    const styleProps = {
      ...paddingProps?.style,
      ...paddingTopProps?.style,
      ...paddingRightProps?.style,
      ...paddingBottomProps?.style,
      ...paddingLeftProps?.style,
      ...paddingInlineProps?.style,
      ...paddingBlockProps?.style,
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={clsx(
          componentClassName,
          paddingProps?.className,
          paddingInlineProps?.className,
          paddingBlockProps?.className,
          paddingTopProps?.className,
          paddingRightProps?.className,
          paddingBottomProps?.className,
          paddingLeftProps?.className,
          className
        )}
        {...props}
        style={styleProps}
      />
    );
  }
);

Box.displayName = componentName;
