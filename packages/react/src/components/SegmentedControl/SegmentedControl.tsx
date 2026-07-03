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

/**
 * Use SegmentedControl to switch between alternative views of closely related content.
 * Always provide a `defaultValue` or controlled `value` — a SegmentedControl cannot
 * be used without a default selected option.
 *
 * For navigation between pages or sections, use Tabs instead.
 * For binary on/off settings, use Switch instead.
 *
 * @summary for switching between alternative views of closely related content
 */
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
