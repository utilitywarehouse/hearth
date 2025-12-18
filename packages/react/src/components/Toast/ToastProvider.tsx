'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';

export type ToastProviderProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixToast.Provider>,
  'asChild' | 'dir'
>;

const COMPONENT_NAME = 'ToastProvider';

export const ToastProvider: FC<ToastProviderProps> = ({ children, ...props }) => {
  return <RadixToast.Provider {...props}>{children}</RadixToast.Provider>;
};
ToastProvider.displayName = COMPONENT_NAME;
