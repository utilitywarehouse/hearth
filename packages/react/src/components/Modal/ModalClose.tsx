import * as React from 'react';
import type { ElementRef } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'ModalClose';
const { displayName, componentClassName } = withGlobalPrefix(COMPONENT_NAME);

type ModalCloseElement = ElementRef<'button'>;
type ModalCloseProps = Omit<RadixDialog.DialogCloseProps, 'asChild'>;

export const ModalClose = React.forwardRef<ModalCloseElement, ModalCloseProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixDialog.Close
        ref={ref}
        className={clsx(componentClassName, className)}
        asChild
        {...props}
      />
    );
  }
);

ModalClose.displayName = displayName;
