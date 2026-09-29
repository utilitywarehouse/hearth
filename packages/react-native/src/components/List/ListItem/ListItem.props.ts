import { ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

interface ListItemBaseProps extends Omit<PressableProps, 'children'> {
  loading?: boolean;
  disabled?: boolean;
  variant?: 'subtle' | 'emphasis';
}

export interface ListItemWithChildren extends ListItemBaseProps {
  children: ViewProps['children'];
  heading?: never;
  helperText?: never;
  leadingContent?: never;
  trailingContent?: never;
  numericValue?: never;
  badge?: never;
  badgePosition?: never;
  truncateHeading?: never;
  truncateHelperText?: never;
  leadingContentProps?: never;
  contentProps?: never;
  trailingContentProps?: never;
}

export interface ListItemWithoutChildren extends ListItemBaseProps {
  children?: never;
  heading: string;
  helperText?: string;
  leadingContent?: ViewProps['children'];
  trailingContent?: ViewProps['children'];
  numericValue?: string | number;
  badge?: ReactNode;
  badgePosition?: 'top' | 'bottom';
  truncateHeading?: boolean;
  truncateHelperText?: boolean;
  /** Extra props forwarded to the `ListItemLeadingContent` part, e.g. `style` to override its alignment. */
  leadingContentProps?: Omit<ViewProps, 'children'>;
  /** Extra props forwarded to the `ListItemContent` part wrapping the heading, helper text and badge. */
  contentProps?: Omit<ViewProps, 'children'>;
  /** Extra props forwarded to the `ListItemTrailingContent` part, including the default chevron. */
  trailingContentProps?: Omit<ViewProps, 'children'>;
}

type ListItemProps = ListItemWithChildren | ListItemWithoutChildren;

export default ListItemProps;
