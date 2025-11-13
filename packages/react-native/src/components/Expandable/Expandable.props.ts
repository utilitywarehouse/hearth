import { ReactNode } from 'react';
import { ViewProps, ViewStyle } from 'react-native';

export interface ExpandableProps extends ViewProps {
  /**
   * Whether the content is expanded
   */
  expanded?: boolean;

  /**
   * Callback when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * The content to expand/collapse
   */
  children: ReactNode;

  /**
   * Duration of the animation in milliseconds
   * @default 200
   */
  duration?: number;

  /**
   * Additional style for the container
   */
  style?: ViewStyle;

  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Whether to animate opacity during expansion/collapse
   * @default true
   */
  animateOpacity?: boolean;
}
