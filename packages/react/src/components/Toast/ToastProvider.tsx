'use client';

import type { ComponentPropsWithRef } from 'react';
import { Toast as RadixToast } from 'radix-ui';

export type ToastProviderProps = Omit<
  ComponentPropsWithRef<typeof RadixToast.Provider>,
  'asChild' | 'dir'
>;

const COMPONENT_NAME = 'ToastProvider';

export const ToastProvider = ({ children, ...props }: ToastProviderProps) => {
  return <RadixToast.Provider {...props}>{children}</RadixToast.Provider>;
};
ToastProvider.displayName = COMPONENT_NAME;
