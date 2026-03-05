import type { RefAttributes, MouseEvent, KeyboardEvent } from 'react';
import { DatePickerProps as DatePickerPrimitiveProps } from 'react-datepicker';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';

export type DatePickerProps = Omit<
  DatePickerPrimitiveProps,
  'selectsMultiple' | 'selectsRange' | 'onChange'
> &
  Omit<FormFieldProps, 'hideLabel' | 'onChange'> &
  RefAttributes<HTMLButtonElement> &
  MarginProps & {
    selectsRange?: never;
    selectsMultiple?: never;
    onChange?: (
      date: Date | null,
      event?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
    ) => void;
  };

export type View = 'days' | 'months' | 'years';
