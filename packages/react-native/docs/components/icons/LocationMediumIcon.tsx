import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLocationMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 2a7.87 7.87 0 0 0-7.86 7.89C4.14 17.12 10.65 22 12 22c1 0 3.12-2 3.21-2.06a1 1 0 1 0-1.37-1.45c-.56.53-1.177.997-1.84 1.39-1.27-.72-5.86-4.29-5.86-10a5.86 5.86 0 0 1 11.72 0 11 11 0 0 1-2 6.23 1 1 0 0 0 1.65 1.13 12.87 12.87 0 0 0 2.36-7.36A7.87 7.87 0 0 0 12 2Z"
    />
    <Path
      fill={color}
      d="M12 5.72a4.17 4.17 0 1 0 0 8.34 4.17 4.17 0 0 0 0-8.34Zm0 6.34a2.17 2.17 0 1 1 2.17-2.17A2.18 2.18 0 0 1 12 12.06Z"
    />
  </Svg>
);
export default SvgLocationMediumIcon;
