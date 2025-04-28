import { ViewProps } from 'react-native';
import { BottomSheetProps } from '../BottomSheet';
import { ReactNode } from 'react';

type ValidationStatus = 'initial' | 'valid' | 'invalid';

export interface SelectOptionItemProps {
  /**
   * Label to display for this option
   */
  label: string;
  /**
   * Value for this option
   */
  value: string;
  /**
   * Optional left icon for this option
   */
  leadingIcon?: React.ComponentType;
  /**
   * Optional right icon for this option
   */
  trailingIcon?: React.ComponentType;
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
}

interface SelectProps extends ViewProps {
  /**
   * Array of options to display in the select
   */
  options?: SelectOptionProps[];
  /**
   * Currently selected value
   */
  value?: string | null;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Placeholder text to show when no value is selected
   */
  placeholder?: string;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Leading icon for the select
   */
  leadingIcon?: React.ComponentType;
  /**
   * Validation status
   */
  validationStatus?: ValidationStatus;
  /**
   * Whether the select is required
   */
  required?: boolean;
  /**
   * The heading to display in the bottom sheet
   */
  menuHeading?: string;
  /**
   * Children to render inside the select (for custom options)
   */
  children?: ReactNode;
  /**
   * Props passed to the BottomSheetModal
   */
  bottomSheetProps?: Partial<BottomSheetProps>;
  /**
   * Text to display when no options are available
   */
  emptyText?: string;
  /**
   * Props to be passed to the bottom sheet flat list
   */
  listProps?: any;
  /**
   * Optional search functionality for the select
   */
  searchable?: boolean;
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
  /**
   * Whether the select is readonly
   */
  readonly?: boolean;
}

export interface SelectOptionProps {
  /**
   * Label to display for this option
   */
  label: string;
  /**
   * Value for this option
   */
  value: string;
  /**
   * Optional left icon
   */
  leadingIcon?: React.ComponentType;
  /**
   * Optional right icon
   */
  trailingIcon?: React.ComponentType;
  /**
   * Whether this option is selected
   */
  selected?: boolean;
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
  /**
   * Callback when this option is selected
   */
  onPress?: (value: string) => void;
}

export default SelectProps;
