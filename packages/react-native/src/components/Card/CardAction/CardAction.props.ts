import { ComponentType, ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';
import { IconContainerProps } from '../../IconContainer';

export interface CardActionBaseProps extends Omit<PressableProps, 'children'> {
  /** Shows a loading skeleton in place of the content. */
  loading?: boolean;
  /** Disables interaction with the action. */
  disabled?: boolean;
  /** Size of the heading text.
   * @default 'md'
   */
  size?: 'md' | 'lg';
}

export interface CardActionContentProps {
  /** Main heading text; required unless `children` is used. */
  heading: string;
  /** Secondary text shown below the heading. */
  helperText?: string;
  /** Badge rendered alongside the action. */
  badge?: ReactNode;
  /** Position of the badge relative to the heading and helper text.
   * @default 'bottom'
   */
  badgePosition?: 'bottom' | 'middle' | 'right' | 'top';
  /** Wraps the leading icon in a styled container.
   * @default true
   */
  iconContainer?: boolean;
  /** Visual variant of the icon container. */
  iconContainerVariant?: IconContainerProps['variant'];
  /** Semantic colour family used for the icon container's surface. */
  iconContainerColor?: IconContainerProps['color'];
}

export interface CardActionWithChildren extends CardActionBaseProps {
  /** Custom content rendered in place of the built-in heading, helper text, and icon slots. */
  children: ViewProps['children'];
  heading?: never;
  helperText?: never;
  leadingContent?: never;
  leadingIcon?: never;
  trailingContent?: never;
  trailingIcon?: never;
  badge?: never;
  badgePosition?: never;
  iconContainer?: never;
  iconContainerVariant?: never;
  iconContainerColor?: never;
}

// Leading content variants
type CardActionWithLeadingContent = CardActionBaseProps &
  CardActionContentProps & {
    children?: never;
    /** Custom content displayed at the start of the action, typically an icon. */
    leadingContent: ViewProps['children'];
    leadingIcon?: never;
  };

type CardActionWithLeadingIcon = CardActionBaseProps &
  CardActionContentProps & {
    children?: never;
    leadingContent?: never;
    /** Icon displayed at the start of the action. */
    leadingIcon: ComponentType;
  };

type CardActionWithNoLeading = CardActionBaseProps &
  CardActionContentProps & {
    children?: never;
    leadingContent?: never;
    leadingIcon?: never;
  };

type CardActionLeadingVariants =
  | CardActionWithLeadingContent
  | CardActionWithLeadingIcon
  | CardActionWithNoLeading;

// Trailing content combined with leading variants
type CardActionWithTrailingContent = CardActionLeadingVariants & {
  /** Custom content displayed at the end of the action, typically an icon. */
  trailingContent: ViewProps['children'];
  trailingIcon?: never;
};

type CardActionWithTrailingIcon = CardActionLeadingVariants & {
  trailingContent?: never;
  /** Icon displayed at the end of the action.
   * @default ChevronRightSmallIcon
   */
  trailingIcon: ComponentType;
};

type CardActionWithNoTrailing = CardActionLeadingVariants & {
  trailingContent?: never;
  trailingIcon?: never;
};

type CardActionWithoutChildren =
  | CardActionWithTrailingContent
  | CardActionWithTrailingIcon
  | CardActionWithNoTrailing;

type CardActionProps = CardActionWithChildren | CardActionWithoutChildren;

export default CardActionProps;
