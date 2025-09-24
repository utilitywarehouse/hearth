import * as React from 'react';

import clsx from 'clsx';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { TextInputSlotProps } from './TextInputSlot.props';

const componentName = 'TextInputSlot';
const componentClassName = withClassnameGlobalPrefix(componentName);

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

TextInputSlot.displayName = componentName;
