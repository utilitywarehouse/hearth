import type { ReactNode } from 'react';

export interface ToastOptions {
  id?: string;
  text: string | ReactNode;
  /** Optional action text to display as a link */
  actionText?: string;
  /** Optional callback when action link or toast is pressed */
  onPress?: () => void;
  /** Optional callback when toast is dismissed */
  onDismiss?: () => void;
  /** Optional icon component */
  icon?: React.ComponentType;
  /** Duration in milliseconds; default 6000 */
  duration?: number;
  /** Whether to show the dismiss icon button; default true */
  showDismissIcon?: boolean;
  /** Whether to dismiss the toast when pressed; default true */
  dismissOnPress?: boolean;
}

export interface ToastInstance extends ToastOptions {
  id: string;
  /** resolved duration */
  duration: number;
}

export interface ToastContextValue {
  addToast: (opts: ToastOptions) => string;
  removeToast: (id: string) => void;
}

export default ToastOptions;
