import { Toast as ToastPrimitive } from 'radix-ui';
import type { ToastProviderProps } from './ToastProvider.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'ToastProvider';

export const ToastProvider = ({
  children,
  duration = 5000,
  viewportLabel,
  viewportHotkey,
  ...props
}: ToastProviderProps) => {
  return (
    <ToastPrimitive.Provider
      {...props}
      duration={duration}
      swipeDirection="down"
      swipeThreshold={50}
    >
      {children}
      <ToastPrimitive.Viewport
        className={withGlobalPrefix('ToastViewport')}
        label={viewportLabel}
        hotkey={viewportHotkey}
      />
    </ToastPrimitive.Provider>
  );
};
ToastProvider.displayName = COMPONENT_NAME;
