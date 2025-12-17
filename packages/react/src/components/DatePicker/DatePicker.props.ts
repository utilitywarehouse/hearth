import { DatePickerProps as DatePickerPrimitiveProps } from 'react-datepicker';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';

export type DatePickerProps = Omit<
  DatePickerPrimitiveProps,
  'selectsMultiple' | 'selectsRange' | 'onChange'
> &
  Omit<FormFieldProps, 'hideLabel'> &
  React.RefAttributes<HTMLButtonElement> &
  MarginProps & {
    selectsRange?: never;
    selectsMultiple?: never;
    onChange?: (
      date: Date | null,
      event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) => void;
  };

export type View = 'days' | 'months' | 'years';
