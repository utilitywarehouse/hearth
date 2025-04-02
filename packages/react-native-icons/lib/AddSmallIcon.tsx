import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgAddSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M9.066 11.138H3V8.862h6.066V2.797h2.275v6.066h6.066v2.274H11.34v6.066H9.066z"
    />
  </Svg>
);
export default SvgAddSmallIcon;
