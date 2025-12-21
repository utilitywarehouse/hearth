'use client';

import type { ComponentPropsWithRef } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastActionProps = Omit<ComponentPropsWithRef<typeof RadixToast.Action>, 'asChild'>;

const COMPONENT_NAME = 'ToastAction';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastAction = ({ className, ...props }: ToastActionProps) => {
  return <RadixToast.Action className={clsx(componentClassName, className)} asChild {...props} />;
};
ToastAction.displayName = COMPONENT_NAME;
