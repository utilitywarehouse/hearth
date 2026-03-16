import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { View } from './DatePicker.props';
import { ButtonProps } from '../Button/Button.props';

export interface DatePickerHeaderProps extends ReactDatePickerCustomHeaderProps {
  view: View;
  onClick: ButtonProps['onClick'];
  disableTodayIndicator?: boolean;
}
