import type { PressableProps } from 'react-native';

interface ListActionProps extends Omit<PressableProps, 'children'> {
  heading: string;
  disabled?: boolean;
  variant?: 'subtle' | 'emphasis';
}

export default ListActionProps;
