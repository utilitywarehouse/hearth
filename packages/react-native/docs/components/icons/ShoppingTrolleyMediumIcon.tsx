import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgShoppingTrolleyMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M7.83 21.28a1.16 1.16 0 1 0 0-2.32 1.16 1.16 0 0 0 0 2.32Zm9.56 0a1.16 1.16 0 1 0 0-2.32 1.16 1.16 0 0 0 0 2.32Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5.7 12.05.8 4h10.88a1.22 1.22 0 0 0 1.12-.75l2.44-5.7a1.22 1.22 0 0 0-1.13-1.69H6a1.23 1.23 0 0 1-1.26-1.08l-.22-3.27A.62.62 0 0 0 3.91 3H3"
    />
  </Svg>
);
export default SvgShoppingTrolleyMediumIcon;
