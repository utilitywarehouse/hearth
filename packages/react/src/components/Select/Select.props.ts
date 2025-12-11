import { Select as RadixSelect } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';

export type SelectProps = Omit<RadixSelect.SelectTriggerProps, 'dir' | 'value' | 'defaultValue'> &
  Pick<React.ComponentProps<'button'>, 'className'> &
  Omit<RadixSelect.SelectProps, 'asChild' | 'dir'> &
  Omit<FormFieldProps, 'hideLabel'> &
  MarginProps & {
    placeholder?: string;
  };
