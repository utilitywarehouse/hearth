import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgUnlockMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M2 7v4.1c.1.5.6.9 1.1.9.5-.1.9-.5.9-1V6.8C4.1 5.2 5.5 3.9 7.2 4c1.6.1 2.8 1.4 2.8 3v3H8.8c-1.6.1-2.8 1.4-2.8 3v6.2c.1 1.6 1.4 2.8 3 2.8h10.2c1.6-.1 2.8-1.4 2.8-3v-6.2c-.1-1.6-1.4-2.8-3-2.8h-2.1c-.5.1-.9.6-.9 1.1.1.5.5.9 1 .9h2.1c.5.1.9.5.9 1v6.1c-.1.5-.5.9-1 .9H8.9c-.5-.1-.9-.5-.9-1v-6.1c.1-.5.5-.9 1-.9h2.1c.5-.1.9-.5.9-1V6.8C11.9 4 9.5 1.9 6.8 2 4.1 2.1 2 4.3 2 7Z"
    />
  </Svg>
);
export default SvgUnlockMediumIcon;
