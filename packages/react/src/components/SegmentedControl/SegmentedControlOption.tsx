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

/**
 * A single selectable option within a `SegmentedControl`. Must be used as a
 * direct child of `SegmentedControl`. Each option requires a unique `value`.
 *
 * @summary a selectable option inside a SegmentedControl
 */
export const SegmentedControlOption = forwardRef<
  SegmentedControlOptionElement,
  SegmentedControlOptionProps
>(({ className, label, icon, value, disabled, ...props }, ref) => {
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
      <span className={labelClassName} data-text={label}>
        {label}
      </span>
    </TogglePrimitive>
  );
});

SegmentedControlOption.displayName = COMPONENT_NAME;
