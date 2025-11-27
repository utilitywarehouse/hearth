import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

export interface DatePickerHeaderProps extends ReactDatePickerCustomHeaderProps {
  showMonths: boolean;
  setShowMonths: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldCloseOnSelect: React.Dispatch<React.SetStateAction<boolean>>;
}
