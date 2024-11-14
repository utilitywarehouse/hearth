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
  ({ className, asChild, as: Tag = 'div', padding, style, ...props }, ref) => {
    const Component = asChild ? Slot : Tag;
    const styleProps = withBreakpoints(padding, 'padding');

    return (
      <Component
        ref={ref}
        className={clsx(componentClassName, styleProps?.className, className)}
        {...props}
        style={{ ...styleProps?.style, ...style }}
      />
    );
  }
);

Box.displayName = componentName;
