import { ReactNode } from 'react';
import type { PressableProps, ViewProps, ViewStyle } from 'react-native';

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
  leadingContentAlignment?: never;
  contentAlignment?: never;
  trailingContentAlignment?: never;
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
  /** Vertical alignment of the leading content within the list item.
   * @default 'flex-start' */
  leadingContentAlignment?: ViewStyle['alignSelf'];
  /** Vertical alignment of the content (heading, helper text and badge) within the list item.
   * @default 'center' */
  contentAlignment?: ViewStyle['alignSelf'];
  /** Vertical alignment of the trailing content within the list item.
   * @default 'flex-start', or 'center' when the trailing content is the default chevron or a `ListItemTrailingIcon` */
  trailingContentAlignment?: ViewStyle['alignSelf'];
}

type ListItemProps = ListItemWithChildren | ListItemWithoutChildren;

export default ListItemProps;
