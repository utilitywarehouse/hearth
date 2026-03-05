import type { ComponentPropsWithRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export interface ToastProviderProps
  extends
    Omit<
      ComponentPropsWithRef<typeof ToastPrimitive.Provider>,
      'swipeDirection' | 'swipeThreshold'
    >,
    Omit<ComponentPropsWithRef<typeof ToastPrimitive.Viewport>, 'asChild' | 'hotkey' | 'label'> {
  viewportLabel?: ComponentPropsWithRef<typeof ToastPrimitive.Viewport>['label'];
  viewportHotkey?: ComponentPropsWithRef<typeof ToastPrimitive.Viewport>['hotkey'];
}
