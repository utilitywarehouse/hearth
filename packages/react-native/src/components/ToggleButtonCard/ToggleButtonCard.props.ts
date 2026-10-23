import type { PressableProps, ViewProps, ViewStyle } from 'react-native';
import { SpaceValue } from '../../types';

interface ToggleButtonCardProps extends Omit<PressableProps, 'children'> {
  /**
   * Identifies the card inside a `ToggleGroup` or `ToggleButtonCardGroup`, which use it to
   * work out whether the card is selected. Must be unique within the group.
   */
  value: string;
  /** Called with the card's new selected state when its toggle button is pressed. */
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
