import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgEditSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M3 17.125v-3.187L14.438 2.5l3.187 3.188L6.188 17.124zM13.969 6.219a.73.73 0 1 0 1.03-1.032l-.03-.03a.73.73 0 1 0-1.031 1.03z"
    />
  </Svg>
);
export default SvgEditSmallIcon;
