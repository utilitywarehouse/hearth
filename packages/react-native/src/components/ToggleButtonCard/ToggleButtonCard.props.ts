import type { PressableProps, ViewStyle } from 'react-native';
import { SpaceValue } from '../../types';

interface ToggleButtonCardProps extends Omit<PressableProps, 'children'> {
  value: string;
  onChange?: (isSelected: boolean) => void;
  children?: React.ReactNode;
  label?: string;
  flexDirection?: ViewStyle['flexDirection'];
  flexWrap?: ViewStyle['flexWrap'];
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  contentStyle?: ViewStyle;
  gap?: SpaceValue;
}

export default ToggleButtonCardProps;
