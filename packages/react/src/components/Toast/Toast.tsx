'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import {
  ToastProps,
  ToastProviderProps,
  ToastViewportProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
} from './Toast.props';

const COMPONENT_NAME = 'Toast';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastProvider: FC<ToastProviderProps> = ({ children, ...props }) => {
  return <RadixToast.Provider {...props}>{children}</RadixToast.Provider>;
};
ToastProvider.displayName = 'ToastProvider';

export const ToastViewport: FC<ToastViewportProps> = ({ className, ...props }) => {
  return (
    <RadixToast.Viewport
      className={clsx(withGlobalPrefix('ToastViewport'), className)}
      {...props}
    />
  );
};
ToastViewport.displayName = 'ToastViewport';

export const Toast: FC<ToastProps> = ({ className, ...props }) => {
  return <RadixToast.Root className={clsx(componentClassName, className)} {...props} />;
};
Toast.displayName = COMPONENT_NAME;

export const ToastTitle: FC<ToastTitleProps> = ({ className, ...props }) => {
  return (
    <RadixToast.Title className={clsx(withGlobalPrefix('ToastTitle'), className)} {...props} />
  );
};
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription: FC<ToastDescriptionProps> = ({ className, ...props }) => {
  return (
    <RadixToast.Description
      className={clsx(withGlobalPrefix('ToastDescription'), className)}
      {...props}
    />
  );
};
ToastDescription.displayName = 'ToastDescription';

export const ToastAction: FC<ToastActionProps> = ({ className, ...props }) => {
  return (
    <RadixToast.Action
      className={clsx(withGlobalPrefix('ToastAction'), className)}
      asChild
      {...props}
    />
  );
};
ToastAction.displayName = 'ToastAction';

export const ToastClose: FC<ToastCloseProps> = ({ className, ...props }) => {
  return (
    <RadixToast.Close
      className={clsx(withGlobalPrefix('ToastClose'), className)}
      asChild
      {...props}
    />
  );
};
ToastClose.displayName = 'ToastClose';
