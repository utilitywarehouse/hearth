import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInformationMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M11 7c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1Zm0 10v-6c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1s-1-.4-1-1Z"
    />
  </Svg>
);
export default SvgInformationMediumIcon;
