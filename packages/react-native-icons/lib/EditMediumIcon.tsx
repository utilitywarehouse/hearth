import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgEditMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M3 21.413v-4.25L17.625 2.588 21.8 6.863 7.25 21.413zm13.9-13.9a.99.99 0 1 0 1.4-1.4.99.99 0 0 0-1.4 1.4"
    />
  </Svg>
);
export default SvgEditMediumIcon;
