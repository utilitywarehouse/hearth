import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgShareMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M18.5 2a3.5 3.5 0 1 1-2.582 5.864l-6.97 3.53a3.521 3.521 0 0 1 0 1.211l6.712 3.848A3.5 3.5 0 1 1 18.5 22c-1.933 0-3.498-1.5-3.498-3.433-.001.04.002-.12 0 0l-6.95-4.17a3.5 3.5 0 1 1 0-4.791l6.993-3.543A3.5 3.5 0 0 1 18.5 2Zm0 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-13-6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm13-6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    />
  </Svg>
);
export default SvgShareMediumIcon;
