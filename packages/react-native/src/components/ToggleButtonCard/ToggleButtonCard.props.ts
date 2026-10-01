import type { PressableProps, ViewProps, ViewStyle } from 'react-native';
import { SpaceValue } from '../../types';

interface ToggleButtonCardProps extends Omit<PressableProps, 'children'> {
  /** The value used for the toggle button, returned on form submission. */
  value: string;
  /** Called when the state of the toggle button changes. */
  onChange?: (isSelected: boolean) => void;
  children?: ViewProps['children'];
  /** The label to be displayed next to the toggle button. */
  label?: string;
  /** Flex direction. */
  flexDirection?: ViewStyle['flexDirection'];
  /** Flex wrap. */
  flexWrap?: ViewStyle['flexWrap'];
  /** Align items. */
  alignItems?: ViewStyle['alignItems'];
  /** Justify content. */
  justifyContent?: ViewStyle['justifyContent'];
  /** Style applied to the content wrapper around `children`. */
  contentStyle?: ViewStyle;
  /** Gap between child elements. */
  gap?: SpaceValue;
}

export default ToggleButtonCardProps;
