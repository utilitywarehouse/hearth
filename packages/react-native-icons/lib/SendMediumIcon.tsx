import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSendMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M13.314 21.749 9.07 17.506l4.243-7.071-7.071 4.243L2 10.435l19.092-7.778z"
    />
  </Svg>
);
export default SvgSendMediumIcon;
