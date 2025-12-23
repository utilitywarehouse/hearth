import { Toast as ToastPrimitive } from 'radix-ui';
import type { ToastProviderProps } from './ToastProvider.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'ToastProvider';

export const ToastProvider = ({
  children,
  duration = 6000,
  viewportLabel,
  ...props
}: ToastProviderProps) => {
  return (
    <ToastPrimitive.Provider
      {...props}
      duration={duration}
      swipeDirection="right"
      swipeThreshold={50}
    >
      {children}
      <ToastPrimitive.Viewport
        className={withGlobalPrefix('ToastViewport')}
        label={viewportLabel}
      />
    </ToastPrimitive.Provider>
  );
};
ToastProvider.displayName = COMPONENT_NAME;
