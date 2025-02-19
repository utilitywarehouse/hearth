import { SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
  children?: never;
  /** Sets the color of the icon fill */
  color?: string;
}
