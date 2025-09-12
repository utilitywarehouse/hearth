import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTorchOffMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M8.7 21.7V10.5L2.1 3.9l1.4-1.4 18.4 18.4-1.4 1.4-3.8-3.8v3.2zm-2-18.85V1.7h12v3H8.55zm10 10L10.55 6.7h8.15v1l-2 3z"
    />
  </Svg>
);
export default SvgTorchOffMediumIcon;
