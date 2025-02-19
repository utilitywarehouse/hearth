import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCopyMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M5 6c.5 0 .9.4 1 .9V20h9c.5 0 .9.4 1 .9v.1c0 .5-.4.9-.9 1H5c-.5 0-.9-.4-1-.9V7c0-.6.4-1 1-1Zm14-4c.6 0 1 .4 1 1 0 .5-.4.9-.9 1H10v12h8V7.5c0-.5.4-.9.9-1h.1c.5 0 .9.4 1 .9V17c0 .5-.4.9-.9 1H9c-.5 0-.9-.4-1-.9V3c0-.5.4-.9.9-1H19Z"
    />
  </Svg>
);
export default SvgCopyMediumIcon;
