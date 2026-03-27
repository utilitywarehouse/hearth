import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from 'react';

export interface BaseModalProps
  extends
    ComponentPropsWithoutRef<typeof DialogPrimitive.DialogPortal>,
    Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'asChild' | 'forceMount'>,
    ComponentPropsWithRef<'div'> {
  description?: string;
  hideCloseButton?: boolean;
  fullScreen?: boolean;
  image?: ReactNode;
  /**
   * @deprecated Please use loadingHeading and loadingDescription instead
   */
  loadingText?: string;
  loadingHeading?: string;
  loadingDescription?: string;
}

type NonLoadingState = {
  loading?: false;
  heading: string; // Required
};

type LoadingState = {
  loading: true;
  heading?: string; // Heading becomes optional
};

export type ModalProps = BaseModalProps & (NonLoadingState | LoadingState);

export type ModalCloseProps = Omit<
  ComponentPropsWithRef<typeof DialogPrimitive.DialogClose>,
  'asChild'
>;

export type ModalRootProps = Omit<ComponentPropsWithRef<typeof DialogPrimitive.Root>, 'modal'>;

export type ModalTriggerProps = Omit<
  ComponentPropsWithRef<typeof DialogPrimitive.DialogTrigger>,
  'asChild'
>;
