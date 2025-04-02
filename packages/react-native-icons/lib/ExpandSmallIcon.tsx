import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgExpandSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="m10 18.9-4.5-4.5 1.45-1.45L10 16l3.05-3.05 1.45 1.45zM6.95 6.95 5.5 5.5 10 1l4.5 4.5-1.45 1.45L10 3.9z"
    />
  </Svg>
);
export default SvgExpandSmallIcon;
