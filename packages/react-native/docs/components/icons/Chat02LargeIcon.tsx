import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChat02LargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M31 8c7.2 0 13 5.8 13 13s-5.8 13-13 13h-1c-1.1 0-2 .9-2 2s.9 2 2 2h5c.6 0 1 .4 1 1s-.4 1-1 1h-5c-2.2 0-4-1.8-4-4s1.8-4 4-4h1c6.1 0 11-4.9 11-11s-4.9-11-11-11H17c-6.1 0-11 4.9-11 11s4.9 11 11 11h3c.6 0 1 .4 1 1s-.4 1-1 1h-3C9.8 34 4 28.2 4 21S9.8 8 17 8h14Zm-6.9 14c2.5 0 4.7 1.4 5.9 3.6.3.5.217 1.228-.342 1.54-.558.313-1.358-.24-1.558-.64-.8-1.6-2.4-2.6-4.1-2.6-1.7 0-3.3 1-4.1 2.6-.3.5-1 .94-1.4.64-.5-.3-.601-.988-.3-1.54 1.2-2.2 3.4-3.6 5.9-3.6Z"
    />
    <Path fill={color} d="M20 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M30 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgChat02LargeIcon;
