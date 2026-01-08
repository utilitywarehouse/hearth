import { ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

interface ListItemBaseProps extends Omit<PressableProps, 'children'> {
  loading?: boolean;
  disabled?: boolean;
  variant?: 'subtle' | 'emphasis';
  isFirst?: boolean;
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
}

type ListItemProps = ListItemWithChildren | ListItemWithoutChildren;

export default ListItemProps;
