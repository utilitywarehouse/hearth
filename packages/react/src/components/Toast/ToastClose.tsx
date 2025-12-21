'use client';

import type { ComponentPropsWithRef } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastCloseProps = Omit<ComponentPropsWithRef<typeof RadixToast.Close>, 'asChild'>;

const COMPONENT_NAME = 'ToastClose';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastClose = ({ className, ...props }: ToastCloseProps) => {
  return <RadixToast.Close className={clsx(componentClassName, className)} asChild {...props} />;
};
ToastClose.displayName = COMPONENT_NAME;
