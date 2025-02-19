import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSubsOffMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M19 4c1.6 0 2.9 1.2 3 2.8V17c0 1.6-1.2 2.9-2.8 3H5c-1.6 0-2.9-1.2-3-2.8V7c0-1.6 1.2-2.9 2.8-3H19Zm.1 2H5c-.5 0-.9.4-1 .9V17c0 .5.4.9.9 1H19c.5 0 .9-.4 1-.9V7c0-.5-.4-.9-.9-1ZM17 14c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1Z"
    />
  </Svg>
);
export default SvgSubsOffMediumIcon;
