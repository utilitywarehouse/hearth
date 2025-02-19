import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInsuranceLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M20.5 44C18 44 16 42 16 39.5v-3.1c0-.6.4-1 1-1s1 .4 1 1v3.1c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V23.8c0-3.2 2.6-5.8 5.8-5.8 2 0 3.7 1 4.8 2.5 1-1.5 2.8-2.5 4.8-2.5 1.1 0 2.1.3 3 .9C39.1 11.5 32.2 6 24 6S8.9 11.5 6.7 18.9c.9-.5 1.9-.9 3-.9 2 0 3.7 1 4.8 2.5 1-1.5 2.8-2.5 4.8-2.5.6 0 1 .4 1 1s-.4 1-1 1c-2.1 0-3.8 1.7-3.8 3.8 0 .6-.4 1-1 1s-1-.4-1-1c0-2.1-1.7-3.8-3.8-3.8-2 0-3.7 1.6-3.7 3.6v.3c0 .6-.4 1-1 1s-1-.4-1-1v-.4C4.2 12.8 13.1 4 24 4s19.8 8.8 20 19.6v.4c0 .6-.4 1-1 1s-1-.4-1-1v-.3c-.1-2-1.7-3.6-3.7-3.6-2.1 0-3.8 1.7-3.8 3.8 0 .6-.4 1-1 1s-1-.4-1-1c0-2.1-1.7-3.8-3.8-3.8-2.1 0-3.7 1.7-3.7 3.7v15.7c0 2.5-2 4.5-4.5 4.5Z"
    />
  </Svg>
);
export default SvgInsuranceLargeIcon;
