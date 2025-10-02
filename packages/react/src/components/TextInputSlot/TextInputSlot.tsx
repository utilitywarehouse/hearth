import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { TextInputSlotProps } from './TextInputSlot.props';

const COMPONENT_NAME = 'TextInputSlot';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TextInputSlotElement = ElementRef<'div'>;

export const TextInputSlot = React.forwardRef<TextInputSlotElement, TextInputSlotProps>(
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

TextInputSlot.displayName = COMPONENT_NAME;
