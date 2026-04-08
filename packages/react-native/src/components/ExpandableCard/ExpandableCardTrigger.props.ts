import type { ComponentType, ReactNode } from 'react';
import type { PressableProps } from 'react-native';

interface ExpandableCardTriggerSharedProps extends Omit<PressableProps, 'children'> {
  /**
   * Whether the expandable card is expanded
   */
  isExpanded: boolean;
  /**
   * Whether to show the chevron when providing custom children.
   * @default true
   */
  showChevron?: boolean;
  /**
   * Whether the trigger is disabled
   */
  disabled?: boolean;
  /* Optional children */
  children?: ReactNode;
}

interface ExpandableCardTriggerDefaultContentProps {
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
   * Custom trigger content that replaces the default trigger layout.
   */
  triggerContent?: never;
}

interface ExpandableCardTriggerCustomContentProps {
  /**
   * Custom trigger content that replaces the default trigger layout.
   */
  triggerContent: ReactNode;
  heading?: never;
  helperText?: never;
  leadingIcon?: never;
  leadingContent?: never;
  badge?: never;
  badgePosition?: never;
  numericValue?: never;
}

type ExpandableCardTriggerProps = ExpandableCardTriggerSharedProps &
  (ExpandableCardTriggerDefaultContentProps | ExpandableCardTriggerCustomContentProps);

export default ExpandableCardTriggerProps;
