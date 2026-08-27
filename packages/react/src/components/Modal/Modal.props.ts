import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from 'react';

export interface BaseModalProps
  extends
    ComponentPropsWithoutRef<typeof DialogPrimitive.DialogPortal>,
    Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'asChild' | 'forceMount'>,
    ComponentPropsWithRef<'div'> {
  /**
   * Additional descriptive text shown below the heading.
   */
  description?: string;
  /**
   * Hides the visible close icon button. Only use this when providing a
   * visible alternative way to close the modal, such as a Cancel button.
   *
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * Makes the modal take up the full screen on mobile, ensuring long content
   * scrolls correctly.
   *
   * @default false
   */
  fullScreen?: boolean;
  /**
   * An image, such as an SVG illustration, rendered at the top of the modal.
   * The layout automatically adjusts to accommodate it.
   */
  image?: ReactNode;
  /**
   * @deprecated Please use loadingHeading and loadingDescription instead
   */
  loadingText?: string;
  /**
   * The heading shown while `loading` is `true`.
   */
  loadingHeading?: string;
  /**
   * The description shown while `loading` is `true`.
   */
  loadingDescription?: string;
}

type NonLoadingState = {
  /**
   * Whether the modal is in a loading state.
   *
   * @default false
   */
  loading?: false;
  /**
   * The heading shown in the modal's main content. Required unless `loading` is `true`.
   */
  heading: string; // Required
};

type LoadingState = {
  /**
   * Whether the modal is in a loading state. When `true`, a loading heading
   * (via `loadingHeading`) is required for accessibility purposes.
   */
  loading: true;
  /**
   * The heading shown in the modal's main content. Optional while `loading` is `true`.
   */
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
