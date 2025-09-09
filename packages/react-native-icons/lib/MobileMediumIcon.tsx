import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMobileMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M5 23V1h14v22zm7-2.5q.424 0 .713-.288A.97.97 0 0 0 13 19.5a.97.97 0 0 0-.287-.712A.97.97 0 0 0 12 18.5a.97.97 0 0 0-.713.288.97.97 0 0 0-.287.712q0 .424.287.712.288.288.713.288M7 16h10V6H7z"
    />
  </Svg>
);
export default SvgMobileMediumIcon;
