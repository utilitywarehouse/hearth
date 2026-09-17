import type { ViewProps } from 'react-native';

export interface DescriptionListProps extends ViewProps {
  /** Direction orientation for items */
  direction?: 'row' | 'column';
  /** Override heading/term column width when layout is row (defaults to token) */
  itemHeadingWidth?: number;
  /** Optional overall heading, rendered as a SectionHeader above the list. */
  heading?: string;
  /** Supporting text displayed below the heading. */
  helperText?: string;
  /** Custom trailing content for the heading (e.g. a Link). */
  headerTrailingContent?: React.ReactNode;
  /** Text to show below the heading when the section is invalid. */
  invalidText?: string;
}

export default DescriptionListProps;
