import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgFullscreenMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M2.797 21.203v-8.275h2.275v4.403L17.33 5.07h-4.403V2.798h8.275v8.275h-2.275V6.669L6.67 18.929h4.403v2.274z"
    />
  </Svg>
);
export default SvgFullscreenMediumIcon;
