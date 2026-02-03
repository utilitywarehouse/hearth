import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface ExpandableCardGroupProps extends ViewProps {
  /**
   * Section heading
   */
  heading?: string;

  /**
   * Helper text displayed below the heading
   */
  helperText?: string;

  /**
   * Trailing content for the header (e.g., a link)
   */
  headerTrailingContent?: ReactNode;

  /**
   * The ExpandableCard children
   */
  children: ReactNode;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Validation text displayed below the helper text when in an invalid state
   */
  invalidText?: string;
}

export default ExpandableCardGroupProps;
