'use client';

import { Toast as RadixToast } from 'radix-ui';
import type { ToastProviderProps } from './Toast.props';

const COMPONENT_NAME = 'ToastProvider';

export const ToastProvider = ({ children, ...props }: ToastProviderProps) => {
  return <RadixToast.Provider {...props}>{children}</RadixToast.Provider>;
};
ToastProvider.displayName = COMPONENT_NAME;
