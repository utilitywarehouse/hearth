'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ToastProviderProps = ComponentPropsWithout<typeof RadixToast.Provider, RemovedProps>;

const COMPONENT_NAME = 'ToastProvider';

export const ToastProvider: FC<ToastProviderProps> = ({ children, ...props }) => {
  return <RadixToast.Provider {...props}>{children}</RadixToast.Provider>;
};
ToastProvider.displayName = COMPONENT_NAME;
