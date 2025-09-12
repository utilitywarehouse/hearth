import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgEyeMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M18.7 6.5c-2-1.4-4.2-2-6.7-2s-4.7.7-6.7 2S1.9 9.7 1 12c.9 2.3 2.3 4.1 4.3 5.5s4.2 2 6.7 2 4.7-.7 6.7-2c2-1.4 3.4-3.2 4.3-5.5-.9-2.3-2.3-4.1-4.3-5.5m-4.6 7.6q-.9.9-2.1.9t-2.1-.9T9 12t.9-2.1T12 9t2.1.9.9 2.1-.9 2.1"
    />
  </Svg>
);
export default SvgEyeMediumIcon;
