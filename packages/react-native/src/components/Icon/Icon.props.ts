import type { ColorValue as RNColorValue } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import type { ColorValue } from '../../types';
import { ComponentType } from 'react';

interface IconProps extends SvgProps {
  /** The height of the icon. */
  height?: number | string;
  /** The width of the icon. */
  width?: number | string;
  /** The fill color applied to the icon's SVG paths. */
  fill?: string;
  /** The color of the icon. */
  color?: ColorValue;
  /** Sets both the height and width of the icon. */
  size?: number | string;
  /** The stroke color applied to the icon's SVG paths. */
  stroke?: string;
  /** The icon component to render. */
  as?: ComponentType;
  /** Style applied to the icon's root SVG element. */
  style?: SvgProps['style'] & { color?: RNColorValue };
}

export default IconProps;
