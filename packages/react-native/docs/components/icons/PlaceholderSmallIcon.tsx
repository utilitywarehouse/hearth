import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgPlaceholderSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8 2a5.98 5.98 0 0 0-2.604.593 1 1 0 1 0 .869 1.802A3.98 3.98 0 0 1 8 4a3.98 3.98 0 0 1 1.735.395 1 1 0 1 0 .87-1.802A5.98 5.98 0 0 0 8 2Z"
    />
    <Path
      fill={color}
      d="M13.407 5.396a1 1 0 0 0-1.802.869A3.98 3.98 0 0 1 12 8a3.98 3.98 0 0 1-.395 1.735 1 1 0 0 0 1.802.87A5.98 5.98 0 0 0 14 8a5.98 5.98 0 0 0-.593-2.604Z"
    />
    <Path
      fill={color}
      d="M4.395 6.265a1 1 0 1 0-1.802-.87A5.98 5.98 0 0 0 2 8c0 .931.213 1.815.593 2.604a1 1 0 0 0 1.802-.869A3.98 3.98 0 0 1 4 8c0-.624.142-1.212.395-1.735Z"
    />
    <Path
      fill={color}
      d="M6.265 11.605a1 1 0 0 0-.87 1.802A5.98 5.98 0 0 0 8 14a5.98 5.98 0 0 0 2.604-.593 1 1 0 0 0-.869-1.802A3.98 3.98 0 0 1 8 12a3.98 3.98 0 0 1-1.735-.395Z"
    />
    <Path fill={color} d="M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </Svg>
);
export default SvgPlaceholderSmallIcon;
