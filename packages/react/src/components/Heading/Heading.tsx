import * as React from 'react';

import clsx from 'clsx';

import { HeadingProps } from './Heading.props';
import { withBreakpoints } from '../../helpers/with-breakpoints';

const componentName = 'Heading';
const componentClassName = 'uwp-' + componentName;

const classNames = {
  variant: {
    displayHeading: 'uwp-variant-displayHeading',
    h1: 'uwp-variant-h1',
    h2: 'uwp-variant-h2',
    h3: 'uwp-variant-h3',
    h4: 'uwp-variant-h4',
  },
};

export const Heading = React.forwardRef<
  React.ElementRef<'h2'>,
  React.PropsWithChildren<HeadingProps>
>(({ variant = 'h2', weight = 'bold', align, color, className, style, ...props }, ref) => {
  const fontWeightClassName = withBreakpoints(weight, 'weight');
  const textAlignClassName = withBreakpoints(align, 'text-align');
  const styleProps = { '--uwp-color': color, ...style };
  return (
    <h2
      ref={ref}
      className={clsx(
        componentClassName,
        classNames.variant[variant],
        fontWeightClassName,
        textAlignClassName,
        className
      )}
      style={styleProps}
      {...props}
    />
  );
});

Heading.displayName = componentName;
