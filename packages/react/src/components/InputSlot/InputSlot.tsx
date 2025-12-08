import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { InputSlotProps } from './InputSlot.props';

const COMPONENT_NAME = 'InputSlot';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type InputSlotElement = ElementRef<'div'>;

export const InputSlot = React.forwardRef<InputSlotElement, InputSlotProps>(
  ({ className, children, placement, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(componentClassName, className)}
        data-placement={placement}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputSlot.displayName = COMPONENT_NAME;
