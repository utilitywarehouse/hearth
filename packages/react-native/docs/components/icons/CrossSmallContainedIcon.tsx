import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCrossSmallContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8 14c-3.307 0-6-2.693-6-6s2.693-6 6-6 6 2.693 6 6-2.693 6-6 6ZM8 3.333A4.672 4.672 0 0 0 3.333 8 4.672 4.672 0 0 0 8 12.667 4.672 4.672 0 0 0 12.667 8 4.672 4.672 0 0 0 8 3.333Z"
    />
    <Path
      fill={color}
      d="m8.942 8 1.085-1.084a.67.67 0 0 0 0-.943.67.67 0 0 0-.943 0L8 7.058 6.916 5.973a.67.67 0 0 0-.943 0 .67.67 0 0 0 0 .943L7.058 8 5.973 9.084a.67.67 0 0 0 0 .943.66.66 0 0 0 .471.195.66.66 0 0 0 .472-.195L8 8.942l1.084 1.085a.66.66 0 0 0 .472.195.66.66 0 0 0 .47-.195.67.67 0 0 0 0-.943L8.943 8Z"
    />
  </Svg>
);
export default SvgCrossSmallContainedIcon;
