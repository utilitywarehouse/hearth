import type { TextProps as RNTextProps, TextStyle } from 'react-native';
import type { ColorValue } from '../../types';

interface TextProps extends RNTextProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  strikeThrough?: boolean;
  underline?: boolean;
  truncated?: boolean;
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
