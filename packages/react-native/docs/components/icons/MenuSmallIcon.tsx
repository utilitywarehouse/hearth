import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMenuSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M2.67 5.26c-.37 0-.67-.28-.67-.63S2.3 4 2.67 4h10.67c.37 0 .67.28.67.63s-.3.63-.67.63H2.67Z"
    />
    <Path
      fill={color}
      d="M2.67 8.63C2.3 8.63 2 8.35 2 8s.3-.63.67-.63h10.67c.37 0 .67.28.67.63s-.3.63-.67.63H2.67Z"
    />
    <Path
      fill={color}
      d="M2.67 12c-.37 0-.67-.28-.67-.63s.3-.63.67-.63h10.67c.37 0 .67.28.67.63s-.3.63-.67.63H2.67Z"
    />
  </Svg>
);
export default SvgMenuSmallIcon;
