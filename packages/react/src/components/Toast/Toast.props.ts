import { Toast as ToastPrimitive } from 'radix-ui';

export type ToastProps = Omit<
  React.ComponentPropsWithRef<typeof ToastPrimitive.Root>,
  'asChild' | 'forceMount'
> &
  (
    | {
        action: React.ReactNode;
        actionAltText: string;
      }
    | {
        action?: never;
        actionAltText?: never;
      }
  ) & {
    description: React.ReactNode;
    icon?: React.ReactNode;
    showDismissButton?: boolean;
  };
