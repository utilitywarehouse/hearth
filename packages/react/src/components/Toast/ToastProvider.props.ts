import type { ComponentPropsWithRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

export interface ToastProviderProps
  extends
    Omit<
      ComponentPropsWithRef<typeof ToastPrimitive.Provider>,
      'swipeDirection' | 'swipeThreshold'
    >,
    Omit<ComponentPropsWithRef<typeof ToastPrimitive.Viewport>, 'asChild' | 'hotkey' | 'label'> {
  /** Accessible label for the toast viewport region, announced to assistive technology. */
  viewportLabel?: ComponentPropsWithRef<typeof ToastPrimitive.Viewport>['label'];
  /** Keyboard shortcut that moves focus to the toast viewport, e.g. `['F8']`. */
  viewportHotkey?: ComponentPropsWithRef<typeof ToastPrimitive.Viewport>['hotkey'];
}
