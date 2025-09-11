import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgExpandSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="m10 18-5-5.229 1.352-1.414L10 15.173l3.648-3.816L15 12.771zM6.352 8.643 5 7.229 10 2l5 5.229-1.352 1.414L10 4.827z"
    />
  </Svg>
);
export default SvgExpandSmallIcon;
