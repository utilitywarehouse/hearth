import { Dialog as DialogPrimitive } from 'radix-ui';

export type ModalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogPortal> &
  React.ComponentPropsWithRef<'div'> & {
    /**
     * The heading for the modal, describing its purpose.
     */
    heading: string;
    /**
     * Optional description to provide additional context or instructions.
     */
    description?: string;
    hideCloseButton?: boolean;
    /**
     * When true, the modal takes up the full screen height on mobile devices.
     */
    fullScreen?: boolean;
    image?: React.ReactNode;
    /**
     * When true, displays a loading spinner instead of the modal content.
     */
    loading?: boolean;
    /**
     * Optional text to display below the loading spinner.
     */
    loadingText?: string;
  };

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
