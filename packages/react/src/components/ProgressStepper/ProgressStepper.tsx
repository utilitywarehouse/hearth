'use client';

import { cn } from '../../helpers/cn';
import type { ProgressStepperProps } from './ProgressStepper.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Slot } from 'radix-ui';
import * as React from 'react';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'ProgressStepper';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepperElement = ComponentRef<'div'>;

export const ProgressStepper = React.forwardRef<ProgressStepperElement, ProgressStepperProps>(
  (props, ref) => {
    const {
      className,
      children,
      hideLabels,
      as: Tag = 'div',
      'aria-label': ariaLabel = 'progress',
      ...progressStepperProps
    } = extractProps(props, marginPropDefs);

    return (
      <Slot.Root
        ref={ref}
        aria-label={ariaLabel}
        className={cn(componentClassName, className)}
        data-visually-hidden-labels={hideLabels ? '' : undefined}
        {...progressStepperProps}
      >
        <Tag>
          <ol role="list">{children}</ol>
        </Tag>
      </Slot.Root>
    );
  }
);

ProgressStepper.displayName = COMPONENT_NAME;
