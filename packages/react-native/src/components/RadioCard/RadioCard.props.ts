import type { PressableProps, ViewStyle } from 'react-native';
import { ViewProps } from 'react-native';
import { SpaceValue } from '../../types';

interface RadioCardProps extends Omit<PressableProps, 'children'> {
  value: string;
  onChange?: (isSelected: boolean) => void;
  children?: ViewProps['children'];
  label?: string;
  labelVariant?: 'heading' | 'body';
  flexDirection?: ViewStyle['flexDirection'];
  flexWrap?: ViewStyle['flexWrap'];
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  contentStyle?: ViewStyle;
  gap?: SpaceValue;
}

export default RadioCardProps;
