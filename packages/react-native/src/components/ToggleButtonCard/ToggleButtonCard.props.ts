import type { PressableProps, ViewProps, ViewStyle } from 'react-native';
import { SpaceValue } from '../../types';

interface ToggleButtonCardProps extends Omit<PressableProps, 'children'> {
  value: string;
  onChange?: (isSelected: boolean) => void;
  children?: ViewProps['children'];
  label?: string;
  flexDirection?: ViewStyle['flexDirection'];
  flexWrap?: ViewStyle['flexWrap'];
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  contentStyle?: ViewStyle;
  gap?: SpaceValue;
}

export default ToggleButtonCardProps;
