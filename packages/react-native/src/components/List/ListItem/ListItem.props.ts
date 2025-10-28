import type { PressableProps, ViewProps } from 'react-native';
import type { ColorValue } from '../../../types';
import BadgeProps from '../../Badge/Badge.props';

interface ListItemBaseProps extends Omit<PressableProps, 'children'> {
  divider?: boolean;
  dividerColor?: ColorValue;
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
}

export interface ListItemWithoutChildren extends ListItemBaseProps {
  children?: never;
  heading: string;
  helperText?: string;
  leadingContent?: ViewProps['children'];
  trailingContent?: ViewProps['children'];
  numericValue?: string | number;
  badge?: BadgeProps;
  badgePosition?: 'top' | 'bottom';
}

type ListItemProps = ListItemWithChildren | ListItemWithoutChildren;

export default ListItemProps;
