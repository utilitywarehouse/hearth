import { ComponentType, ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';
import { IconContainerProps } from '../../IconContainer';

interface CardActionBaseProps extends Omit<PressableProps, 'children'> {
  loading?: boolean;
  disabled?: boolean;
  size?: 'md' | 'lg';
}

interface CardActionContentProps {
  heading: string;
  helperText?: string;
  badge?: ReactNode;
  badgePosition?: 'bottom' | 'middle' | 'right' | 'top';
  iconContainer?: boolean;
  iconContainerVariant?: IconContainerProps['variant'];
  iconContainerColor?: IconContainerProps['color'];
}

export interface CardActionWithChildren extends CardActionBaseProps {
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
    leadingContent: ViewProps['children'];
    leadingIcon?: never;
  };

type CardActionWithLeadingIcon = CardActionBaseProps &
  CardActionContentProps & {
    children?: never;
    leadingContent?: never;
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
  trailingContent: ViewProps['children'];
  trailingIcon?: never;
};

type CardActionWithTrailingIcon = CardActionLeadingVariants & {
  trailingContent?: never;
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
