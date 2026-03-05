import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import type { Ref } from 'react';
import type { ViewStyle } from 'react-native';
import type { DateType, Numerals, PickerOption } from '../DatePicker/DatePicker.props';

export interface TimePickerProps {
  /**
   * IANA time zone identifier applied when normalising and comparing times.
   */
  timeZone?: string;
  /**
   * Controlled time value.
   */
  date?: DateType;
  /**
   * Fired whenever a time is picked.
   */
  onChange?: (params: { date: DateType }) => void;
  /**
   * Display a 12-hour clock with AM/PM selector.
   */
  use12Hours?: boolean;
  /**
   * Step interval for minutes shown in the picker.
   */
  minuteInterval?: number;
  /**
   * Numeral system for hour and minute values.
   */
  numerals?: Numerals;
  /**
   * Height of the picker container.
   */
  containerHeight?: number;
  /**
   * Hide the footer actions.
   */
  hideFooter?: boolean;
  /**
   * Custom container styling for the time picker surface.
   */
  style?: ViewStyle;
  /**
   * Gives imperative access to the bottom sheet instance.
   */
  ref?: Ref<BottomSheetModalMethods<any>>;
  /**
   * Fired when the cancel action is triggered.
   */
  onCancel?: () => void;
}

export type { DateType, Numerals, PickerOption };
