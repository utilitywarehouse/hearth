import type { PressableProps, ViewProps } from 'react-native';
import type { ColorValue } from '../../../types';

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
  text?: never;
  helperText?: never;
  leadingContent?: never;
  trailingContent?: never;
}

export interface ListItemWithoutChildren extends ListItemBaseProps {
  children?: never;
  text: string;
  helperText?: string;
  leadingContent?: ViewProps['children'];
  trailingContent?: ViewProps['children'];
}

type ListItemProps = ListItemWithChildren | ListItemWithoutChildren;

export default ListItemProps;
