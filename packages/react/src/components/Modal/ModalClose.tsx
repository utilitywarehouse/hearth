'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ModalCloseProps } from './Modal.props';

const COMPONENT_NAME = 'ModalClose';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ModalClose = ({ className, ...props }: ModalCloseProps) => {
  return (
    <DialogPrimitive.Close className={cn(componentClassName, className)} asChild {...props} />
  );
};

ModalClose.displayName = COMPONENT_NAME;
