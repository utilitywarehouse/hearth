'use client';

import * as React from 'react';
import clsx from 'clsx';
import type { ProgressStepperProps } from './ProgressStepper.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { ProgressStepperContext } from './ProgressStepper.context';
import { Slot } from 'radix-ui';

const COMPONENT_NAME = 'ProgressStepper';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepper = (props: ProgressStepperProps) => {
  const {
    className,
    children,
    hideLabels = false,
    as: Tag = 'div',
    'aria-label': ariaLabel = 'progress',
    ...progressStepperProps
  } = extractProps(props, marginPropDefs);

  return (
    <Slot.Root
      aria-label={ariaLabel}
      className={clsx(componentClassName, className)}
      {...progressStepperProps}
    >
      <Tag>
        <ol role="list">
          <ProgressStepperContext.Provider value={{ hideLabels }}>
            {children}
          </ProgressStepperContext.Provider>
        </ol>
      </Tag>
    </Slot.Root>
  );
};

ProgressStepper.displayName = COMPONENT_NAME;
