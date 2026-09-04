import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  /**
   * The visual style of the badge.
   * @default 'subtle'
   */
  variant?: 'subtle' | 'emphasis' | 'outline';
  /**
   * The color scheme used for the badge.
   * @default 'info'
   */
  colorScheme?:
    | 'info'
    | 'positive'
    | 'danger'
    | 'warning'
    | 'functional'
    | 'energy'
    | 'broadband'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'pig'
    | 'highlight';
  /**
   * The size of the badge.
   * @default 'sm'
   */
  size?: 'sm' | 'md';
  /** Icon component to display in the badge. */
  icon?: ComponentType;
  /**
   * Whether the badge has a flat base.
   * @default false
   */
  flatBase?: boolean;
  /** Text to display in the badge, taking precedence over `children`. */
  text?: string | number;
  /** Maximum number of lines to render for the badge text. */
  numberOfLines?: number;
}

export default BadgeProps;
