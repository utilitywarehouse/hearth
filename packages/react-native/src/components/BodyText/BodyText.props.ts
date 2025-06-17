import { Ref } from 'react';
import type { TextProps as RNTextProps, Text, TextStyle } from 'react-native';
import type { ColorValue } from '../../types';

interface TextProps extends RNTextProps {
  size?: 'sm' | 'md' | 'lg';
  strikeThrough?: boolean;
  underline?: boolean;
  truncated?: boolean;
  weight?: 'regular' | 'semibold' | 'bold';
  italic?: boolean;
  color?: ColorValue;
  textTransform?: TextStyle['textTransform'];
  textAlign?: TextStyle['textAlign'];
  textAlignVertical?: TextStyle['textAlignVertical'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textDecorationColor?: ColorValue;
  userSelect?: TextStyle['userSelect'];
  inverted?: boolean;
  ref?: Ref<Text>;
}

export default TextProps;
