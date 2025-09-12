import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBankMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M5.7 17.4v-6.3h1.8v6.3zm5.4 0v-6.3h1.8v6.3zM3 21v-1.8h18V21zm13.5-3.6v-6.3h1.8v6.3zM3 9.3V7.5L12 3l9 4.5v1.8z"
    />
  </Svg>
);
export default SvgBankMediumIcon;
