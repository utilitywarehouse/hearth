import { Dialog as RadixDialog } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ModalProps = RadixDialog.DialogPortalProps &
  ComponentPropsWithout<'div', RemovedProps> & {
    /**
     * The heading for the modal, describing its purpose.
     */
    heading: string;
    /**
     * Optional description to provide additional context or instructions.
     */
    description?: string;
    hideCloseButton?: boolean;
    image?: React.ReactNode;
  };

export type ModalFooterProps = ComponentPropsWithout<'div', RemovedProps>;
