import type { ViewProps } from 'react-native';

interface ListProps extends ViewProps {
  /** The container style of the list.
   * @default 'none' */
  container?: 'none' | 'subtleWhite' | 'emphasisWhite' | 'subtleWarmWhite' | 'emphasisWarmWhite';
  /** The text to display in the heading of the list. */
  heading?: string;
  /** The supporting text to display in the heading of the list. */
  helperText?: string;
  /** Optional content to display on the right side of the header. */
  headerTrailingContent?: React.ReactNode;
  /** Whether to disable the list. */
  disabled?: boolean;
  /** Whether to show the list items in loading state. */
  loading?: boolean;
  /** Validation error text to display in the heading of the list. */
  invalidText?: string;
}

export default ListProps;
