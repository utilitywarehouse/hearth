import { Toast as RadixToast } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ToastProps = ComponentPropsWithout<typeof RadixToast.Root, RemovedProps>;
export type ToastProviderProps = ComponentPropsWithout<typeof RadixToast.Provider, RemovedProps>;
export type ToastViewportProps = ComponentPropsWithout<typeof RadixToast.Viewport, RemovedProps>;
export type ToastTitleProps = ComponentPropsWithout<typeof RadixToast.Title, RemovedProps>;
export type ToastDescriptionProps = ComponentPropsWithout<typeof RadixToast.Description, RemovedProps>;
export type ToastActionProps = ComponentPropsWithout<typeof RadixToast.Action, RemovedProps>;
export type ToastCloseProps = ComponentPropsWithout<typeof RadixToast.Close, RemovedProps>;

