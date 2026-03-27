import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from 'react';

export interface ModalProps
  extends
    ComponentPropsWithoutRef<typeof DialogPrimitive.DialogPortal>,
    Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'asChild' | 'forceMount'>,
    ComponentPropsWithRef<'div'> {
  heading: string;
  description?: string;
  hideCloseButton?: boolean;
  fullScreen?: boolean;
  image?: ReactNode;
  loading?: boolean;
  // @deprecated Please use loadingHeading and loadingDescription instead
  loadingText?: string;
  loadingHeading?: string;
  loadingDescription?: string;
}

export type ModalCloseProps = Omit<
  ComponentPropsWithRef<typeof DialogPrimitive.DialogClose>,
  'asChild'
>;

export type ModalRootProps = Omit<ComponentPropsWithRef<typeof DialogPrimitive.Root>, 'modal'>;

export type ModalTriggerProps = Omit<
  ComponentPropsWithRef<typeof DialogPrimitive.DialogTrigger>,
  'asChild'
>;
