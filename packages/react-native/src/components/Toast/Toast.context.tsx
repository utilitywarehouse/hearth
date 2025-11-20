import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { ToastContextValue, ToastInstance, ToastOptions } from './Toast.props';
import ToastItem, { type ToastItemHandle } from './ToastItem';

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);
  const timers = useRef<Record<string, number>>({});
  const toastRefs = useRef<Record<string, ToastItemHandle | null>>({});

  const removeToast = useCallback((id: string) => {
    setToasts(s => s.filter(t => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
    delete toastRefs.current[id];
  }, []);

  const addToast = useCallback(
    (opts: ToastOptions) => {
      const id = opts.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const toast: ToastInstance = {
        id,
        text: opts.text,
        actionText: opts.actionText,
        onPress: opts.onPress,
        onDismiss: opts.onDismiss,
        icon: opts.icon,
        duration: opts.duration ?? 6000,
        showDismissIcon: opts.showDismissIcon,
        dismissOnPress: opts.dismissOnPress ?? true,
      };
      setToasts(s => [toast, ...s]);

      // set auto-dismiss timer
      if (toast.duration && toast.duration > 0) {
        const t = setTimeout(() => {
          // call dismiss animation if ref exists, otherwise remove immediately
          const ref = toastRefs.current[id];
          if (ref) {
            ref.dismiss();
          } else {
            removeToast(id);
          }
        }, toast.duration) as unknown as number;
        timers.current[id] = t;
      }

      return id;
    },
    [removeToast]
  );

  useEffect(() => {
    return () => {
      // cleanup timers on unmount
      Object.values(timers.current).forEach(t => clearTimeout(t));
      timers.current = {};
    };
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <View pointerEvents="box-none" style={styles.container as any}>
        <View style={styles.stack as any}>
          {toasts.map(t => (
            <ToastItem
              key={t.id}
              ref={el => {
                toastRefs.current[t.id] = el;
              }}
              toast={t}
              onClose={removeToast}
            />
          ))}
        </View>
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export default ToastContext;

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'stretch',
    paddingBottom: theme.space['200'],
    pointerEvents: 'box-none',
  },
  stack: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.space.xs,
  },
}));
