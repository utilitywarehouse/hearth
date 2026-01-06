import { Dialog as DialogPrimitive } from 'radix-ui';

// Props that are ALWAYS available regardless of loading state
type BaseModalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogPortal> &
  React.ComponentPropsWithRef<'div'> & {
    description?: string;
    hideCloseButton?: boolean;
    fullScreen?: boolean;
    image?: React.ReactNode;
    loadingText?: string;
  };

// The "Content" state (Loading is false or undefined)
type ContentState = {
  loading?: false;
  heading: string; // Required
};

// The "Loading" state (Loading is true)
type LoadingState = {
  loading: true;
  loadingText: string; // Required when loading is true
  heading?: string; // Heading becomes optional
};

export type ModalProps = BaseModalProps & (ContentState | LoadingState);

export type ModalCloseProps = Omit<
  React.ComponentPropsWithRef<typeof DialogPrimitive.DialogClose>,
  'asChild'
>;

export type ModalRootProps = Omit<
  React.ComponentPropsWithRef<typeof DialogPrimitive.Root>,
  'modal'
>;

export type ModalTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof DialogPrimitive.DialogTrigger>,
  'asChild'
>;
