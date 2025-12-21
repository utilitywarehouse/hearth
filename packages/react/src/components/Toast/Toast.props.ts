import type { ComponentPropsWithRef } from 'react';
import { Toast as RadixToast } from 'radix-ui';

export type ToastActionProps = Omit<ComponentPropsWithRef<typeof RadixToast.Action>, 'asChild'>;

export type ToastCloseProps = Omit<ComponentPropsWithRef<typeof RadixToast.Close>, 'asChild'>;

export type ToastDescriptionProps = Omit<
  ComponentPropsWithRef<typeof RadixToast.Description>,
  'asChild' | 'dir'
>;

export type ToastProviderProps = Omit<
  ComponentPropsWithRef<typeof RadixToast.Provider>,
  'asChild' | 'dir'
>;

export type ToastProps = Omit<ComponentPropsWithRef<typeof RadixToast.Root>, 'asChild' | 'dir'>;

export type ToastTitleProps = Omit<
  ComponentPropsWithRef<typeof RadixToast.Title>,
  'asChild' | 'dir'
>;

export type ToastViewportProps = Omit<
  ComponentPropsWithRef<typeof RadixToast.Viewport>,
  'asChild' | 'dir'
>;
