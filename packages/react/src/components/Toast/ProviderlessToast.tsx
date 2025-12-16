'use client';

import * as React from 'react';
import type { FC, ReactNode } from 'react';
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastDescription,
  ToastAction,
  ToastClose,
} from './Toast';
import type { ToastProps } from './Toast.props';

export interface ProviderlessToastProps extends ToastProps {
  /**
   * The content to display in the toast (typically includes icon and message text)
   */
  children: ReactNode;
  /**
   * Optional action element (e.g., a link or button) to include in the toast
   */
  action?: ReactNode;
  /**
   * Optional close button element to manually dismiss the toast
   */
  closeButton?: ReactNode;
  /**
   * Time in milliseconds before the toast auto-dismisses
   * @default 6000
   */
  duration?: number;
  /**
   * Direction to swipe to dismiss the toast
   * @default 'down'
   */
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
}

/**
 * A simplified Toast component that includes its own provider and viewport.
 * Use this when you only need a single toast and don't want to set up the
 * provider and viewport separately.
 *
 * @example
 * ```tsx
 * <ProviderlessToast
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   closeButton={
 *     <UnstyledIconButton label="Close" inverted>
 *       <CloseMediumIcon />
 *     </UnstyledIconButton>
 *   }
 * >
 *   <TickCircleMediumIcon />
 *   Payment method updated
 * </ProviderlessToast>
 * ```
 */
export const ProviderlessToast: FC<ProviderlessToastProps> = ({
  children,
  action,
  closeButton,
  open = false,
  onOpenChange,
  duration = 6000,
  swipeDirection = 'down',
  ...toastProps
}) => {
  return (
    <ToastProvider duration={duration} swipeDirection={swipeDirection}>
      <Toast open={open} onOpenChange={onOpenChange} {...toastProps}>
        <ToastDescription>{children}</ToastDescription>
        {action && <ToastAction altText="Action">{action}</ToastAction>}
        {closeButton && <ToastClose>{closeButton}</ToastClose>}
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

ProviderlessToast.displayName = 'ProviderlessToast';
