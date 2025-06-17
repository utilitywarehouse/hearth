import { Dialog as RadixDialog } from 'radix-ui';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type DialogProps = RadixDialog.DialogPortalProps &
  ComponentPropsWithout<'div', RemovedProps> & {
    /**
     * The heading for the dialog, describing its purpose.
     */
    heading: string;
    /**
     * Optional description to provide additional context or instructions.
     */
    description?: string;
    hideCloseButton?: boolean;
  };

export type DialogFooterProps = ComponentPropsWithout<'div', RemovedProps>;
