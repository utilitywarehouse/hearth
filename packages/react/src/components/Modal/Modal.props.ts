import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from 'react';

// Props that are ALWAYS available regardless of loading state
type BaseModalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.DialogPortal> &
  Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'asChild' | 'forceMount'> &
  ComponentPropsWithRef<'div'> & {
    description?: string;
    hideCloseButton?: boolean;
    fullScreen?: boolean;
    image?: ReactNode;
  };

// The "Content" state (Loading is false or undefined)
type ContentState = {
  loading?: false;
  heading: string; // Required
  loadingText?: string;
};

// The "Loading" state (Loading is true)
type LoadingState = {
  loading: true;
  loadingText: string; // Required when loading is true
  heading?: string; // Heading becomes optional
};

export type ModalProps = BaseModalProps & (ContentState | LoadingState);

export type ModalCloseProps = Omit<
  ComponentPropsWithRef<typeof DialogPrimitive.DialogClose>,
  'asChild'
>;

export type ModalRootProps = Omit<ComponentPropsWithRef<typeof DialogPrimitive.Root>, 'modal'>;

export type ModalTriggerProps = Omit<
  ComponentPropsWithRef<typeof DialogPrimitive.DialogTrigger>,
  'asChild'
>;
