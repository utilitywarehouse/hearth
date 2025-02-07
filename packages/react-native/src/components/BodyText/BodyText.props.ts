import type { TextProps as RNTextProps, TextStyle } from 'react-native';
import type { ColorValue } from '../../types';

interface TextProps extends RNTextProps {
  size?: 'sm' | 'md' | 'lg';
  strikeThrough?: boolean;
  underline?: boolean;
  truncated?: boolean;
  bold?: boolean;
  semibold?: boolean;
  italic?: boolean;
  color?: ColorValue;
  textTransform?: TextStyle['textTransform'];
  textAlign?: TextStyle['textAlign'];
  textAlignVertical?: TextStyle['textAlignVertical'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textDecorationColor?: ColorValue;
  userSelect?: TextStyle['userSelect'];
}

export default TextProps;
