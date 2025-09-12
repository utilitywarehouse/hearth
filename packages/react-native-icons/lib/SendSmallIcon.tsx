import * as React from 'react';
import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg';
import { IconProps } from './types';
const SvgSendSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="m10.9 18.655-3.713-3.712L10.9 8.756l-6.187 3.712L1 8.756 17.705 1.95z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgSendSmallIcon;
