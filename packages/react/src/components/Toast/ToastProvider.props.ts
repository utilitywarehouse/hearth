import { Toast as ToastPrimitive } from 'radix-ui';

export interface ToastProviderProps
  extends Omit<
      React.ComponentPropsWithRef<typeof ToastPrimitive.Provider>,
      'swipeDirection' | 'swipeThreshold'
    >,
    Omit<
      React.ComponentPropsWithRef<typeof ToastPrimitive.Viewport>,
      'asChild' | 'hotkey' | 'label'
    > {
  viewportLabel?: React.ComponentPropsWithRef<typeof ToastPrimitive.Viewport>['label'];
  viewportHotkey?: React.ComponentPropsWithRef<typeof ToastPrimitive.Viewport>['hotkey'];
}
