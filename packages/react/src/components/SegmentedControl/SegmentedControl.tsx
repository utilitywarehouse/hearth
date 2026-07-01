'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { SegmentedControlProps } from './SegmentedControl.props';
import { segmentedControlPropDefs } from './SegmentedControl.props';

const COMPONENT_NAME = 'SegmentedControl';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SegmentedControlElement = ComponentRef<'div'>;

export const SegmentedControl = forwardRef<SegmentedControlElement, SegmentedControlProps>(
  (props, ref) => {
    const { className, children, ...segmentedControlProps } = extractProps(
      props,
      segmentedControlPropDefs,
      marginPropDefs
    );

    return (
      <ToggleGroupPrimitive
        ref={ref}
        className={cn(componentClassName, className)}
        data-testid={componentClassName}
        {...segmentedControlProps}
      >
        {children}
      </ToggleGroupPrimitive>
    );
  }
);

SegmentedControl.displayName = COMPONENT_NAME;
