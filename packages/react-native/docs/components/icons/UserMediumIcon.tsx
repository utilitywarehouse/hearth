import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgUserMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 13c4.4 0 8 3.6 8 8 0 .6-.4 1-1 1s-1-.4-1-1c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 .6-.4 1-1 1s-1-.4-1-1c0-4.4 3.6-8 8-8Zm0-11C9.2 2 7 4.2 7 7s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5Zm0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3Z"
    />
  </Svg>
);
export default SvgUserMediumIcon;
