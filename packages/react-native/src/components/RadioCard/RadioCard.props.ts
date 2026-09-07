import type { PressableProps, ViewStyle } from 'react-native';
import { ViewProps } from 'react-native';
import { SpaceValue } from '../../types';

interface RadioCardProps extends Omit<PressableProps, 'children'> {
  /** The value to be used in the radio card input, returned on form submission. */
  value: string;
  /** Called when the state of the radio card changes. */
  onChange?: (isSelected: boolean) => void;
  /** The content to be displayed inside the radio card. */
  children?: ViewProps['children'];
  /** The label to be displayed next to the radio card. */
  label?: string;
  /**
   * The variant of the label text.
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /** Sets the direction of the flex items. */
  flexDirection?: ViewStyle['flexDirection'];
  /** Sets whether flex items are forced onto one line or can wrap. */
  flexWrap?: ViewStyle['flexWrap'];
  /** Sets the alignment of flex items on the cross axis. */
  alignItems?: ViewStyle['alignItems'];
  /** Sets the alignment of flex items on the main axis. */
  justifyContent?: ViewStyle['justifyContent'];
  /** Additional style applied to the `children` content wrapper. */
  contentStyle?: ViewStyle;
  /** The gap between the indicator/label row and the `children` content. */
  gap?: SpaceValue;
}

export default RadioCardProps;
