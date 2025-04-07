import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMobileSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={22} fill="none" viewBox="0 0 20 22" {...props}>
    <Path
      fill={color}
      d="M4.5 20V2h11v18zm5.5-2.046q.335 0 .56-.235a.8.8 0 0 0 .226-.583.8.8 0 0 0-.226-.583.75.75 0 0 0-.56-.235.75.75 0 0 0-.56.235.8.8 0 0 0-.226.583q0 .349.226.583.225.235.56.235m-3.929-3.681h7.858V6.09H6.07z"
    />
  </Svg>
);
export default SvgMobileSmallIcon;
