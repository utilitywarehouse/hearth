import type { ComponentType } from 'react';
import type { PressableProps } from 'react-native';
import type BadgeProps from '../Badge/Badge.props';

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
  leadingContent?: React.ReactNode;
  /**
   * Optional badge to display
   */
  badge?: BadgeProps;
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
  children?: React.ReactNode;
}

export default ExpandableCardTriggerProps;
