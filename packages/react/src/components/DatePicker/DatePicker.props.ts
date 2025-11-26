import { DatePickerProps as ReactDatePickerProps } from 'react-datepicker';
import { MarginProps } from '../../props/margin.props';

export type DatePickerProps = Omit<ReactDatePickerProps, 'selectsMultiple' | 'selectsRange'> &
  MarginProps & {
    /**
     * The label for the TextInput, describing its purpose.
     */
    label: string;
    /**
     * Optional helper text to provide additional context or instructions.
     */
    helperText?: string;
    /**
     * Text to display when the `validationStatus` is set.
     */
    validationText?: string;
    /**
     * Indicates the validation state of the input.
     */
    validationStatus?: 'valid' | 'invalid';
  };
