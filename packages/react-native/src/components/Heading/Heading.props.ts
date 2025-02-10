import type { TextProps, TextStyle } from 'react-native';
import type { ColorValue } from '../../types';

interface HeadingProps extends TextProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strikeThrough?: boolean;
  underline?: boolean;
  truncated?: boolean;
  color?: ColorValue;
  textTransform?: TextStyle['textTransform'];
  textAlign?: TextStyle['textAlign'];
  textAlignVertical?: TextStyle['textAlignVertical'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textDecorationColor?: ColorValue;
  userSelect?: TextStyle['userSelect'];
}

export default HeadingProps;
