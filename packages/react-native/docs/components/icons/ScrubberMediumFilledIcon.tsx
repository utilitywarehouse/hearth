import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgScrubberMediumFilledIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
  </Svg>
);
export default SvgScrubberMediumFilledIcon;
