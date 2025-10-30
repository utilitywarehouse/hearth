import type { ViewProps } from 'react-native';

export interface DescriptionListProps extends ViewProps {
  /** Direction orientation for items */
  direction?: 'row' | 'column';
  /** Override heading/term column width when layout is row (defaults to token) */
  itemHeadingWidth?: number;
  heading?: string;
  helperText?: string;
  headerTrailingContent?: React.ReactNode;
}

export default DescriptionListProps;
