import type { ComponentType, ReactNode } from 'react';
import type { PressableProps } from 'react-native';

export interface ExpandableCardTriggerProps extends Omit<PressableProps, 'children'> {
  /**
   * The main heading text
   */
  heading?: string;
  /**
   * Optional helper text displayed below the heading
   */
  helperText?: string;
  /**
   * Leading icon component
   */
  leadingIcon?: ComponentType;
  /**
   * Content to display on the left side (e.g., icon, avatar)
   */
  leadingContent?: ReactNode;
  /**
   * Optional badge to display
   */
  badge?: ReactNode;
  /**
   * Position of the badge relative to the heading
   * @default 'bottom'
   */
  badgePosition?: 'top' | 'bottom';
  /**
   * Optional numeric value to display
   */
  numericValue?: string | number;
  /**
   * Whether the expandable card is expanded
   */
  isExpanded: boolean;
  /**
   * Whether the trigger is disabled
   */
  disabled?: boolean;
  /* Optional children */
  children?: ReactNode;
}

export default ExpandableCardTriggerProps;
