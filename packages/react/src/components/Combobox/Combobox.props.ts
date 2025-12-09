import { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';
import { Combobox as BaseUICombobox } from '@base-ui-components/react/combobox';

export interface ComboboxProps<Value, Multiple extends boolean | undefined = false>
  extends Omit<
      ComponentPropsWithRef<typeof BaseUICombobox.Root<Value, Multiple>>,
      'openOnInputClick'
    >,
    Pick<BaseUICombobox.Trigger.Props, 'disabled'>,
    Omit<FormFieldProps, 'hideLabel'>,
    MarginProps {
  triggerOnlyOnType?: boolean;
  noOptionsFoundText?: string;
  /**
   * Displays a status message whose content changes are announced politely to
   * screen readers. Useful for conveying the status of an asynchronously
   * loaded list.
   */
  statusText?: string;
}
