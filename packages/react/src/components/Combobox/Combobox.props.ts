import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';
import { Combobox as BaseUICombobox } from '@base-ui-components/react/combobox';

export interface ComboboxProps
  extends Omit<React.ComponentPropsWithRef<typeof BaseUICombobox.Root>, 'openOnInputClick'>,
    Omit<FormFieldProps, 'hideLabel'>,
    MarginProps {
  triggerOnlyOnType?: boolean;
}
