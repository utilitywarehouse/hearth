import { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { InputBaseProps } from '../InputBase/InputBase.props';

export interface ComboboxProps<Value, Multiple extends boolean | undefined = false>
  extends
    Omit<
      ComponentPropsWithRef<typeof ComboboxPrimitive.Root<Value, Multiple>>,
      'openOnInputClick' | 'highlightItemOnHover' | 'actionsRef'
    >,
    Pick<ComboboxPrimitive.Trigger.Props, 'disabled'>,
    FormFieldProps,
    Pick<InputBaseProps, 'placeholder'>,
    MarginProps {
  triggerOnlyOnType?: boolean;
  noOptionsFoundText?: string;
  /**
   * Displays a status message whose content changes are announced politely to
   * screen readers. Useful for conveying the status of an asynchronously
   * loaded list.
   */
  statusText?: string;
  /**
   * Displays a loading indicator in the input field to show that options are
   * being fetched or updated asynchronously.
   */
  loading?: boolean;
}
