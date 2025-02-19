import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLoginMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M18.7 2C20.4 2 22 3 22 4.8v14.4c0 1.5-1.6 2.8-3.3 2.8h-8.6c-1.7 0-3.2-1-3.2-2.6v-2.9c0-.6.4-1 1-1 .5 0 1 .5 1 1v2.7c0 .4.6.8 1.1.8h8.7c.6 0 1.2-.5 1.2-.8V4.8c0-.4-.5-.8-1.2-.8H10c-.6 0-1 .5-1 .8v2.7c0 .6-.4 1-1 1-.5 0-1-.5-1-1V4.8C7 3.3 8.3 2.1 10 2h8.7Zm-6.1 4.2 5.1 5.1c.4.4.3 1.1 0 1.4l-5 5c-.4.4-1 .4-1.4 0-.4-.4-.3-1.1 0-1.4l4.3-4.3L13 9.4V11c0 1-1 2-2 2H3c-.6 0-1-.4-1-1 0-.5.5-1 1-1h8V7c0-.9 1-1.3 1.6-.8Z"
    />
  </Svg>
);
export default SvgLoginMediumIcon;
