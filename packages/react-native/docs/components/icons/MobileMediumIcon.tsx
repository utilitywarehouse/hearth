import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMobileMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M17.68 0H6.32C5.04 0 4 1.01 4 2.24v16.97c0 .55.46 1 1.03 1 .57 0 1.03-.45 1.03-1v-1.87h11.87v4.42c0 .13-.11.24-.25.24H7.51c-.57 0-1.03.45-1.03 1s.46 1 1.03 1h10.17c1.28 0 2.32-1.01 2.32-2.24V2.24C20 1 18.96 0 17.68 0ZM6.07 15.34V2.24c0-.13.11-.24.25-.24h11.36c.14 0 .25.11.25.24v13.1H6.07Z"
    />
    <Path
      fill={color}
      d="M14.58 3.92H9.41c-.57 0-1.03.45-1.03 1s.46 1 1.03 1h5.17c.57 0 1.03-.45 1.03-1s-.46-1-1.03-1Z"
    />
    <Path
      fill={color}
      d="M12.13 20.56c.558 0 1.01-.439 1.01-.98 0-.541-.452-.98-1.01-.98s-1.01.439-1.01.98c0 .541.452.98 1.01.98Z"
    />
  </Svg>
);
export default SvgMobileMediumIcon;
