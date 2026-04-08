import type { ComponentType, ReactNode } from 'react';
import type CardProps from '../Card/Card.props';

interface ExpandableCardSharedProps extends Omit<CardProps, 'children'> {
  /**
   * Whether the card is expanded
   */
  expanded?: boolean;

  /**
   * Callback when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * The heading text displayed in the trigger
   */
  expandedContent?: ReactNode;

  /**
   * Duration of the expansion animation in milliseconds
   * @default 200
   */
  duration?: number;

  /**
   * Whether to animate opacity during expansion
   * @default true
   */
  animateOpacity?: boolean;

  /**
   * Whether the card is disabled
   */
  disabled?: boolean;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Custom children for advanced composition
   */
  children?: ReactNode;
}

interface ExpandableCardDefaultTriggerProps {
  /**
   * The heading text displayed in the trigger
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
   * Leading content (icon or custom element)
   */
  leadingContent?: ReactNode;

  /**
   * Badge to display
   */
  badge?: ReactNode;

  /**
   * Badge position
   * @default 'bottom'
   */
  badgePosition?: 'top' | 'bottom';

  /**
   * Numeric value to display on the right
   */
  numericValue?: string | number;

  /**
   * Custom trigger content that replaces the default trigger layout.
   */
  triggerContent?: never;
}

interface ExpandableCardCustomTriggerProps {
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

type ExpandableCardProps = ExpandableCardSharedProps &
  (ExpandableCardDefaultTriggerProps | ExpandableCardCustomTriggerProps);

export default ExpandableCardProps;
