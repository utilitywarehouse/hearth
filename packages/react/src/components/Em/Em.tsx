import * as React from 'react';

import clsx from 'clsx';

import { EmProps } from './Em.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Slot } from '@radix-ui/react-slot';

import type { ElementRef } from 'react';

const componentName = 'Em';
const componentClassName = withGlobalPrefix(componentName);

type EmElement = ElementRef<'em'>;

export const Em = React.forwardRef<EmElement, EmProps>(
  ({ className, asChild, children, truncate, ...props }, ref) => {
    return (
      <Slot
        ref={ref}
        className={clsx(componentClassName, className)}
        data-truncate={truncate ? '' : undefined}
        {...props}
      >
        {asChild ? children : <em>{children}</em>}
      </Slot>
    );
  }
);

Em.displayName = componentName;
