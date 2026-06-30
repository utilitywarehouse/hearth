'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { SegmentedControlOptionProps } from './SegmentedControlOption.props';

const COMPONENT_NAME = 'SegmentedControlOption';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);
const labelClassName = withGlobalPrefix(`${COMPONENT_NAME}Label`);

type SegmentedControlOptionElement = ComponentRef<'button'>;

export const SegmentedControlOption = forwardRef<
  SegmentedControlOptionElement,
  SegmentedControlOptionProps
>(({ className, children, icon, value, disabled, ...props }, ref) => {
  return (
    <TogglePrimitive
      ref={ref}
      value={value}
      disabled={disabled}
      className={cn(componentClassName, className)}
      data-testid={componentClassName}
      {...props}
    >
      {icon}
      <span className={labelClassName} data-text={typeof children === 'string' ? children : undefined}>
        {children}
      </span>
    </TogglePrimitive>
  );
});

SegmentedControlOption.displayName = COMPONENT_NAME;
