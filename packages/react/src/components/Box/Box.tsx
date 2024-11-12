import * as React from 'react';
import clsx from 'clsx';

import { withBreakpoints } from '../../helpers';

import type { BoxProps } from './Box.props';

import './Box.css';

const componentName = 'Box';
const componentClassName = 'uwp-' + componentName;

export const Box = React.forwardRef<React.ElementRef<'div'>, React.PropsWithChildren<BoxProps>>(
  ({ className, padding, style, ...props }, ref) => {
    const styleProps = withBreakpoints(padding, 'padding');
    return (
      <div
        ref={ref}
        className={clsx(componentClassName, styleProps?.className, className)}
        {...props}
        style={{ ...styleProps?.style, ...style }}
      />
    );
  }
);

Box.displayName = componentName;
