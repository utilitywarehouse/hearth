import type { PressableProps } from 'react-native';
import type { ColorValue } from '../../../types';

interface ListActionProps extends Omit<PressableProps, 'children'> {
  heading: string;
  divider?: boolean;
  dividerColor?: ColorValue;
  disabled?: boolean;
  variant?: 'subtle' | 'emphasis';
  isFirst?: boolean;
}

export default ListActionProps;
