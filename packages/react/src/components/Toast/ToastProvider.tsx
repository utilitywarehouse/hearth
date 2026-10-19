import { Toast as ToastPrimitive } from 'radix-ui';
import type { ToastProviderProps } from './ToastProvider.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { cn } from '../../helpers/cn';

const COMPONENT_NAME = 'ToastProvider';

/**
 * Use ToastProvider to wrap the part of the app where `Toast` components
 * should render, providing the context and viewport they mount into.
 *
 * @summary Provides context and a mount point for Toast components.
 */
export const ToastProvider = ({
  children,
  duration = 5000,
  label,
  viewportLabel,
  viewportHotkey,
  className,
  ...viewportProps
}: ToastProviderProps) => {
  return (
    <ToastPrimitive.Provider
      label={label}
      duration={duration}
      swipeDirection="down"
      swipeThreshold={50}
    >
      {children}
      <ToastPrimitive.Viewport
        {...viewportProps}
        className={cn(withGlobalPrefix('ToastViewport'), className)}
        label={viewportLabel}
        hotkey={viewportHotkey}
      />
    </ToastPrimitive.Provider>
  );
};
ToastProvider.displayName = COMPONENT_NAME;
