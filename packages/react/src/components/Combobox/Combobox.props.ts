import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';
import { Combobox as BaseUICombobox } from '@base-ui-components/react/combobox';

export interface ComboboxProps
  extends React.ComponentPropsWithRef<typeof BaseUICombobox.Root>,
    Omit<FormFieldProps, 'hideLabel'>,
    MarginProps {
  dropdown?: boolean;
}
