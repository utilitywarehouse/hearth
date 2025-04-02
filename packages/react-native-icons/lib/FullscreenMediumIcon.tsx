import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgFullscreenMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M3 21v-7.988h2.426v3.84l11.41-11.41h-3.84V3H21v8.004h-2.441v-3.84l-11.41 11.41h3.839V21z"
    />
  </Svg>
);
export default SvgFullscreenMediumIcon;
