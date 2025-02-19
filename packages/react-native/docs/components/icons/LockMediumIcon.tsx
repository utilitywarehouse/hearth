import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLockMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 2c2.8 0 5 2.2 5 5v3h.3l.19.03C18.986 10.303 20 11.56 20 13v6.3c-.2 1.6-1.5 2.7-3 2.7H6.7C5.1 21.8 4 20.5 4 19v-6.3c.2-1.6 1.5-2.7 3-2.7V7c0-2.8 2.2-5 5-5Zm0 2c-1.7 0-3 1.3-3 3v3h3c.5 0 .9.4 1 .9 0 .5-.4 1-.9 1.1H7c-.5 0-.9.4-1 .9V19c0 .5.4.9.9 1H17c.5 0 .9-.4 1-.9V13c0-.5-.4-.9-.9-1H16c-.5 0-.9-.4-1-.9V7c0-1.7-1.3-3-3-3Zm0 11c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1Z"
    />
  </Svg>
);
export default SvgLockMediumIcon;
