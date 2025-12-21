'use client';

import type { ComponentPropsWithRef } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastProps = Omit<ComponentPropsWithRef<typeof RadixToast.Root>, 'asChild' | 'dir'>;

const COMPONENT_NAME = 'Toast';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Toast = ({ className, ...props }: ToastProps) => {
  return <RadixToast.Root className={clsx(componentClassName, className)} {...props} />;
};
Toast.displayName = COMPONENT_NAME;
