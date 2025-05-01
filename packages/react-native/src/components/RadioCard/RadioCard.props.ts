import type { PressableProps } from 'react-native';

interface RadioCardProps extends Omit<PressableProps, 'children'> {
  value: string;
  onChange?: (isSelected: boolean) => void;
  children?: React.ReactNode;
  label?: string;
}

export default RadioCardProps;
