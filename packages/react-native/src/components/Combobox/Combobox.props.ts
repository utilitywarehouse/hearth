import { BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import { ComponentType, ReactNode } from 'react';
import { ViewProps } from 'react-native';
import { BottomSheetProps } from '../BottomSheet';
import { ComboboxSelection } from './Combobox.context';

type ValidationStatus = 'initial' | 'valid' | 'invalid';

export interface ComboboxOptionItemProps {
  /**
   * Label shown for this option.
   */
  label: string;
  /**
   * Value returned when this option is selected.
   */
  value: string;
  /**
   * Optional icon shown before the option label.
   */
  leadingIcon?: ComponentType;
  /**
   * Optional icon shown after the option label.
   */
  trailingIcon?: ComponentType;
  /**
   * Additional searchable terms for this option.
   */
  keywords?: string[];
  /**
   * Whether this option is disabled.
   */
  disabled?: boolean;
}

export interface ComboboxRenderContentProps {
  /**
   * Current search value used by both the trigger and bottom sheet input.
   */
  search: string;
  /**
   * Update the search value.
   */
  setSearch: (value: string) => void;
  /**
   * Close the bottom sheet.
   */
  close: () => void;
  /**
   * Select an option, update the trigger text and close the bottom sheet.
   */
  selectOption: (option: ComboboxSelection) => void;
  /**
   * Currently selected value.
   */
  selectedValue?: string | null;
}

export interface ComboboxOptionProps extends ComboboxOptionItemProps {
  /**
   * Whether this option is selected.
   */
  selected?: boolean;
  /**
   * Custom press handler for this option.
   */
  onPress?: (value: string) => void;
}

type ComboboxChildren = ReactNode | ((props: ComboboxRenderContentProps) => ReactNode);

interface ComboboxProps extends Omit<ViewProps, 'children'> {
  /**
   * Array of options to render using the default bottom sheet list.
   */
  options?: ComboboxOptionItemProps[];
  /**
   * Currently selected value.
   */
  value?: string | null;
  /**
   * Callback fired when the selected value changes.
   */
  onValueChange?: (value: string | null) => void;
  /**
   * Controlled search value used by the trigger and bottom sheet input.
   */
  inputValue?: string;
  /**
   * Callback fired when the search value changes.
   */
  onInputValueChange?: (value: string) => void;
  /**
   * Label shown above the combobox.
   */
  label?: string;
  /**
   * The variant of the label text.
   *
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /**
   * Helper text shown below the label.
   */
  helperText?: string;
  /**
   * Optional helper icon.
   */
  helperIcon?: ComponentType;
  /**
   * Text shown for invalid state.
   */
  invalidText?: string;
  /**
   * Text shown for valid state.
   */
  validText?: string;
  /**
   * Placeholder shown when the combobox is empty.
   *
   * @default 'Search'
   */
  placeholder?: string;
  /**
   * Placeholder shown in the bottom sheet search input.
   *
   * @default 'Search'
   */
  searchPlaceholder?: string;
  /**
   * Whether the combobox is disabled.
   */
  disabled?: boolean;
  /**
   * Validation status for the combobox.
   *
   * @default 'initial'
   */
  validationStatus?: ValidationStatus;
  /**
   * Whether the combobox is required.
   *
   * @default true
   */
  required?: boolean;
  /**
   * Heading displayed above the bottom sheet search input.
   */
  menuHeading?: string;
  /**
   * Custom bottom sheet content, or a render function for fully custom list rendering.
   */
  children?: ComboboxChildren;
  /**
   * Props passed to the BottomSheetModal.
   */
  bottomSheetProps?: Partial<BottomSheetProps>;
  /**
   * Text shown when no options match the current search.
   *
   * @default 'No options found'
   */
  noOptionsFoundText?: string;
  /**
   * Props passed to the default BottomSheetFlatList renderer.
   */
  listProps?: Partial<BottomSheetFlatListProps<ComboboxOptionItemProps>>;
  /**
   * Whether the combobox should show a loading spinner.
   */
  loading?: boolean;
  /**
   * Whether the combobox is readonly.
   */
  readonly?: boolean;
  /**
   * Resolve a label for a selected value when the current options array does not contain it.
   */
  getValueLabel?: (value: string | null | undefined) => string;
  /**
   * Override the default filtering behaviour for the default options list.
   */
  filterOption?: (option: ComboboxOptionItemProps, search: string) => boolean;
}

export default ComboboxProps;
