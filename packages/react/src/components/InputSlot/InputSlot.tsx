import * as React from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { InputSlotProps } from './InputSlot.props';
import { Slot } from 'radix-ui';

const COMPONENT_NAME = 'InputSlot';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type InputSlotElement = ComponentRef<'div'>;

export const InputSlot = React.forwardRef<InputSlotElement, InputSlotProps>(
  ({ className, children, placement, asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Root : 'div';
    return (
      <Component
        ref={ref}
        className={cn(componentClassName, className)}
        data-placement={placement}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

InputSlot.displayName = COMPONENT_NAME;
