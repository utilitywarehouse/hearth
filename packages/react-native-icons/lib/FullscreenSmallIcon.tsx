import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgFullscreenSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M2.6 17.4v-6.54h2.042v3.048l9.266-9.266h-3.049V2.6h6.542v6.542h-2.042v-3.05L6.093 15.36h3.049v2.042z"
    />
  </Svg>
);
export default SvgFullscreenSmallIcon;
