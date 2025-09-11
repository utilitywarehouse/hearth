import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLoginMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m16.5 12-5.625 5.625-1.631-1.575 2.925-2.925H3v-2.25h9.169L9.244 7.95l1.631-1.575zm4.5 9h-5.625v-2.25h3.375V5.25h-3.375V3H21z"
    />
  </Svg>
);
export default SvgLoginMediumIcon;
