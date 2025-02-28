import type { TextProps as RNTextProps, TextStyle } from 'react-native';
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
}

export default TextProps;
