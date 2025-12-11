'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ModalTriggerProps } from './Modal.props';

const COMPONENT_NAME = 'ModalTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ModalTrigger = ({ className, ...props }: ModalTriggerProps) => {
  return (
    <DialogPrimitive.Trigger className={clsx(componentClassName, className)} asChild {...props} />
  );
};

ModalTrigger.displayName = COMPONENT_NAME;
