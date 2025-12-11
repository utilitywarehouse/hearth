'use client';

import * as React from 'react';
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

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, ...props }) => {
  return (
    <RadixToast.Provider {...props}>
      {children}
    </RadixToast.Provider>
  );
};
ToastProvider.displayName = 'ToastProvider';

export const ToastViewport = React.forwardRef<HTMLOListElement, ToastViewportProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixToast.Viewport
        ref={ref}
        className={clsx(withGlobalPrefix('ToastViewport'), className)}
        {...props}
      />
    );
  }
);
ToastViewport.displayName = 'ToastViewport';

export const Toast = React.forwardRef<HTMLLIElement, ToastProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixToast.Root
        ref={ref}
        className={clsx(componentClassName, className)}
        {...props}
      />
    );
  }
);
Toast.displayName = COMPONENT_NAME;

export const ToastTitle = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixToast.Title
        ref={ref}
        className={clsx(withGlobalPrefix('ToastTitle'), className)}
        {...props}
      />
    );
  }
);
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixToast.Description
        ref={ref}
        className={clsx(withGlobalPrefix('ToastDescription'), className)}
        {...props}
      />
    );
  }
);
ToastDescription.displayName = 'ToastDescription';

export const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixToast.Action
        ref={ref}
        className={clsx(withGlobalPrefix('ToastAction'), className)}
        {...props}
      />
    );
  }
);
ToastAction.displayName = 'ToastAction';

export const ToastClose = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixToast.Close
        ref={ref}
        className={clsx(withGlobalPrefix('ToastClose'), className)}
        {...props}
      />
    );
  }
);
ToastClose.displayName = 'ToastClose';

